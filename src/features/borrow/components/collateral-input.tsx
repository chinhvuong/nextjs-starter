'use client';

import React from 'react';
import { useBorrowFormContext } from '../contexts/borrow-form-context';
import { cn } from '@/shared/utils/cn';

interface CollateralInputProps {
  className?: string;
}

export const CollateralInput: React.FC<CollateralInputProps> = ({ className }) => {
  const { formData, updateCollateralAmount } = useBorrowFormContext();

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Only allow positive numbers and decimals
    if (/^\d*\.?\d*$/.test(value) || value === '') {
      updateCollateralAmount(value);
    }
  };

  const handleMaxClick = () => {
    // This would typically fetch the user's balance
    // For now, set a placeholder value
    updateCollateralAmount('10');
  };

  return (
    <div className={cn('space-y-2', className)}>
      <label className="text-sm font-medium text-foreground">
        Collateral Amount
      </label>
      
      <div className="relative">
        <input
          type="text"
          value={formData.collateralAmount}
          onChange={handleAmountChange}
          placeholder="0.0"
          className="input pr-20"
        />
        
        <button
          type="button"
          onClick={handleMaxClick}
          className="absolute right-2 top-1/2 -translate-y-1/2 text-sm text-primary hover:text-primary/80 font-medium"
        >
          MAX
        </button>
      </div>
      
      {formData.collateralToken && (
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span>Available: 0.0 {formData.collateralToken.symbol}</span>
          <span>≈ $0.00</span>
        </div>
      )}
    </div>
  );
}; 