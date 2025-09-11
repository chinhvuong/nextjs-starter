export interface Wallet {
  address: string;
  chainId: number;
  isConnected: boolean;
  balance: string;
  networkName: string;
}

export interface WalletState {
  wallet: Wallet | null;
  isConnecting: boolean;
  error: string | null;
  supportedChains: number[];
  currentChain: number | null;
}

export interface ConnectWalletPayload {
  provider: 'metamask' | 'walletconnect' | 'coinbase';
}

export interface SwitchChainPayload {
  chainId: number;
}

export interface UpdateBalancePayload {
  address: string;
  balance: string;
} 