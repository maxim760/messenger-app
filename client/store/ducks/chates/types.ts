import { IAudioItem } from "../../../components/Chat/MessageAudioList";
import { STATUS } from "../../../types";
import { IWithTimeStamps } from "../../../types";
import { IUser } from "../user/types";

export type IMessage = {
  _id: string,
  sender: IUser,
  text ?: string,
  audio?: IAudioItem[],
  voice?: {volumes: number[], url: string, duration: number },
  image?: string[],
  chat: IChat
}

export type IChat = {
  _id: string;
  avatar?: string
  name?: string;
  isDialog: boolean
  users: IUser[]
  messages: IWithTimeStamps<IMessage>[];
};
export type IChatFromServer = {
  _id: string;
  avatar?: string
  name?: string;
  users: IUser[]
  messages: IWithTimeStamps<IMessage>[];
};

export type IChatesState = {
  chates:IWithTimeStamps<IChat>[];
  status: STATUS,
  error: null | string
};