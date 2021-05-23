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
import { IItemProps } from "./ItemFriend";
import { apiFriends } from "../../services/api/apiFriends";




export const ItemSend: React.FC<IItemProps> = ({
  user,
  onChangeModeUser,notifyType
}): React.ReactElement => {
 
  
  const [status, setStatus] = useState(STATUS.NEVER);
  const { isSuccess, isError, isLoading, isNever } = statusToObject(status);
  const { sendFriendToServer } = useSocketEmits();
  const onClickFriend = async () => {
    setStatus(STATUS.LOADING);
    try {
      await apiFriends.deleteSendRequests({payload: user._id})
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
            Вы отписались. <UserLinkInfo showStatus={false} onlyName user={user} /> теперь не сможет принять заявку в друзья
          </span>
        ) :
          <button
            disabled={isLoading}
            onClick={onClickFriend}
            className={clsx(styles.button, "outline", "outline-blue", "mt-1")}
          >
            <span>Отменить заявку</span>
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
