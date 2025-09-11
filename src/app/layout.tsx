import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '@/styles/globals.css';
import { ReduxProvider } from '@/store/provider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'DeFi Borrow App',
  description: 'A decentralized borrowing application built with Next.js and Tailwind CSS',
  keywords: ['DeFi', 'borrowing', 'crypto', 'lending', 'blockchain'],
  authors: [{ name: 'DeFi Borrow App Team' }],
  viewport: 'width=device-width, initial-scale=1',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ReduxProvider>
          <div className="min-h-screen bg-background text-foreground">
            {children}
          </div>
        </ReduxProvider>
      </body>
    </html>
  );
}
