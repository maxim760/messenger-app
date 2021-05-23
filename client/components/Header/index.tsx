import clsx from 'clsx';
import Link from 'next/link';
import React from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from '../../store/ducks/user/selectors';
import { ROUTES } from '../../utils/routes';
import { A } from '../A';
import { Avatar } from '../Avatar';

import styles from './Header.module.scss';

export const Header: React.FC = () => {
  const {surname, name, avatar, _id} = useSelector(selectUser)
  return (
    
    <header className={clsx(styles.header, "fixed")}>
      <div className="container flex aic jcsb">
        <A href={ROUTES.MESSENGER} >
          <div className={clsx(styles.headerLogo, 'd-flex align-items-center cup')}>
            <img src="/static/chat.png" alt="Logo" className="mr-1" />
            <h4>ChatApp</h4>
          </div>
        </A>
        <A href={`/profile/${_id}`}>
          <div className="d-flex align-items-center cup">
            <b className="mr-5">{name} {surname}</b>
            <Avatar
              src={avatar}
              width="50px"
              height="50px"
            />
          </div>
        </A>
      </div>
    </header>
  );
};
