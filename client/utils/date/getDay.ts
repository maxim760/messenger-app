import { format } from "date-fns"
import ruLocale from "date-fns/locale/ru"
import { getIntDate } from "./getIntDate"



export const getDay = (date: number | string) => {
  const intDate = getIntDate(date)
  const day = new Date(intDate).toDateString()
  const today = new Date(Date.now()).toDateString()
  if (day === today) {
    return "Сегодня"
  }
  const yesterday = new Date((new Date()).valueOf() - 1000*60*60*24).toDateString()
  if (day === yesterday) {
    return "Вчера"
  }
  return format(new Date(intDate), "d MMMM", {locale: ruLocale})
}