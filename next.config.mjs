/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: "https",
          hostname: "images.unsplash.com", // Add allowed image host
        },
      ],
    },
  };
  
  export default nextConfig; // ✅ Use `export default` instead of `module.exports`
  
  