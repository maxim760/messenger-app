import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { removeActiveFriendTab, setActiveFriendTab } from "../../store/ducks/notify/slice";
import { FriendsMode } from "./useFriendsMode";

export const useActiveFriendTab = (tab: FriendsMode) => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(setActiveFriendTab(tab))
    return () => {
      dispatch(removeActiveFriendTab())
    }
  })
}