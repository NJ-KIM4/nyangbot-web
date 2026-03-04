// 루트 레이아웃 - NYANG GAMES NyangBot Anti 웹 홈페이지
import type { Metadata, Viewport } from 'next'
import './globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

export const metadata: Metadata = {
  metadataBase: new URL('https://nyangbotantiweb.vercel.app'),
  title: '냥봇 | NYANG GAMES',
  description: '디스코드 경제/RPG 게임 봇 냥봇 - 츄르를 모으고, 고양이를 수집하고, 투자하고, 레이드 보스를 물리치세요!',
  keywords: ['discord bot', '디스코드 봇', '냥봇', 'nyangbot', 'RPG', '경제 게임'],
  icons: {
    icon: '/nyang_games_symbol.png',
    apple: '/nyang_games_symbol.png',
  },
  openGraph: {
    title: '냥봇 | NYANG GAMES',
    description: '디스코드 경제/RPG 게임 봇 냥봇 - 츄르를 모으고, 고양이를 수집하고, 투자하고, 레이드 보스를 물리치세요!',
    url: 'https://nyangbotantiweb.vercel.app',
    siteName: 'NYANG GAMES',
    type: 'website',
    locale: 'ko_KR',
    images: [
      {
        url: '/main_cat.png',
        width: 512,
        height: 512,
        alt: '냥봇 메인 캐릭터',
      },
    ],
  },
  twitter: {
    card: 'summary',
    title: '냥봇 | NYANG GAMES',
    description: '디스코드 경제/RPG 게임 봇 냥봇 - 츄르를 모으고, 고양이를 수집하고, 투자하고, 레이드 보스를 물리치세요!',
    images: ['/main_cat.png'],
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
