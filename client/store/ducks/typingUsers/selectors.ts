import { createSelector } from "@reduxjs/toolkit";
import { userTypeMessage } from "../../../utils/consts";
import { RootState } from "../../rootReducer";

export const selectTypingUsers = (state: RootState) => state.typingUsers; // {}
export const selectTypingUsersChat = (chatId: string) => (state: RootState) => state.typingUsers[chatId]; // null
export const selectTypingUsersTextInChat = (chatId: string) => {
  return createSelector(selectTypingUsersChat(chatId), (usersInChat) => {
    if (!usersInChat || usersInChat.length === 0) {
      return null
    }
    return userTypeMessage(usersInChat)
  })
}
