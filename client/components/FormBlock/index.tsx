import clsx from "clsx";
import React, { useState } from "react";

import styles from "./FormBlock.module.scss";

type FormBlockProps = {
  text: string
  title: string
  children: React.ReactNode
  onSubmit(e ?: React.FormEvent<HTMLFormElement>): void;
}

export const FormBlock: React.FC<FormBlockProps> = ({text,title, children, onSubmit}): React.ReactElement => {

  return (
      <form className={styles.card} onSubmit={onSubmit}>
        <h1 className={clsx(styles.title)}>Добро пожаловать!</h1>
        <h3 className={clsx(styles.subtitle, "mb-4", "mt-2")}>{ title}</h3>
        {children}
        <div className={styles.wrap}>
          <div className={styles.bgbtn} />
          <button className={styles.button}>{text}</button>
        </div>
      </form>
  );
};
