import type { Metadata, Viewport } from 'next';
import './globals.css';
import { siteConfig } from '@/data/config';
import { ThemeProvider } from '@/components/theme/ThemeProvider';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.domain),
  title: {
    default: `${siteConfig.brand} — Online Shop, Networking & Cyber Security`,
    template: `%s — ${siteConfig.brand}`,
  },
  description: siteConfig.description,
  keywords: [
    'riko ardianto',
    'online shop',
    'produk digital',
    'netflix murah',
    'spotify premium',
    'networking',
    'cyber security',
    'mikrotik',
    'linux',
    'web development',
  ],
  openGraph: {
    type: 'website',
    locale: 'id_ID',
    url: '/',
    siteName: siteConfig.brand,
    title: `${siteConfig.brand} — Online Shop, Networking & Cyber Security`,
    description: siteConfig.description,
    images: [{ url: '/images/og.svg', width: 1200, height: 630, alt: siteConfig.brand }],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${siteConfig.brand} — Online Shop, Networking & Cyber Security`,
    description: siteConfig.description,
    images: ['/images/og.svg'],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: '#03040a',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" className="dark" suppressHydrationWarning>
      <body className="flex min-h-screen flex-col bg-void font-sans text-fg antialiased">
        <ThemeProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
