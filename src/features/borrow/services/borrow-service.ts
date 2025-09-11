import { BorrowFormData, BorrowPosition, BorrowEstimate, InterestRateInfo } from '../types';
import { BORROW_CONSTANTS } from '../constants';
import { Token } from '@/shared/types';

export class BorrowService {
  static async calculateBorrowEstimate(
    collateralToken: Token,
    collateralAmount: string,
    _borrowToken: Token
  ): Promise<BorrowEstimate> {
    const collateralValue = this.calculateTokenValue(
      collateralToken,
      parseFloat(collateralAmount)
    );
    
    // Calculate max borrowable based on collateral ratio
    const maxBorrowable = (collateralValue * BORROW_CONSTANTS.MIN_COLLATERAL_RATIO) / 100;
    
    // Calculate liquidation price
    const liquidationPrice = collateralValue / (maxBorrowable * 1.25);
    
    // Estimate gas (this would be more accurate with actual contract calls)
    const gasEstimate = BORROW_CONSTANTS.BORROW_GAS_LIMIT.toString();
    
    // Calculate fees
    const fees = (maxBorrowable * BORROW_CONSTANTS.BORROW_FEE).toString();
    
    return {
      maxBorrowable: maxBorrowable.toString(),
      liquidationPrice,
      gasEstimate,
      fees,
    };
  }

  static async getInterestRates(_borrowToken: Token): Promise<InterestRateInfo> {
    // This would typically fetch from the lending protocol
    // For now, return default values
    return {
      stable: BORROW_CONSTANTS.DEFAULT_STABLE_RATE,
      variable: BORROW_CONSTANTS.DEFAULT_VARIABLE_RATE,
      utilizationRate: 65.5, // 65.5%
    };
  }

  static async createBorrowPosition(
    data: BorrowFormData
  ): Promise<BorrowPosition> {
    // This would typically interact with smart contracts
    // For now, create a mock position
    
    if (!data.collateralToken || !data.borrowToken) {
      throw new Error('Both collateral and borrow tokens must be selected');
    }
    
    const collateralValue = this.calculateTokenValue(
      data.collateralToken,
      parseFloat(data.collateralAmount)
    );
    const borrowValue = this.calculateTokenValue(
      data.borrowToken,
      parseFloat(data.borrowAmount)
    );
    
    const collateralRatio = (collateralValue / borrowValue) * 100;
    const healthFactor = collateralRatio / BORROW_CONSTANTS.MIN_COLLATERAL_RATIO;
    
    const position: BorrowPosition = {
      id: this.generatePositionId(),
      collateralToken: data.collateralToken,
      borrowToken: data.borrowToken,
      collateralAmount: data.collateralAmount,
      borrowedAmount: data.borrowAmount,
      collateralRatio,
      healthFactor,
      interestRate: data.interestRateMode === 'stable' 
        ? BORROW_CONSTANTS.DEFAULT_STABLE_RATE 
        : BORROW_CONSTANTS.DEFAULT_VARIABLE_RATE,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    
    return position;
  }

  static async getBorrowPositions(_userAddress: string): Promise<BorrowPosition[]> {
    // This would typically fetch from the blockchain or API
    // For now, return empty array
    return [];
  }

  static async repayBorrow(
    _positionId: string,
    _amount: string
  ): Promise<boolean> {
    // This would typically interact with smart contracts
    // For now, return success
    return true;
  }

  static async addCollateral(
    _positionId: string,
    _amount: string
  ): Promise<boolean> {
    // This would typically interact with smart contracts
    // For now, return success
    return true;
  }

  private static calculateTokenValue(token: Token, amount: number): number {
    // This would typically fetch the current price from an oracle
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

  private static generatePositionId(): string {
    return `pos_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }
} 