import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { getLocale, getMessages } from 'next-intl/server';
import './globals.css';
import { ReduxProvider } from '@/store/provider';

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'DeFi Borrow App',
  description: 'A decentralized borrowing application built with Next.js and Tailwind CSS',
  keywords: ['DeFi', 'borrowing', 'crypto', 'lending', 'blockchain'],
  authors: [{ name: 'DeFi Borrow App Team' }],
  viewport: 'width=device-width, initial-scale=1',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html lang={locale} className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="font-inter antialiased">
        <NextIntlClientProvider messages={messages}>
          <ReduxProvider>
            <div className="min-h-screen bg-background text-foreground">
              {children}
            </div>
          </ReduxProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
