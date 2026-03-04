// 루트 레이아웃 - NYANG GAMES NyangBot Anti 웹 홈페이지
import type { Metadata, Viewport } from 'next'
import './globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

export const metadata: Metadata = {
  title: '냥봇 | NYANG GAMES',
  description: '디스코드 경제/RPG 게임 봇 냥봇 - 츄르를 모으고, 고양이를 수집하고, 투자하고, 레이드 보스를 물리치세요!',
  keywords: ['discord bot', '디스코드 봇', '냥봇', 'nyangbot', 'RPG', '경제 게임'],
  openGraph: {
    title: '냥봇 | NYANG GAMES',
    description: '디스코드 경제/RPG 게임 봇',
    type: 'website',
    siteName: 'NYANG GAMES',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko" className="scroll-smooth">
      <body className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
