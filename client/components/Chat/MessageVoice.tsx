import React, { useEffect, useRef } from "react";
import {
  BsPlayFill as IconPlay,
  BsPauseFill as IconPause,
} from "react-icons/bs";
import { useListenVoice } from "./hooks/useListenVoice";
import styles from "../../pages/chat/chat.module.scss";
import clsx from "clsx";
import { getMinsSec, getServerUrl } from "../../utils";

interface MessageVoiceProps {
  url: string;
  volumes: number[];
  duration: number;
  fromServer ?: boolean
}


export const MessageVoice: React.FC<MessageVoiceProps> = ({
  url,
  volumes,
  duration,
  fromServer = false
}): React.ReactElement => {
  const voiceRef = useRef<HTMLDivElement>()
  const {
    audioTime,
    isNotListened,
    onChangeCurrentTimeAudio,
    onClickListenAudio,
    onClickStopAudio,
    isPause,
    getAudioVolumes
  } = useListenVoice({ url: fromServer ? getServerUrl(url) : url, voiceRef, volumes, duration });
  return <div className={styles.record}>
  {isPause ? (
    <button className={styles.audioIconBtn} onClick={onClickListenAudio}>
      <IconPlay
        className={clsx("icon", styles.audioIcon, styles.sizeMini)}
      />
    </button>
  ) : (
    <button className={styles.audioIconBtn} onClick={onClickStopAudio}>
      <IconPause
        className={clsx("icon", styles.audioIcon, styles.sizeMini)}
      />
    </button>
  )}

  <div className={clsx(styles.volume, "w100")} ref={voiceRef}>
    {getAudioVolumes.map((volumePercent, i) => {
      return (
        <div
          onClick={onChangeCurrentTimeAudio(i)}
          key={volumePercent + "_" + i}
          className={styles.volumeItem}
        >
          <div
            style={{ height: ~~volumePercent + "%" }}
            className={clsx(styles.volumeLevel, {
              [styles.gray]: isNotListened(i),
            })}
          />
        </div>
      );
    })}
  </div>
  <time className={styles.audioTime}>{getMinsSec(audioTime)}</time>
</div>;
};
