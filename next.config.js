/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: false,
    remotePatterns: [],
  },
  eslint: {
    // Allow production builds to succeed even with lint warnings
    ignoreDuringBuilds: true,
  },
  typescript: {
    // This allows CSS import type errors to be skipped
    ignoreBuildErrors: false,
  },
}

module.exports = nextConfig
