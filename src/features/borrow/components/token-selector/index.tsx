'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Token } from '@/shared/types';
import { getCollateralTokens, getStablecoins } from '@/config/tokens';
import { Button } from '@/shared/components/button';
import { cn } from '@/shared/utils/cn';

interface TokenSelectorProps {
  selectedToken: Token | null;
  onTokenSelect: (token: Token) => void;
  tokenType: 'collateral' | 'borrow';
  className?: string;
}

export const TokenSelector: React.FC<TokenSelectorProps> = ({
  selectedToken,
  onTokenSelect,
  tokenType,
  className,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const availableTokens = tokenType === 'collateral' ? getCollateralTokens() : getStablecoins();

  const handleTokenSelect = (token: Token) => {
    onTokenSelect(token);
    setIsOpen(false);
  };

  return (
    <div className={cn('relative', className)}>
      <Button
        variant="outline"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full justify-between"
      >
        {selectedToken ? (
          <div className="flex items-center space-x-2">
            {selectedToken.logoURI && (
              <Image
                src={selectedToken.logoURI}
                alt={selectedToken.symbol}
                width={24}
                height={24}
                className="w-6 h-6 rounded-full"
              />
            )}
            <span className="font-medium">{selectedToken.symbol}</span>
            <span className="text-sm text-muted-foreground">
              {selectedToken.name}
            </span>
          </div>
        ) : (
          <span className="text-muted-foreground">
            Select {tokenType === 'collateral' ? 'collateral' : 'borrow'} token
          </span>
        )}
        <svg
          className={cn(
            'w-4 h-4 transition-transform',
            isOpen && 'rotate-180'
          )}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </Button>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-background border border-border rounded-lg shadow-lg z-10 max-h-60 overflow-y-auto">
          {availableTokens.map((token) => (
            <button
              key={token.address}
              onClick={() => handleTokenSelect(token)}
              className={cn(
                'w-full px-4 py-3 text-left hover:bg-muted transition-colors',
                selectedToken?.address === token.address && 'bg-muted'
              )}
            >
              <div className="flex items-center space-x-3">
                {token.logoURI && (
                  <Image
                    src={token.logoURI}
                    alt={token.symbol}
                    width={32}
                    height={32}
                    className="w-8 h-8 rounded-full"
                  />
                )}
                <div>
                  <div className="font-medium">{token.symbol}</div>
                  <div className="text-sm text-muted-foreground">
                    {token.name}
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}; 