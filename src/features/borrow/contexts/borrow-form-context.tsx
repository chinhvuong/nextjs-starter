'use client';

import React, { createContext, useContext, ReactNode } from 'react';
import { useBorrowForm } from '../hooks/use-borrow-form';
import { Token } from '@/shared/types';

interface BorrowFormContextType {
  formData: {
    collateralToken: Token | null;
    borrowToken: Token | null;
    collateralAmount: string;
    borrowAmount: string;
    interestRateMode: 'stable' | 'variable';
  };
  validation: {
    isValid: boolean;
    errors: string[];
    warnings: string[];
  };
  isSubmitting: boolean;
  updateCollateralToken: (token: Token | null) => void;
  updateBorrowToken: (token: Token | null) => void;
  updateCollateralAmount: (amount: string) => void;
  updateBorrowAmount: (amount: string) => void;
  updateInterestRateMode: (mode: 'stable' | 'variable') => void;
  resetForm: () => void;
  submitForm: () => Promise<{ success: boolean; error?: string }>;
}

const BorrowFormContext = createContext<BorrowFormContextType | undefined>(undefined);

interface BorrowFormProviderProps {
  children: ReactNode;
}

export const BorrowFormProvider: React.FC<BorrowFormProviderProps> = ({ children }) => {
  const borrowForm = useBorrowForm();

  return (
    <BorrowFormContext.Provider value={borrowForm}>
      {children}
    </BorrowFormContext.Provider>
  );
};

export const useBorrowFormContext = (): BorrowFormContextType => {
  const context = useContext(BorrowFormContext);
  
  if (context === undefined) {
    throw new Error('useBorrowFormContext must be used within a BorrowFormProvider');
  }
  
  return context;
}; 