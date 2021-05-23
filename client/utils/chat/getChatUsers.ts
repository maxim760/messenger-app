import { IChat } from "../../store/ducks/chates/types";

export const getChatUsers = (chat: IChat) => chat.users.map((user) => user._id)