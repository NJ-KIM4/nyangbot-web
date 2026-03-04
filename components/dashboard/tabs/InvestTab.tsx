// 투자 현황 탭 - 주식/부동산 보유 내역
'use client'

import { useState, useEffect } from 'react'
import { api } from '@/lib/api'
import { ESTATES_INFO } from '@/lib/mock-data'
import type { BotUser } from '@/lib/types'

export default function InvestTab({ userId }: { userId: string }) {
  const [data, setData] = useState<BotUser | null>(null)
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
        setData(res.data as BotUser)
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
        <span className="text-4xl block mb-3 animate-bounce">📊</span>
        <p className="text-brand-text-sub text-sm">투자 현황을 불러오는 중...</p>
      </div>
    )
  }

  if (error || !data) {
    return (
      <div className="text-center py-20">
        <span className="text-4xl block mb-3">😿</span>
        <p className="text-brand-text-sub text-sm">{error || '데이터를 불러올 수 없습니다.'}</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* 주식 보유 */}
      <div>
        <h3 className="text-lg font-bold text-brand-text mb-3">보유 주식</h3>
        {data.stocks && Object.keys(data.stocks).length > 0 ? (
          <div className="space-y-3">
            {Object.entries(data.stocks).map(([name, qty]) => {
              const avgPrice = data.stockAvgPrices?.[name] || 0
              return (
                <div key={name} className="bg-white rounded-xl p-4 shadow-card">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">📊</span>
                      <span className="font-bold text-brand-text">{name}</span>
                    </div>
                    <span className="text-brand-pink font-bold">{qty}주</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-brand-text-sub">평균 매입가</span>
                    <span className="text-brand-text">{avgPrice.toLocaleString()} 츄르</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-brand-text-sub">총 투자금</span>
                    <span className="text-brand-text font-medium">
                      {(avgPrice * qty).toLocaleString()} 츄르
                    </span>
                  </div>
                </div>
              )
            })}
          </div>
        ) : (
          <div className="text-center py-8 bg-white rounded-xl shadow-card">
            <span className="text-3xl block mb-2">📈</span>
            <p className="text-brand-text-sub text-sm">보유 주식이 없어요</p>
          </div>
        )}
      </div>

      {/* 부동산 보유 */}
      <div>
        <h3 className="text-lg font-bold text-brand-text mb-3">보유 부동산</h3>
        {data.estates && Object.keys(data.estates).length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {Object.entries(data.estates).map(([name, count]) => {
              const info = ESTATES_INFO.find((e) => e.name === name)
              return (
                <div key={name} className="bg-white rounded-xl p-4 shadow-card">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-3xl">{info?.icon || '🏠'}</span>
                    <div>
                      <div className="font-bold text-brand-text">{name}</div>
                      {count > 1 && <span className="text-brand-pink text-xs font-bold">x{count}</span>}
                    </div>
                  </div>
                  {info && (
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span className="text-brand-text-sub">시가</span>
                        <span className="text-brand-text">{info.price.toLocaleString()} 츄르</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-brand-text-sub">일일 월세</span>
                        <span className="text-brand-mint font-medium">
                          +{(info.dailyRent * count).toLocaleString()} 츄르
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        ) : (
          <div className="text-center py-8 bg-white rounded-xl shadow-card">
            <span className="text-3xl block mb-2">🏠</span>
            <p className="text-brand-text-sub text-sm">보유 부동산이 없어요</p>
          </div>
        )}
      </div>
    </div>
  )
}
