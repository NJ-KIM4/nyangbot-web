// 관리자 페이지 - 유저 관리, 로그 조회, 경제 현황, 봇 상태
'use client'

import { useState, useEffect } from 'react'
import { clientAuth, clientUser } from '@/lib/auth'

// 관리자 Discord ID 목록 (환경변수 또는 하드코딩)
const ADMIN_IDS = (process.env.NEXT_PUBLIC_ADMIN_IDS || '').split(',')

type AdminTab = 'users' | 'logs' | 'economy' | 'status'

export default function AdminPage() {
  const [isAdmin, setIsAdmin] = useState(false)
  const [loading, setLoading] = useState(true)
  const [tab, setTab] = useState<AdminTab>('users')
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    const user = clientUser.get()
    if (user && ADMIN_IDS.includes(user.id)) {
      setIsAdmin(true)
    }
    setLoading(false)
  }, [])

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <span className="text-4xl animate-float">🐱</span>
      </div>
    )
  }

  if (!isAdmin) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-4">
        <div className="text-center">
          <span className="text-6xl block mb-4">🚫</span>
          <h2 className="text-2xl font-bold text-brand-text mb-2">접근 불가</h2>
          <p className="text-brand-text-sub">관리자만 접근할 수 있는 페이지입니다.</p>
        </div>
      </div>
    )
  }

  const TABS: { id: AdminTab; label: string; icon: string }[] = [
    { id: 'users', label: '유저 관리', icon: '👥' },
    { id: 'logs', label: '로그 조회', icon: '📋' },
    { id: 'economy', label: '경제 현황', icon: '💰' },
    { id: 'status', label: '봇 상태', icon: '🤖' },
  ]

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="flex items-center gap-2 mb-6">
        <span className="text-2xl">🔧</span>
        <h1 className="text-3xl font-bold text-brand-text">관리자</h1>
      </div>

      {/* 탭 */}
      <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
        {TABS.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`flex items-center gap-1.5 px-4 py-2.5 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
              tab === t.id
                ? 'bg-brand-text text-white'
                : 'text-brand-text-sub hover:bg-brand-pink-soft/30'
            }`}
          >
            <span>{t.icon}</span>
            {t.label}
          </button>
        ))}
      </div>

      {/* 유저 관리 */}
      {tab === 'users' && (
        <div>
          <div className="mb-4">
            <input
              type="text"
              placeholder="유저 이름 또는 ID로 검색..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-3 bg-white rounded-xl border border-brand-pink-soft focus:outline-none focus:ring-2 focus:ring-brand-pink text-sm"
            />
          </div>
          <div className="bg-white rounded-xl p-6 shadow-card text-center">
            <span className="text-3xl block mb-2">🔌</span>
            <p className="text-brand-text-sub text-sm">
              봇 API 연동 후 유저 검색/관리가 가능합니다.
            </p>
            <p className="text-brand-text-muted text-xs mt-1">
              Express API를 봇 서버에 추가해주세요.
            </p>
          </div>
        </div>
      )}

      {/* 로그 조회 */}
      {tab === 'logs' && (
        <div className="bg-white rounded-xl p-6 shadow-card text-center">
          <span className="text-3xl block mb-2">📋</span>
          <p className="text-brand-text-sub text-sm">
            활동 로그는 봇 API 연동 후 표시됩니다.
          </p>
          <p className="text-brand-text-muted text-xs mt-1">
            activity_logs.json에서 최근 500건을 조회합니다.
          </p>
        </div>
      )}

      {/* 경제 현황 */}
      {tab === 'economy' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white rounded-xl p-5 shadow-card">
            <div className="text-brand-text-sub text-xs mb-1">총 유통 츄르</div>
            <div className="text-2xl font-bold text-brand-pink">-- 츄르</div>
            <div className="text-brand-text-muted text-xs mt-1">봇 API 연동 필요</div>
          </div>
          <div className="bg-white rounded-xl p-5 shadow-card">
            <div className="text-brand-text-sub text-xs mb-1">총 유저 수</div>
            <div className="text-2xl font-bold text-brand-mint">-- 명</div>
            <div className="text-brand-text-muted text-xs mt-1">봇 API 연동 필요</div>
          </div>
          <div className="bg-white rounded-xl p-5 shadow-card">
            <div className="text-brand-text-sub text-xs mb-1">평균 자산</div>
            <div className="text-2xl font-bold text-brand-lavender">-- 츄르</div>
            <div className="text-brand-text-muted text-xs mt-1">봇 API 연동 필요</div>
          </div>
          <div className="bg-white rounded-xl p-5 shadow-card">
            <div className="text-brand-text-sub text-xs mb-1">오늘 거래 횟수</div>
            <div className="text-2xl font-bold text-brand-text">-- 건</div>
            <div className="text-brand-text-muted text-xs mt-1">봇 API 연동 필요</div>
          </div>
        </div>
      )}

      {/* 봇 상태 */}
      {tab === 'status' && (
        <div className="bg-white rounded-xl p-6 shadow-card">
          <h3 className="font-bold text-brand-text mb-4">봇 서버 상태</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between py-2 border-b border-brand-bg">
              <span className="text-brand-text-sub text-sm">PM2 상태</span>
              <span className="text-brand-text-muted text-sm">API 연동 필요</span>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-brand-bg">
              <span className="text-brand-text-sub text-sm">업타임</span>
              <span className="text-brand-text-muted text-sm">API 연동 필요</span>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-brand-bg">
              <span className="text-brand-text-sub text-sm">메모리 사용량</span>
              <span className="text-brand-text-muted text-sm">API 연동 필요</span>
            </div>
            <div className="flex items-center justify-between py-2">
              <span className="text-brand-text-sub text-sm">API 서버</span>
              <span className="text-brand-text-muted text-sm">미연결</span>
            </div>
          </div>
          <p className="mt-4 text-brand-text-muted text-xs">
            봇 서버에 Express API를 추가하고 NEXT_PUBLIC_BOT_API_URL을 설정하면 실시간 상태를 확인할 수 있습니다.
          </p>
        </div>
      )}
    </div>
  )
}
