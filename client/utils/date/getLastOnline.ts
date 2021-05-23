import { format, formatDistanceToNowStrict } from "date-fns"
import ruLocale from "date-fns/locale/ru"
import { IUser, IUserFull } from "../../store/ducks/user/types"
import { checkOfflineUser } from "../checkOfflineUser"
import { getDay } from "./getDay"
import { getHoursMins } from "./getHoursMins"

// онлайн - online
// меньше минуты - только что
// меньше часа - x минут назад
// меньше 4 часов - 1,2,3 часа назад
// больше 4 часов - сегодня, вчера, [день] [месяц] в [минуты]:[секунды]
// если в прошлом и больше годах,  то ничего не отображать

const isLessYear = (dateLastOnline: number, dateNow: number) => {
  const formatDateLastOnline = new Date(dateLastOnline)
  formatDateLastOnline.setDate(formatDateLastOnline.getFullYear() + 1)
  return formatDateLastOnline >  new Date(dateNow)
}

export const getLastOnline = (user: IUser | IUserFull) => {
  const now = Date.now()
  const lastOnline = checkOfflineUser(user)
  if (lastOnline === false) {
    return "online"
  }
  if (lastOnline + 1000 * 60 > now) {
    return "только что"
  }
  if (lastOnline + 1000 * 60 * 60 > now) {
    return formatDistanceToNowStrict(lastOnline, {addSuffix: true, locale: ruLocale})
  }
  if (lastOnline + 1000 * 60 * 60 * 4 > now) {
    return formatDistanceToNowStrict(lastOnline, {addSuffix: true, locale: ruLocale, roundingMethod: "floor"})
  }
  const day = getDay(lastOnline)
  const time = getHoursMins(lastOnline)  
  if (isLessYear(lastOnline, now)) {
    return `${day} в ${time}`
  }
  // когда давно не было, то ничего не отображать
  return ""

}