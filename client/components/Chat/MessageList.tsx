import React from "react";
import { useTypingUsers } from "../../hooks/useTypingUsers";
import { maxHeight } from "../../pages/chat";
import styles from "../../pages/chat/chat.module.scss";
import { IMessage } from "../../store/ducks/chates/types";
import { IWithTimeStamps } from "../../types";
import { getDay } from "../../utils/date/getDay";
import { IFormatMsgObject } from "../../utils/messages/getFormattedMessages";
import { usePhotosMessage } from "./hooks/usePhotos";
import { MessageItem } from "./MessageItem";

interface MessageListProps {
  chatId: string;
  messages: IFormatMsgObject;
  textareaHeight: number;
  footerHeight: number
}

export const MessageList: React.FC<MessageListProps> = ({
  chatId,
  messages,
  footerHeight
}): React.ReactElement => {
  const { text: typeUsersText } = useTypingUsers(chatId);
  const {actions: {setStartPhotoIdx}} = usePhotosMessage()
  return (
    <div
      className={styles.chat}
      style={footerHeight ? {
        paddingBottom: footerHeight - 3 + "px",
      }: {}}
    >
      {Object.entries(messages).map(([day, messagesPerDay], i) => (
        <React.Fragment key={day}>
          <time className={styles.date}>{getDay(day)}</time>
          {messagesPerDay.map((message) => (
            <MessageItem message={message} key={message._id} setStartPhotoIdx={setStartPhotoIdx} />
          ))}
        </React.Fragment>
      ))}
      {typeUsersText && <span className="mt-2">{typeUsersText}</span>}
    </div>
  );
};
