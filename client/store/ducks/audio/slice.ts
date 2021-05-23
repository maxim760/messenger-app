import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IAudioState } from "./types";
import { Draft } from "@reduxjs/toolkit";

export const initialState: IAudioState = {
  audio: null,
  volume: 0.5
};

const audioSlice = createSlice({
  name: "audio",
  initialState,
  reducers: {
    stopLastTrack(state, action: PayloadAction<void>) {
      if (state.audio) {
        state.volume = state.audio.volume
        state.audio.pause();
        state.audio.currentTime = 0;
      }
      state.audio = null
    },
    listenNewTrack(state, action: PayloadAction<IAudioState["audio"]>) {
      state.audio = action.payload as unknown as Draft<IAudioState["audio"]>
    }
  },
});

export const { stopLastTrack, listenNewTrack } = audioSlice.actions;
export const audioReducer = audioSlice.reducer;
