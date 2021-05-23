import React, { useEffect, useState } from "react";
import styles from "../../pages/chat/chat.module.scss";
import { MessageInput } from "./MessageInput";
import { IChat, IMessage } from "../../store/ducks/chates/types";
import { IWithTimeStamps } from "../../types";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { usePhotosAdd } from "./hooks/usePhotos";
import { MessagePhotoItem } from "./MessagePhotoItem";
import { MessageAttachList } from "./MessageAttachList";
import { MessageRecordAudioForm } from "./MessageRecordAudioForm";
import { nanoid } from "@reduxjs/toolkit";
import { MessageAudioList } from "./MessageAudioList";

export enum RECORD_STATUS {
  NONE = "NONE",
  RECORDING = "RECORDING",
  AUDIO = "AUDIO",
}

interface MessageFormProps {
  messageRef: React.MutableRefObject<HTMLTextAreaElement>;
  chat: IChat;
  pushMessage: (msg: IWithTimeStamps<IMessage>) => void;
  setTextAreaHeight: React.Dispatch<React.SetStateAction<number>>;
  setFooterHeight: React.Dispatch<React.SetStateAction<number>>;
  textareaHeight: number;
  footerRef: React.MutableRefObject<HTMLDivElement>;
}
export type IPhoto = {
  url: string;
  file: File;
  id: string;
};

export type IAudio = {
  file: File,
  url: string,
  name: string,
  id: string
}

export const MessageForm: React.FC<MessageFormProps> = ({
  messageRef,
  chat,
  pushMessage,
  setFooterHeight,
  setTextAreaHeight,
  textareaHeight,
  footerRef,
}): React.ReactElement => {
  const {
    state: { photos },
    actions: { addPhotos, removePhoto, setStartPhotoIdx, clearPhotos },
  } = usePhotosAdd();
  const [audioStream, setAudioStream] = useState<MediaStream | null>(null);
  const [audios, setAudios] = useState<IAudio[]>([])
  const removeAudio = (src: string) => {
    setAudios((prev) => prev.filter((audio) => audio.url !== src))
  }
  const clearAudios = () => setAudios([])
  const removeAudioStream = () => setAudioStream(null);
  const [audioStatus, setAudioStatus] = useState(RECORD_STATUS.NONE);
  const onChangePhotos = (e: React.ChangeEvent<HTMLInputElement>) => {
    const photosFiles = Array.from(e.target.files);
    const photos: IPhoto[] = photosFiles.map((file) => ({
      file,
      url: URL.createObjectURL(file),
      id: nanoid(8),
    }));
    addPhotos(photos);
    e.target.value = null;
  };
  const onChangeAudios = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audios = Array.from(e.target.files)
    const formatAudios: IAudio[] = audios.map(audio => ({
      id: nanoid(8),
      name: audio.name.split(".").slice(0, -1).join("."),
      url: URL.createObjectURL(audio),
      file: audio
    }))
    setAudios(prev => [...prev, ...formatAudios])
    e.target.value = null;
  }
  useEffect(() => {
    if (!audioStream) {
      return;
    }
    setAudioStatus(RECORD_STATUS.RECORDING);
  }, [audioStream]);

  useEffect(() => {
    if (footerRef.current) {
      setFooterHeight(footerRef.current.offsetHeight);
    }
  }, [textareaHeight, photos.length, audios.length]);
  return (
    <div ref={footerRef} className={styles.footer}>
      <div className={styles.form}>
        {audioStatus !== RECORD_STATUS.NONE ? (
          <MessageRecordAudioForm
            chat={chat}
            pushMessage={pushMessage}
            removeAudioStream={removeAudioStream}
            audioStream={audioStream}
            audioStatus={audioStatus}
            setAudioStatus={setAudioStatus}
          />
        ) : (
          <>
            <MessageAttachList
                onChangePhotos={onChangePhotos}
                onChangeAudios={onChangeAudios}
            />
            <MessageInput
              messageRef={messageRef}
              pushMessage={pushMessage}
              chat={chat}
              textareaHeight={textareaHeight}
              setTextAreaHeight={setTextAreaHeight}
              onChangePhotos={onChangePhotos}
              clearPhotos={clearPhotos}
              clearAudios={clearAudios}
              photos={photos.map((photo) => photo.file)}
              audios={audios.map((audio) => audio.file)}
              setAudioStream={setAudioStream}
            />
          </>
        )}
      </div>
      {photos.length > 0 && (
        <div className={styles.miniPhotos}>
          {photos.map((photo, i) => (
            <MessagePhotoItem
              id={photo.id}
              key={photo.id}
              url={photo.url}
              className={styles.photoMsg}
              removePhoto={removePhoto}
              setStartPhotoIdx={setStartPhotoIdx(i)}
            />
          ))}
        </div>
      )}
      {audios.length > 0 && <MessageAudioList audios={audios.map(({name, url}) => ({name,url }))} removeAudio={removeAudio} />}
    </div>
  );
};
