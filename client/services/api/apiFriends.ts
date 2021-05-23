import { useSelector } from "react-redux";
import { $host } from "..";
import { selectSocket } from "../../store/ducks/socket/selectors";
import { IUser, IUserForLogin, IUserForRegister} from "../../store/ducks/user/types"
import { IRequest, IServerData } from "./apiUser";


const url = "/friends"

type ITotalFriends = {friends:IUser[], incomingRequests: IUser[], sendRequests: IUser[]}

export const apiFriends = {
  async getFriends({payload: id, authorization}: IRequest<string>): Promise<IUser[]> {
    try {
      const { data }: IServerData<{friends: IUser[]}> = await $host.get(
        `${url}?id=${id}`,{headers: {authorization}}
      );
      return data.friends;
    } catch (error) {
      throw new Error(error.response.data.message || error.message);
    }
  },
  async getTotalFriends({payload :id = "", authorization}: IRequest<string>): Promise<ITotalFriends> {
    try {
      const { data }: IServerData<ITotalFriends> = await $host.get(
        `${url}/full`,{params: {id}, headers: {authorization}}
      );
      return data;
    } catch (error) {
      throw new Error(error.response?.data?.message || error.message);
    }
  },
  async addFriend({payload: id, authorization}: IRequest<string>): Promise<IUser[]> {
    try {
      const { data }: IServerData<IUser[]> = await $host.post(
        `${url}?id=${id}`,null,{headers:{authorization}}
      );
      return data;
    } catch (error) {
      throw new Error(error.response?.data?.message || error.message);
    }
  },
  async removeFriend({payload: id, authorization}: IRequest<string>): Promise<IUser[]> {
    try {
      const { data }: IServerData<IUser[]> = await $host.delete(
        `${url}?id=${id}`,{headers: {authorization}}
      );
      return data;
    } catch (error) {
      throw new Error(error.response.data.message || error.message);
    }
  },
  async getSendRequests({payload: id, authorization}: IRequest<string>): Promise<IUser[]> {
    try {
      const { data }: IServerData<IUser[]> = await $host.get(
        `${url}/send?id=${id}`,{headers: {authorization}}
      );
      return data;
    } catch (error) {
      throw new Error(error.response.data.message || error.message);
    }
  },
  async deleteSendRequests({payload: id, authorization}: IRequest<string>, mode: "all" | "one" = "one"): Promise<IUser[]> {
    try {
      const { data }: IServerData<IUser[]> = await $host.delete(
        `${url}/send?id=${id}&mode=${mode}`,{headers: {authorization}}
      );
      return data;
    } catch (error) {
      throw new Error(error.response.data.message || error.message);
    }
  },
  async addSendRequest({payload: id, authorization}: IRequest<string>): Promise<IUser[]> {
    try {
      const { data }: IServerData<IUser[]> = await $host.post(
        `${url}/send?id=${id}`,null, {headers: {authorization}}
      );
      return data;
    } catch (error) {
      throw new Error(error.response.data.message || error.message);
    }
  },
  async getIncomingRequests({payload: id, authorization}: IRequest<string>): Promise<IUser[]> {
    try {
      const { data }: IServerData<IUser[]> = await $host.get(
        `${url}/incoming?id=${id}`,{headers: {authorization}}
      );
      return data;
    } catch (error) {
      throw new Error(error.response.data.message || error.message);
    }
  },
};
