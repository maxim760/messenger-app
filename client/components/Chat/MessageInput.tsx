import { nanoid } from "@reduxjs/toolkit";
import clsx from "clsx";
import React, { useEffect, useState } from "react";
import { BiMicrophone as IconMicro, BiSend as IconSend } from "react-icons/bi";
import { FiCamera as IconCamera } from "react-icons/fi";
import { MdClose as CloseIcon } from "react-icons/md";
import { useRef } from "react";
import { useSelector } from "react-redux";
import { EmojiPicker } from "..";
import { useChange } from "../../hooks/useChange";
import { useSocketEmits } from "../../hooks/useSocketEmits";
import { heightFirstLine, heightLine, maxHeight } from "../../pages/chat";
import { apiMessage } from "../../services/api/apiMessage";
import { IChat, IMessage } from "../../store/ducks/chates/types";
import { selectUser } from "../../store/ducks/user/selectors";
import { IWithTimeStamps } from "../../types";
import styles from "../../pages/chat/chat.module.scss";
import { ACCEPTS } from "../../utils/consts";
import { IPhoto } from "./MessageForm";
import { getChatUsers } from "../../utils";

interface MessageInputProps {
  messageRef: React.MutableRefObject<HTMLTextAreaElement>;
  chat: IChat;
  pushMessage: (msg: IWithTimeStamps<IMessage>) => void;
  setTextAreaHeight: React.Dispatch<React.SetStateAction<number>>;
  textareaHeight: number;
  onChangePhotos: (e: React.ChangeEvent<HTMLInputElement>) => void
  clearPhotos: () => void;
  clearAudios: () => void;
  photos: File[];
  audios: File[];
  setAudioStream: (stream: MediaStream) => void;
}

export const MessageInput: React.FC<MessageInputProps> = ({
  messageRef,
  chat,
  pushMessage,
  setTextAreaHeight,
  textareaHeight,
  onChangePhotos,
  clearPhotos,
  clearAudios,
  photos,
  audios,
  setAudioStream,
}): React.ReactElement => {
  const [isLoading, setIsLoading] = useState(false);
  const {
    input: message,
    reset: resetMessage,
    setValue: setTextMessage,
  } = useChange();
  const isDisabledSendMsg = !message.value.trim() || isLoading;

  const user = useSelector(selectUser);
  const {
    sendMessageFinishTypeToServer,
    sendMessageTypeToServer,
    sendMessageToServer,
  } = useSocketEmits();

  useEffect(() => {
    setTextAreaHeight(
      (message.value.split("\n").length - 1) * heightLine + heightFirstLine
    );
  }, [message.value]);

  const chatUsersId = getChatUsers(chat);

  useEffect(() => {
    if (message.value.length === 0) {
      sendFinishTypeQuery();
    } else if (message.value.length === 1) {
      sendStartTypeQuery();
    }
  }, [message.value]);

  const lastTypingStatus = useRef<"finish" | "start">("finish");

  const sendFinishTypeQuery = () => {
    if (lastTypingStatus.current === "start") {
      sendMessageFinishTypeToServer({ to: chatUsersId, chatId: chat._id });
      lastTypingStatus.current = "finish";
    }
  };
  const sendStartTypeQuery = () => {
    if (lastTypingStatus.current === "finish") {
      sendMessageTypeToServer({ to: chatUsersId, chatId: chat._id });
      lastTypingStatus.current = "start";
    }
  };

  const onAddMessage = async () => {
    sendFinishTypeQuery();
    setIsLoading(true);
    resetMessage();
    const text = message.value;
    clearPhotos();
    clearAudios();
    if (!isDisabledSendMsg) {
      const formData = new FormData();
      formData.append("chat", chat._id);
      formData.append("text", text);
      audios.forEach((audio) => formData.append("audio", audio));
      photos.forEach((photo) => formData.append("image", photo));
      const msg = await apiMessage.send({
        payload: formData,
      });
      pushMessage({
        image: msg.image,
        audio: msg.audio,
        text,
        createdAt: msg.createdAt,
        updatedAt: msg.updatedAt,
        chat: chat,
        sender: user,
        _id: msg._id,
      });
      sendMessageToServer({ ...msg, to: chatUsersId });
    }
    setIsLoading(false);
  };
  const onClickMsg = (e: React.MouseEvent<HTMLOrSVGElement>) => {
    onAddMessage();
  };

  const onKeyDownSendMsg = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.ctrlKey && e.key === "Enter") {
      onAddMessage();
    }
  };

  const onClickMicro = (e: React.MouseEvent) => {
    navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
      setAudioStream(stream);
    }).catch(error => console.log("ошибка при аудио такая: " + error))
  };

  return (
    <>
      <div className={clsx("relative w100")}>
        <textarea
          {...message}
          // value={message}
          // onChange={onChangeMessage}
          ref={messageRef}
          onKeyDown={onKeyDownSendMsg}
          style={{
            height: textareaHeight + "px",
            maxHeight: maxHeight + "px",
            overflowY: textareaHeight > maxHeight ? "scroll" : "hidden",
          }}
          // type="text"
          placeholder="Написать сообщение"
          className={clsx("w100", styles.input)}
        />
        <div className={clsx("absolute aic flex t-0 b-0 r-0 h100 mr-4")}>
          <label className={"mt-auto"}>
            <input
              hidden
              type="file"
              multiple
              accept={ACCEPTS.IMAGE}
              onChange={onChangePhotos}
            />
            <IconCamera role="button" className={clsx("icon", styles.icon)} />
          </label>
          <EmojiPicker
            blockClass={styles.blockEmoji}
            iconClass={clsx("icon", styles.icon)}
            messageElement={messageRef.current}
            onChangeText={setTextMessage}
          />
        </div>
      </div>
      {isDisabledSendMsg ? (
        isLoading ? (
          <div className="loader loader-small" />
        ) : (
          <IconMicro
            role="button"
            className={clsx("icon", styles.icon)}
            onClick={onClickMicro}
          />
        )
      ) : (
        <IconSend
          role="button"
          className={clsx("icon", styles.icon)}
          onClick={onClickMsg}
        />
      )}
    </>
  );
};
