import { statusToObject } from "../../../utils/statusToObject";
import { RootState } from "../../rootReducer";
import { IUser } from "./types";

export const selectUserState = (state: RootState) => state.user;
export const selectUser = (state: RootState) => selectUserState(state).user || {} as IUser;
export const selectUserId = (state: RootState) => selectUser(state)?._id;
export const selectUserIsAuth = (state: RootState) => selectUserState(state).isAuth
export const selectAuthStatus = (type: AUTH_TYPE) =>(state: RootState) => {
  const field = type === AUTH_TYPE.LOGIN ? "authLoginStatus" : "authRegisterStatus" 
  const status = selectUserState(state)[field]
  return statusToObject(status)
}

export enum AUTH_TYPE {
  LOGIN="LOGIN",
  REGISTER="REGISTER",
}

export const selectAuthError = (type: AUTH_TYPE) => (state: RootState): string | null => {
  const field = type === AUTH_TYPE.LOGIN ? "authLoginError" : "authRegisterError" 
  const error = selectUserState(state)[field]
  if (!error) {
    return null
  }
  return error
}