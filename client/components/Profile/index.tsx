import clsx from "clsx";
import { useRouter } from "next/router";
import React, { useContext, useState } from "react";
import { useSocketEmits } from "../../hooks/useSocketEmits";
import { UserContext } from "../../pages/profile/[id]";
import { apiUser } from "../../services/api/apiUser";
import { STATUS } from "../../types";
import { getLastOnline, statusToObject } from "../../utils";
import { isExistStatus } from "../../utils/consts";
import { ROUTES } from "../../utils/routes";
import { A } from "../A";
import { AppAlert, IAlert } from "../AppAlert";
import { AppBack } from "../AppBack";
import { Avatar } from "../Avatar";

import styles from "./Profile.module.scss";
import { useFriendStatus } from "./useFriendStatus";

interface ProfileProps {}

export const Profile: React.FC<ProfileProps> = ({}) => {
  const { sendFriendToServer } = useSocketEmits();
  const {
    isOwnPage,
    user,
    friendsStatusName,
    onNextStatus,
    statusToServer,
  } = useContext(UserContext);
  const [loadingStatus, setLoadingStatus] = useState(STATUS.NEVER);
  const { isLoading, isNever, isSuccess, isError } = statusToObject(
    loadingStatus
  );
  const {
    startText,
    // afterClickText,
    onClick: onClickFollowButton,

    notify,
  } = useFriendStatus(friendsStatusName);
  const router = useRouter()
  const { status, name, surname, avatar, friends, _id } = user
  const [error, setError] = useState<string>();
  const lastOnlineTime = getLastOnline(user)
  const onAddFriend = (id: string) => async () => {
    setLoadingStatus(STATUS.LOADING);
    try {
      await onClickFollowButton({ payload: id });
      sendFriendToServer({ to: id, status: friendsStatusName });
      setLoadingStatus(STATUS.SUCCESS);
      onNextStatus();
    } catch (e) {
      setError(e.message);
      setLoadingStatus(STATUS.ERROR);
    }
  };
  const onClickLogout = async () => {
    setLoadingStatus(STATUS.LOADING)
    try {
      await apiUser.out()
      router.push(ROUTES.LOGIN)
      setLoadingStatus(STATUS.SUCCESS)
    } catch (error) {
      setError(error.message);
      setLoadingStatus(STATUS.ERROR);
    }

  }
  return (
    <>
      <AppBack className={"mb-6"} />
      <div className="flex aic">
        <Avatar
          src={avatar}
          className={styles.avatar}
          width="100px"
          height="100px"
        />
        <div className="flex flex-column ml-6 mr-6">
          <h2 className="mt-0 mb-0">
            {name} {surname}
          </h2>
          { !!lastOnlineTime && <time className={styles.onlineDate}>{lastOnlineTime}</time>}
        </div>
        <div>
          {!isOwnPage ? (
            <button
              disabled={isLoading}
              onClick={onAddFriend(_id)}
              className={clsx(
                styles.followButton,
                "outline outline-blue d-f aic"
              )}
            >
              <span>{startText}</span>
              {isLoading && (
                <div className="pl-3">
                  <div className="loader" />
                </div>
              )}
            </button>
          ) : (
            <button
            onClick={onClickLogout}
            className={clsx(
              styles.followButton,
              "outline outline-blue d-f aic"
            )}
          >
            Выйти
            {isLoading && (
              <div className="pl-3">
                <div className="loader" />
              </div>
            )}
          </button>
            )}
          {isError && (
            <AppAlert type={IAlert.ERROR}>{error || "Ошибка"}</AppAlert>
          )}
        </div>
      </div>
      {isExistStatus(status) && <p className={clsx(styles.about, "mt-3")}>{status}</p>}
      <A
        href={`${ROUTES.FRIENDS}?id=${_id}`}
        className={clsx(styles.link, "mt-3")}
      >
        Друзей: <strong>{friends.length}</strong>
      </A>
    </>
  );
};
