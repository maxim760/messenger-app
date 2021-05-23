import { FRIENDS_STATUS } from "../../pages/profile/[id]";
import { apiFriends } from "../../services/api/apiFriends";
import { IRequest } from "../../services/api/apiUser";

export type IProfileFriend = {
  onClick: (arg: IRequest<string>) => Promise<any>;
  startText: string;
  notify: boolean;
  status: FRIENDS_STATUS
};

enum TEXTS {
  ADD_FRIEND ="Добавить в друзья",
  REMOVE_FRIEND="Удалить из друзей",
  ACCEPT_REQUEST = "Принять заявку",
  CANCEL_REQUEST = "Отменить заявку",
  
}

export const useFriendStatus = (status: FRIENDS_STATUS) => {
  const profileFriendInfo: IProfileFriend =
    status === FRIENDS_STATUS.FRIENDS
      ? {
        onClick: apiFriends.removeFriend,
        startText: TEXTS.REMOVE_FRIEND,
        notify: false,
        status
      }
      : status === FRIENDS_STATUS.SEND
      ? {
        onClick: apiFriends.deleteSendRequests,
        startText: TEXTS.CANCEL_REQUEST,
        notify: false,
        status
      }
      : status === FRIENDS_STATUS.INCOMING
      ? {
        onClick: apiFriends.addFriend,
        startText: TEXTS.ACCEPT_REQUEST,
        notify:true,
        status
      } :  {
        onClick: apiFriends.addSendRequest,
        startText: TEXTS.ADD_FRIEND,
        notify:true,
        status
      }
  return profileFriendInfo
};
