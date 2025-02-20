import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  // https://i.ibb.co.com/4ZMqPQ2/me.png
  // domains: ["http://192.168.1.5:3000", "http://localhost:3000", "vercel.com", "images.unsplash.com"],
};

export default nextConfig;
