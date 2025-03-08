// app/layout.jsx
import React from "react";
import Head from "next/head"; // Import Head for favicon and metadata
import NavbarClient from "../../components/clientside/ClientNavbar";
import Footer from "@/components/clientside/Footer";

// This is your global metadata that will apply to all pages
export const metadata = {
  title: "Place2Visit - Explore Amazing Destinations",
  description: "Discover the best places to visit across different regions with Place2Visit. Your ultimate travel guide!",
  openGraph: {
    title: "Place2Visit - Explore Amazing Destinations",
    description: "Discover the best places to visit across different regions with Place2Visit. Your ultimate travel guide!",
    url: "https://www.place2visit.com", // Replace with your actual URL
    siteName: "Place2Visit",
    images: [
      {
        url: "https://www.place2visit.com/og-image.jpg", // Replace with your OG image URL
        width: 800,
        height: 600,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@place2visit", // Replace with your Twitter handle
    creator: "@place2visit", // Replace with your Twitter handle
  },
};

const Layout = ({ children }) => {
  return (
    <main className="w-full relative  ">
      <Head>
        {/* Favicon for browser tab */}
        <link rel="icon" href="/favicon.ico" />
        {/* Optional: If you have a PNG version */}
        {/* <link rel="icon" href="/logo.png" type="image/png" /> */}
      </Head>

      {/* Navbar */}
      <NavbarClient />

    <div className="mt-16">
    {children}
    </div>
    
      <Footer/>
    </main>
  );
};

export default Layout;