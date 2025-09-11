'use client';

import React from 'react';
import { BorrowFormProvider } from './contexts/borrow-form-context';
import { BorrowForm } from './components/borrow-form';
import { BorrowSummary } from './components/borrow-summary';
import { useWallet } from '@/shared/hooks/use-wallet';
import { Button } from '@/shared/components/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/components/card';

export const BorrowPage: React.FC = () => {
  const { wallet, connectWallet, isConnecting } = useWallet();

  if (!wallet?.isConnected) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle>Connect Wallet</CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <p className="text-muted-foreground">
              Please connect your wallet to start borrowing assets
            </p>
            <Button
              onClick={connectWallet}
              loading={isConnecting}
              className="w-full"
            >
              {isConnecting ? 'Connecting...' : 'Connect Wallet'}
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Borrow Assets
          </h1>
          <p className="text-muted-foreground">
            Use your crypto as collateral to borrow stablecoins and other assets
          </p>
        </div>

        {/* Wallet Info */}
        <div className="mb-6">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-muted-foreground">
                    Connected to {wallet.chainId === 1 ? 'Ethereum' : `Chain ${wallet.chainId}`}
                  </span>
                </div>
                <span className="text-sm font-mono text-muted-foreground">
                  {wallet.address.slice(0, 6)}...{wallet.address.slice(-4)}
                </span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Borrow Form */}
          <div className="lg:col-span-2">
            <BorrowFormProvider>
              <BorrowForm />
            </BorrowFormProvider>
          </div>

          {/* Borrow Summary */}
          <div className="lg:col-span-1">
            <BorrowFormProvider>
              <BorrowSummary />
            </BorrowFormProvider>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">How it works</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Deposit crypto as collateral and borrow against it. Keep your collateral ratio above 150% to avoid liquidation.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Risks</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                If your collateral value drops, you may be liquidated. Monitor your positions regularly.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Fees</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Pay interest on borrowed amounts. Rates vary based on market conditions and utilization.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}; 