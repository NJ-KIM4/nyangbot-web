// 인벤토리 탭 - 보유 아이템 목록
'use client'

import { useState, useEffect } from 'react'
import { api } from '@/lib/api'
import type { BotUser } from '@/lib/types'

// 아이템 아이콘 매핑
const ITEM_ICONS: Record<string, string> = {
  '고등어': '🐟',
  '파산구제권': '🎫',
  '별의 파편': '✨',
  '고농축 캣닢 앰플': '💉',
  '황금 참치캔': '🥫',
  '자동 노동 이용권 30분': '🤖',
  '지렁이': '🪱',
  '깐새우': '🦐',
  '오징어': '🦑',
  '살아있는새우': '🦐',
  '강력접착 쥐덫': '🪤',
  '경찰 호출기': '🚔',
  '도둑 방지 목걸이': '📿',
  '강원랜드 프리패스권': '🎰',
  '행운의 네잎클로버': '🍀',
  '정령의 결정': '💎',
  '보물 지도 조각': '🗺️',
}

export default function InventoryTab({ userId }: { userId: string }) {
  const [inventory, setInventory] = useState<Record<string, number> | null>(null)
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
        setInventory((res.data as BotUser).inventory || {})
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
        <span className="text-4xl block mb-3 animate-bounce">🎒</span>
        <p className="text-brand-text-sub text-sm">인벤토리를 불러오는 중...</p>
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

  // 0개 아이템 제외, 수량 많은 순 정렬
  const items = Object.entries(inventory || {})
    .filter(([, count]) => count > 0)
    .sort(([, a], [, b]) => b - a)

  if (items.length === 0) {
    return (
      <div className="text-center py-20">
        <span className="text-5xl block mb-4">🎒</span>
        <p className="text-brand-text-sub">가방이 비어있어요</p>
      </div>
    )
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-brand-text">보유 아이템</h3>
        <span className="text-brand-text-muted text-sm">{items.length}종</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {items.map(([name, count]) => (
          <div
            key={name}
            className="bg-white rounded-xl p-4 shadow-card flex items-center gap-3 card-hover"
          >
            <span className="text-2xl w-8 text-center">
              {ITEM_ICONS[name] || '📦'}
            </span>
            <div className="flex-1 min-w-0">
              <div className="font-medium text-brand-text text-sm truncate">{name}</div>
            </div>
            <div className="text-brand-pink font-bold text-lg">
              {count.toLocaleString()}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
