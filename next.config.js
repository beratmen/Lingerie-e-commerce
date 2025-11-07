/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'images.unsplash.com',
      'images.pexels.com',
    ],
  },
  // Note: Server configuration is handled in server.js, not in next.config.js
  // Next.js 14 doesn't support server config in next.config.js
}

module.exports = nextConfig
