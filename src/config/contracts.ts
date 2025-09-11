export const CONTRACT_ADDRESSES = {
  // Aave V3
  AAVE_POOL: '0x8dFf5E27EA6b7AC08EbFdf9eB090F32ee9a30fcf',
  AAVE_POOL_DATA_PROVIDER: '0x145dF0C0653B913f5e0cDF3EF2B5b9C116a3cC5E',
  AAVE_ORACLE: '0x54586bE62A3c9A9d75FA05a6556b0fC1458C4a153',
  
  // Uniswap V3
  UNISWAP_FACTORY: '0x1F98431c8aD98523631AE4a59f267346ea31F984',
  UNISWAP_ROUTER: '0xE592427A0AEce92De3Edee1F18E0157C05861564',
  UNISWAP_QUOTER: '0xb27308f9F90D607463bb33eA1BeBb41C27CE5AB6',
  
  // Compound V3
  COMPOUND_COMPTROLLER: '0x3d9819210A31b4961b30EF54bE2aeD79B9c9Cd3B',
  COMPOUND_CUSDC: '0x39AA39c021dfbaE8faC545936693aC917d5E7563',
  
  // Chainlink Price Feeds
  CHAINLINK_ETH_USD: '0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419',
  CHAINLINK_BTC_USD: '0xF4030086522a5bEEa4988F8cA5B36dbC97BeE88c',
  CHAINLINK_USDC_USD: '0x8fFfFfd4AfB6115b954Bd326cbe7B4BA576818f6',
} as const;

export const CONTRACT_ABIS = {
  // ERC20
  ERC20: [
    'function name() view returns (string)',
    'function symbol() view returns (string)',
    'function decimals() view returns (uint8)',
    'function totalSupply() view returns (uint256)',
    'function balanceOf(address) view returns (uint256)',
    'function transfer(address,uint256) returns (bool)',
    'function allowance(address,address) view returns (uint256)',
    'function approve(address,uint256) returns (bool)',
    'function transferFrom(address,address,uint256) returns (bool)',
    'event Transfer(address indexed from, address indexed to, uint256 value)',
    'event Approval(address indexed owner, address indexed spender, uint256 value)',
  ],
  
  // Aave Pool
  AAVE_POOL: [
    'function supply(address asset, uint256 amount, address onBehalfOf, uint16 referralCode)',
    'function withdraw(address asset, uint256 amount, address to) returns (uint256)',
    'function borrow(address asset, uint256 amount, uint256 interestRateMode, uint16 referralCode, address onBehalfOf)',
    'function repay(address asset, uint256 amount, uint256 interestRateMode, address onBehalfOf) returns (uint256)',
  ],
} as const;

export const getContractAddress = (key: keyof typeof CONTRACT_ADDRESSES): string => {
  return CONTRACT_ADDRESSES[key];
};

export const getContractABI = (key: keyof typeof CONTRACT_ABIS): readonly string[] => {
  return CONTRACT_ABIS[key];
}; 