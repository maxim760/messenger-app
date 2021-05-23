import { useSelector } from "react-redux"
import { friendsStatuses, FRIENDS_STATUS } from "../pages/profile/[id]"
import { IMessage } from "../store/ducks/chates/types"
import { selectSocket } from "../store/ducks/socket/selectors"
import { IWithTimeStamps } from "../types"
import { Sockets } from "../utils/consts"


type IFriendSocket = {
  to: string,
  status: FRIENDS_STATUS
}
type IMessageSocket = {
  to: string[],
} & IWithTimeStamps<IMessage>

export const useSocketEmits = () => {
  const socket = useSelector(selectSocket)
  const socketPaths = Sockets.send

  const sendFriendToServer = ({ to, status }: IFriendSocket) => {
    if ([FRIENDS_STATUS.NONE, FRIENDS_STATUS.INCOMING].includes(status)) {
      // до заявки статус был NONE, после заявки будет send - заявка отправилась ,
      // нам нужно в сокет отправить статус send, так как отношение между двум пользователями - отправленная заявка от первого
      socket.emit(socketPaths.friends, {to, status: friendsStatuses[status].next});
    }
  }
  const sendMessageToServer = ({ to, ...message }: IMessageSocket) => {
      socket.emit(socketPaths.message, {to, ...message});
  }
  const sendMessageTypeToServer = ({ to, chatId }: {to: string[], chatId: string}) => {
      socket.emit(socketPaths.messageType, {to, status: "start", chatId});
    }
    const sendMessageFinishTypeToServer = ({ to, chatId }: {to: string[], chatId: string}) => {
      socket.emit(socketPaths.messageType, {to, status: "finish", chatId});
  }

  return {
    socket,
    sendFriendToServer,
    sendMessageToServer,
    sendMessageFinishTypeToServer,
    sendMessageTypeToServer
  }

}