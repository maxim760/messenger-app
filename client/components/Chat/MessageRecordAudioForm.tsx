import React, { useEffect, useMemo, useRef, useState } from "react";
import styles from "../../pages/chat/chat.module.scss";
import { IoClose as IconClose } from "react-icons/io5";
import { BiStop as IconStop, BiSend as IconSend } from "react-icons/bi";
import clsx from "clsx";
import { getAudioFromBlob, getAverage, getChatUsers, getMinsSec } from "../../utils";
import { RECORD_STATUS } from "./MessageForm";
import { apiMessage } from "../../services/api/apiMessage";
import { IChat, IMessage } from "../../store/ducks/chates/types";
import { IWithTimeStamps } from "../../types";
import { useSocketEmits } from "../../hooks/useSocketEmits";
import { selectUser } from "../../store/ducks/user/selectors";
import { useSelector } from "react-redux";
import { MessageVoice } from "./MessageVoice";

export const WIDTH_ONE_SOUND = 3;
export const MAX_VOLUME = 65;
interface Props {
  audioStream: MediaStream;
  removeAudioStream: () => void;
  audioStatus: RECORD_STATUS;
  pushMessage: (msg: IWithTimeStamps<IMessage>) => void;
  setAudioStatus: React.Dispatch<React.SetStateAction<RECORD_STATUS>>;
  chat: IChat;
}

export const MessageRecordAudioForm: React.FC<Props> = ({
  audioStream,
  audioStatus,
  setAudioStatus,
  removeAudioStream,
  pushMessage,
  chat,
}): React.ReactElement => {
  const user = useSelector(selectUser);
  const { sendMessageToServer } = useSocketEmits();
  const volumeRef = useRef<HTMLDivElement>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [isSend, setIsSend] = useState(false);
  // in seconds
  const [audioDuration, setAudioDuration] = useState<number>(0);

  const [diffTime, setDiffTime] = useState(0);
  const timer = useRef<NodeJS.Timeout>();
  useEffect(() => {
    const startTime = performance.now();
    const updateDiffTime = () => setDiffTime(performance.now() - startTime);
    const interval = () => {
      timer.current = setTimeout(() => {
        updateDiffTime();
        interval();
      }, 1000);
    };
    interval();
  }, []);
  const mediaRecorder = useRef<MediaRecorder>(null);
  const startRecordAudio = () => setAudioStatus(RECORD_STATUS.RECORDING);
  const stopMediaRecorder = () => {
    if (mediaRecorder.current?.state === "recording") {
      mediaRecorder.current.stop();
    }
  };
  const closeAudio = () => {
    setAudioStatus(RECORD_STATUS.NONE);
  };
  const stopRecordAudio = () => {
    stopMediaRecorder();
    setAudioStatus(RECORD_STATUS.AUDIO);
  };
  const [volumeWidth, setVolumeWidth] = useState(0);
  const [audioVolumes, setAudioVolumes] = useState<number[]>([]);
  const addAudioVolume = (volume: number) =>
    setAudioVolumes((prev) => [
      ...prev,
      (Math.min(MAX_VOLUME, volume) / MAX_VOLUME) * 90 + 10,
    ]);
  const getAudioVolumes = useMemo(() => {
    if (audioVolumes.length * WIDTH_ONE_SOUND < volumeWidth) {
      return audioVolumes;
    }
    const count = ~~(volumeWidth / WIDTH_ONE_SOUND);
    return audioVolumes.slice(-count);
  }, [audioVolumes, volumeWidth, audioDuration]);

  useEffect(() => {
    if (audioStatus !== RECORD_STATUS.AUDIO) {
      return;
    }
    setAudioDuration(diffTime);
  }, [audioStatus === RECORD_STATUS.AUDIO]);
  useEffect(() => {
    const voice: Blob[] = [];
    const addVoice = (event: BlobEvent) => {
      voice.push(event.data);
    };
    const audioCtx = new AudioContext();
    const analyser = audioCtx.createAnalyser();
    const micro = audioCtx.createMediaStreamSource(audioStream);

    const volumeCallback = () => {
      const volumes = new Uint8Array(analyser.frequencyBinCount);
      analyser.getByteFrequencyData(volumes);
      const average = getAverage(volumes as unknown as number[]);
      addAudioVolume(average);
    };
    let volumeInterval: NodeJS.Timeout;
    const unsubscribeAudioEvents = () => {
      mediaRecorder.current.removeEventListener("dataavailable", addVoice);
      clearTimeout(timer.current);
      clearInterval(volumeInterval);
      removeAudioStream();
    };
    const onStopAudio = () => {
      const { url, blob } = getAudioFromBlob(voice);
      setAudioUrl(url);
      setAudioBlob(blob);

      unsubscribeAudioEvents();
    };
    analyser.smoothingTimeConstant = 0.2;
    analyser.fftSize = 1024;
    micro.connect(analyser);

    mediaRecorder.current = new MediaRecorder(audioStream);
    mediaRecorder.current.addEventListener("stop", onStopAudio, { once: true });
    mediaRecorder.current.addEventListener("dataavailable", addVoice);
    mediaRecorder.current.start();
    startRecordAudio();
    volumeInterval = setInterval(volumeCallback, 60);
    return () => {
      unsubscribeAudioEvents();
    };
  }, []);

  useEffect(() => {
    const setNewVolumeWidth = () => {
      setVolumeWidth(volumeRef.current.getBoundingClientRect().width);
    };
    setNewVolumeWidth();
    window.addEventListener("resize", setNewVolumeWidth);
    return () => {
      window.removeEventListener("resize", setNewVolumeWidth);
    };
  }, []);

  const onClickSendAudio = async () => {
    stopMediaRecorder();
    setIsSend(true);
  };

  useEffect(() => {
    if (!audioBlob || !isSend) {
      return;
    }
    (async () => {
      const formData = new FormData();
      formData.append("chat", chat._id);
      formData.append("volumes", JSON.stringify(audioVolumes));
      formData.append("voice", audioBlob);
      formData.append("duration", diffTime + "");
      closeAudio();
      const msg = await apiMessage.send({
        payload: formData,
      });
      pushMessage({
        image: msg.image,
        createdAt: msg.createdAt,
        updatedAt: msg.updatedAt,
        chat: chat,
        voice: msg.voice,
        sender: user,
        _id: msg._id,
      });
      sendMessageToServer({ ...msg, to: getChatUsers(chat) });
    })();
  }, [isSend, audioBlob]);

  return (
    <>
      <IconClose className={clsx("icon")} onClick={closeAudio} />
      {audioStatus === RECORD_STATUS.AUDIO && audioUrl && audioDuration ? (
        <MessageVoice
          url={audioUrl}
          duration={audioDuration}
          volumes={audioVolumes}
        />
      ) : (
        <div className={styles.record}>
          <button className={styles.audioIconBtn} onClick={stopRecordAudio}>
            <IconStop
              color={"red"}
              className={clsx("icon", styles.audioIcon)}
            />
          </button>
          <div className={clsx(styles.volume)} ref={volumeRef}>
            {getAudioVolumes.map((volumePercent, i) => (
              <div key={volumePercent + "_" + i} className={styles.volumeItem}>
                <div
                  style={{ height: volumePercent + "%" }}
                  className={styles.volumeLevel}
                />
              </div>
            ))}
          </div>
          <time className={styles.audioTime}>{getMinsSec(diffTime)}</time>
        </div>
      )}
      <IconSend className={clsx("icon")} onClick={onClickSendAudio} />
    </>
  );
};
