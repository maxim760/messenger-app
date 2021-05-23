import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ISocketState } from "./types";

export const initialState: ISocketState = {
  socket: null
};

const socketSlice = createSlice({
  name: "socket",
  initialState,
  reducers: {
    setSocket(state, action: PayloadAction<ISocketState["socket"]>) {
      state.socket = action.payload
    }
  },
});

export const {
  setSocket,
} = socketSlice.actions;
export const socketReducer = socketSlice.reducer;
