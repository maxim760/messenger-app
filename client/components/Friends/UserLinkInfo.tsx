import React from 'react'
import { isExistStatus } from '../../utils/consts'
import { ROUTES } from '../../utils/routes'
import { A } from '../A'
import styles from "../../pages/friends/friend.module.scss";
import { IUser } from '../../store/ducks/user/types';
import { IUserFromServer } from '../../services/api/apiUser';

interface UserLinkInfoProps {
  showStatus?: boolean
  onlyName?: boolean
  user: IUser | IUserFromServer
}

export const UserLinkInfo: React.FC<UserLinkInfoProps> = ({ showStatus = true, user, onlyName = false }): React.ReactElement => {
  
  return (
    <>
      <A href={`${ROUTES.PROFILE}/${user._id}`} className={styles.name}>
        {onlyName ? user.name : user.name + " " + user.surname}
        </A>
        {showStatus && isExistStatus(status) && (
          <span className={styles.status}>{status}</span>
        )}
    </>
  )
}