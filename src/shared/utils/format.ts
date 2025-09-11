export const formatAddress = (address: string, start = 6, end = 4): string => {
  if (!address) return '';
  return `${address.slice(0, start)}...${address.slice(-end)}`;
};

export const formatNumber = (
  value: number,
  decimals = 2,
  locale = 'en-US'
): string => {
  if (isNaN(value)) return '0';
  
  return new Intl.NumberFormat(locale, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value);
};

export const formatCurrency = (
  value: number,
  currency = 'USD',
  locale = 'en-US'
): string => {
  if (isNaN(value)) return '$0.00';
  
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
};

export const formatPercentage = (
  value: number,
  decimals = 2,
  locale = 'en-US'
): string => {
  if (isNaN(value)) return '0%';
  
  return new Intl.NumberFormat(locale, {
    style: 'percent',
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value / 100);
};

export const formatTokenAmount = (
  amount: number,
  decimals: number,
  symbol: string
): string => {
  const formattedAmount = formatNumber(amount, decimals);
  return `${formattedAmount} ${symbol}`;
}; 