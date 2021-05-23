import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { selectSocket } from "../store/ducks/socket/selectors";
import { selectTypingUsersTextInChat } from "../store/ducks/typingUsers/selectors";
import { IUser } from "../store/ducks/user/types";
import { IUserTypeMessage, Sockets, userTypeMessage } from "../utils/consts";

export const useTypingUsers = (chatId: string) => {
  const typingUsersText = useSelector(selectTypingUsersTextInChat(chatId))
  return {
    text: typingUsersText
  }
}