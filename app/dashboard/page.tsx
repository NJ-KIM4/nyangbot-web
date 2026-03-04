// 대시보드 페이지 - Discord OAuth 로그인 필요
'use client'

import { Suspense, useEffect, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { clientAuth, clientUser } from '@/lib/auth'
import type { DiscordUser } from '@/lib/types'
import DashboardLayout from '@/components/dashboard/DashboardLayout'
import LoginPrompt from '@/components/dashboard/LoginPrompt'

function DashboardContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [user, setUser] = useState<DiscordUser | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // URL에서 토큰/유저 정보 수신 (OAuth 콜백 후)
    const token = searchParams.get('token')
    const userParam = searchParams.get('user')

    if (token && userParam) {
      try {
        const userData = JSON.parse(userParam) as DiscordUser
        clientAuth.save(token)
        clientUser.save(userData)
        setUser(userData)
        // URL에서 토큰 제거
        router.replace('/dashboard')
      } catch {
        // 파싱 실패 시 무시
      }
    } else {
      // 기존 저장된 유저 확인
      const saved = clientUser.get()
      if (saved) {
        setUser(saved)
      }
    }
    setLoading(false)
  }, [searchParams, router])

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <span className="text-4xl animate-float block mb-4">🐱</span>
          <p className="text-brand-text-muted">로딩 중...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return <LoginPrompt />
  }

  return <DashboardLayout user={user} />
}

export default function DashboardPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-[60vh] flex items-center justify-center">
          <div className="text-center">
            <span className="text-4xl animate-float block mb-4">🐱</span>
            <p className="text-brand-text-muted">로딩 중...</p>
          </div>
        </div>
      }
    >
      <DashboardContent />
    </Suspense>
  )
}
