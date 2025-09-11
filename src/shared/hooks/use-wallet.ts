'use client';

import { useState, useEffect, useCallback } from 'react';
import { Wallet } from '@/shared/types';

export const useWallet = () => {
  const [wallet, setWallet] = useState<Wallet | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const connectWallet = useCallback(async () => {
    setIsConnecting(true);
    setError(null);
    
    try {
      // Check if MetaMask is installed
      if (typeof window.ethereum === 'undefined') {
        throw new Error('MetaMask is not installed');
      }

      // Request account access
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
      }) as string[];

      if (accounts.length === 0) {
        throw new Error('No accounts found');
      }

      const account = accounts[0];
      const chainId = await window.ethereum.request({
        method: 'eth_chainId',
      }) as string;

      const walletData: Wallet = {
        address: account,
        chainId: parseInt(chainId, 16),
        isConnected: true,
      };

      setWallet(walletData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to connect wallet');
    } finally {
      setIsConnecting(false);
    }
  }, []);

  const disconnectWallet = useCallback(() => {
    setWallet(null);
    setError(null);
  }, []);

  const switchChain = useCallback(async (chainId: number) => {
    if (!wallet || !window.ethereum) return;
    
    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: `0x${chainId.toString(16)}` }],
      });
      
      // Update wallet with new chain ID
      setWallet(prev => prev ? { ...prev, chainId } : null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to switch chain');
    }
  }, [wallet]);

  useEffect(() => {
    // Check if wallet is already connected
    if (typeof window.ethereum !== 'undefined') {
      window.ethereum.on('accountsChanged', (accounts: unknown) => {
        const accountsArray = accounts as string[];
        if (accountsArray.length === 0) {
          setWallet(null);
        } else {
          setWallet(prev => prev ? { ...prev, address: accountsArray[0] } : null);
        }
      });

      window.ethereum.on('chainChanged', (chainId: unknown) => {
        const chainIdString = chainId as string;
        setWallet(prev => prev ? { ...prev, chainId: parseInt(chainIdString, 16) } : null);
      });
    }

    return () => {
      if (typeof window.ethereum !== 'undefined') {
        window.ethereum.removeAllListeners();
      }
    };
  }, []);

  return {
    wallet,
    isConnecting,
    error,
    connectWallet,
    disconnectWallet,
    switchChain,
  };
}; 