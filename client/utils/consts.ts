export const DEFAULT_PROFILE_STATUS = "Нет статуса"

export const isExistStatus = (status: string) => !!status && status !== DEFAULT_PROFILE_STATUS 

export const Sockets = {
  send: {
    message: "messageToServer",
    messageType: "messageTypeToServer",
    friends: "friendsToServer"
  },
  get: {
    message: "messageToClient",
    messageType: "messageTypeToClient",
    friends: "friendsToClient",
  }
}

export type IUserTypeMessage = {
  name: string,
  surname: string,
  _id: string
}

export const userTypeMessage = (users: IUserTypeMessage[]) => {
  const typing = users.length === 1 ? "печатает" : "печатают"
  const usersNames = users.reduce((acc, {name, surname}) => {
    acc.push(`${name} ${surname[0]}.`)
    return acc
  }, [])
  return `${usersNames.join(", ")} ${typing} сообщение...`
}

export enum ACCEPTS {
  IMAGE = "image/*",
  AUDIO="audio/*",
  VIDEO="video/*",
}