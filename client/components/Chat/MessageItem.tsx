import clsx from "clsx";
import React, {  useMemo } from "react";
import { A, Avatar } from "..";
import styles from "../../pages/chat/chat.module.scss";
import { getHoursMins } from "../../utils";
import { IFormatMsg } from "../../utils/messages/getFormattedMessages";
import { ROUTES } from "../../utils/routes";
import { MessageVoice } from "./MessageVoice";
import { MessagePhotoItem } from "./MessagePhotoItem";
import { MessageAudioList } from "./MessageAudioList";
interface MessageItemProps {
  message: IFormatMsg;
setStartPhotoIdx: (idx: number) => () => void;
}

export const MessageItem: React.FC<MessageItemProps> = ({
  message: { sender, text, createdAt, isShow, image, voice, audio },
  setStartPhotoIdx
}): React.ReactElement => {
  const isVoice = useMemo(() => voice?.volumes?.length > 0, [])
  return (
    <div className={styles.message}>
      {isShow && (
        <Avatar
          className={styles.chatImg}
          src={sender?.avatar}
          alt={sender.name}
        />
      )}
      <div className={clsx(styles.msgWrap, isVoice ? styles.voiceMsg: "")}>
        {isShow && (
          <div className="d-ib">
            <A
              href={`${ROUTES.PROFILE}/${sender._id}`}
              className={styles.msgName}
            >
              {sender.name}
            </A>
            <span className={styles.time}>{getHoursMins(createdAt)}</span>
          </div>
        )}
        <span className={styles.msgText}>{text}</span>
        {image?.length > 0 && (
          <div className={styles.miniPhotos}>
          {image.map((photo, i) => (
            <MessagePhotoItem
              key={photo.url + photo.idx} 
              url={photo.url}
              className={styles.photoMsgBig}
              setStartPhotoIdx={setStartPhotoIdx(photo.idx)}  
              isMessage
            />
          ))}
          </div>
        )}
        {isVoice && <MessageVoice url={voice.url} volumes={voice.volumes} duration={voice.duration} fromServer />}
        {audio?.length > 0 && <MessageAudioList audios={audio} fromServer />}

      </div>
    </div>
  );
};
