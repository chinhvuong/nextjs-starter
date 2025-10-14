export const BORROW_CONSTANTS = {
  // Collateral ratios
  MIN_COLLATERAL_RATIO: 150, // 150%
  SAFE_COLLATERAL_RATIO: 200, // 200%
  LIQUIDATION_COLLATERAL_RATIO: 125, // 125%
  
  // Gas limits
  BORROW_GAS_LIMIT: 300000,
  REPAY_GAS_LIMIT: 200000,
  
  // Fees
  BORROW_FEE: 0.0005, // 0.05%
  LIQUIDATION_FEE: 0.05, // 5%
  
  // Timeouts
  TRANSACTION_TIMEOUT: 300000, // 5 minutes
  PRICE_UPDATE_INTERVAL: 30000, // 30 seconds
} as const;

export const BORROW_STATUS = {
  PENDING: 'pending',
  APPROVED: 'approved',
  REJECTED: 'rejected',
  COMPLETED: 'completed',
  FAILED: 'failed',
} as const;

