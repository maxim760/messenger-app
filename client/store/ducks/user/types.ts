import { FriendsProps } from "../../../pages/friends";
import { STATUS } from "../../../types";


export type IUser = {
  _id: string;
  name: string;
  surname: string;
  avatar: string;
  status: string;
  email: string;
  isOnline: boolean;
  lastOnlineTime: number;
  // массивы с id
  friends: string[];
  sendRequests: string[];
  incomingRequests: string[];
};

export type IUserState = {
  isAuth: boolean;
  user: null | IUser;
  authLoginStatus: STATUS;
  authRegisterStatus: STATUS;
  authLoginError: string | null;
  authRegisterError: string | null;
};

export type IUserForLogin = {
  email: string;
  password: string;
};
export type IUserForLoginToServer = {
  username: string;
  password: string;
};

export type IUserForRegister = {
  name: string;
  surname: string
  email: string;
  avatar?: File,
  password: string;
  password2: string;
};

export type IUserFull = Omit<IUser, "friends" | "sendRequests" | "incomingRequests"> & FriendsProps