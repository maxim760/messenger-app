import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser } from "../user/types";
import { ITypingUsersState } from "./types";

export const initialState: ITypingUsersState = {};

const typingUsersSlice = createSlice({
  name: "typingUser",
  initialState,
  reducers: {
    addTypingUser(
      state,
      action: PayloadAction<{ user: IUser; chatId: string }>
    ) {
      const {
        user: { _id, name, surname },
        chatId,
      } = action.payload;

      if (!state[chatId]) {
        state[chatId] = [];
      }
      
      state[chatId].push({ _id, name, surname });
    },
    removeTypingUser(
      state,
      action: PayloadAction<{ userId: string; chatId: string }>
    ) {
      const { userId, chatId } = action.payload;
      state[chatId] = state[chatId].filter((user) => user._id !== userId);
    },
  },
});

export const { addTypingUser, removeTypingUser } = typingUsersSlice.actions;
export const typingUsersReducer = typingUsersSlice.reducer;
