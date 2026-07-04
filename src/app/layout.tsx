import type { Metadata } from 'next';
import { Inter, Outfit } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/ui/ThemeProvider';
import { MainLayout } from '@/components/layouts/MainLayout';
import { Toaster } from 'sonner';

const fontInter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
});

const fontOutfit = Outfit({
  variable: '--font-outfit',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'UC96 Tournament',
  description:
    'Sistem Manajemen Turnamen PUBG Resmi untuk Unit Combat 96. Daftarkan tim Anda dan buktikan kemampuan di arena e-sports terbaik.',
  openGraph: {
    title: 'UC96 Tournament',
    description: 'Sistem Manajemen Turnamen PUBG Resmi untuk Unit Combat 96.',
    url: 'https://uc96tour.com',
    siteName: 'UC96 Tournament',
    images: [
      {
        url: '/images/default-bg.webp',
        width: 1200,
        height: 630,
        alt: 'UC96 Tournament Banner',
      },
    ],
    locale: 'id_ID',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'UC96 Tournament',
    description: 'PUBG Tournament Management for UC96',
    images: ['/images/default-bg.webp'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      suppressHydrationWarning
      className={`${fontInter.variable} ${fontOutfit.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col font-sans">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <MainLayout>{children}</MainLayout>
          <Toaster position="bottom-right" richColors theme="system" />
        </ThemeProvider>
      </body>
    </html>
  );
}
