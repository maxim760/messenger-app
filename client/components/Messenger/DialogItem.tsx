import React from "react";
import styles from "../../styles/Home.module.scss"
import { IChat } from "../../store/ducks/chates/types";
import { IWithTimeStamps } from "../../types";
import clsx from "clsx";
import { A, Avatar } from "..";
import { getHoursMins } from "../../utils";
import { ROUTES } from "../../utils/routes";
import { useTypingUsers } from "../../hooks/useTypingUsers";

type DialogItemProps = { chat: IWithTimeStamps<IChat> };

export const DialogItem: React.FC<DialogItemProps> = ({
  chat: { isDialog, avatar, name, users, _id, createdAt, messages, updatedAt },
}): React.ReactElement => {
  const { text: typingUsersText } = useTypingUsers(_id);
  const textMessage = typingUsersText
    ? typingUsersText
    : messages.length
    ? messages[0].text
    : "Нет сообщений";
  return (
    <A href={ROUTES.CHAT + _id} className={styles.message} key={_id}>
      <Avatar
        src={isDialog ? users[0].avatar : avatar}
        alt={name || "Чат"}
        className={styles.imgMessage}
      />
      <div
        className={clsx("flex flex-column p-1", "jcsa ml-2", "h100", "w100")}
      >
        <div className={clsx("flex jcsb aic w100")}>
          <b className={styles.nameChat}>
            {isDialog ? users[0].name + " " + users[0].surname : name}
          </b>
          <span className={styles.time}>{getHoursMins(updatedAt)}</span>
        </div>
        <p className={styles.mesgText}>{textMessage}</p>
      </div>
    </A>
  );
};
