import { createAction, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ms } from "date-fns/locale";
import { HYDRATE } from "next-redux-wrapper";
import { IWithTimeStamps, NextReq, STATUS } from "../../../types";
import { RootState } from "../../rootReducer";
import { IChat, IChatesState, IMessage } from "./types";

export const initialState: IChatesState = {
  chates: [],
  status: STATUS.NEVER,
  error: null,
};

const chatesSlice = createSlice({
  name: "chates",
  initialState,
  reducers: {
    fetchChates(state, action: PayloadAction<NextReq>) {
      state.status = STATUS.LOADING;
    },
    setChates(state, action: PayloadAction<IChat[]>) {

      state.chates = action.payload;
      state.error = null;
      state.status = STATUS.SUCCESS;
    },
    updateChat(state, action: PayloadAction<IWithTimeStamps<IMessage>>) {
      const msg = action.payload 
      const idx = state.chates.findIndex(chat => chat._id === msg.chat._id)
      const {name, isDialog, users, _id} = msg.chat
      if (idx > -1) {
        state.chates.splice(idx, 1)
      }
      state.chates.unshift({name, isDialog, users, _id, messages: [msg]})
    },
    setError(state, action: PayloadAction<string>) {
      state.error = action.payload;
      state.status = STATUS.ERROR;
    },
    setStatusError(state, action: PayloadAction<void>) {
      state.status = STATUS.ERROR;
    },
    setStatusNever(state, action: PayloadAction<void>) {
      state.status = STATUS.NEVER;
    },
    setStatusSuccess(state, action: PayloadAction<void>) {
      state.status = STATUS.SUCCESS;
    },
    setStatusLoading(state, action: PayloadAction<void>) {
      state.status = STATUS.LOADING;
    },
  },
  
});

export const {
  setError,
  fetchChates,
  setChates,
  updateChat,
  setStatusError,
  setStatusNever,
  setStatusSuccess,
  setStatusLoading,
} = chatesSlice.actions;
export const chatesReducer = chatesSlice.reducer;
