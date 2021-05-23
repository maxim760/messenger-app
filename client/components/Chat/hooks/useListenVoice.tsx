import clsx from "clsx";

import { useEffect, useMemo, useState } from "react";
import { evenlyDistribute } from "../../../utils";
import { WIDTH_ONE_SOUND } from "../MessageRecordAudioForm";
import styles from "../../../pages/chat/chat.module.scss"
type ListenVoiceProps = {
  url: string,
  voiceRef: React.MutableRefObject<HTMLDivElement>
  volumes: number[]
duration: number
}

export const useListenVoice = ({ url, volumes, voiceRef, duration }: ListenVoiceProps = {} as ListenVoiceProps) => {
  duration = duration || 0
  if (!url) {
    return {}
  }
  
  const [audio] = useState(new Audio(url))
  const [volumeWidth,setVolumeWidth] = useState(0)

  const getAudioVolumes = useMemo(() => {
    const audioVolumes = evenlyDistribute(volumes, ~~(volumeWidth / WIDTH_ONE_SOUND))
    return audioVolumes
  }, [volumeWidth])

  const [audioDuration, setAudioDuration] = useState<number>(duration / 1000);
  const [audioTime, setAudioTime] = useState(duration);

  const [isPause, setIsPause] = useState(true);
  const [isEnded, setIsEnded] = useState(false);
  const setPauseStatus = () => setIsPause(true);
  const setPlayStatus = () => {
    setIsPause(false);
    setIsEnded(false);
  };

  const onClickListenAudio = () => {
    audio.play();
  };
  const onClickStopAudio = () => {
    audio.pause();
  };
  useEffect(() => {
    const setNewVolumeWidth = () => {
      setVolumeWidth(voiceRef.current.getBoundingClientRect().width);
    };
    setNewVolumeWidth();
    window.addEventListener("resize", setNewVolumeWidth);
    return () => {
      window.removeEventListener("resize", setNewVolumeWidth);
    };
  }, []);

  useEffect(() => {
    audioTime && setAudioDuration(audioTime / 1000);
  }, []);

  useEffect(() => {
    const setEndAudio = () => {
      setIsEnded(true);
      setPauseStatus();
    };
    const setNewDiffTime = () => {
      // перевожу время в милисекунды из секунд
      setAudioTime(audio.currentTime * 1000);
    };
    const setNewAudioDuration = () => {
      if (Number.isFinite(audio.duration)) {
        setAudioDuration(audio.duration);
      }
    };
    audio.addEventListener("ended", setEndAudio);

    audio.addEventListener("canplay", setNewAudioDuration);
    audio.addEventListener("timeupdate", setNewDiffTime);
    audio.addEventListener("pause", setPauseStatus);
    audio.addEventListener("play", setPlayStatus);
    return () => {
      audio.removeEventListener("ended", setEndAudio);
      audio.removeEventListener("pause", setPauseStatus);
      audio.removeEventListener("play", setPlayStatus);
      audio.removeEventListener("timeupdate", setNewDiffTime);
    };
  }, []);

  const isNotListened = (i: number) => {
    const timeForIndexI = ((i + 1) / getAudioVolumes.length) * audioDuration
    // i%27 === 0 && console.log(audioTime, timeForIndexI * 1000)
    return audioTime < timeForIndexI * 1000
  }
  const onChangeCurrentTimeAudio = (i: number) => () => {
    const currentPart = (i + 1) / getAudioVolumes.length;
    audio.currentTime = audioDuration * currentPart;
    if (isEnded) {
      audio.play();
    }
  };


  return {audioTime, isNotListened, onChangeCurrentTimeAudio, onClickListenAudio, onClickStopAudio, isPause, getAudioVolumes}
}