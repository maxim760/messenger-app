import { inc } from "nprogress";
import { $host } from "..";
import { IChat, IChatFromServer } from "../../store/ducks/chates/types";
import {
  IUser,
  IUserForLogin,
  IUserForLoginToServer,
  IUserForRegister,
  IUserFull,
} from "../../store/ducks/user/types";

export type IServerData<T> = {
  data: T;
};

export type ISimpleReq = {
  authorization ?: string
}

export type IRequest<T> = {
  payload: T,
  authorization ?: string
}
export type IUserFromServer = Omit<
  IUser,
  "friends" | "sendRequests" | "incomingRequests"
> & { friends: string[]; sendRequests: string[]; incomingRequests: string[] };

// const friendsFieldsToNumber = ({
//   friends,
//   sendRequests,
//   incomingRequests,
//   ...userData
// }: IUserFromServer): IUser => {
//   return {
//     ...userData,
//     friends: friends.length,
//     sendRequests: sendRequests.length,
//     incomingRequests: incomingRequests.length,
//   };
// };

export const apiUser = {
  async registration({payload, authorization}: IRequest<FormData>): Promise<IUserFromServer> {
    try {
      const { data }: IServerData<IUserFromServer> = await $host.post(
        `/user/registration`,
        payload,{headers: {authorization} }
      );
      return data;
    } catch (error) {
      throw new Error(error.response.data.message || error.message);
    }
  },
  async login(payload: IUserForLoginToServer): Promise<IUser> {
    try {
      const {
        data,
      }: IServerData<IUserFromServer> = await $host.post("/auth/login", {
        username: payload.username,
        password: payload.password,
      });
      return data;
    } catch (error) {
      throw new Error(error.response.data.message || error.message);
    }
  },
  async out({authorization}: {authorization ?: string} = {}): Promise<string> {
    try {
      const { data }: IServerData<string> = await $host.post("/auth/out",null, {headers: {authorization}});
      return data;
    } catch (error) {
      throw new Error(error.response.data.message || error.message);
    }
  },
  async setOnline({ authorization }: { authorization?: string } = {}): Promise<string> {
    try {
      const { data }: IServerData<string> = await $host.post("/user/online",null, {headers: {authorization}});
      return data;
    } catch (error) {
      throw new Error(error.response.data.message || error.message);
    }
  },
  async setOffline({authorization}: {authorization ?: string} = {}): Promise<string> {
    try {
      const { data }: IServerData<string> = await $host.post("/user/offline",null, {headers: {authorization}});
      return data;
    } catch (error) {
      throw new Error(error.response.data.message || error.message);
    }
  },
  async getProfile(authorization ?: string): Promise<IUser> {
    try {
      const { data }: IServerData<IUserFromServer> = await $host.get(
        "/auth/profile", {headers: {authorization}}
      );
      return data;
    } catch (error) {
      throw new Error(error.response.data.message || error.message);
    }
  },
  async getById({payload: id,authorization }: IRequest<string>): Promise<IUserFull> {
    try {
      const { data }: IServerData<IUserFull> = await $host.get(
        `/user/${id}`,{headers: {authorization}}
      );
      return data;
    } catch (error) {
      throw new Error(error.response.data.message || error.message);
    }
  },
  async getAll({payload: query, authorization}: IRequest<string>): Promise<IUserFromServer[]> {
    try {
      const { data }: IServerData<IUserFromServer[]> = await $host.get(
        `/user?query=${query}`, {headers: {authorization}}
      );
      return data;
    } catch (error) {
      throw new Error(error.response?.data?.message || error.message);
    }
  },
  async getAllChates( {authorization} :ISimpleReq): Promise<IChat[]> {
    try {
      const { data }: IServerData<IChatFromServer[]> = await $host.get(`/user/chates`, {headers: {authorization}});
      return data.map(item => ({
        ...item,
        isDialog: item.users.length === 1
      }));
    } catch (error) {
      throw new Error(error.response.data.message || error.message);
    }
  },
};
