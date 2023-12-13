/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'standalone',
  webpack: (config, { isServer }) => {
    // Fixes npm packages that depend on `fs` module
    if (!isServer) {
      config.resolve.fallback = {
        fs: false,
        net:false,
        tls:false,
      };
    }

    return config;
  },
  images: {
    domains: ['ipfs.io','gateway.pinata.cloud'],
  }
  // target: 'experimental-serverless-trace',
}

module.exports = nextConfig
