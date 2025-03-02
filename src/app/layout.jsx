// app/layout.js
import "./globals.css"
import '@mantine/core/styles.css'; // Import Mantine core styles
import React from 'react';
import { ColorSchemeScript, mantineHtmlProps, MantineProvider } from '@mantine/core'; // Import 
export const metadata = {
  title: "My Next.js App",
  description: "Explore the world of Next.js with Tailwind CSS.",
  openGraph: {
    title: "Next.js App",
    description: "Explore the world of Next.js with Tailwind CSS.",
    url: "https://www.yourapp.com",
    siteName: "My Next.js App",
    images: [
      {
        url: "https://www.yourapp.com/og-image.jpg",
        width: 800,
        height: 600,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@yourtwitterhandle",
    creator: "@yourtwitterhandle",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" {...mantineHtmlProps}>
      <head>
        <ColorSchemeScript />
        <link rel="shortcut icon" href="/favicon.svg" />
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no" />
        {/* Additional meta tags for SEO and social media sharing */}
        <meta name="description" content={metadata.description} />
        <meta property="og:title" content={metadata.openGraph.title} />
        <meta property="og:description" content={metadata.openGraph.description} />
        <meta property="og:url" content={metadata.openGraph.url} />
        <meta property="og:site_name" content={metadata.openGraph.siteName} />
        <meta property="og:image" content={metadata.openGraph.images[0].url} />
        <meta name="twitter:card" content={metadata.twitter.card} />
        <meta name="twitter:site" content={metadata.twitter.site} />
        <meta name="twitter:creator" content={metadata.twitter.creator} />
      </head>
      <body className="w-screen  " >
        
          {children}
    
      </body>
    </html>
  );
}
