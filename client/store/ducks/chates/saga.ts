import { PayloadAction } from '@reduxjs/toolkit'
import { put, takeLatest, call } from 'redux-saga/effects'
import { apiUser } from '../../../services/api/apiUser'
import { IWithTimeStamps, NextReq } from '../../../types'
import { getAuthorization } from '../../../utils/getAuthorization'
import { fetchChates, setChates, setError } from './slice'
import { IChat, IChatFromServer } from './types'

export function* chatesWatcher() {
  yield takeLatest(fetchChates, chatesWorker)
}


function* chatesWorker({ payload: req }: PayloadAction<NextReq>) {
  try {
    const chates: IWithTimeStamps<IChat>[] = yield call(apiUser.getAllChates, { authorization: getAuthorization(req) })
    yield put(setChates(chates))
  } catch (error) {
    yield put(setError(error.message))
  } 
}