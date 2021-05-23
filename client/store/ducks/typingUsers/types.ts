import { IUserTypeMessage } from "../../../utils/consts";

export type ITypingUsersState = {
  [key: string]: IUserTypeMessage[]
}