import React from "react";
import Head from "next/head";
import styles from "./main.module.scss";
type MainTemplateProps = {
  title?: string;
  children: React.ReactNode;
  keywords?: string;
  className?: string;
  showHeader?: boolean;
  withoutOffset?: boolean;
  showToolTip ?: boolean
};

import clsx from "clsx";
import { Header } from "../../Header";
import { selectCountNotifies } from "../../../store/ducks/notify/selectors";
import { useSelector } from "react-redux";
import { AppHead } from "./AppHead";
import { AppToolTip } from "../../AppToolTip";

export const MainTemplate: React.FC<MainTemplateProps> = ({
  title = "Главная",
  children,
  keywords = "",
  className = "",
  showHeader = false,
  withoutOffset = false,
  showToolTip = true
}) => {
  return (
    <>
      <AppHead title={title} keywords={keywords} />
      {showHeader && <Header />}
      <main
        className={clsx(className, {
          [styles.main]: showHeader,
          [styles.mainOffset]: showHeader && withoutOffset,
        })}
      >
        {children}
        {showToolTip && <AppToolTip />}
      </main>
    </>
  );
};
