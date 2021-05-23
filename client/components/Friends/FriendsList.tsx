import React from "react";
import { IUser } from "../../store/ducks/user/types";
import { FriendsListItem } from "./FriendsListItem";
import { ItemFriend } from "./ItemFriend";
import { ItemIncoming } from "./ItemIncoming";
import { ItemSend } from "./ItemSend";
import { INotifyFriendType } from "../../store/ducks/notify/types";
import { useSelector } from "react-redux";
import { FriendsMode, IUserModeChg } from "../../hooks/friends/useFriendsMode";
import { selectUserId } from "../../store/ducks/user/selectors";
import { UserLinkInfo } from "..";

interface FriendsListProps {
  userList: IUser[];
  mode: FriendsMode;
  onChangeModeUser: (args: IUserModeChg) => () => void;
  notifyType: INotifyFriendType
}

export const FriendsList: React.FC<FriendsListProps> = ({
  userList,
  mode,
  onChangeModeUser,
  notifyType
}): React.ReactElement => {
  const myUserId = useSelector(selectUserId);
  
  
  const ComponentItem =
    mode === FriendsMode.SEND
      ? ItemSend
      : mode === FriendsMode.INCOMING
      ? ItemIncoming
      : ItemFriend;
  return (
    <>
      {userList.map((user, i) => (
        <FriendsListItem user={user} key={user._id}>
          {user._id === myUserId ? (
            <UserLinkInfo user={user} />
          ) : (
            <ComponentItem
              notifyType={notifyType}
              user={user}
              onChangeModeUser={onChangeModeUser({ prevMode: mode, user })}
            />
          )}
        </FriendsListItem>
      ))}
    </>
  );
};
