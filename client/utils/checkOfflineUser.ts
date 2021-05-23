import { IUser, IUserFull } from "../store/ducks/user/types";

export const checkOfflineUser = (user: IUser | IUserFull) => {
  const { isOnline, lastOnlineTime } = user
  if (Date.now() - lastOnlineTime > (5 * 60 * 1000 + 15 * 1000) || !isOnline) {
    // тогда оффлайн
    return lastOnlineTime
  }
  // иначе еще онлайн
  return false
}
