import { Token } from '@/shared/types';

export interface BorrowFormData {
  collateralToken: Token | null;
  borrowToken: Token | null;
  collateralAmount: string;
  borrowAmount: string;
  interestRateMode: 'stable' | 'variable';
}

export interface BorrowPosition {
  id: string;
  collateralToken: Token;
  borrowToken: Token;
  collateralAmount: string;
  borrowedAmount: string;
  collateralRatio: number;
  healthFactor: number;
  interestRate: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface BorrowValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
}

export interface InterestRateInfo {
  stable: number;
  variable: number;
  utilizationRate: number;
}

export interface CollateralRatioInfo {
  current: number;
  liquidation: number;
  safe: number;
  isHealthy: boolean;
}

export interface BorrowEstimate {
  maxBorrowable: string;
  liquidationPrice: number;
  gasEstimate: string;
  fees: string;
} 