import React from "react";
import Head from "next/head";
type MainTemplateProps = {
  title ?: string,
  children: React.ReactNode
  keywords ?: string
  className?: string
  showHeader?: boolean;
  withoutOffset ?: boolean
}

import clsx from "clsx"
import { Header } from "../../Header";

export const MainTemplate: React.FC<MainTemplateProps> = ({ title = "Главная", children, keywords = "", className = "" , showHeader=false, withoutOffset=false}) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta
          name="keywords"
          content={`чат,мессенджер${keywords && "," + keywords}`}
        />
        <meta
          name="description"
          content="Описание, Это приложение на основе next js, Работает быстро, оптимизировано, также кроссплатформенность и кроссбраузерность поддерживаются, с информацией о пользователях"
        />
      </Head>
      {showHeader && <Header />}
      <main style={showHeader ? withoutOffset ? {paddingTop: 55} : {paddingTop: 63} : {}} className={clsx("main", className)}>{children}</main>
    </>
  );
};
