import React, { useEffect, useMemo } from "react";
import {
  BsPlayFill as IconPlay,
  BsPauseFill as IconPause,
} from "react-icons/bs";
import { getMinsSec, getServerUrl } from "../../utils";
import { useListenAudio } from "./hooks/useListenAudio";
import { IAudio } from "./MessageForm";
import { IoClose as IconClose } from "react-icons/io5";
import styles from "../../pages/chat/chat.module.scss";
import clsx from "clsx";
import { AppRange } from "../AppRange";
import { IAudioState } from "../../store/ducks/audio/types";
import { IAudioItem } from "./MessageAudioList";

interface MessageAudioItemProps {
  audioData: IAudioItem;
  removeAudio ?: (id: string) => void;
  stopLastTrack: (audio?: IAudioState["audio"]) => void;
  activeTrackUrl: string;
  fromServer?: boolean;
}

export const MessageAudioItem: React.FC<MessageAudioItemProps> = ({
  audioData,
  removeAudio,
  stopLastTrack,
  fromServer = false,
  activeTrackUrl,
}): React.ReactElement => {
  const isActive = useMemo(() => {
    console.log(activeTrackUrl, audioData.url)
    const url = fromServer ? getServerUrl(audioData.url) : audioData.url
    return url === activeTrackUrl;
  }, [activeTrackUrl]);

  const {
    volume,
    audioTime,
    audioDuration,
    onChangeCurrentTimeAudio,
    onChangeVolume,
    isPause,

    onClickListenAudio,
    onClickStopAudio,
  } = useListenAudio({
    url: fromServer ? getServerUrl(audioData.url) : audioData.url,
    isActive,
  });
  const onClickRemoveAudio = () => {
    if (activeTrackUrl === audioData.url) {
      stopLastTrack();
    }
    removeAudio(audioData.url);
  };

  return (
    <div className={styles.msgAudioWrap}>
      <div
        className={clsx(styles.msgAudio, isActive ? styles.msgAudioActive : "")}
      >
        {isPause ? (
          <button
            className={clsx(styles.audioIconBtn, styles.musicBtn)}
            onClick={onClickListenAudio}
          >
            <IconPlay
              className={clsx("icon", styles.musicIcon, styles.sizeMini)}
            />
          </button>
        ) : (
          <button
            className={clsx(styles.audioIconBtn, styles.musicBtn)}
            onClick={onClickStopAudio}
          >
            <IconPause
              className={clsx("icon", styles.musicIcon, styles.sizeMini)}
            />
          </button>
        )}
        <div className={clsx(styles.rangeAudio)}>
          <div className={styles.audioInfo}>
            <p className={styles.audioName}>{audioData.name}</p>
            <time className={styles.audioTime}>
              {getMinsSec(audioTime * 1000 || audioDuration * 1000)}
            </time>
          </div>
          {isActive && (
            <div className={styles.audioInfo}>
              <AppRange
                max={audioDuration}
                current={audioTime}
                onChange={onChangeCurrentTimeAudio}
                // className={"w100"}
              />
              <AppRange
                min={0}
                max={100}
                onChange={onChangeVolume}
                current={volume}
                className={styles.audioVolume}
              />
            </div>
          )}
        </div>
      </div>
      {!!removeAudio && (
      
      <button className={styles.closeBtnAudio} onClick={onClickRemoveAudio}>
        <IconClose className={styles.closeIconAudio} />
      </button>
      )} 
    </div>
  );
};
