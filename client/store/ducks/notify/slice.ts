import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FriendsMode } from "../../../hooks/friends/useFriendsMode";
import { getFriendNotifyType } from "../../../utils/friends/getFriendNotifyType";
import { INotifyFriendsItem, INotifyFriendType, INotifyItem, INotifyMessageItem, INotifyState } from "./types";

export const initialState: INotifyState = {
  friends: { notifies: [], activeFriendTab: null },
  messages: {
    length: 0,
    chates: {},
    activeChat: null
  },
  latest: {} as INotifyItem
};

const notifySlice = createSlice({
  name: "notify",
  initialState,
  reducers: {
    addMessageNotify(state, action: PayloadAction<INotifyMessageItem>) {
      const { chatId ,...latest} = action.payload
      if(chatId === state.messages.activeChat) {
        return
      }
      state.latest = {...latest, type: "message"};
      state.messages.length++;
      if (!state.messages.chates[chatId]) {
        state.messages.chates[chatId] = [];
      }
      state.messages.chates[chatId].push(action.payload);
    },
    removeMessageNotify(state, action: PayloadAction<string>) {
      const chatId = action.payload;
      state.messages.length -= state.messages.chates[chatId]?.length || 0;
      state.messages.chates[chatId] = [];
    },
    addFriendNotify(state, action: PayloadAction<INotifyFriendsItem>) {
      const notify = action.payload;
      const { type, ...latest } = notify
      const activeTab = state.friends.activeFriendTab
      if (type === getFriendNotifyType(activeTab) && activeTab !== FriendsMode.ONLINE) {
        return
      }
      state.latest = {...latest, type: "friends"};
      state.friends.notifies.push(notify);
    },
    removeFriendNotify(state, action: PayloadAction<INotifyFriendType>) {
      const status = action.payload;
      state.friends.notifies = state.friends.notifies.filter(
        (notify) => notify.type !== status
      );
    },
    setActiveChat(state, action: PayloadAction<string>) {
      state.messages.activeChat = action.payload
    },
    removeActiveChat(state, action: PayloadAction<void>) {
      state.messages.activeChat = null
    },
    setActiveFriendTab(state, action: PayloadAction<FriendsMode>) {
      state.friends.activeFriendTab = action.payload
    },
    removeActiveFriendTab(state, action: PayloadAction<void>) {
      state.friends.activeFriendTab = null
    }
  },
});

export const {
  addMessageNotify,
  removeMessageNotify,
  addFriendNotify,
  removeFriendNotify,
  setActiveChat,
  removeActiveChat,
  setActiveFriendTab,
  removeActiveFriendTab
} = notifySlice.actions;
export const notifyReducer = notifySlice.reducer;
