export const getIntDate = (date: string | number) => {
  return typeof date === "number"? date : Date.parse(date)

}