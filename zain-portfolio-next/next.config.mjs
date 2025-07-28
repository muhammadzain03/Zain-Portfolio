/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    formats: ['image/webp', 'image/avif'],
    minimumCacheTTL: 31536000,
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  experimental: {
    optimizePackageImports: ['framer-motion', 'react-icons'],
    turbotrace: {
      logLevel: 'bug',
    },
  },
  compress: true,
  poweredByHeader: false,
  generateEtags: false,
  swcMinify: true,
  webpack: (config, { dev, isServer }) => {
    // Optimize bundle size
    if (!dev && !isServer) {
      config.optimization.splitChunks = {
        ...config.optimization.splitChunks,
        cacheGroups: {
          ...config.optimization.splitChunks.cacheGroups,
          framerMotion: {
            name: 'framer-motion',
            chunks: 'all',
            test: /[\\/]node_modules[\\/]framer-motion[\\/]/,
            priority: 30,
            reuseExistingChunk: true,
          },
          reactIcons: {
            name: 'react-icons',
            chunks: 'all',
            test: /[\\/]node_modules[\\/]react-icons[\\/]/,
            priority: 30,
            reuseExistingChunk: true,
          },
        },
      };
    }
    return config;
  },
};

export default nextConfig;
