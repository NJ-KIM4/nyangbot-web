// 스크린샷 갤러리 - Discord 실제 사용 화면
// 사용법: public/screenshots/ 폴더에 이미지를 넣고 아래 image 경로만 변경하면 적용됨
'use client'

const SCREENSHOTS = [
  {
    title: '경제 메뉴',
    description: '출석, 알바, 송금 등 경제 시스템',
    // 실제 스크린샷 이미지 경로 (public/screenshots/ 에 넣으면 됨)
    // 이미지가 없으면 텍스트 목업이 표시됨
    image: '/screenshots/economy.png',
    fallbackLines: [
      '🐱 냥봇',
      '━━━━━━━━━━━━━━━',
      '💰 츄르 잔액: 168,850',
      '📅 출석일수: 3일 연속',
      '🎖️ 칭호: 초보 집사',
      '',
      '[ 가입 ] [ 출석 ] [ 송금 ]',
      '[ 부자랭킹 ] [ 파산구제 ]',
    ],
  },
  {
    title: '낚시 시스템',
    description: '31종 어종, 계절/시간대 영향',
    image: '/screenshots/fishing.png',
    fallbackLines: [
      '🎣 낚시 결과',
      '━━━━━━━━━━━━━━━',
      '🐟 참치를 잡았다!',
      '💰 어시장 시세: 4,369 츄르',
      '📊 경험치 +15 (Lv.2)',
      '',
      '낚싯대 Lv.26 | 미끼: 깐새우',
      '[ 다시 낚시 ] [ 판매 ] [ 수조 ]',
    ],
  },
  {
    title: '가챠 도감',
    description: '16종 고양이 수집',
    image: '/screenshots/gacha.png',
    fallbackLines: [
      '🎴 가챠 결과!',
      '━━━━━━━━━━━━━━━',
      '✨ [레어] 먼치킨 숏레그',
      '도감 점수: +5',
      '',
      '📚 보유 도감: 2/16종',
      '🏆 도감 점수: 6점',
      '[ 다시 뽑기 ] [ 도감 보기 ]',
    ],
  },
  {
    title: '주식 투자',
    description: '20종목 실시간 변동',
    image: '/screenshots/stock.png',
    fallbackLines: [
      '📈 주식 시장',
      '━━━━━━━━━━━━━━━',
      '캣닢화학  27,865 (+3.2%) 📈',
      '참치수산  14,200 (-1.5%) 📉',
      '고등어통조림 8,900 (+0.8%) 📈',
      '',
      '보유: 캣닢화학 5주',
      '[ 매수 ] [ 매도 ] [ 새로고침 ]',
    ],
  },
]

function ScreenshotCard({ shot, index }: { shot: typeof SCREENSHOTS[number]; index: number }) {
  return (
    <div
      className="bg-[#2B2D31] rounded-xl overflow-hidden shadow-card card-hover animate-fade-in-up opacity-0"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      {/* 이미지가 있으면 이미지 표시, 없으면 텍스트 목업 */}
      <img
        src={shot.image}
        alt={shot.title}
        className="w-full"
        onError={(e) => {
          // 이미지 로드 실패 시 숨기고 fallback 표시
          const img = e.currentTarget
          img.style.display = 'none'
          const fallback = img.nextElementSibling as HTMLElement
          if (fallback) fallback.style.display = 'block'
        }}
      />
      {/* 텍스트 목업 (이미지 없을 때 표시) */}
      <div className="hidden p-5">
        <div className="border-l-4 border-brand-pink rounded bg-[#2F3136] p-4">
          <pre className="text-[#DCDDDE] text-xs leading-relaxed font-mono whitespace-pre-wrap">
            {shot.fallbackLines.join('\n')}
          </pre>
        </div>
      </div>

      {/* 하단 설명 */}
      <div className="px-5 py-3 flex items-center justify-between">
        <span className="text-white font-bold text-sm">{shot.title}</span>
        <span className="text-[#949BA4] text-xs">{shot.description}</span>
      </div>
    </div>
  )
}

export default function Screenshots() {
  return (
    <section id="screenshots" className="py-20 bg-white scroll-mt-16">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-brand-text mb-3">
            이런 느낌이에요
          </h2>
          <p className="text-brand-text-sub">
            디스코드에서 바로 플레이할 수 있어요
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {SCREENSHOTS.map((shot, i) => (
            <ScreenshotCard key={shot.title} shot={shot} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
