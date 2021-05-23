import React from "react";
import clsx from "clsx";

import styles from "./Avatar.module.scss";
import { getServerUrl } from "../../utils/getServerUrl";

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
  isOnline?: boolean;
  src: string;
  width?: string;
  href?: string;
  alt?: string;
  height?: string;
  className?: string;
  dnd?: IDnd | {};
}

export const Avatar: React.FC<AvatarProps> = ({
  src,
  width,
  height,
  className,
  isOnline = false,
  alt,
  dnd = {},
}) => {
  const sizeProps = [
    ["width", width],
    ["height", height],
  ].reduce((acc, [prop, value]) => {
    if (value) {
      acc[prop] = value;
    }
    return acc;
  }, {});

  return (
    <div style={sizeProps} className={clsx(styles.avatarWrap, className,isOnline ? styles.avatarDot : "")}>
      <img
        {...dnd}
        alt={alt || "Фото"}
        src={src ? getServerUrl(src) : "/static/avatar-stub.png"}
        className={clsx(
          styles.avatar,
          "d-ib",
          
        )}
      />
      {/* {isOnline && <div className={isOnline ? styles.avatarDot : ""} />} */}
    </div>
  );
};
