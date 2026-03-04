// 기능 쇼케이스 - 4대 시스템 카드
'use client'

const FEATURES = [
  {
    icon: '💰',
    title: '경제 시스템',
    description: '알바, 광산, 낚시로 츄르를 벌고, 상점에서 아이템을 구매하세요. 부자 랭킹에 도전!',
    color: 'from-brand-pink to-brand-pink-light',
    shadowClass: 'hover:shadow-pink',
    items: ['19종 알바', '31종 어종 낚시', '광산 채굴', '소매치기'],
  },
  {
    icon: '🎮',
    title: '미니게임',
    description: '주사위, 슬롯, 블랙잭, 쥐경주 등 다양한 도박 미니게임으로 한탕을 노려보세요!',
    color: 'from-brand-mint to-brand-mint-light',
    shadowClass: 'hover:shadow-mint',
    items: ['주사위 & 동전', '슬롯머신', '블랙잭', '쥐경주 & 복권'],
  },
  {
    icon: '📈',
    title: '투자 시스템',
    description: '20종 주식, 4종 부동산, 어시장 시세로 재테크하세요. 광기의 장에서 대박을!',
    color: 'from-brand-lavender to-brand-lavender-light',
    shadowClass: 'hover:shadow-lavender',
    items: ['20종 실시간 주식', '부동산 월세', '어시장 시세', '아이템 조합'],
  },
  {
    icon: '🎴',
    title: '가챠 & 레이드',
    description: '16종 귀여운 고양이를 수집하고, 레이드 보스에 협력하여 희귀 아이템을 획득하세요!',
    color: 'from-brand-pink to-brand-lavender',
    shadowClass: 'hover:shadow-pink',
    items: ['16종 고양이 도감', '5종 레이드 보스', '협력 전투', '희귀 드랍'],
  },
]

export default function Features() {
  return (
    <section id="features" className="py-20 bg-white scroll-mt-16">
      <div className="max-w-6xl mx-auto px-4">
        {/* 섹션 타이틀 */}
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-brand-text mb-3">
            뭘 할 수 있나요?
          </h2>
          <p className="text-brand-text-sub text-lg">
            냥봇의 4대 핵심 시스템
          </p>
        </div>

        {/* 카드 그리드 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {FEATURES.map((feature, i) => (
            <div
              key={feature.title}
              className={`group relative bg-white rounded-2xl p-6 shadow-card card-hover ${feature.shadowClass} animate-fade-in-up opacity-0`}
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              {/* 카드 상단 그라디언트 바 */}
              <div className={`absolute top-0 left-0 right-0 h-1 rounded-t-2xl bg-gradient-to-r ${feature.color}`} />

              {/* 아이콘 + 타이틀 */}
              <div className="flex items-center gap-3 mb-3">
                <span className="text-4xl">{feature.icon}</span>
                <h3 className="text-xl font-bold text-brand-text">{feature.title}</h3>
              </div>

              {/* 설명 */}
              <p className="text-brand-text-sub text-sm leading-relaxed mb-4">
                {feature.description}
              </p>

              {/* 태그 리스트 */}
              <div className="flex flex-wrap gap-2">
                {feature.items.map((item) => (
                  <span
                    key={item}
                    className="px-3 py-1 bg-brand-bg text-brand-text-sub text-xs rounded-full"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
