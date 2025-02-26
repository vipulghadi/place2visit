/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "", // Leave empty unless using a specific port
        pathname: "/**", // Allow all paths under this domain
      },
      {
        protocol: "https",
        hostname: "www.place2visit.com", // Replace with your domain
        port: "",
        pathname: "/**",
      },
    ],
  },
};

module.exports = nextConfig;