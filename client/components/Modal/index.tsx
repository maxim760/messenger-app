import React, { useState } from "react";
import ReactDOM from "react-dom";
import { IoClose as IconClose } from "react-icons/io5";
import styles from "./modal.module.scss";
import clsx from "clsx";
import { calcWidthScroll, stopPropagation } from "../../utils";

type ModalProps = {
  title?: string;
  onClose(): void;
  isVisible: boolean;
  withoutPadding?: boolean;
  className?: string;
};

export const Modal: React.FC<ModalProps> = ({
  title,
  children,
  onClose,
  isVisible,
  withoutPadding = false,
  className = "",
}) => {
  const parentElem = document.querySelector("#__next");
  const [rootContainer] = useState(document.createElement("div"));
  const [ isClose, setIsClose] = useState(false)
  React.useEffect(() => {
    const scrollWidth = calcWidthScroll() + "px";
    if (typeof window !== "undefined") {
      document.body.classList.add("no-scroll");
      document.body.style.marginRight = scrollWidth;

      document
        .querySelectorAll(".fixed")
        .forEach(
          (item) => ((item as HTMLElement).style.paddingRight = scrollWidth)
        );
        parentElem.appendChild(rootContainer);
      }
    return () => {
        setIsClose(true)
        document.body.classList.remove("no-scroll");
        document
        .querySelectorAll(".fixed")
          .forEach(
            (item) => ((item as HTMLElement).style.paddingRight = null)
            );
        document.body.style.marginRight = null;
        parentElem.removeChild(rootContainer);
      };
    }, [typeof window !== "undefined"]);
    
  if (!rootContainer || !isVisible) {
    return null;
  }

  const onCloseModal = () => {
    setIsClose(true)
    setTimeout(() => {
      onClose()
    }, 500)
  }

  return ReactDOM.createPortal(
    <>
      <div onClick={onCloseModal} className={clsx(styles.overlay,isClose? styles.fadeOut : "")}>
        <div
          onClick={stopPropagation}
          className={clsx(styles.modal, className)}
        >
          <button onClick={onCloseModal} className={styles.btnClose}>
            <IconClose className={styles.close} />
          </button>
          {/* <div className={styles.modalHead}>{title}</div> */}
          <div
            className={clsx(styles.modalMain, withoutPadding ? "p-0" : "p-2")}
          >
            {children}
          </div>
        </div>
      </div>
    </>,
    rootContainer
  );
};
