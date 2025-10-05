'use client';

import React from 'react';
import { useBorrowFormContext } from '../contexts/borrow-form-context';
import { cn } from '@/shared/utils/cn';

interface BorrowSummaryProps {
  className?: string;
}

export const BorrowSummary: React.FC<BorrowSummaryProps> = ({ className }) => {
  const { formData } = useBorrowFormContext();

  // Calculate estimated values
  const collateralValue = formData.collateralToken && formData.collateralAmount
    ? parseFloat(formData.collateralAmount) * 2000 // Placeholder ETH price
    : 0;

  const borrowValue = formData.borrowToken && formData.borrowAmount
    ? parseFloat(formData.borrowAmount) * 1 // Placeholder stablecoin price
    : 0;

  const collateralRatio = borrowValue > 0 ? (collateralValue / borrowValue) * 100 : 0;
  const isHealthy = collateralRatio >= 150;

  const getCollateralRatioColor = () => {
    if (collateralRatio === 0) return 'text-gray-600';
    if (collateralRatio < 150) return 'text-red-600';
    if (collateralRatio < 200) return 'text-yellow-600';
    return 'text-green-600';
  };

  const getCollateralRatioStatus = () => {
    if (collateralRatio === 0) return 'No borrow';
    if (collateralRatio < 150) return 'Danger';
    if (collateralRatio < 200) return 'Warning';
    return 'Safe';
  };

  if (!formData.collateralToken || !formData.borrowToken) {
    return (
      <div className={cn('dashboard-card', className)}>
        <div className="text-center text-muted-foreground py-8">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
          </div>
          <p className="text-sm">Select tokens to see borrow summary</p>
        </div>
      </div>
    );
  }

  return (
    <div className={cn('dashboard-card', className)}>
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
          <svg className="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-foreground">Borrow Summary</h3>
      </div>
      
      <div className="space-y-6">
        {/* Collateral Value */}
        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground">Collateral Value</span>
          <span className="font-semibold text-foreground">
            ${collateralValue.toLocaleString()}
          </span>
        </div>

        {/* Borrow Value */}
        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground">Borrow Value</span>
          <span className="font-semibold text-foreground">
            ${borrowValue.toLocaleString()}
          </span>
        </div>

        {/* Collateral Ratio */}
        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground">Collateral Ratio</span>
          <div className="text-right">
            <div className={cn('font-semibold', getCollateralRatioColor())}>
              {collateralRatio.toFixed(1)}%
            </div>
            <div className={cn('text-xs px-2 py-1 rounded-full inline-block mt-1', 
              collateralRatio === 0 ? 'bg-gray-100 text-gray-600' :
              collateralRatio < 150 ? 'bg-error-light text-error' :
              collateralRatio < 200 ? 'bg-warning-light text-warning' :
              'bg-success-light text-success'
            )}>
              {getCollateralRatioStatus()}
            </div>
          </div>
        </div>

        {/* Interest Rate */}
        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground">Interest Rate</span>
          <div className="text-right">
            <span className="font-semibold text-foreground">
              {formData.interestRateMode === 'stable' ? '3.5%' : '2.8%'} APY
            </span>
            <div className="text-xs text-muted-foreground">
              {formData.interestRateMode === 'stable' ? 'Stable' : 'Variable'}
            </div>
          </div>
        </div>

        {/* Liquidation Price */}
        {formData.collateralToken.symbol === 'ETH' && (
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Liquidation Price</span>
            <span className="font-semibold text-foreground">
              ${(collateralValue / (borrowValue * 1.25)).toFixed(0)}
            </span>
          </div>
        )}

        {/* Health Factor */}
        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground">Health Factor</span>
          <div className="text-right">
            <div className={cn('font-semibold', isHealthy ? 'text-success' : 'text-error')}>
              {(collateralRatio / 150).toFixed(2)}
            </div>
            <div className={cn('text-xs px-2 py-1 rounded-full inline-block mt-1', 
              isHealthy ? 'bg-success-light text-success' : 'bg-error-light text-error'
            )}>
              {isHealthy ? 'Safe' : 'At Risk'}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-border pt-4">
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Estimated Fees</span>
            <span className="font-semibold text-foreground">$0.00</span>
          </div>
        </div>
      </div>
    </div>
  );
}; 