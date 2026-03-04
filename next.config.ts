// NyangBot Anti 웹 홈페이지 - Next.js 설정
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  devIndicators: false,
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'cdn.discordapp.com' },
    ],
  },
}

export default nextConfig
