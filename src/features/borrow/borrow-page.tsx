'use client';

import React from 'react';
import { BorrowFormProvider } from './contexts/borrow-form-context';
import { BorrowForm } from './components/borrow-form';
import { BorrowSummary } from './components/borrow-summary';
import { useWallet } from '@/shared/hooks/use-wallet';
import { Button } from '@/shared/components/button';

export const BorrowPage: React.FC = () => {
  const { wallet, connectWallet, isConnecting } = useWallet();

  if (!wallet?.isConnected) {
    return (
      <div className="min-h-screen bg-surface-secondary flex items-center justify-center p-4">
        <div className="dashboard-card w-full max-w-md">
          <div className="text-center space-y-6">
            <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto">
              <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground mb-2">Connect Your Wallet</h1>
              <p className="text-muted-foreground">
                Please connect your wallet to start borrowing assets
              </p>
            </div>
            <Button
              onClick={connectWallet}
              loading={isConnecting}
              className="w-full"
              size="lg"
            >
              {isConnecting ? 'Connecting...' : 'Connect Wallet'}
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface-secondary">
      {/* Header Section */}
      <header className="bg-surface border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">DB</span>
              </div>
              <div>
                <h1 className="text-xl font-semibold text-foreground">Borrow Assets</h1>
                <p className="text-sm text-muted-foreground">Secure crypto-backed lending</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 px-3 py-2 bg-success-light rounded-lg">
                <div className="w-2 h-2 bg-success rounded-full"></div>
                <span className="text-sm font-medium text-success">
                  Connected to {wallet.chainId === 1 ? 'Ethereum' : `Chain ${wallet.chainId}`}
                </span>
              </div>
              <div className="px-3 py-2 bg-gray-100 rounded-lg">
                <span className="text-sm text-mono text-foreground">
                  {wallet.address.slice(0, 6)}...{wallet.address.slice(-4)}
                </span>
              </div>
              <Button variant="outline" size="sm" onClick={connectWallet}>
                Disconnect
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation Tabs */}
        <div className="border-b border-border mb-8">
          <nav className="flex space-x-8">
            <button className="tab-button active">Borrow Assets</button>
            <button className="tab-button">My Positions</button>
            <button className="tab-button">Market Rates</button>
            <button className="tab-button">History</button>
          </nav>
        </div>

        {/* Main Content Grid */}
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

        {/* Information Cards */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-foreground mb-6">Important Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="dashboard-card">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-foreground">How it works</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Deposit crypto as collateral and borrow against it. Keep your collateral ratio above 150% to avoid liquidation.
              </p>
            </div>

            <div className="dashboard-card">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-warning-light rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-warning" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-foreground">Risks</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                If your collateral value drops, you may be liquidated. Monitor your positions regularly.
              </p>
            </div>

            <div className="dashboard-card">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-success-light rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-foreground">Fees</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Pay interest on borrowed amounts. Rates vary based on market conditions and utilization.
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-surface border-t border-border py-8 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-6 h-6 bg-primary-600 rounded flex items-center justify-center">
                <span className="text-white font-bold text-xs">DB</span>
              </div>
              <p className="text-sm text-muted-foreground">
                © 2024 DeFi Borrow Dashboard. Built with Next.js and Tailwind CSS 4.
              </p>
            </div>
            <div className="flex items-center space-x-6">
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer">Privacy</a>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer">Terms</a>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer">Support</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}; 