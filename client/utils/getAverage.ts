export const getAverage = (numbers: number[]) =>
  numbers.reduce((acc, value) => acc + value) / numbers.length;
export const getSquareAverage = (numbers: number[]) => {
  const squareSum = numbers.reduce((acc, value) => acc + value ** 2) / numbers.length;
  return Math.sqrt(squareSum) / numbers.length

}
