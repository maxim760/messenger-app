import { createSelector } from "@reduxjs/toolkit";
import { friendsStatuses, FRIENDS_STATUS } from "../../../pages/profile/[id]";
import { statusToObject } from "../../../utils/statusToObject";
import { RootState } from "../../rootReducer";

export const selectNotifyState = (state: RootState) => state.notify

export const selectCountNotifies = (state: RootState) => {
  const notify = selectNotifyState(state)
  return notify.friends.notifies.length + notify.messages.length
}

export const selectCountNotifiesByType = createSelector(selectNotifyState,(state) => {
  return {
    friends: state.friends.notifies.length,
    message: state.messages.length
  }
}
)

export const selectLatestNotify = (state: RootState) => selectNotifyState(state).latest

export const selectFriendNotifies = (state: RootState) => selectNotifyState(state).friends.notifies

export const selectFriendsNotifyByTypes = createSelector(selectFriendNotifies, (notifies) => {
  type accType = {[key in FRIENDS_STATUS] ?: {avatar?: string, text: string}[]}
  return notifies.reduce((acc: accType, notify) => {
    const {type, ...other} = notify
    if (!acc.hasOwnProperty(notify.type)) {
      acc[notify.type] = []
    }
    acc[notify.type].push(other)
    return acc
  }, {})
})