import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  webpack(config) {
    // Configure SVGR to handle SVG imports as React components
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },
  // Enable experimental features for better performance
  experimental: {
    optimizePackageImports: ['@reduxjs/toolkit', 'react-redux'],
  },
  // Image optimization
  images: {
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
};

export default nextConfig;
