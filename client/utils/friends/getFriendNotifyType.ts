import { FriendsMode } from "../../hooks/friends/useFriendsMode";
import { FRIENDS_STATUS } from "../../pages/profile/[id]";

type IOptions = {
  isNotify?:boolean
}

export const getFriendNotifyType = (mode: FriendsMode, {isNotify}: IOptions = {}) => {
  if ([FriendsMode.ALL, FriendsMode.ONLINE].includes(mode)) {
    return FRIENDS_STATUS.FRIENDS
  }
  if ([FriendsMode.INCOMING].includes(mode)) {
    return FRIENDS_STATUS.INCOMING
  }
  if ([FriendsMode.SEND].includes(mode)) {
    return FRIENDS_STATUS.SEND
  }
  if (isNotify) {
    return null
  }
  return FRIENDS_STATUS.NONE 
}