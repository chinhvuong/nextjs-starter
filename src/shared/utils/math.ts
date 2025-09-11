export const calculatePercentage = (part: number, total: number): number => {
  if (total === 0) return 0;
  return (part / total) * 100;
};

export const calculateCollateralRatio = (
  collateralValue: number,
  borrowedValue: number
): number => {
  if (borrowedValue === 0) return Infinity;
  return (collateralValue / borrowedValue) * 100;
};

export const calculateInterest = (
  principal: number,
  rate: number,
  time: number
): number => {
  return principal * (rate / 100) * time;
};

export const calculateAPY = (apr: number, compoundFrequency = 365): number => {
  return Math.pow(1 + apr / compoundFrequency, compoundFrequency) - 1;
};

export const calculateSlippage = (
  expectedPrice: number,
  actualPrice: number
): number => {
  return Math.abs((actualPrice - expectedPrice) / expectedPrice) * 100;
};

export const roundToDecimals = (value: number, decimals: number): number => {
  return Math.round(value * Math.pow(10, decimals)) / Math.pow(10, decimals);
};

export const clamp = (value: number, min: number, max: number): number => {
  return Math.min(Math.max(value, min), max);
};

export const isWithinRange = (
  value: number,
  min: number,
  max: number
): boolean => {
  return value >= min && value <= max;
}; 