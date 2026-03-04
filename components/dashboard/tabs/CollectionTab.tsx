// 고양이 도감 탭 - 가챠 컬렉션
'use client'

import { MOCK_USER, GACHA_CATS, GRADE_COLORS } from '@/lib/mock-data'

export default function CollectionTab({ userId }: { userId: string }) {
  // TODO: API에서 실제 데이터 가져오기
  const collection = MOCK_USER.gachaCollection
  const collectedCount = Object.keys(collection).length
  const totalCount = Object.keys(GACHA_CATS).length

  // 도감 점수 계산
  const totalScore = Object.entries(collection).reduce((sum, [name, count]) => {
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
          const owned = collection[name] || 0
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
