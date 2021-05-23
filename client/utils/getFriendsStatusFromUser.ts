import { FRIENDS_STATUS } from "../pages/profile/[id]";
import { IUserFromServer } from "../services/api/apiUser";
import { IUser, IUserFull } from "../store/ducks/user/types";

export function isUserFull(
  user: IUserFromServer | IUserFull
): user is IUserFull {
  try {
    // какие то поля могут иметь длину 0
    return (
      (user as IUserFull).friends[0]?._id !== undefined ||
      (user as IUserFull).sendRequests[0]?._id !== undefined ||
      (user as IUserFull).incomingRequests[0]?._id !== undefined
    );
  } catch (error) {
    return false;
  }
}

export const getFriendStatusFromUser = (
  user: IUserFromServer | IUserFull,
  userId: string
): FRIENDS_STATUS => {
  const isFull = isUserFull(user)
  const func: (item: IUser | string ) => void = isFull ? ({_id}: IUser) => _id === userId : (_id: string) => _id === userId

  if (user.friends.some(func)) {
    return FRIENDS_STATUS.FRIENDS;
  }
  if (user.incomingRequests.some(func)) {
    return FRIENDS_STATUS.SEND;
  }
  if (user.sendRequests.some(func)) {
    return FRIENDS_STATUS.INCOMING;
  }
  return FRIENDS_STATUS.NONE;
};
