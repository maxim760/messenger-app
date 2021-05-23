import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { removeActiveChat, removeMessageNotify, setActiveChat } from "../store/ducks/notify/slice"

export const useActiveChat = (chatId: string) => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(setActiveChat(chatId))
    dispatch(removeMessageNotify(chatId));
    return () => {
      dispatch(removeActiveChat())
    }
  }, [])

}