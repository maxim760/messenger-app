import { RootState } from "../../rootReducer";

export const selectAudio = (state: RootState) => state.audio.audio
export const selectAudioVolume = (state: RootState) => state.audio.volume