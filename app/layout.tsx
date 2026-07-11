import type { Metadata, Viewport } from 'next';
import { Inter, Space_Grotesk, JetBrains_Mono, Noto_Sans } from 'next/font/google';
import './globals.css';
import { Providers } from '@/components/providers';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  preload: true,
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
  preload: true,
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

const notoSans = Noto_Sans({
  subsets: ['latin'],
  variable: '--font-twi',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
});

export const metadata: Metadata = {
  title: {
    default: 'Unity Hall (Conti) — Kwame Nkrumah University of Science and Technology',
    template: '%s | Unity Hall KNUST',
  },
  description: 'Official website of Unity Hall (Continental Hall), the largest hall of residence in West Africa. Home of the Continentals. Twin Towers. Continental Radio 96.1FM. Aboagyewaa. Unity.',
  keywords: [
    'Unity Hall',
    'Continental Hall',
    'Conti',
    'KNUST',
    'Kwame Nkrumah University of Science and Technology',
    'Kumasi',
    'Ghana',
    'student accommodation',
    'hall of residence',
    'Twin Towers',
    'Continental Radio',
    'Aboagyewaa',
    'Continentals',
  ],
  authors: [{ name: 'Unity Hall JCR', url: 'https://unityhall.knust.edu.gh' }],
  creator: 'Unity Hall Junior Common Room',
  publisher: 'Unity Hall KNUST',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_GH',
    url: 'https://unityhall.knust.edu.gh',
    siteName: 'Unity Hall KNUST',
    title: 'Unity Hall (Conti) — KNUST',
    description: 'The largest hall of residence in West Africa. Home of the Continentals. Twin Towers. Continental Radio 96.1FM.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Unity Hall Twin Towers at KNUST',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Unity Hall (Conti) — KNUST',
    description: 'The largest hall of residence in West Africa. Home of the Continentals.',
    images: ['/og-image.jpg'],
    creator: '@UnityHallKNUST',
  },
  icons: {
    icon: '/favicon.svg',
    apple: '/favicon.svg',
  },
  manifest: '/manifest.json',
  category: 'education',
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#F5F0E1' },
    { media: '(prefers-color-scheme: dark)', color: '#0D0D0D' },
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const fontClass = `${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} ${notoSans.variable}`;

  return (
    <html lang="en" className={`${fontClass} scroll-smooth`} suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://cdn.sanity.io" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://fonts.googleapis.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://unityhall.knust.edu.gh" />
      </head>
      <body className="bg-background text-foreground antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}