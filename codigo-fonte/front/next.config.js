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
    API_URL: 'https://pmv-ads-2025-2-e5-proj-empext-t3-petgroomer-production.up.railway.app' || 'http://localhost:4000',
  },
  env: {
    NEXT_PUBLIC_API_URL: 'https://pmv-ads-2025-2-e5-proj-empext-t3-petgroomer-production.up.railway.app' || 'http://localhost:4000'
  }
}

module.exports = nextConfig