import React, { useState } from "react";
import styles from "../../pages/friends/friend.module.scss";
import { IUser } from "../../store/ducks/user/types";
import { Avatar } from "../Avatar";
import { IUserFromServer } from "../../services/api/apiUser";
import { checkOfflineUser } from "../../utils/checkOfflineUser";

type FriendsListItemProps = { user: IUser | IUserFromServer };

export const FriendsListItem: React.FC<FriendsListItemProps> = ({
  user,children
}): React.ReactElement => {
  return (
    <div key={user._id} className={styles.user}>
    
      <Avatar src={user.avatar} className={styles.img} isOnline={checkOfflineUser(user) === false} />
      {children}
    </div>
  );
};
