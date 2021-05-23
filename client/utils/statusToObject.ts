import { STATUS } from "../types";

export const statusToObject = (status: STATUS) => ({
  isLoading: status === STATUS.LOADING,
  isError: status === STATUS.ERROR,
  isNever: status === STATUS.NEVER,
  isSuccess: status === STATUS.SUCCESS,
})