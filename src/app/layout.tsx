import type { Metadata } from 'next';
import { ThemeProvider } from 'next-themes';
import { Noto_Sans_SC, JetBrains_Mono, Rubik, Fredoka } from 'next/font/google';
import './globals.css';
import { SITE_TITLE, SITE_DESCRIPTION, metadataBase } from '@/constants';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Content from '@/components/Content';
import ScrollToTop from '@/components/ScrollToTop';

const rubik = Rubik({
  display: 'swap',
  subsets: ['latin'],
  variable: '--font-rubik',
});

const fredoka = Fredoka({
  display: 'swap',
  subsets: ['latin'],
  variable: '--font-fredoka',
});

const jbmono = JetBrains_Mono({
  display: 'swap',
  subsets: ['latin'],
  variable: '--font-jb-mono',
});

const notosanssc = Noto_Sans_SC({
  display: 'swap',
  subsets: ['latin'],
  variable: '--font-noto-sans-sc',
});

export const metadata: Metadata = {
  title: {
    template: `%s | ${SITE_TITLE}`,
    default: `Home | ${SITE_TITLE}`,
  },
  description: SITE_DESCRIPTION,
  twitter: {
    card: 'summary',
    creator: `@haru_nc_`,
  },
  openGraph: {
    type: 'website',
    url: '/',
    title: {
      template: `%s | ${SITE_TITLE}`,
      default: `Home | ${SITE_TITLE}`,
    },
    description: SITE_DESCRIPTION,
    siteName: SITE_TITLE,
  },
  metadataBase: metadataBase,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang='zh-CN'
      className={`${jbmono.variable} ${notosanssc.variable} ${rubik.variable} ${fredoka.variable}`}
      suppressHydrationWarning
    >
      <body className='selection:bg-selected selection:text-bg'>
        <ThemeProvider attribute='class'>
          <Header />
          <Content>{children}</Content>
          <Footer />
          <ScrollToTop />
          <div id='portal' className='relative' />
        </ThemeProvider>
      </body>
    </html>
  );
}
