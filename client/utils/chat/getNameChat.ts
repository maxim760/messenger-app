import { IChat } from "../../store/ducks/chates/types";

export const getNameChat = (chat: IChat) => {
  if (!chat.isDialog) {
    return chat.name
  }
  // собеседник
  const {name, surname} = chat.users[0]
  return `${name} ${surname}`
}