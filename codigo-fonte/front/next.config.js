/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone', // Otimiza para Docker
  trailingSlash: true,
  images: {
    unoptimized: true // Para evitar problemas em produção
  },
  env: {
    API_URL: process.env.API_URL || 'http://localhost:4000'
  }
}

module.exports = nextConfig