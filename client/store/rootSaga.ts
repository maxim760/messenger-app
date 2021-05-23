import { all } from "redux-saga/effects";
import { chatesWatcher } from "./ducks/chates/saga";
import { userWatcher } from "./ducks/user/saga";

export function* rootSaga() {
  yield all([
    userWatcher(),
    chatesWatcher()
  ]);
}