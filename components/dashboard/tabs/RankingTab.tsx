// 랭킹 탭 - 부자/도감 TOP 10
'use client'

import { useState, useEffect } from 'react'
import { api } from '@/lib/api'
import type { RankingEntry } from '@/lib/types'

type RankType = 'money' | 'gacha'

const MEDAL = ['🥇', '🥈', '🥉']

export default function RankingTab() {
  const [rankType, setRankType] = useState<RankType>('money')
  const [rankings, setRankings] = useState<RankingEntry[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false
    async function load() {
      setLoading(true)
      setError(null)
      const res = await api.getRankings(rankType)
      if (cancelled) return
      if (res.success && res.data) {
        setRankings(res.data as RankingEntry[])
      } else {
        setError(res.error || '랭킹을 불러올 수 없습니다.')
      }
      setLoading(false)
    }
    load()
    return () => { cancelled = true }
  }, [rankType])

  return (
    <div>
      {/* 랭킹 타입 선택 */}
      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setRankType('money')}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
            rankType === 'money'
              ? 'bg-brand-pink text-white shadow-pink'
              : 'text-brand-text-sub hover:bg-brand-pink-soft/30'
          }`}
        >
          💰 부자 랭킹
        </button>
        <button
          onClick={() => setRankType('gacha')}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
            rankType === 'gacha'
              ? 'bg-brand-lavender text-white shadow-lavender'
              : 'text-brand-text-sub hover:bg-brand-lavender-light/30'
          }`}
        >
          🎴 도감 랭킹
        </button>
      </div>

      {/* 로딩 */}
      {loading && (
        <div className="text-center py-16">
          <span className="text-4xl block mb-3 animate-bounce">🏆</span>
          <p className="text-brand-text-sub text-sm">랭킹을 불러오는 중...</p>
        </div>
      )}

      {/* 에러 */}
      {!loading && error && (
        <div className="text-center py-16">
          <span className="text-4xl block mb-3">😿</span>
          <p className="text-brand-text-sub text-sm">{error}</p>
        </div>
      )}

      {/* 랭킹 리스트 */}
      {!loading && !error && (
        <div className="space-y-2">
          {rankings.length === 0 ? (
            <div className="text-center py-16">
              <span className="text-4xl block mb-3">🏆</span>
              <p className="text-brand-text-sub text-sm">아직 랭킹 데이터가 없어요</p>
            </div>
          ) : (
            rankings.map((entry, i) => (
              <div
                key={entry.userId}
                className={`bg-white rounded-xl p-4 shadow-card flex items-center gap-3 ${
                  i < 3 ? 'ring-1 ring-brand-pink-soft' : ''
                }`}
              >
                {/* 순위 */}
                <div className="w-8 text-center">
                  {i < 3 ? (
                    <span className="text-xl">{MEDAL[i]}</span>
                  ) : (
                    <span className="text-brand-text-muted font-bold">{i + 1}</span>
                  )}
                </div>

                {/* 유저 */}
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-brand-text text-sm truncate">
                    {entry.username}
                  </div>
                </div>

                {/* 값 */}
                <div className="text-right">
                  <div className={`font-bold ${rankType === 'money' ? 'text-brand-pink' : 'text-brand-lavender'}`}>
                    {rankType === 'money'
                      ? `${entry.money.toLocaleString()} 츄르`
                      : `${entry.gachaScore}점`}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  )
}
