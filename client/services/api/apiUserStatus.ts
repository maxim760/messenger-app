import { $host } from "..";
import { IRequest, IServerData } from "./apiUser";

export const apiUserStatus = {
  async setStatus({
    payload: status,
    authorization,
  }: IRequest<string>): Promise<string> {
    try {
      const { data }: IServerData<string> = await $host.post(
        `/userStatus`,
        { status },
        { headers: { authorization } }
      );
      return data;
    } catch (error) {
      throw new Error(error.response.data.message || error.message);
    }
  },
  async updateStatus({
    payload: status,
    authorization,
  }: IRequest<string>): Promise<string> {
    try {
      const { data }: IServerData<string> = await $host.put(
        `/userStatus`,
        { status },
        { headers: { authorization } }
      );
      return data;
    } catch (error) {
      throw new Error(error.response.data.message || error.message);
    }
  },
  async removeStatus( {authorization} :ISimpleReq): Promise<string> {
    try {
      const { data }: IServerData<string> = await $host.delete(`/userStatus`, {headers: {authorization}});
      return data;
    } catch (error) {
      throw new Error(error.response.data.message || error.message);
    }
  },
};
