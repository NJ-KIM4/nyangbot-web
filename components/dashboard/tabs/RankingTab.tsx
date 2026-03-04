// 랭킹 탭 - 부자/도감 TOP 10
'use client'

import { useState } from 'react'
import { MOCK_RANKINGS } from '@/lib/mock-data'

type RankType = 'money' | 'gacha'

const MEDAL = ['🥇', '🥈', '🥉']

export default function RankingTab() {
  const [rankType, setRankType] = useState<RankType>('money')

  // TODO: API에서 실제 랭킹 데이터 가져오기
  const rankings = [...MOCK_RANKINGS].sort((a, b) =>
    rankType === 'money' ? b.money - a.money : b.gachaScore - a.gachaScore
  )

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

      {/* 랭킹 리스트 */}
      <div className="space-y-2">
        {rankings.map((entry, i) => (
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
        ))}
      </div>
    </div>
  )
}
