import { ItemFriend, ItemIncoming, ItemSend } from "../../components";
import { ItemNone } from "../../components/Friends/ItemNone";
import { FriendsMode } from "../../hooks/friends/useFriendsMode";
import { FRIENDS_STATUS } from "../../pages/profile/[id]";

export const getFriendItemComponent = (status: FriendsMode | FRIENDS_STATUS) => {
  if([FriendsMode.ALL,FriendsMode.ONLINE,FRIENDS_STATUS.FRIENDS].includes(status)) {
    return ItemFriend
  }
  if ([FriendsMode.INCOMING, FRIENDS_STATUS.INCOMING].includes(status)) {
    return ItemIncoming
  }
  if ([FriendsMode.SEND, FRIENDS_STATUS.SEND].includes(status)) {
    return ItemSend
  }
  return ItemNone
}