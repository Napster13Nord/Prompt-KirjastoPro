import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Suppress preload warnings for unused resources
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
  // Configure image optimization
  images: {
    formats: ['image/webp', 'image/avif'],
  },
  // Suppress specific warnings
  logging: {
    fetches: {
      fullUrl: false,
    },
  },
};

export default nextConfig;
