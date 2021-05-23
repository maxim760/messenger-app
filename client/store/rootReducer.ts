import { diff, patch,unpatch, reverse } from "jsondiffpatch"
import { combineReducers } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { chatesReducer } from "./ducks/chates/slice";
import { notifyReducer } from "./ducks/notify/slice";
import { socketReducer } from "./ducks/socket/slice";
import { userReducer } from "./ducks/user/slice";
import { rootInitialState } from "./rootInitialState";
import { typingUsersReducer } from "./ducks/typingUsers/slice";
import { photosReducer } from "./ducks/photos/slice";
import { audioReducer } from "./ducks/audio/slice";

const rootReducer = combineReducers({
  user: userReducer,
  chates: chatesReducer,
  notify: notifyReducer,
  socket: socketReducer,
  typingUsers: typingUsersReducer,
  photos: photosReducer,
  audio: audioReducer
})
// в action payload приходит intialState всех редьюсеров или обновленный стэйт,в местах где было обновление
export const reducer = (state, action) => {
  if (action.type === HYDRATE) {
    // нужно получить только те поля что изменились
    const delta = diff(rootInitialState, action.payload)

    const deltaPayload = delta && Object.keys(delta).reduce((acc, key) => ({ ...acc, [key]: action.payload[key]} ), {})
    return {
      ...state, // use previous state
      ...deltaPayload, // apply delta from hydration
    }
  } else {
    return rootReducer(state, action)
  }
}

export type RootState = ReturnType<typeof rootReducer>;