import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import styles from "./chat.module.scss";
import { apiChat } from "../../services/api/apiChat";
import { GetServerSideProps } from "next";
import { IChat, IMessage } from "../../store/ducks/chates/types";
import { IWithTimeStamps, NextReq } from "../../types";
import { ChatTemplate, AppBack, A, Avatar } from "../../components";
import { addFormattedMessage, checkAuth, getAuthorization, getFormattedMessages, getLastOnline } from "../../utils";
import { Sockets } from "../../utils/consts";
import { ROUTES } from "../../utils/routes";
import { MessageList } from "../../components/Chat/MessageList";
import { selectSocket } from "../../store/ducks/socket/selectors";
import { useActiveChat } from "../../hooks/useActiveChat";
import { MessageForm } from "../../components/Chat/MessageForm";
import {
  usePhotosAdd,
  usePhotosMessage,
} from "../../components/Chat/hooks/usePhotos";
import { PhotosSliderModal } from "../../components/PhotosSliderModal";
import { IFormatMsgObject } from "../../utils/messages/getFormattedMessages";

type ChatPageProps = {
  chat: IChat;
};

export const maxHeight = 162; // 40 + 22 * 6
export const heightLine = 22;
export const heightFirstLine = 38;

type IMessageObj = {
  messages: IFormatMsgObject;
  count: number;
  photosLength: number;
};

const defaultMessagesObj: IMessageObj = {
  count: 0,
  photosLength: 0,
  messages: {},
};

const ChatPage: React.FC<ChatPageProps> = ({ chat }): React.ReactElement => {
  const socket = useSelector(selectSocket);
  const [messagesObject, setMessagesObject] = useState<IMessageObj>(defaultMessagesObj);
  const { state: photoAddState, actions: photoAddActions } = usePhotosAdd();
  const { state: photoMsgState, actions: photoMsgActions } = usePhotosMessage();
  useEffect(() => {
    const {
      photos: photosFromMsg,
      count,
      messages,
      photosLength,
    } = getFormattedMessages(chat.messages);
    photoMsgActions.addPhotos(photosFromMsg);
    setMessagesObject({ count, messages, photosLength });
  }, []);
  useActiveChat(chat._id);
  const [textareaHeight, setTextAreaHeight] = useState(heightFirstLine);
  const [footerHeight, setFooterHeight] = useState(null);
  const pushMessage = (msg: IWithTimeStamps<IMessage>) => {
    const photos = msg.image;
    if (photos) {
      photoMsgActions.addPhotos(photos);
    }
    setMessagesObject((prev) => ({
      messages: addFormattedMessage(prev.messages, msg, {
        photosLength: prev.photosLength,
      }),
      count: prev.count + 1,
      photosLength: prev.photosLength + (msg.image?.length || 0),
    }));
  };
  useEffect(() => {
    const onGetMessage = (message: IWithTimeStamps<IMessage>) => {
      pushMessage(message);
    };
    socket.on(Sockets.get.message, onGetMessage);
    () => {
      socket.off(Sockets.get.message, onGetMessage);
      photoMsgActions.clearPhotos();
      photoAddActions.clearPhotos();
    };
  }, []);
  const messageRef = useRef<HTMLTextAreaElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current &&
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
  }, [messagesObject.count]);
  useEffect(() => {
    bottomRef.current && bottomRef.current.scrollIntoView();
  }, [footerHeight, textareaHeight]);
  return (
    <ChatTemplate title="Мессенджер" className={styles.page} withoutOffset>
      <div className={styles.wrap}>
        <div className={styles.header}>
          <AppBack className={styles.back} />
          <div className={styles.wrapName}>
            <span className={styles.nameTitle}>
              {chat.isDialog
                ? chat.users[0].name + " " + chat.users[0].surname
                : chat.name}
            </span>
            {chat.isDialog && (
              <span className={styles.onlineInfo}>
                {getLastOnline(chat.users[0])}
              </span>
            )}
          </div>
          {chat.isDialog ? (
            <A href={ROUTES.PROFILE + "/" + chat.users[0]._id}>
              <Avatar
                className={styles.userImg}
                src={chat.users[0].avatar}
                alt="Фото"
              />
            </A>
          ) : (
            <Avatar className={styles.userImg} src={chat.avatar} alt="Фото" />
          )}
        </div>
        <MessageList
          chatId={chat._id}
          messages={messagesObject.messages}
          textareaHeight={textareaHeight}
          footerHeight={footerHeight}
        />
        <MessageForm
          messageRef={messageRef}
          pushMessage={pushMessage}
          chat={chat}
          textareaHeight={textareaHeight}
          setFooterHeight={setFooterHeight}
          setTextAreaHeight={setTextAreaHeight}
          footerRef={footerRef}
        />
      </div>
      {photoAddState.photos.length > 0 && photoAddState.startIdx !== null ? (
        <PhotosSliderModal
          startPhotoIdx={photoAddState.startIdx}
          closePhotosModal={photoAddActions.closeModal}
          photos={photoAddState.photos}
        />
      ) : photoMsgState.photos.length > 0 && photoMsgState.startIdx !== null ? (
        <PhotosSliderModal
          startPhotoIdx={photoMsgState.startIdx}
          closePhotosModal={photoMsgActions.closeModal}
          photos={photoMsgState.photos}
        />
      ) : null}
      <div ref={bottomRef} />
    </ChatTemplate>
  );
};
export default ChatPage;

export const getServerSideProps: GetServerSideProps = async ({
  req,
  query,
}) => {
  try {
    const isAuth = await checkAuth(req as NextReq);
    if (!isAuth) {
      return {
        props: {},
        redirect: {
          destination: ROUTES.LOGIN,
          permanent: false,
        },
      };
    }
    const { id } = query;
    const chat = await apiChat.get({
      payload: { chat: id as string },
      authorization: getAuthorization(req),
    });
    return {
      props: { chat },
    };
  } catch (error) {
    console.log(error.message, "ERROR");
    return {
      props: {},
      redirect: {
        destination: ROUTES.MESSENGER,
        permanent: false,
      },
    };
  }
};
