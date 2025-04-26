import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        
      },
      {
        protocol: "https",
        hostname: "images.nintendolife.com",
        pathname: "**", // Allow all paths under this hostname
      },
      {
        protocol: "https",
        hostname: "cdn.arstechnica.net",
        pathname: "**", // Allow all paths under this hostname
      },
      {
        protocol: "https",
        hostname: "images.axios.com",
        pathname: "**", // Allow all paths under this hostname
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "**", // Allow all paths under this hostname
      },

    ]
  }
};

export default nextConfig;
