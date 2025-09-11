import { Token } from '@/shared/types';

export const SUPPORTED_TOKENS: Token[] = [
  {
    symbol: 'ETH',
    name: 'Ethereum',
    address: '0x0000000000000000000000000000000000000000',
    decimals: 18,
    logoURI: '/tokens/eth.svg',
  },
  {
    symbol: 'USDC',
    name: 'USD Coin',
    address: '0xA0b86a33E6441b8c4C8D7C3C0C0C0C0C0C0C0C0C',
    decimals: 6,
    logoURI: '/tokens/usdc.svg',
  },
  {
    symbol: 'USDT',
    name: 'Tether USD',
    address: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
    decimals: 6,
    logoURI: '/tokens/usdt.svg',
  },
  {
    symbol: 'DAI',
    name: 'Dai Stablecoin',
    address: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
    decimals: 18,
    logoURI: '/tokens/dai.svg',
  },
  {
    symbol: 'WBTC',
    name: 'Wrapped Bitcoin',
    address: '0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599',
    decimals: 8,
    logoURI: '/tokens/wbtc.svg',
  },
  {
    symbol: 'WETH',
    name: 'Wrapped Ether',
    address: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
    decimals: 18,
    logoURI: '/tokens/weth.svg',
  },
];

export const getTokenBySymbol = (symbol: string): Token | undefined => {
  return SUPPORTED_TOKENS.find(token => 
    token.symbol.toLowerCase() === symbol.toLowerCase()
  );
};

export const getTokenByAddress = (address: string): Token | undefined => {
  return SUPPORTED_TOKENS.find(token => 
    token.address.toLowerCase() === address.toLowerCase()
  );
};

export const getStablecoins = (): Token[] => {
  return SUPPORTED_TOKENS.filter(token => 
    ['USDC', 'USDT', 'DAI'].includes(token.symbol)
  );
};

export const getCollateralTokens = (): Token[] => {
  return SUPPORTED_TOKENS.filter(token => 
    ['ETH', 'WBTC', 'WETH'].includes(token.symbol)
  );
}; 