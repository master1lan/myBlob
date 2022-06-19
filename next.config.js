/** @type {import('next').NextConfig} */
const isDevMode=process.env.NODE_ENV === 'development';
const localHost='127.0.0.1:7001';
const proHost='106.52.210.180:7001'
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  publicRuntimeConfig:{
    hostname:isDevMode?localHost:proHost
  }
}

module.exports = nextConfig
