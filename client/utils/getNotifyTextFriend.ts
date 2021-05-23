import { FRIENDS_STATUS } from "../pages/profile/[id]";

export const getNotifyTextFriend = (status: FRIENDS_STATUS, name: string): string => {
  if (status === FRIENDS_STATUS.INCOMING) {
    return "Заявка в друзья от: " + name
  }
  if (status === FRIENDS_STATUS.FRIENDS) {
    return name + " теперь ваш друг!"
  }
}