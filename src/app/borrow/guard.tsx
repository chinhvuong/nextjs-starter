'use client';

import { useWallet } from '@/shared/hooks/use-wallet';
import { Button } from '@/shared/components/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/components/card';

interface BorrowGuardProps {
  children: React.ReactNode;
}

export const BorrowGuard: React.FC<BorrowGuardProps> = ({ children }) => {
  const { wallet, connectWallet, isConnecting } = useWallet();

  if (!wallet?.isConnected) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle>Wallet Required</CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <p className="text-muted-foreground">
              You need to connect your wallet to access the borrow feature
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

  return <>{children}</>;
}; 