export const parseDate = (date: string | number) => {
  if(typeof date === "number") {
    return date
  }
  return Date.parse(date)
}