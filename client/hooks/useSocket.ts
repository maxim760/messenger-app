import { useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import io from "socket.io-client";
import { FRIENDS_STATUS } from "../pages/profile/[id]";
import { apiUser } from "../services/api/apiUser";
import { updateChat } from "../store/ducks/chates/slice";
import { IChatFromServer, IMessage } from "../store/ducks/chates/types";
import { addFriendNotify, addMessageNotify } from "../store/ducks/notify/slice";
import { INotifyFriendType } from "../store/ducks/notify/types";
import { setSocket } from "../store/ducks/socket/slice";
import { addTypingUser, removeTypingUser } from "../store/ducks/typingUsers/slice";
import { selectUser } from "../store/ducks/user/selectors";
import { IUser } from "../store/ducks/user/types";
import { IWithTimeStamps } from "../types";
import { Sockets } from "../utils/consts";
import { getNotifyTextFriend } from "../utils/getNotifyTextFriend";

export type IFriendsNoteFromServer = {
  status: INotifyFriendType;
  avatar: string;
  from: string;
  user: IUser;
};
export const useSocket = () => {
  const dispatch = useDispatch();
  const socketRef = useRef<SocketIOClient.Socket>(null);
  const user = useSelector(selectUser);

  const onGetFriends = ({ from, status, avatar }: IFriendsNoteFromServer) => {
    // если пользователь отправляет заявку в друзьяю (send), то по сокету пользователь который получает её, получает как входящую
    // заявку (incoming), поэтому 2 этих варината надо поменять местами
    const type = status === FRIENDS_STATUS.INCOMING
        ? FRIENDS_STATUS.SEND
          : status === FRIENDS_STATUS.SEND
            ? FRIENDS_STATUS.INCOMING
            : status;
    const text = getNotifyTextFriend(type, from);
    dispatch(addFriendNotify({ text, type, from: from, avatar }));
  }

  const onGetMessage = (
    message: Omit<IWithTimeStamps<IMessage>, "chat"> & {
      chat: IChatFromServer;
    }
  ) => {
    const { chat } = message;
    const { name, surname } = message.sender;
    const text = "Новое сообщение от: " + name;
    dispatch(
      addMessageNotify({
        text,
        avatar: user.avatar,
        from: name,
        chatId: chat._id,
      })
    );
    const isDialog = chat.users.length === 2;
    dispatch(updateChat({ ...message, chat: { ...chat, isDialog } }));
  };

  const onGetMessageType = ({ user, status, chatId }: { user: IUser } & { status: "start" | "finish" } & { chatId: string }) => {
    if (status === "start") {
      dispatch(addTypingUser({user, chatId}))
    } else {
      dispatch(removeTypingUser({userId: user._id, chatId}))
    }
  }


  const createSocket = () => {
    if (socketRef.current || !user._id) {
      return;
    }
    const { _id, avatar, name, surname } = user;
    socketRef.current = io(process.env.NEXT_PUBLIC_WSS_URL, {
      query: {
        userId: _id,
        // user:  user,
        from: `${name} ${surname}`,
        avatar: avatar || "",
      },
    });
    socketRef.current.emit("setUserToServer", { user });
    dispatch(setSocket(socketRef.current));
    socketRef.current.on(Sockets.get.friends, onGetFriends );
    socketRef.current.on(Sockets.get.message, onGetMessage );

    socketRef.current.on(Sockets.get.messageType, onGetMessageType);
    () => {};
  };
  const removeSocket = () => {
    dispatch(setSocket(null));
    if (socketRef.current) {
      socketRef.current.off(Sockets.get.messageType, onGetMessageType);
      socketRef.current.off(Sockets.get.message, onGetMessage);
      socketRef.current.off(Sockets.get.friends, onGetFriends);
      socketRef.current.disconnect();
      socketRef.current.close();
      socketRef.current = null;
    }
  };

  useEffect(() => {
    createSocket();
    return () => {
      removeSocket();
    };
  }, [user._id]);

  useEffect(() => {
    if (!user._id) {
      return;
    }
    let intervalOnline: NodeJS.Timeout;
    const setOnlineInterval = async () => {
      await apiUser.setOnline();
      intervalOnline = setInterval(async () => {
        try {
          await apiUser.setOnline();
        } catch (error) {
          console.log(error.message);
        }
      }, 5 * 60 * 1000);
    };
    // раз в 5 минут обнолвяю статус онлайн
    // потом буду проверять статус онлайна:
    // не онлайн если
    //    isOnline === false
    //    или время lastOnline больше чем на 5 минут отличается от текущего времени
    window.addEventListener("online", setOnlineInterval);
    setOnlineInterval();

    return () => {
      window.removeEventListener("online", setOnlineInterval);
      clearInterval(intervalOnline);
    };
  }, [user._id]);

  // функция отправки сообщения
  // принимает объект с текстом сообщения и именем отправителя
  return socketRef.current as SocketIOClient.Socket;
};
