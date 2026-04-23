import type { Metadata } from 'next';
import { Cormorant_Garamond, Jost } from 'next/font/google';
import './globals.css';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
});

const jost = Jost({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-jost',
  display: 'swap',
});

export const metadata: Metadata = {
  title: { template: '%s | SM Luxury', default: 'SM Luxury — The Connoisseur\'s Journal' },
  description: 'The finest editorial on Cars, Yachts, Watches, Style, Home, Food & Travel.',
  openGraph: {
    type: 'website',
    siteName: 'SM Luxury',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${cormorant.variable} ${jost.variable}`}>
      <body className="bg-cream font-body antialiased">{children}</body>
    </html>
  );
}
