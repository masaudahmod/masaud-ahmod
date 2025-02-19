import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: false,
  images: {
    domains: ["http://192.168.1.5:3000", "http://localhost:3000", "vercel.com", "images.unsplash.com"],
  },
};

export default nextConfig;
