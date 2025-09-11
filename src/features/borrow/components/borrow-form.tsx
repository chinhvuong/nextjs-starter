'use client';

import React from 'react';
import { useBorrowFormContext } from '../contexts/borrow-form-context';
import { TokenSelector } from './token-selector';
import { CollateralInput } from './collateral-input';
import { Button } from '@/shared/components/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/components/card';
import { cn } from '@/shared/utils/cn';

interface BorrowFormProps {
  className?: string;
}

export const BorrowForm: React.FC<BorrowFormProps> = ({ className }) => {
  const {
    formData,
    validation,
    isSubmitting,
    updateCollateralToken,
    updateBorrowToken,
    updateBorrowAmount,
    updateInterestRateMode,
    submitForm,
  } = useBorrowFormContext();

  const handleBorrowAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^\d*\.?\d*$/.test(value) || value === '') {
      updateBorrowAmount(value);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validation.isValid) return;
    
    const result = await submitForm();
    if (result.success) {
      // Handle success
      console.log('Borrow successful');
    } else {
      // Handle error
      console.error('Borrow failed:', result.error);
    }
  };

  return (
    <Card className={cn('w-full max-w-2xl', className)}>
      <CardHeader>
        <CardTitle>Borrow Assets</CardTitle>
      </CardHeader>
      
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Collateral Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Collateral</h3>
            
            <div className="space-y-4">
              <TokenSelector
                selectedToken={formData.collateralToken}
                onTokenSelect={updateCollateralToken}
                tokenType="collateral"
              />
              
              <CollateralInput />
            </div>
          </div>

          {/* Borrow Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Borrow</h3>
            
            <div className="space-y-4">
              <TokenSelector
                selectedToken={formData.borrowToken}
                onTokenSelect={updateBorrowToken}
                tokenType="borrow"
              />
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">
                  Borrow Amount
                </label>
                <input
                  type="text"
                  value={formData.borrowAmount}
                  onChange={handleBorrowAmountChange}
                  placeholder="0.0"
                  className="input"
                />
                {formData.borrowToken && (
                  <div className="text-sm text-muted-foreground">
                    Available to borrow: $0.00
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Interest Rate Mode */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">
              Interest Rate Mode
            </label>
            <div className="flex space-x-2">
              <button
                type="button"
                onClick={() => updateInterestRateMode('stable')}
                className={cn(
                  'px-4 py-2 rounded-lg border transition-colors',
                  formData.interestRateMode === 'stable'
                    ? 'border-primary bg-primary text-primary-foreground'
                    : 'border-border hover:border-primary/50'
                )}
              >
                Stable
              </button>
              <button
                type="button"
                onClick={() => updateInterestRateMode('variable')}
                className={cn(
                  'px-4 py-2 rounded-lg border transition-colors',
                  formData.interestRateMode === 'variable'
                    ? 'border-primary bg-primary text-primary-foreground'
                    : 'border-border hover:border-primary/50'
                )}
              >
                Variable
              </button>
            </div>
          </div>

          {/* Validation Errors */}
          {validation.errors.length > 0 && (
            <div className="space-y-2">
              {validation.errors.map((error: string, index: number) => (
                <div key={index} className="text-sm text-red-600 bg-red-50 p-3 rounded-lg">
                  {error}
                </div>
              ))}
            </div>
          )}

          {/* Validation Warnings */}
          {validation.warnings.length > 0 && (
            <div className="space-y-2">
              {validation.warnings.map((warning: string, index: number) => (
                <div key={index} className="text-sm text-yellow-600 bg-yellow-50 p-3 rounded-lg">
                  {warning}
                </div>
              ))}
            </div>
          )}

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={!validation.isValid || isSubmitting}
            loading={isSubmitting}
            className="w-full"
          >
            {isSubmitting ? 'Processing...' : 'Borrow'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}; 