// 고양이 도감 탭 - 가챠 컬렉션
'use client'

import { useState, useEffect } from 'react'
import { api } from '@/lib/api'
import { GACHA_CATS, GRADE_COLORS } from '@/lib/mock-data'
import type { BotUser } from '@/lib/types'

export default function CollectionTab({ userId }: { userId: string }) {
  const [collection, setCollection] = useState<Record<string, number> | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false
    async function load() {
      setLoading(true)
      setError(null)
      const res = await api.getMyProfile()
      if (cancelled) return
      if (res.success && res.data) {
        setCollection((res.data as BotUser).gachaCollection || {})
      } else {
        setError(res.error || '데이터를 불러올 수 없습니다.')
      }
      setLoading(false)
    }
    load()
    return () => { cancelled = true }
  }, [userId])

  if (loading) {
    return (
      <div className="text-center py-20">
        <span className="text-4xl block mb-3 animate-bounce">🎴</span>
        <p className="text-brand-text-sub text-sm">도감을 불러오는 중...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-20">
        <span className="text-4xl block mb-3">😿</span>
        <p className="text-brand-text-sub text-sm">{error}</p>
      </div>
    )
  }

  const safeCollection = collection || {}
  const collectedCount = Object.keys(safeCollection).length
  const totalCount = Object.keys(GACHA_CATS).length

  // 도감 점수 계산
  const totalScore = Object.entries(safeCollection).reduce((sum, [name, count]) => {
    const cat = GACHA_CATS[name]
    if (!cat) return sum
    return sum + cat.score + (count - 1) * 0.1
  }, 0)

  return (
    <div>
      {/* 도감 요약 */}
      <div className="bg-white rounded-xl p-5 shadow-card mb-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-bold text-brand-text">고양이 도감</h3>
          <span className="text-brand-pink font-bold">
            {collectedCount}/{totalCount}종
          </span>
        </div>
        {/* 프로그레스 바 */}
        <div className="w-full h-3 bg-brand-bg rounded-full overflow-hidden mb-2">
          <div
            className="h-full bg-gradient-to-r from-brand-pink via-brand-lavender to-brand-mint rounded-full transition-all duration-700"
            style={{ width: `${(collectedCount / totalCount) * 100}%` }}
          />
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-brand-text-sub">도감 점수</span>
          <span className="text-brand-lavender font-bold">{totalScore.toFixed(1)}점</span>
        </div>
      </div>

      {/* 도감 그리드 */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {Object.entries(GACHA_CATS).map(([name, info]) => {
          const owned = safeCollection[name] || 0
          const isOwned = owned > 0

          return (
            <div
              key={name}
              className={`rounded-xl p-4 text-center transition-all ${
                isOwned
                  ? 'bg-white shadow-card'
                  : 'bg-gray-100 opacity-50'
              }`}
            >
              <span className="text-3xl block mb-2">
                {isOwned ? info.emoji : '❓'}
              </span>
              <div className="text-sm font-medium text-brand-text truncate">
                {isOwned ? name : '???'}
              </div>
              <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-bold mt-1 ${GRADE_COLORS[info.grade]}`}>
                {info.grade}
              </span>
              {isOwned && owned > 1 && (
                <div className="text-brand-text-muted text-xs mt-1">x{owned}</div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
