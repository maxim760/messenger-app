import React from "react";
import { FiMoreHorizontal as MoreIcon } from "react-icons/fi";

import { IUser } from "../../store/ducks/user/types";
import styles from "../../pages/friends/friend.module.scss";
import { UserLinkInfo } from "./UserLinkInfo";
import { useState } from "react";
import { STATUS } from "../../types";
import clsx from "clsx";
import { useSocketEmits } from "../../hooks/useSocketEmits";
import { INotifyFriendType } from "../../store/ducks/notify/types";
import { statusToObject } from "../../utils/statusToObject";
import { FRIENDS_STATUS } from "../../pages/profile/[id]";
import { A } from "../A";
import { apiChat } from "../../services/api/apiChat";
import { useRouter } from "next/router";
import { ROUTES } from "../../utils/routes";
import { useFriendsActions } from "../../hooks/friends/useFriendsActions";
import { IUserFromServer } from "../../services/api/apiUser";

export type IItemProps = {
  user: IUser | IUserFromServer;
  onChangeModeUser ?: () => void;
  notifyType: FRIENDS_STATUS
};

export const ItemFriend: React.FC<IItemProps> = ({
  user,
  onChangeModeUser,notifyType
}): React.ReactElement => {
  const {onRemoveFriend, onShowFriends} = useFriendsActions()

  const router = useRouter()
  const [status, setStatus] = useState(STATUS.NEVER);
  const [error, setError] = useState<string>()
  const { isSuccess, isError, isLoading, isNever } = statusToObject(status);
  const { sendFriendToServer } = useSocketEmits();
  const onClickFriend = async () => {
    setStatus(STATUS.LOADING);
    try {
      await onRemoveFriend(user._id)
      sendFriendToServer({
        to: user._id,
        status: notifyType as INotifyFriendType,
      });
      onChangeModeUser && onChangeModeUser();
      setStatus(STATUS.SUCCESS);
    } catch (error) {
      setStatus(STATUS.ERROR);
    }
  };

  const onSendMessage = async () => {
    try {
      const chat = await apiChat.createOrFind({ payload: [user._id] })
      router.push(ROUTES.CHAT + chat._id)
    } catch (error) {
      setStatus(error)
      setError(error.message)
    }
  }

  return (
    <>
      <div className={styles.userInfo}>
        <UserLinkInfo user={user} />
        {isSuccess && (
          <span>
            Больше <A href={ROUTES.PROFILE + "/" +user._id}>{user.name}</A> - не ваш друг
          </span>
        )}
        <button
          disabled={isLoading}
          onClick={onSendMessage}
          className={clsx(styles.button, "outline", "outline-blue", "mt-1")}
        >
          <span>Написать сообщение</span>
          {(isLoading) && (
            <div className="pl-2">
              <div  className="loader loader-small" />
            </div>
          )}
        </button>
      </div>

      <div className={styles.wrap}>
          <MoreIcon className={clsx("icon", styles.more)} />
          <ul className={styles.info}>
              <li className={styles.infoItem}>
                <button
                  className={styles.infoItemBtn}
                  onClick={() => onShowFriends(user._id)}
                >
                  Посмотреть друзей
                </button>
              </li>
              <li className={styles.infoItem}>
                <button
                  className={styles.infoItemBtn}
                  disabled={isSuccess}
                  onClick={onClickFriend}
                >
                  Удалить из друзей
                </button>
              </li>
          </ul>
        </div>
    </>
  );
};
