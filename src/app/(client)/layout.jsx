// app/layout.jsx
import React from "react";

import NavbarClient from "../../components/ClientNavbar"
// This is your global metadata that will apply to all pages
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

const Layout = ({ children }) => {
  return (
<main>
<NavbarClient />
    {children}
</main>
  );
};

export default Layout;
