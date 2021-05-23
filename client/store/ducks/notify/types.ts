import { FriendsMode } from "../../../hooks/friends/useFriendsMode";
import { FRIENDS_STATUS } from "../../../pages/profile/[id]";

export type INotifyFriendType = Exclude<FRIENDS_STATUS, FRIENDS_STATUS.NONE>

export type INotifyFriendsItem = {
  type: INotifyFriendType;
  avatar?: string;
  text: string;
  from: string
};

export type INotifyMessageItem = {
  from: string;
  avatar?: string;
  text: string;
  chatId: string
};

export type INotifyItem = Omit<INotifyFriendsItem, "type"> & {type: "friends" | "message"}

export type INotifyMessage = {
  [key: string]: INotifyMessageItem[];
} 

export type INotifyState = {
  friends: { notifies: INotifyFriendsItem[], activeFriendTab: null | FriendsMode};
  messages: { length: number, chates: INotifyMessage, activeChat: string | null };
  latest: INotifyItem
};
