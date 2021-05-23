import { PayloadAction } from '@reduxjs/toolkit'
import { put, takeLatest, call } from 'redux-saga/effects'
import { apiUser } from '../../../services/api/apiUser'
import { STATUS } from '../../../types'
import { fetchLoginUser, fetchRegisterUser, setAuthLoginError, setAuthLoginStatus, setAuthRegisterError, setAuthRegisterStatus, setIsAuth, setNotIsAuth, setUser } from './slice'
import {  IUser, IUserForLogin, IUserForRegister } from './types'

export function* userWatcher() {
  yield takeLatest(fetchRegisterUser, userRegisterWorker)
  yield takeLatest(fetchLoginUser, userLoginWorker)
}


function* userLoginWorker({ payload }: PayloadAction<IUserForLogin>) {
  try {
    const userData: IUser = yield call(apiUser.login, {username: payload.email, password: payload.password })
    yield put(setIsAuth())
    yield put(setUser(userData))
    yield put(setAuthLoginStatus(STATUS.SUCCESS))
  } catch (error) {
    yield put(setNotIsAuth())
    yield put(setAuthLoginError(error.message))
  } 
  
}
function* userRegisterWorker({ payload }: PayloadAction<FormData>) {
  try {
    yield call(apiUser.registration, {payload})
    yield put(setAuthRegisterStatus(STATUS.SUCCESS))
  } catch (error) {
    yield put(setAuthRegisterError(error.message))
  } 
  
}