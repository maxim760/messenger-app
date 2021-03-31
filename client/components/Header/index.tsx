import clsx from 'clsx';
import Link from 'next/link';
import React from 'react';
import { ROUTES } from '../../utils/routes';
import { A } from '../A';
import { Avatar } from '../Avatar';

import styles from './Header.module.scss';

export const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <div className="container flex aic jcsb">
        <A href={ROUTES.MESSENGER} >
          <div className={clsx(styles.headerLogo, 'd-flex align-items-center cup')}>
            <img src="/static/chat.png" alt="Logo" className="mr-1" />
            <h4>ChatApp</h4>
          </div>
        </A>
        <A href="/profile/1">
          <div className="d-flex align-items-center cup">
            <b className="mr-5">Tomanov Max</b>
            <Avatar
              src="https://sun9-65.userapi.com/s/v1/if2/tMf6TrjBv7zgUvEaPyn1JkQD_Zjg20j9-Oqao0pT4iatzNV-IWwE-uBsTETWPPi6U_bgEAgceOi2qjZYPsvK0dKP.jpg?size=200x0&quality=96&crop=704,0,1443,1443&ava=1"
              width="50px"
              height="50px"
            />
          </div>
        </A>
      </div>
    </header>
  );
};
