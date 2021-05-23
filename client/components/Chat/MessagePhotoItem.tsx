import clsx from "clsx";
import React from "react";
import styles from "../../pages/chat/chat.module.scss";
import { IoClose as IconClose } from "react-icons/io5";
import { getServerUrl } from "../../utils/getServerUrl";

interface MessagePhotoItemProps {
  className: string;
  url: string;
  id?: string;
  removePhoto?: (id: string) => void;
  setStartPhotoIdx: () => void;
  isMessage?: boolean;
}

export const MessagePhotoItem: React.FC<MessagePhotoItemProps> = ({
  url,
  className,
  id,
  removePhoto,
  setStartPhotoIdx,
  isMessage = false,
}): React.ReactElement => {
  if (isMessage) {
    return <img src={getServerUrl(url)} className={className} onClick={setStartPhotoIdx} />;
  }
  const onClickRemovePhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    removePhoto(id);
  };
  return (
    <div className="relative">
      <img src={url} className={className} onClick={setStartPhotoIdx} />
      <button className={styles.closeBtn} onClick={onClickRemovePhoto}>
        <IconClose className={clsx("absolute", styles.closeIcon)} />
      </button>
    </div>
  );
};
