import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { FriendsProps } from "../../pages/friends";
import { FRIENDS_STATUS } from "../../pages/profile/[id]";
import { selectSocket } from "../../store/ducks/socket/selectors";
import { IUser } from "../../store/ducks/user/types";
import { checkOfflineUser } from "../../utils";
import { Sockets } from "../../utils/consts";
import { IFriendsNoteFromServer } from "../useSocket";

export enum FriendsMode {
  ALL = "ALL",
  ONLINE = "ONLINE",
  SEND = "SEND",
  INCOMING = "INCOMING",
}
export const getMode = (mode: FriendsMode) => ({
  isAll: mode === FriendsMode.ALL,
  isSend: mode === FriendsMode.SEND,
  isIncoming: mode === FriendsMode.INCOMING,
  isOnlineFriends: mode === FriendsMode.ONLINE,
});

const isOnline = (user: IUser) => checkOfflineUser(user) === false;

export type IFriendsMode = {
  mode: FriendsMode;
  list: IUser[];
};

export type IUserModeChg = { prevMode: FriendsMode; user: IUser };
type IChangeState = IUser[]; // id[]
export const useFriendsMode = ({
  friends,
  incomingRequests,
  sendRequests,
}: FriendsProps) => {
  const socket = useSelector(selectSocket);
  const [allList, setAllList] = useState({
    friends,
    online: friends.filter(isOnline),
    sendRequests,
    incomingRequests,
  });
  useEffect(() => {
    if (!socket) {
      return;
    }
    const onGetFriendsToList = ({
      avatar,
      from,
      status,
      user,
    }: IFriendsNoteFromServer) => {
      // если пользователь отправляет заявку в друзьяю (send), то по сокету пользователь который получает её, получает как входящую
      // заявку (incoming), поэтому 2 этих варината надо поменять местами
      const list: keyof typeof allList =
        status === FRIENDS_STATUS.FRIENDS
          ? "friends"
          : status === FRIENDS_STATUS.INCOMING
          ? "sendRequests"
          : "incomingRequests";
      setAllList((prev) => ({ ...prev, [list]: [...prev[list], user] }));
    };
    socket.on(Sockets.get.friends, onGetFriendsToList);
    return () => {
      if (socket) {
        socket.off(Sockets.get.friends, onGetFriendsToList);
      }
    };
  }, []);

  const [changeIncomingUsers, setChangeIncomingUsers] = useState<IChangeState>(
    []
  );
  const [changeFriendsUsers, setChangeFriendsUsers] = useState<IChangeState>(
    []
  );
  const [deleteUsers, setDeleteUsers] = useState<IChangeState>([]);
  const clearChangeFields = () => {
    [setChangeFriendsUsers, setChangeIncomingUsers, setDeleteUsers].forEach(
      (fn) => fn([])
    );
  };
  const onChangeModeUser =
    ({ prevMode, user }: IUserModeChg) =>
    () => {
      if (prevMode === FriendsMode.SEND) {
        setDeleteUsers((prev) => [...prev, user]);
        return;
      }
      if (prevMode === FriendsMode.INCOMING) {
        setChangeIncomingUsers((prev) => [...prev, user]);
        return;
      }
      if (prevMode === FriendsMode.ALL) {
        setChangeFriendsUsers((prev) => [...prev, user]);
      }
    };

  const listForMode = (mode: FriendsMode) => {
    const { isAll, isSend } = getMode(mode);
    if (isAll) {
      return allList.friends;
    }
    if (isOnlineFriends) {
      return allList.online;
    }
    if (isSend) {
      return allList.sendRequests;
    }
    return allList.incomingRequests;
  };
  const defaultFriendsState = {
    mode: FriendsMode.ALL,
    list: allList.friends,
  };
  const [friendsMode, setFriendsMode] =
    useState<IFriendsMode>(defaultFriendsState);
  useEffect(() => {
    setFriendsMode((prev) => ({ ...prev, list: listForMode(prev.mode) }));
  }, [
    allList.friends,
    allList.incomingRequests,
    allList.sendRequests,
    allList.online,
  ]);

  useEffect(() => {
    // при смене таба удалять юзеров ,от которых отписались (send)
    // изменить статус пользователей, которых добавили incoming => friends
    // изменить статус пользователей, которых удалили friends => incoming
    const changeList: [IChangeState, keyof typeof allList][] = [
      [deleteUsers, "sendRequests"],
      [changeIncomingUsers, "incomingRequests"],
      [changeFriendsUsers, "friends"],
    ];
    changeList.forEach(([changeModeUsers, key], i) => {
      if (changeModeUsers.length) {
        const newUserList = allList[key].filter(
          (req) => !changeModeUsers.some((user) => user._id === req._id)
        );
        setAllList((prev) => ({ ...prev, [key]: newUserList }));
      }
    });
    allList.friends.push(...changeIncomingUsers);
    allList.online.push(...changeIncomingUsers.filter(isOnline));
    allList.incomingRequests.push(...changeFriendsUsers);
    clearChangeFields();
    setFriendsMode((prev) => ({ ...prev, list: listForMode(prev.mode) }));
  }, [friendsMode.mode]);

  const onClickMode = ({ mode, list }: IFriendsMode) => {
    setFriendsMode({ mode, list });
  };
  const { isAll, isSend, isIncoming, isOnlineFriends } = getMode(
    friendsMode.mode
  );
  const onClickAll = () => {
    onClickMode({ mode: FriendsMode.ALL, list: allList.friends });
  };
  const onClickSend = () => {
    onClickMode({ mode: FriendsMode.SEND, list: allList.sendRequests });
  };
  const onClickIncoming = () => {
    onClickMode({ mode: FriendsMode.INCOMING, list: allList.incomingRequests });
  };
  const onClickOnline = () => {
    onClickMode({ mode: FriendsMode.ONLINE, list: allList.online });
  };
  const friendsTabs = [
    {
      name: "Все друзья",
      onClick: onClickAll,
      list: allList.friends,
      isActive: isAll,
    },
    {
      name: "Друзья онлайн",
      onClick: onClickOnline,
      list: allList.online,
      isActive: isOnlineFriends,
    },
    {
      name: "Входящие заявки",
      onClick: onClickIncoming,
      list: allList.incomingRequests,
      isActive: isIncoming,
    },
    {
      name: "Отправленные заявки",
      onClick: onClickSend,
      list: allList.sendRequests,
      isActive: isSend,
    },
  ];
  return {
    friendsTabs,
    friendsMode,
    onChangeModeUser,
  };
};
