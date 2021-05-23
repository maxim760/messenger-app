import { format } from "date-fns"
import { getIntDate } from "./getIntDate"

export const getHoursMins = (date: number | string) => {
  const intDate = getIntDate(date)
  try {
    return format( new Date(intDate), "H:mm")
  } catch (error) {
    console.log("Ошибка при обработке даты: ", error.message)
  }
}