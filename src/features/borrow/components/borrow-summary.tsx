'use client';

import React from 'react';
import { useBorrowFormContext } from '../contexts/borrow-form-context';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/components/card';
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
      <Card className={cn('w-full max-w-md', className)}>
        <CardContent className="p-6">
          <div className="text-center text-muted-foreground">
            Select tokens to see borrow summary
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={cn('w-full max-w-md', className)}>
      <CardHeader>
        <CardTitle>Borrow Summary</CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Collateral Value */}
        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground">Collateral Value</span>
          <span className="font-medium">
            ${collateralValue.toLocaleString()}
          </span>
        </div>

        {/* Borrow Value */}
        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground">Borrow Value</span>
          <span className="font-medium">
            ${borrowValue.toLocaleString()}
          </span>
        </div>

        {/* Collateral Ratio */}
        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground">Collateral Ratio</span>
          <div className="text-right">
            <div className={cn('font-medium', getCollateralRatioColor())}>
              {collateralRatio.toFixed(1)}%
            </div>
            <div className="text-xs text-muted-foreground">
              {getCollateralRatioStatus()}
            </div>
          </div>
        </div>

        {/* Interest Rate */}
        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground">Interest Rate</span>
          <span className="font-medium">
            {formData.interestRateMode === 'stable' ? '3.5%' : '2.8%'} APY
          </span>
        </div>

        {/* Liquidation Price */}
        {formData.collateralToken.symbol === 'ETH' && (
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Liquidation Price</span>
            <span className="font-medium">
              ${(collateralValue / (borrowValue * 1.25)).toFixed(0)}
            </span>
          </div>
        )}

        {/* Health Factor */}
        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground">Health Factor</span>
          <div className="text-right">
            <div className={cn('font-medium', isHealthy ? 'text-green-600' : 'text-red-600')}>
              {(collateralRatio / 150).toFixed(2)}
            </div>
            <div className="text-xs text-muted-foreground">
              {isHealthy ? 'Safe' : 'At Risk'}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t pt-4">
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Estimated Fees</span>
            <span className="font-medium">$0.00</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}; 