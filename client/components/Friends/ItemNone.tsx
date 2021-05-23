import React from "react";
import styles from "../../pages/friends/friend.module.scss";
import { UserLinkInfo } from "./UserLinkInfo";
import { useState } from "react";
import { STATUS } from "../../types";
import clsx from "clsx";
import { useSocketEmits } from "../../hooks/useSocketEmits";
import { INotifyFriendType } from "../../store/ducks/notify/types";
import { statusToObject } from "../../utils/statusToObject";
import { IItemProps } from "./ItemFriend";
import { apiFriends } from "../../services/api/apiFriends";




export const ItemNone: React.FC<IItemProps> = ({
  user,
  onChangeModeUser,notifyType
}): React.ReactElement => {
  const [status, setStatus] = useState(STATUS.NEVER);
  const { isSuccess, isError, isLoading, isNever } = statusToObject(status);
  const { sendFriendToServer } = useSocketEmits();
  const onClickFriend = async () => {
    setStatus(STATUS.LOADING);
    try {
      await apiFriends.addSendRequest({payload: user._id})
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

  return (
    <div>
      <div className={styles.userInfo}>
        <UserLinkInfo user={user} />
        {isSuccess ? (
          <span>
            Заявка в друзья отправлена.
          </span>
        ) :
          <button
            disabled={isLoading}
            onClick={onClickFriend}
            className={clsx(styles.button, "outline", "outline-blue", "mt-1")}
          >
            <span>Добавить в друзья</span>
            {isLoading && (
              <div>
                <div className="loader loader-small" />
              </div>
            )}
          </button>}
      </div>
    </div>
  );
};
