import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectAudio } from "../../store/ducks/audio/selectors";
import { listenNewTrack, stopLastTrack as stopLastTrackOnStore } from "../../store/ducks/audio/slice";
import { IAudioState } from "../../store/ducks/audio/types";
import { MessageAudioItem } from "./MessageAudioItem";
import { IAudio } from "./MessageForm";

export type IAudioItem =  {
  name: string,
  url: string
}

interface MessageAudioListProps {
  audios: IAudioItem[];
  removeAudio?: (id: string) => void;
  fromServer ?: boolean
}



export const MessageAudioList: React.FC<MessageAudioListProps> = ({
  audios,
  removeAudio,fromServer = false
}): React.ReactElement => {
  const dispatch = useDispatch()
  const activeTrack = useSelector(selectAudio)
  const stopLastTrack = () => {
    dispatch(stopLastTrackOnStore())
  }
  
  useEffect(() => {
    return () => {
      stopLastTrack()
    }
  }, [])
  return (
    <>
      {audios.map((audioData, i) => (
        <MessageAudioItem
          key={audioData.url + "_" + i}
          audioData={audioData}
          stopLastTrack={stopLastTrack}
          activeTrackUrl={activeTrack?.src}
          fromServer={fromServer}
          
          removeAudio={fromServer ? undefined : removeAudio}
        />
      ))}
    </>
  );
};
