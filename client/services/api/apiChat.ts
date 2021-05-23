import { $host } from "..";
import { IChat, IChatFromServer } from "../../store/ducks/chates/types";
import { IUser } from "../../store/ducks/user/types";
import { IRequest, IServerData } from "./apiUser";




const url = "/chat";

export type ILimitOptions = {
  offset ?: number;
  limit ?: number;
};

export const apiChat = {
  async createOrFind({payload: users, authorization}: IRequest<string[]>): Promise<IChat> {
    try {
      const { data }: IServerData<IChat> = await $host.post(`${url}`, {
        users,
      },{headers: {authorization}});
      return data;
    } catch (error) {
      throw new Error(error.response.data.message || error.message);
    }
  },

  async get({payload :{
    chat,
    offset,
    limit,}, authorization
  }: IRequest<{ chat: string } & ILimitOptions>): Promise<IChat> {
    try {
      const { data }: IServerData<IChatFromServer> = await $host.get(`${url}?chat=${chat}&offset=${offset}&limit=${limit}`, {headers: {authorization}});
      
      return {...data, isDialog: data.users.length === 1};
    } catch (error) {
      throw new Error(error.response.data.message || error.message);
    }
  },
};
