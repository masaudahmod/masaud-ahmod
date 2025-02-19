import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: false,
  images: {
    domains: ["localhost", "masaud.dev", "images.unsplash.com"],
  },
};

export default nextConfig;
