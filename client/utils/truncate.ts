export const truncate = (str = "", length: number) => {
  return str.length <= length ? str : str.substring(0, length - 3) + "...";
}