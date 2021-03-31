import clsx from "clsx";
import styles from "./chat.module.scss";
import { AiOutlineSearch as SearchIcon } from "react-icons/ai";
import { BiMessageRounded as MessageIcon } from "react-icons/bi";
import { FaUserFriends as FriendsIcon } from "react-icons/fa";
import React from "react";
import { MainTemplate } from "../Main";
import { useRouter } from "next/router";
import { ROUTES } from "../../../utils/routes";
import { A } from "../../A";

type ChatProps = {
  title: string;
  children: React.ReactNode;
  className?: string;
  withoutOffset?: boolean;
};

export const ChatTemplate: React.FC<ChatProps> = ({ title, children, className, withoutOffset = false }) => {
  return (
    <MainTemplate
      title={title}
      showHeader
      withoutOffset
      className={clsx(styles.app, "container")}
    >
      <aside className={styles.panel}>
        <ul>
          <li>
            <A className={clsx("flex aic", styles.category)} href={ROUTES.SEARCH}>
              <SearchIcon className={styles.iconMini} />
              Поиск пользователей<span className={styles.notify}>1</span>
            </A>
          </li>
          <li>
            <A className={clsx("flex aic", styles.category)} href={ROUTES.FRIENDS}>
            <FriendsIcon className={styles.iconMini} />
            Друзья<span className={styles.notify}>1</span>
            </A>
          </li>
          <li>
            <A className={clsx("flex aic", styles.category)} href={ROUTES.MESSENGER}>
            <MessageIcon className={styles.iconMini} />
            Сообщения<span className={styles.notify}>1</span>
            </A>
          </li>
        </ul>
      </aside>
      <div className={clsx(className, styles.main)}>{children}</div>
    </MainTemplate>
  );
};
