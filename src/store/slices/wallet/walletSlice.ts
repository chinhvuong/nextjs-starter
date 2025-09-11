import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { WalletState, Wallet, UpdateBalancePayload } from './types';

const initialState: WalletState = {
  wallet: null,
  isConnecting: false,
  error: null,
  supportedChains: [1, 137, 42161, 10], // Ethereum, Polygon, Arbitrum, Optimism
  currentChain: 1,
};

const walletSlice = createSlice({
  name: 'wallet',
  initialState,
  reducers: {
    // Connect wallet actions
    connectWalletStart: (state) => {
      state.isConnecting = true;
      state.error = null;
    },
    connectWalletSuccess: (state, action: PayloadAction<Wallet>) => {
      state.isConnecting = false;
      state.wallet = action.payload;
      state.currentChain = action.payload.chainId;
      state.error = null;
    },
    connectWalletFailure: (state, action: PayloadAction<string>) => {
      state.isConnecting = false;
      state.error = action.payload;
    },

    // Disconnect wallet
    disconnectWallet: (state) => {
      state.wallet = null;
      state.currentChain = null;
      state.error = null;
    },

    // Switch chain actions
    switchChainStart: (state) => {
      state.isConnecting = true;
      state.error = null;
    },
    switchChainSuccess: (state, action: PayloadAction<number>) => {
      state.currentChain = action.payload;
      if (state.wallet) {
        state.wallet.chainId = action.payload;
      }
      state.isConnecting = false;
      state.error = null;
    },
    switchChainFailure: (state, action: PayloadAction<string>) => {
      state.isConnecting = false;
      state.error = action.payload;
    },

    // Update balance
    updateBalance: (state, action: PayloadAction<UpdateBalancePayload>) => {
      if (state.wallet && state.wallet.address === action.payload.address) {
        state.wallet.balance = action.payload.balance;
      }
    },

    // Update wallet info
    updateWalletInfo: (state, action: PayloadAction<Partial<Wallet>>) => {
      if (state.wallet) {
        state.wallet = { ...state.wallet, ...action.payload };
      }
    },

    // Clear error
    clearError: (state) => {
      state.error = null;
    },

    // Set supported chains
    setSupportedChains: (state, action: PayloadAction<number[]>) => {
      state.supportedChains = action.payload;
    },
  },
});

export const {
  connectWalletStart,
  connectWalletSuccess,
  connectWalletFailure,
  disconnectWallet,
  switchChainStart,
  switchChainSuccess,
  switchChainFailure,
  updateBalance,
  updateWalletInfo,
  clearError,
  setSupportedChains,
} = walletSlice.actions;

export default walletSlice.reducer; 