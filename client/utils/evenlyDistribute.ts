import { getAverage } from "./getAverage";

export const evenlyDistribute = (array: number[], parts: number): number[] => {
  const result = [];
  if (parts === array.length) {
    return array
  }
  if (parts > array.length) {
    const coef = array.length / parts;
    let sum = 0;
    for (let i = 0; i < parts; i++) {
      const idx1 = sum > 0 && Number.isInteger(sum) ? sum - 1 : ~~(sum);
      sum += coef;
      const idx2 = ~~(sum);
      result.push((idx1 === idx2) || (idx2 === array.length) ? array[idx1] : getAverage([array[idx1], array[idx2]]))
    }
    
    return result
  } else {
    for (let i = parts; i > 0; i--) {
      result.push(getAverage(array.splice(0, Math.ceil(array.length / i))));
    }
    return result;
  }
};
