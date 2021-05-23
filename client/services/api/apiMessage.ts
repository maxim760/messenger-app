import { $host } from "..";
import { IChat, IChatFromServer, IMessage } from "../../store/ducks/chates/types";
import { IWithTimeStamps } from "../../types";
import { ILimitOptions } from "./apiChat";
import { IRequest, IServerData } from "./apiUser";


const url = "/message";
export type ISendMsg = {
  image?: File[];
  audio?: File[];
  text: string;
  chat: string;
};
export type IUpdateMsg = {
  image?: File[];
  audio?: File[];
  text: string;
  messageId: string;
};
export const apiMessage = {
  async send({payload: msg,authorization}: IRequest<FormData>): Promise<IWithTimeStamps<IMessage>> {
    try {
      const { data }: IServerData<IMessage> = await $host.post(url, msg, { headers: { authorization} });
      return data;
    } catch (error) {
      throw new Error(error.response.data.message || error.message);
    }
  },
  async update({payload: msg, authorization}: IRequest<IUpdateMsg>): Promise<IMessage> {
    try {
      const { data }: IServerData<IMessage> = await $host.put(`${url}`, {
        ...msg,
      }, {headers: authorization});
      return data;
    } catch (error) {
      throw new Error(error.response.data.message || error.message);
    }
  },
  async delete({payload:id, authorization}: IRequest<string>): Promise<string> {
    try {
      const { data }: IServerData<string> = await $host.delete(`${url}?id=${id}`, {headers: {authorization}});
      return data;
    } catch (error) {
      throw new Error(error.response.data.message || error.message);
    }
  },

  async get({
    payload: {chat,
      offset,
      limit}, authorization
  }: IRequest<{ chat: string } & ILimitOptions>): Promise<IMessage[]> {
    try {
      const { data }: IServerData<IWithTimeStamps<IMessage>[]> = await $host.get(`${url}`, {
        params: { chat, offset, limit },headers: {authorization}
      });

      return data;
    } catch (error) {
      throw new Error(error.response.data.message || error.message);
    }
  },
};
