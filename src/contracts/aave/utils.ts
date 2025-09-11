import { ethers, BrowserProvider, Contract } from 'ethers';
import { CONTRACT_ADDRESSES, CONTRACT_ABIS } from '@/config/contracts';

export class AaveUtils {
  private static provider: BrowserProvider | null = null;
  private static signer: ethers.Signer | null = null;

  static async initialize(provider: BrowserProvider) {
    this.provider = provider;
    this.signer = await provider.getSigner();
  }

  static async getPoolContract() {
    if (!this.signer) {
      throw new Error('Provider not initialized');
    }

    return new Contract(
      CONTRACT_ADDRESSES.AAVE_POOL,
      CONTRACT_ABIS.AAVE_POOL,
      this.signer
    );
  }

  static async supply(
    asset: string,
    amount: string,
    onBehalfOf: string,
    referralCode: number = 0
  ) {
    const contract = await this.getPoolContract();
    
    const tx = await contract.supply(
      asset,
      ethers.parseUnits(amount, 18), // Assuming 18 decimals
      onBehalfOf,
      referralCode
    );
    
    return await tx.wait();
  }

  static async withdraw(
    asset: string,
    amount: string,
    to: string
  ) {
    const contract = await this.getPoolContract();
    
    const tx = await contract.withdraw(
      asset,
      ethers.parseUnits(amount, 18),
      to
    );
    
    return await tx.wait();
  }

  static async borrow(
    asset: string,
    amount: string,
    interestRateMode: number, // 1 for stable, 2 for variable
    referralCode: number = 0,
    onBehalfOf: string
  ) {
    const contract = await this.getPoolContract();
    
    const tx = await contract.borrow(
      asset,
      ethers.parseUnits(amount, 18),
      interestRateMode,
      referralCode,
      onBehalfOf
    );
    
    return await tx.wait();
  }

  static async repay(
    asset: string,
    amount: string,
    interestRateMode: number,
    onBehalfOf: string
  ) {
    const contract = await this.getPoolContract();
    
    const tx = await contract.repay(
      asset,
      ethers.parseUnits(amount, 18),
      interestRateMode,
      onBehalfOf
    );
    
    return await tx.wait();
  }

  static async getUserAccountData(userAddress: string) {
    if (!this.provider) {
      throw new Error('Provider not initialized');
    }

    const dataProvider = new Contract(
      CONTRACT_ADDRESSES.AAVE_POOL_DATA_PROVIDER,
      [
        'function getUserAccountData(address user) view returns (uint256 totalCollateralETH, uint256 totalDebtETH, uint256 availableBorrowsETH, uint256 currentLiquidationThreshold, uint256 ltv, uint256 healthFactor)'
      ],
      this.provider
    );

    return await dataProvider.getUserAccountData(userAddress);
  }

  static async getReserveData(asset: string) {
    if (!this.provider) {
      throw new Error('Provider not initialized');
    }

    const dataProvider = new Contract(
      CONTRACT_ADDRESSES.AAVE_POOL_DATA_PROVIDER,
      [
        'function getReserveData(address asset) view returns (uint256 configuration, uint256 liquidityIndex, uint256 variableBorrowIndex, uint256 currentLiquidityRate, uint256 currentVariableBorrowRate, uint256 currentStableBorrowRate, uint256 lastUpdateTimestamp, uint16 id, address aTokenAddress, address stableDebtTokenAddress, address variableDebtTokenAddress, address interestRateStrategyAddress, uint8 decimals)'
      ],
      this.provider
    );

    return await dataProvider.getReserveData(asset);
  }
} 