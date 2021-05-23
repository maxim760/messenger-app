import { useRouter } from "next/router"
import { apiFriends } from "../../services/api/apiFriends"
import { ROUTES } from "../../utils/routes"

export const useFriendsActions = () => {
  const router = useRouter()
  const onRemoveFriend = async (id: string)  => {
    if (window && window.confirm("Вы уверены")) {
      await apiFriends.removeFriend({ payload: id })
    }
  }
  const onShowFriends = (id: string)  => {
    router.push(`${ROUTES.FRIENDS}?id=${id}`)
  }
  return {onRemoveFriend, onShowFriends}
}