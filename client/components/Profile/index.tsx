import clsx from "clsx";
import React from "react";
import { AppBack } from "../AppBack";
import { Avatar } from "../Avatar";

import styles from "./Profile.module.scss";

interface ProfileProps {
  fullname: string;
  username: string;
  avatarUrl: string;
  about: string;
}

export const Profile: React.FC<ProfileProps> = ({
  fullname,
  username,
  avatarUrl,
  about,
}) => {
  return (
    <>
      <AppBack className={"mb-6"} />

      <div className="flex aic">
        <Avatar src={avatarUrl} className={styles.avatar} width="100px" height="100px" />
        <div className="flex flex-column ml-6 mr-6">
          <h2 className="mt-0 mb-0">{fullname}</h2>
          <h3 className={clsx(styles.username, "mt-0 mb-0")}>@{username}</h3>
        </div>
        <button className={clsx(styles.followButton, "outline outline-blue")} >
          Добавить в друзья
        </button>
      </div>
      <p className={styles.about}>{about}</p>
    </>
  );
};
