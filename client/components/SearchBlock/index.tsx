import React from "react";
import styles from "./searchBlock.module.scss";
import { AiOutlineSearch as SearchIcon } from "react-icons/ai";

interface SearchBlockProps {
  children: React.ReactNode;
}

export const SearchBlock: React.FC<SearchBlockProps> = ({children}): React.ReactElement => {

  return (
    <div className={styles.header}>
      <SearchIcon className={styles.icon} />
      {children}
    </div>
  );
};
