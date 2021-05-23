import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectAudioVolume } from "../../../store/ducks/audio/selectors";
import {
  listenNewTrack,
  stopLastTrack,
} from "../../../store/ducks/audio/slice";
import { IAudioState } from "../../../store/ducks/audio/types";

type ListenAudioProps = {
  url: string;
  isActive: boolean;
};

export const useListenAudio = (
  { url, isActive }: ListenAudioProps = {} as ListenAudioProps
  ) => {
  const dispatch = useDispatch();
  const volumeStore = useSelector(selectAudioVolume)
  const currentVolume = useRef(volumeStore);
  const isActiveRef = useRef(isActive)
  useEffect(() => {
    isActiveRef.current = isActive
  }, [isActive])
  useEffect(() => {
    if (!isActive) {
      audio.volume = volumeStore
    }
    currentVolume.current = volumeStore
  }, [volumeStore])
  const [audio] = useState(new Audio(url));
  const [audioDuration, setAudioDuration] = useState<number>(
    audio.duration || 0
    );
  const [audioTime, setAudioTime] = useState(0);
  const [volume, setVolume] = useState(currentVolume.current * 100 || 50);
  const setNewVolume = () => setVolume(audio.volume * 100);
  const [isPause, setIsPause] = useState(true);
  const [isEnded, setIsEnded] = useState(false);
  const setPauseStatus = () => setIsPause(true);
  const setPlayStatus = () => {
    if (!isActiveRef.current) {
      dispatch(stopLastTrack());
      dispatch(listenNewTrack(audio));      
    }
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
    const setEndAudio = () => {
      setIsEnded(true);
      setPauseStatus();
    };
    const setNewDiffTime = () => {
      // перевожу время в милисекунды из секунд
      setAudioTime(audio.currentTime);
    };
    const setNewAudioDuration = () => {
      if (Number.isFinite(audio.duration)) {
        setAudioDuration(audio.duration);
      }
    };

    audio.addEventListener("ended", setEndAudio);
    audio.addEventListener("canplay", setNewAudioDuration);
    audio.addEventListener("timeupdate", setNewDiffTime);
    audio.addEventListener("volumechange", setNewVolume);
    audio.addEventListener("pause", setPauseStatus);
    audio.addEventListener("play", setPlayStatus);
    return () => {
      audio.removeEventListener("canplay", setNewAudioDuration);
      audio.removeEventListener("ended", setEndAudio);
      audio.removeEventListener("timeupdate", setNewDiffTime);
      audio.removeEventListener("volumechange", setNewVolume);
      audio.removeEventListener("pause", setPauseStatus);
      audio.removeEventListener("play", setPlayStatus);
    };
  }, []);

  const onChangeCurrentTimeAudio = (e: React.ChangeEvent<HTMLInputElement>) => {
    audio.currentTime = Number(e.target.value);
    if (isEnded) {
      audio.play();
    }
  };
  const onChangeVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
    audio.volume = +e.target.value / 100;
  };
  return {
    audioTime,
    onChangeCurrentTimeAudio,
    isPause,
    volume,
    audioDuration,
    onChangeVolume,
    onClickListenAudio,
    onClickStopAudio,
  };
};
