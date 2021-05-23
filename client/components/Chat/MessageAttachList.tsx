import React from "react";
import styles from "../../pages/chat/chat.module.scss";
import { ImAttachment as IconAttach } from "react-icons/im";
import { FiCamera as IconCamera } from "react-icons/fi";
import {
  HiOutlinePlay as IconVideo,
  HiOutlineMusicNote as IconMusic,
} from "react-icons/hi";
import { BsFileEarmark as IconFile } from "react-icons/bs";
import clsx from "clsx";
import { ACCEPTS } from "../../utils/consts";

interface MessageAttachListProps {
  onChangePhotos: (e: React.ChangeEvent<HTMLInputElement>) => void
  onChangeAudios: (e: React.ChangeEvent<HTMLInputElement>) => void
  
}

export const MessageAttachList: React.FC<MessageAttachListProps> = ({
  onChangePhotos,
  onChangeAudios,
}): React.ReactElement => {
  
  return (
    <div className={styles.wrapAttach}>
    <IconAttach className={clsx("icon", styles.icon)} />
    <div className={clsx(styles.attachBlock, "pb-5")}>
      <ul className={styles.attachField}>
        <li className={styles.attachFieldItem}>
          <label>
            <input accept={ACCEPTS.IMAGE} type="file" multiple hidden onChange={onChangePhotos} />
            <IconCamera className={styles.miniIcon} />
            <span className={styles.attachName}>Фотография</span>
          </label>
        </li>
        <li className={styles.attachFieldItem}>
          <label>
            <input accept={ACCEPTS.VIDEO} type="file" hidden />
            <IconVideo className={styles.miniIcon} />
            <span className={styles.attachName}>Видеозапись</span>
          </label>
        </li>
        <li className={styles.attachFieldItem}>
          <label>
            <input accept={ACCEPTS.AUDIO} type="file" hidden multiple onChange={onChangeAudios} />
            <IconMusic className={styles.miniIcon} />
            <span className={styles.attachName}>Аудиозапись</span>
          </label>
        </li>
        <li className={styles.attachFieldItem}>
          <label>
            <input type="file" hidden />
            <IconFile className={styles.miniIcon} />
            <span className={styles.attachName}>Файл</span>
          </label>
        </li>
      </ul>
    </div>
  </div>
  
  )
}