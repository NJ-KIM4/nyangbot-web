// 공통 헤더 - 네비게이션 + 로고 + 섹션 스크롤
'use client'

import { useState } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'

// 랜딩 페이지 섹션 목차
const SECTION_ITEMS = [
  { label: '소개', href: '#hero' },
  { label: '기능', href: '#features' },
  { label: '미리보기', href: '#screenshots' },
  { label: '통계', href: '#stats' },
  { label: '시작하기', href: '#cta' },
]

// 다른 페이지 링크
const PAGE_ITEMS = [
  { label: '게임 가이드', href: '/guide' },
  { label: '대시보드', href: '/dashboard' },
  { label: '커뮤니티', href: '/community' },
]

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname = usePathname()
  const isHome = pathname === '/'

  // 부드러운 스크롤 처리
  const handleScrollClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (!isHome || !href.startsWith('#')) return
    e.preventDefault()
    const id = href.slice(1)
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
    setMobileOpen(false)
  }

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-brand-pink-soft/50">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* 로고 */}
        <Link href="/" className="flex items-center gap-2 group">
          <img src="/header_icon.png" alt="" className="w-8 h-8 rounded-full object-cover" />
          <span className="font-logo text-xl font-bold text-gradient-pink">
            냥봇
          </span>
        </Link>

        {/* 데스크탑 네비게이션 */}
        <nav className="hidden md:flex items-center gap-5">
          {/* 랜딩 페이지일 때 섹션 목차 표시 */}
          {isHome && SECTION_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={(e) => handleScrollClick(e, item.href)}
              className="text-brand-text-sub hover:text-brand-pink transition-colors font-medium text-sm"
            >
              {item.label}
            </a>
          ))}

          {/* 구분선 (홈일 때만) */}
          {isHome && (
            <span className="w-px h-4 bg-brand-pink-soft" />
          )}

          {/* 페이지 링크 */}
          {PAGE_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-brand-text-sub hover:text-brand-pink transition-colors font-medium text-sm"
            >
              {item.label}
            </Link>
          ))}

          <a
            href="https://discord.com/oauth2/authorize?client_id=YOUR_BOT_ID&permissions=8&scope=bot%20applications.commands"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-brand-pink text-white rounded-full font-bold text-sm btn-bounce hover:bg-brand-pink/90 shadow-pink"
          >
            봇 초대하기
          </a>
        </nav>

        {/* 모바일 메뉴 버튼 */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden p-2 text-brand-text"
          aria-label="메뉴"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {mobileOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* 모바일 메뉴 패널 */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-b border-brand-pink-soft/50 px-4 pb-4">
          {/* 섹션 목차 (홈일 때) */}
          {isHome && SECTION_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={(e) => handleScrollClick(e, item.href)}
              className="block py-3 text-brand-text-sub hover:text-brand-pink transition-colors font-medium"
            >
              {item.label}
            </a>
          ))}
          {isHome && <div className="border-t border-brand-pink-soft/30 my-2" />}

          {/* 페이지 링크 */}
          {PAGE_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className="block py-3 text-brand-text-sub hover:text-brand-pink transition-colors font-medium"
            >
              {item.label}
            </Link>
          ))}
          <a
            href="https://discord.com/oauth2/authorize?client_id=YOUR_BOT_ID&permissions=8&scope=bot%20applications.commands"
            target="_blank"
            rel="noopener noreferrer"
            className="block mt-2 text-center px-4 py-2 bg-brand-pink text-white rounded-full font-bold text-sm"
          >
            봇 초대하기
          </a>
        </div>
      )}
    </header>
  )
}
