import { Token } from '@/shared/types';

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

