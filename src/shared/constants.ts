export const SUPPORTED_CHAINS = {
  MAINNET: 1,
  POLYGON: 137,
  ARBITRUM: 42161,
  OPTIMISM: 10,
} as const;

export const DEFAULT_GAS_LIMIT = 300000;
export const DEFAULT_SLIPPAGE = 0.5; // 0.5%

export const TOKEN_DECIMALS = {
  ETH: 18,
  USDC: 6,
  USDT: 6,
  DAI: 18,
} as const;

export const API_ENDPOINTS = {
  PRICE_FEED: '/api/price',
  GAS_ESTIMATE: '/api/gas',
  TRANSACTION_STATUS: '/api/transaction',
} as const;

export const ERROR_MESSAGES = {
  WALLET_NOT_CONNECTED: 'Please connect your wallet',
  INSUFFICIENT_BALANCE: 'Insufficient balance',
  TRANSACTION_FAILED: 'Transaction failed',
  NETWORK_ERROR: 'Network error occurred',
} as const; 