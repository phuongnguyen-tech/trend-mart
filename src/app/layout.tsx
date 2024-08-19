/* eslint-disable perfectionist/sort-imports */
import 'src/global.css';

// i18n
import 'src/locales/i18n';

// ----------------------------------------------------------------------

import ThemeProvider from 'src/theme';
import { LocalizationProvider } from 'src/locales';
import { primaryFont } from 'src/theme/typography';

import ProgressBar from 'src/components/progress-bar';
import { MotionLazy } from 'src/components/animate/motion-lazy';
import SnackbarProvider from 'src/components/snackbar/snackbar-provider';
import { SettingsDrawer, SettingsProvider } from 'src/components/settings';

import { CheckoutProvider } from 'src/sections/checkout/context';

import { AuthProvider } from 'src/auth/context/jwt';

// ----------------------------------------------------------------------

export const viewport = {
  themeColor: '#000000',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export const metadata = {
  title: 'TrendMart',
  description:
    'Visit TrendMart to find the latest and greatest products across multiple categories.',
  metadataBase: new URL('https://template-shopping.vercel.app'),
  siteName: 'Next.js',
  icons: [
    { rel: 'icon', url: '/favicon/favicon.ico' },
    { rel: 'icon', type: 'image/png', sizes: '16x16', url: '/favicon/favicon-16x16.png' },
    { rel: 'icon', type: 'image/png', sizes: '32x32', url: '/favicon/favicon-32x32.png' },
    { rel: 'apple-touch-icon', sizes: '180x180', url: '/favicon/apple-touch-icon.png' },
  ],
  openGraph: {
    url: 'https://template-shopping.vercel.app',
    title: 'TrendMart',
    description:
      'Explore the React framework for building modern web applications with Next.js. Learn about its features and benefits.',
    images: [
      {
        url: 'https://www.digitalprintingireland.ie/media/slideshows/dp/631/school-pvc-banner.jpg',
        width: 800,
        height: 600,
        alt: 'Next.js Overview Banner',
      },
      {
        url: 'https://fedudesign.vn/wp-content/uploads/2020/07/Web-1920-%E2%80%93-2.jpg',
        width: 500,
        height: 300,
        alt: 'Web Design Example',
      },
    ],
    type: 'website',
    site_name: 'Next.js',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@nextjs',
    title: 'TrendMart',
    description:
      'Visit TrendMart to find the latest and greatest products across multiple categories.',
    image: 'https://www.digitalprintingireland.ie/media/slideshows/dp/631/school-pvc-banner.jpg',
  },
  robots: {
    index: true,
    follow: true,
  },
  canonical: 'https://template-shopping.vercel.app',
};

type Props = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: Props) {
  return (
    <html lang="en" className={primaryFont.className}>
      <body>
        <AuthProvider>
          <LocalizationProvider>
            <SettingsProvider
              defaultSettings={{
                themeMode: 'light', // 'light' | 'dark'
                themeDirection: 'ltr', //  'rtl' | 'ltr'
                themeContrast: 'default', // 'default' | 'bold'
                themeLayout: 'vertical', // 'vertical' | 'horizontal' | 'mini'
                themeColorPresets: 'default', // 'default' | 'cyan' | 'purple' | 'blue' | 'orange' | 'red'
                themeStretch: false,
              }}
            >
              <ThemeProvider>
                <MotionLazy>
                  <SnackbarProvider>
                    <CheckoutProvider>
                      <SettingsDrawer />
                      <ProgressBar />
                      {children}
                    </CheckoutProvider>
                  </SnackbarProvider>
                </MotionLazy>
              </ThemeProvider>
            </SettingsProvider>
          </LocalizationProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
