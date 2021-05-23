import { format } from "date-fns"
import { getIntDate } from "./getIntDate"

export const getMinsSec = (date: number | string) => {
  const intDate = getIntDate(date)
  return format( new Date(intDate), "m:ss")
}