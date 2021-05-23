import clsx from "clsx";
import styles from "./chat.module.scss";
import { AiOutlineSearch as SearchIcon } from "react-icons/ai";
import { BiMessageRounded as MessageIcon } from "react-icons/bi";
import { FaUserFriends as FriendsIcon } from "react-icons/fa";
import React from "react";
import { MainTemplate } from "../Main";
import { useRouter } from "next/router";
import { ROUTES } from "../../../utils/routes";
import { A } from "../../A";
import { Panel } from "./Panel";

type ChatProps = {
  title: string;
  children: React.ReactNode;
  className?: string;
  withoutOffset?: boolean;
};

export const ChatTemplate: React.FC<ChatProps> = ({ title, children, className, withoutOffset = false }) => {
  return (
    <MainTemplate
      title={title}
      showHeader
      withoutOffset={withoutOffset}
      className={clsx(styles.app, "container", )}
      showToolTip={false}
    >
      <Panel withoutOffset={withoutOffset} />
      <div className={clsx(className, styles.main)}>{children}</div>
    </MainTemplate>
  );
};
