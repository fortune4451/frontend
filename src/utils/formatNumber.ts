// utils/formatNumber.ts
export const formatNumber = (num: number | string) => {
  const parsedNum = typeof num === 'string' ? parseFloat(num) : num;
  return parsedNum.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
};
