import { BorrowFormData, BorrowValidationResult } from '../types';
import { BORROW_CONSTANTS } from '../constants';
import { Token } from '@/shared/types';

export class BorrowValidationService {
  static validateForm(data: BorrowFormData): BorrowValidationResult {
    const errors: string[] = [];
    const warnings: string[] = [];

    // Validate collateral token
    if (!data.collateralToken) {
      errors.push('Collateral token is required');
    }

    // Validate borrow token
    if (!data.borrowToken) {
      errors.push('Borrow token is required');
    }

    // Validate amounts
    if (!data.collateralAmount || parseFloat(data.collateralAmount) <= 0) {
      errors.push('Collateral amount must be greater than 0');
    }

    if (!data.borrowAmount || parseFloat(data.borrowAmount) <= 0) {
      errors.push('Borrow amount must be greater than 0');
    }

    // Validate minimum borrow amount
    const borrowAmount = parseFloat(data.borrowAmount);
    if (borrowAmount < parseFloat(BORROW_CONSTANTS.MIN_BORROW_AMOUNT)) {
      errors.push(`Minimum borrow amount is $${BORROW_CONSTANTS.MIN_BORROW_AMOUNT}`);
    }

    // Validate maximum borrow amount
    if (borrowAmount > parseFloat(BORROW_CONSTANTS.MAX_BORROW_AMOUNT)) {
      errors.push(`Maximum borrow amount is $${BORROW_CONSTANTS.MAX_BORROW_AMOUNT}`);
    }

    // Validate collateral ratio
    if (data.collateralToken && data.borrowToken) {
      const collateralValue = this.calculateTokenValue(
        data.collateralToken,
        parseFloat(data.collateralAmount)
      );
      const borrowValue = this.calculateTokenValue(
        data.borrowToken,
        borrowAmount
      );

      if (collateralValue > 0 && borrowValue > 0) {
        const collateralRatio = (collateralValue / borrowValue) * 100;
        
        if (collateralRatio < BORROW_CONSTANTS.MIN_COLLATERAL_RATIO) {
          errors.push(`Collateral ratio must be at least ${BORROW_CONSTANTS.MIN_COLLATERAL_RATIO}%`);
        } else if (collateralRatio < BORROW_CONSTANTS.SAFE_COLLATERAL_RATIO) {
          warnings.push(`Collateral ratio is below safe threshold of ${BORROW_CONSTANTS.SAFE_COLLATERAL_RATIO}%`);
        }
      }
    }

    // Validate interest rate mode
    if (!['stable', 'variable'].includes(data.interestRateMode)) {
      errors.push('Invalid interest rate mode');
    }

    return {
      isValid: errors.length === 0,
      errors,
      warnings,
    };
  }

  static validateCollateralRatio(
    collateralValue: number,
    borrowedValue: number
  ): boolean {
    if (borrowedValue === 0) return true;
    
    const ratio = (collateralValue / borrowedValue) * 100;
    return ratio >= BORROW_CONSTANTS.MIN_COLLATERAL_RATIO;
  }

  static validateLiquidationRisk(
    collateralValue: number,
    borrowedValue: number
  ): boolean {
    if (borrowedValue === 0) return false;
    
    const ratio = (collateralValue / borrowedValue) * 100;
    return ratio <= BORROW_CONSTANTS.LIQUIDATION_COLLATERAL_RATIO;
  }

  private static calculateTokenValue(token: Token, amount: number): number {
    // This would typically fetch the current price from an oracle
    // For now, we'll use placeholder values
    const prices: Record<string, number> = {
      ETH: 2000,
      USDC: 1,
      USDT: 1,
      DAI: 1,
      WBTC: 40000,
      WETH: 2000,
    };
    
    return amount * (prices[token.symbol] || 0);
  }
} 