import { useState, useEffect, useCallback } from 'react';
import { CollateralRatioInfo } from '../types';
import { BORROW_CONSTANTS } from '../constants';
import { calculateCollateralRatio } from '@/shared/utils/math';

export const useCollateralRatio = (
  collateralValue: number,
  borrowedValue: number
) => {
  const [ratioInfo, setRatioInfo] = useState<CollateralRatioInfo>({
    current: 0,
    liquidation: BORROW_CONSTANTS.LIQUIDATION_COLLATERAL_RATIO,
    safe: BORROW_CONSTANTS.SAFE_COLLATERAL_RATIO,
    isHealthy: true,
  });

  // Calculate collateral ratio whenever values change
  useEffect(() => {
    if (borrowedValue === 0) {
      setRatioInfo(prev => ({
        ...prev,
        current: 0,
        isHealthy: true,
      }));
      return;
    }

    const currentRatio = calculateCollateralRatio(collateralValue, borrowedValue);
    const isHealthy = currentRatio >= BORROW_CONSTANTS.MIN_COLLATERAL_RATIO;

    setRatioInfo({
      current: currentRatio,
      liquidation: BORROW_CONSTANTS.LIQUIDATION_COLLATERAL_RATIO,
      safe: BORROW_CONSTANTS.SAFE_COLLATERAL_RATIO,
      isHealthy,
    });
  }, [collateralValue, borrowedValue]);

  const getRatioStatus = useCallback(() => {
    if (ratioInfo.current === 0) return 'no-borrow';
    if (ratioInfo.current <= ratioInfo.liquidation) return 'liquidation';
    if (ratioInfo.current <= BORROW_CONSTANTS.MIN_COLLATERAL_RATIO) return 'danger';
    if (ratioInfo.current <= ratioInfo.safe) return 'warning';
    return 'safe';
  }, [ratioInfo]);

  const getRatioColor = useCallback(() => {
    const status = getRatioStatus();
    switch (status) {
      case 'liquidation':
        return 'text-red-600';
      case 'danger':
        return 'text-orange-600';
      case 'warning':
        return 'text-yellow-600';
      case 'safe':
        return 'text-green-600';
      default:
        return 'text-gray-600';
    }
  }, [getRatioStatus]);

  const getMaxBorrowable = useCallback(() => {
    if (collateralValue === 0) return 0;
    return (collateralValue * BORROW_CONSTANTS.MIN_COLLATERAL_RATIO) / 100;
  }, [collateralValue]);

  const getLiquidationPrice = useCallback(() => {
    const maxBorrowable = getMaxBorrowable();
    if (maxBorrowable === 0) return 0;
    return collateralValue / (maxBorrowable * 1.25);
  }, [collateralValue, getMaxBorrowable]);

  return {
    ratioInfo,
    getRatioStatus,
    getRatioColor,
    getMaxBorrowable,
    getLiquidationPrice,
  };
}; 