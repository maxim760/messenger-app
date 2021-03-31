import React from "react";
import clsx from "clsx";

import styles from "./Avatar.module.scss";

export type IDnd = {
  draggable: boolean;
  onDragEnter: Function;
  onDragLeave: Function;
  onDragStart: Function;
  onDragOver: Function;
  onDragEnd: Function;
  onDrop: Function;
};

interface AvatarProps {
  src: string;
  width: string;
  height: string;
  className?: string;
  isVoice?: boolean;
  dnd?: IDnd | {};
}

export const Avatar: React.FC<AvatarProps> = ({
  src,
  width,
  height,
  className,
  isVoice,
  dnd = {},
}) => {
  return (
    <img
      {...dnd}
      src={src}
      style={{ width, height }}
      alt="avatar"
      className={clsx(
        styles.avatar,
        isVoice ? styles.avatarBorder : "",
        className,
        "d-ib"
      )}
    />
  );
};
