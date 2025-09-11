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

export interface BorrowFormData {
  collateralToken: Token | null;
  borrowToken: Token | null;
  collateralAmount: string;
  borrowAmount: string;
  interestRateMode: 'stable' | 'variable';
}

export interface BorrowState {
  positions: BorrowPosition[];
  currentForm: BorrowFormData;
  isLoading: boolean;
  error: string | null;
  selectedPosition: BorrowPosition | null;
  validationErrors: string[];
  warnings: string[];
}

export interface CreateBorrowPayload {
  formData: BorrowFormData;
}

export interface UpdateBorrowFormPayload {
  field: keyof BorrowFormData;
  value: string | Token | null | 'stable' | 'variable';
}

export interface RepayBorrowPayload {
  positionId: string;
  amount: string;
} 