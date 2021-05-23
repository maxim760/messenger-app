import clsx from "clsx";
import React from "react";
import { AiOutlineSearch as SearchIcon } from "react-icons/ai";
import { BiMessageRounded as MessageIcon } from "react-icons/bi";
import { FaUserFriends as FriendsIcon } from "react-icons/fa";
import { useSelector } from "react-redux";
import { selectCountNotifiesByType } from "../../../store/ducks/notify/selectors";
import { ROUTES } from "../../../utils/routes";
import { A } from "../../A";
import styles from "./chat.module.scss";

interface PanelProps {
  withoutOffset ?: boolean
}

export const Panel: React.FC<PanelProps> = ({withoutOffset = false}): React.ReactElement => {
  const { message: msgCount, friends: friendsCount } = useSelector(selectCountNotifiesByType);
  return (
    <aside
      className={clsx(styles.panel, {
        [styles.panelWithoutOffset]: withoutOffset,
      })}
    >
      <ul>
        <li>
          <A className={clsx("flex aic", styles.category)} href={ROUTES.SEARCH}>
            <SearchIcon className={styles.iconMini} />
            Поиск пользователей
          </A>
        </li>
        <li>
          <A
            className={clsx("flex aic", styles.category)}
            href={ROUTES.FRIENDS}
          >
            <FriendsIcon className={styles.iconMini} />
            Друзья
            {friendsCount > 0 && ( 
              <span className={styles.notify}>{friendsCount}</span>
            )}
          </A>
        </li>
        <li>
          <A
            className={clsx("flex aic", styles.category)}
            href={ROUTES.MESSENGER}
          >
            <MessageIcon className={styles.iconMini} />
            Сообщения{msgCount > 0 && <span className={styles.notify}>{msgCount}</span>}
          </A>
        </li>
      </ul>
    </aside>
  );
};
