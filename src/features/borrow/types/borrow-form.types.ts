import { Token } from '@/shared/types';

export interface BorrowFormData {
  collateralToken: Token | null;
  borrowToken: Token | null;
  collateralAmount: string;
  borrowAmount: string;
  interestRateMode: 'stable' | 'variable';
}

