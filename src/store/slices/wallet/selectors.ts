import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../../types';

// Base selectors
const selectWalletState = (state: RootState) => state.wallet;

// Memoized selectors
export const selectWallet = createSelector(
  [selectWalletState],
  (wallet) => wallet.wallet
);

export const selectIsWalletConnected = createSelector(
  [selectWallet],
  (wallet) => wallet?.isConnected || false
);

export const selectWalletAddress = createSelector(
  [selectWallet],
  (wallet) => wallet?.address || null
);

export const selectWalletChainId = createSelector(
  [selectWallet],
  (wallet) => wallet?.chainId || null
);

export const selectWalletBalance = createSelector(
  [selectWallet],
  (wallet) => wallet?.balance || '0'
);

export const selectWalletLoading = createSelector(
  [selectWalletState],
  (wallet) => wallet.isConnecting
);

export const selectWalletError = createSelector(
  [selectWalletState],
  (wallet) => wallet.error
);

export const selectSupportedChains = createSelector(
  [selectWalletState],
  (wallet) => wallet.supportedChains
);

export const selectCurrentChain = createSelector(
  [selectWalletState],
  (wallet) => wallet.currentChain
);

export const selectIsCorrectNetwork = createSelector(
  [selectCurrentChain, selectSupportedChains],
  (currentChain, supportedChains) => 
    currentChain ? supportedChains.includes(currentChain) : false
); 