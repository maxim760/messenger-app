import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { STATUS } from "../../../types";
import { IUser, IUserForLogin, IUserForRegister, IUserState } from "./types";

export const initialState: IUserState = {
  user: null,
  isAuth: false,
  authLoginStatus: STATUS.NEVER,
  authRegisterStatus: STATUS.NEVER,
  authLoginError: null,
  authRegisterError: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setIsAuth(state, action: PayloadAction<void>) {
      state.isAuth = true;
    },
    setNotIsAuth(state, action: PayloadAction<void>) {
      state.isAuth = false;
      state.user = null;
    },
    setUser(state, action: PayloadAction<IUser>) {
      state.user = action.payload;
      state.isAuth = true
    },
    setAuthLoginError(state, action: PayloadAction<string>) {
      state.authLoginError = action.payload;
      state.authLoginStatus = STATUS.ERROR;
    },
    setAuthRegisterError(state, action: PayloadAction<string>) {
      state.authRegisterError = action.payload;
      state.authRegisterStatus = STATUS.ERROR;
    },
    fetchLoginUser(state, action: PayloadAction<IUserForLogin>) {
      state.authLoginStatus = STATUS.LOADING;
    },
    fetchRegisterUser(state, action: PayloadAction<FormData>) {
      state.authRegisterStatus = STATUS.LOADING;
    },

    setAuthLoginStatus(state, action: PayloadAction<STATUS>) {
      state.authLoginStatus = action.payload;
    },
    setAuthRegisterStatus(state, action: PayloadAction<STATUS>) {
      state.authRegisterStatus = action.payload;
    },
  },
});

export const {
  setIsAuth,
  setNotIsAuth,
  setUser,
  setAuthLoginError,
  setAuthRegisterError,
  fetchLoginUser,
  fetchRegisterUser,
  setAuthLoginStatus,
  setAuthRegisterStatus,
} = userSlice.actions;
export const userReducer = userSlice.reducer;
