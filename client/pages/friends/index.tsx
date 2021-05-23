import clsx from "clsx";
import React, { useEffect, useState } from "react";
import { SearchBlock } from "../../components/SearchBlock";
import { ChatTemplate } from "../../components/Templates/Chat";
import { useChange } from "../../hooks/useChange";
import styles from "./friend.module.scss";
import { MdClose as CloseIcon } from "react-icons/md";
import { GetServerSideProps } from "next";
import { apiFriends } from "../../services/api/apiFriends";
import { IUser } from "../../store/ducks/user/types";
import { FriendsList } from "../../components/Friends/FriendsList";
import { useActiveFriendTab } from "../../hooks/friends/useActiveFriendTab";
import {
  FriendsMode,
  useFriendsMode,
} from "../../hooks/friends/useFriendsMode";
import { useDispatch, useStore } from "react-redux";
import { removeFriendNotify } from "../../store/ducks/notify/slice";
import { INotifyFriendType } from "../../store/ducks/notify/types";
import {
  getFriendNotifyType,
  getAuthorization,
  isMatchQuery,
} from "../../utils";

export type FriendsProps = {
  friends: IUser[];
  incomingRequests: IUser[];
  sendRequests: IUser[];
};

const FriendsPage: React.FC<FriendsProps> = ({
  friends,
  incomingRequests,
  sendRequests,
}): React.ReactElement => {
  const dispatch = useDispatch();
  const { input: search, reset } = useChange();

  const { friendsMode, onChangeModeUser, friendsTabs } = useFriendsMode({
    friends,
    incomingRequests,
    sendRequests,
  });
  useActiveFriendTab(friendsMode.mode);

  const notifyType =
    friendsMode.mode === FriendsMode.ONLINE
      ? null
      : (getFriendNotifyType(friendsMode.mode, {
          isNotify: true,
        }) as INotifyFriendType);
  useEffect(() => {
    if (!notifyType) {
      return;
    }
    dispatch(removeFriendNotify(notifyType));
  }, [notifyType]);

  const [showUsers, setShowUsers] = useState(friendsMode.list);
  const onChangeUsers = (e: React.ChangeEvent<HTMLInputElement>) => {
    search.onChange(e)
    setShowUsers(
      friendsMode.list.filter(({ name, surname }) =>
        isMatchQuery({ query: e.target.value, match: `${name} ${surname}` })
      )
    );
  };

  return (
    <ChatTemplate title="Друзья">
      <div className={styles.header}>
        {friendsTabs.map(({ onClick, name, list, isActive }) => (
          <button
            key={name}
            onClick={onClick}
            className={clsx(styles.tab, { [styles.tabActive]: isActive })}
          >
            {name}
            <span className={styles.tabCount}>{list.length}</span>
          </button>
        ))}
      </div>
      <SearchBlock>
        <input
          placeholder="Поиск друзей"
          type="text"
          className={clsx("fullwidth", "search", "ml-2", "mr-2")}
          value={search.value}
          onChange={onChangeUsers}
        />
        {!!search.value && <CloseIcon onClick={reset} className="icon" />}
      </SearchBlock>
      <div className={styles.results}>
        {!!showUsers.length ? (
          <FriendsList
            notifyType={notifyType}
            userList={showUsers}
            mode={friendsMode.mode}
            onChangeModeUser={onChangeModeUser}
          />
        ) : (
          <h1 className="mt-3 center mb-3">Список пуст</h1>
        )}
      </div>
    </ChatTemplate>
  );
};
export const getServerSideProps: GetServerSideProps = async ({
  req,
  query,
}) => {
  try {
    const { id } = query;
    const { incomingRequests, sendRequests, friends } =
      await apiFriends.getTotalFriends({
        authorization: getAuthorization(req),
        payload: id as string,
      });
    return {
      props: {
        incomingRequests,
        sendRequests,
        friends,
      },
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
};

export default FriendsPage;
