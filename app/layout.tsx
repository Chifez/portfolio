import type React from 'react';
import type { Metadata } from 'next';
import './globals.css';
import Providers from './providers';

export const metadata: Metadata = {
  metadataBase: new URL('https://your-domain.com'), // Replace with your actual domain
  title: {
    default: 'Nwosu Emmanuel | Full Stack Developer',
    template: '%s | Nwosu Emmanuel',
  },
  description:
    'Full Stack Developer specializing in React, Next.js, and modern web technologies. Building beautiful, performant, and user-friendly web applications.',
  keywords: [
    'Full Stack Developer',
    'React Developer',
    'Next.js Developer',
    'Web Developer',
    'Frontend Developer',
    'Backend Developer',
    'JavaScript Developer',
    'TypeScript Developer',
    'Portfolio',
    'Web Development',
  ],
  authors: [{ name: 'Nwosu Emmanuel' }],
  creator: 'Nwosu Emmanuel',
  publisher: 'Nwosu Emmanuel',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://your-domain.com',
    title: 'Nwosu Emmanuel | Full Stack Developer',
    description:
      'Full Stack Developer specializing in React, Next.js, and modern web technologies. Building beautiful, performant, and user-friendly web applications.',
    siteName: 'Nwosu Emmanuel Portfolio',
    images: [
      {
        url: '/opengraph-image.jpg', // Add your OG image
        width: 1200,
        height: 630,
        alt: 'Nwosu Emmanuel - Full Stack Developer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nwosu Emmanuel | Full Stack Developer',
    description:
      'Full Stack Developer specializing in React, Next.js, and modern web technologies.',
    images: ['/twitter-image.jpg'], // Add your Twitter card image
    creator: '@chifez4u', // Add your Twitter handle
  },
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
  verification: {
    google: 'your-google-site-verification', // Add your Google verification code
    yandex: 'your-yandex-verification', // Add your Yandex verification code if needed
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-[#111111] text-gray-300">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
