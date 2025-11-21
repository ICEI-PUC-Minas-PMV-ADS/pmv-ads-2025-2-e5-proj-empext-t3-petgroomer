/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  publicRuntimeConfig: {
    API_URL:
      process.env.NODE_ENV === 'development'
        ? 'http://localhost:4000'
        : 'https://pmv-ads-2025-2-e5-proj-empext-t3-petgroomer-production.up.railway.app',
  },
  env: {
    NEXT_PUBLIC_API_URL:
      process.env.NODE_ENV === 'development'
        ? 'http://localhost:4000'
        : 'https://pmv-ads-2025-2-e5-proj-empext-t3-petgroomer-production.up.railway.app',
  }
}

module.exports = nextConfig