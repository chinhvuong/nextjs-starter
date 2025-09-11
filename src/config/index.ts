export * from './chains';
export * from './tokens';
export * from './contracts';

export const APP_CONFIG = {
  name: 'DeFi Borrow App',
  version: '1.0.0',
  description: 'A decentralized borrowing application built with Next.js and Tailwind CSS',
  
  // API Configuration
  api: {
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000/api',
    timeout: 10000,
  },
  
  // Feature Flags
  features: {
    borrow: true,
    lend: false,
    swap: false,
    staking: false,
  },
  
  // UI Configuration
  ui: {
    theme: 'light', // 'light' | 'dark' | 'system'
    defaultChain: 1, // Ethereum Mainnet
    supportedChains: [1, 137, 42161, 10],
  },
  
  // RPC Configuration
  rpc: {
    default: 'https://eth-mainnet.g.alchemy.com/v2/your-api-key',
    fallback: 'https://rpc.ankr.com/eth',
  },
} as const; 