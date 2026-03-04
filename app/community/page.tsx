// 커뮤니티 페이지 - 공지사항, 가이드, FAQ
'use client'

import { useState } from 'react'

type SectionId = 'notices' | 'guide' | 'faq'

// 공지사항 데이터 (나중에 JSON/MDX로 분리 가능)
const NOTICES = [
  {
    id: 1,
    date: '2026-03-04',
    title: '냥봇 v1.0 정식 출시!',
    content: '오랜 테스트를 거쳐 냥봇이 정식 출시되었습니다. 경제, 게임, 투자, 가챠 시스템을 즐겨보세요!',
    tag: '출시',
  },
  {
    id: 2,
    date: '2026-03-01',
    title: '레이드 보스 시스템 업데이트',
    content: '5종의 레이드 보스가 추가되었습니다. 다른 유저들과 협력하여 보스를 물리치고 희귀 아이템을 획득하세요!',
    tag: '업데이트',
  },
  {
    id: 3,
    date: '2026-02-28',
    title: '어시장 & 낚시 시스템 오픈',
    content: '31종 어종 낚시와 어시장 시세 시스템이 추가되었습니다. 계절/시간대에 따라 잡히는 물고기가 달라요!',
    tag: '업데이트',
  },
]

const TAG_COLORS: Record<string, string> = {
  '출시': 'bg-brand-pink text-white',
  '업데이트': 'bg-brand-mint text-white',
  '이벤트': 'bg-brand-lavender text-white',
  '공지': 'bg-gray-500 text-white',
}

// 초보자 가이드 데이터
const GUIDES = [
  {
    title: '시작하기',
    icon: '🚀',
    steps: [
      '/경제 명령어로 가입하세요',
      '매일 출석하면 츄르와 도감 보너스를 받아요',
      '/일하기 → 알바로 첫 츄르를 벌어보세요',
      '/게임으로 미니게임을 즐겨보세요',
    ],
  },
  {
    title: '돈 벌기',
    icon: '💰',
    steps: [
      '알바: 시간대에 따라 보수가 달라요 (야간 보너스!)',
      '광산: 곡괭이 강화로 수익 UP',
      '낚시: 미끼 + 계절 조합으로 희귀 물고기를!',
      '소매치기: 성공하면 대박, 실패하면 벌금!',
    ],
  },
  {
    title: '투자하기',
    icon: '📈',
    steps: [
      '주식: 20종목이 5분마다 변동, 광기의 장 주의!',
      '부동산: 건물을 사면 매일 월세 수입이 들어와요',
      '어시장: 낚시로 잡은 물고기를 시세에 맞춰 판매',
      '조합: 물고기를 조합하면 특수 아이템 제작 가능',
    ],
  },
  {
    title: '가챠 & 도감',
    icon: '🎴',
    steps: [
      '가챠 1회: 10,000 츄르 또는 뽑기권 사용',
      '노멀 70%, 레어 25%, 에픽 4%, 전설 1%',
      '도감 점수에 따라 매일 출석 보너스 증가!',
      '중복 고양이도 +0.1점씩 추가돼요',
    ],
  },
]

// FAQ 데이터
const FAQS = [
  {
    q: '가입은 어떻게 하나요?',
    a: '디스코드에서 /경제 명령어를 입력한 후 "가입" 버튼을 눌러주세요.',
  },
  {
    q: '파산했어요! 어떻게 하죠?',
    a: '파산구제권이 있다면 /경제 → 파산구제를 사용하세요. 30,000 츄르로 재시작할 수 있습니다.',
  },
  {
    q: '주식이 너무 빠르게 변해요',
    a: '15% 확률로 "광기의 장"이 발동되면 극단적으로 변동합니다. 리스크 관리가 중요해요!',
  },
  {
    q: '알바 쿨타임은 얼마나 되나요?',
    a: '알바 3분, 광산 3분, 낚시 3분, 소매치기 1시간입니다.',
  },
  {
    q: '가챠에서 전설 고양이 확률은?',
    a: '전설 등급은 1% 확률입니다. 에픽 4%, 레어 25%, 노멀 70%예요.',
  },
  {
    q: '세금이 뭔가요?',
    a: '매일 자정(KST) 1억 츄르 이상 보유 시 5% 세금이 자동 징수됩니다.',
  },
]

export default function CommunityPage() {
  const [section, setSection] = useState<SectionId>('notices')
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const SECTIONS: { id: SectionId; label: string; icon: string }[] = [
    { id: 'notices', label: '공지사항', icon: '📢' },
    { id: 'guide', label: '초보자 가이드', icon: '📖' },
    { id: 'faq', label: 'FAQ', icon: '❓' },
  ]

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-brand-text mb-6">커뮤니티</h1>

      {/* 섹션 탭 */}
      <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
        {SECTIONS.map((s) => (
          <button
            key={s.id}
            onClick={() => setSection(s.id)}
            className={`flex items-center gap-1.5 px-4 py-2.5 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
              section === s.id
                ? 'bg-brand-pink text-white shadow-pink'
                : 'text-brand-text-sub hover:bg-brand-pink-soft/30'
            }`}
          >
            <span>{s.icon}</span>
            {s.label}
          </button>
        ))}
      </div>

      {/* 공지사항 */}
      {section === 'notices' && (
        <div className="space-y-4">
          {NOTICES.map((notice) => (
            <article key={notice.id} className="bg-white rounded-xl p-5 shadow-card">
              <div className="flex items-center gap-2 mb-2">
                <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${TAG_COLORS[notice.tag] || TAG_COLORS['공지']}`}>
                  {notice.tag}
                </span>
                <span className="text-brand-text-muted text-xs">{notice.date}</span>
              </div>
              <h3 className="text-lg font-bold text-brand-text mb-2">{notice.title}</h3>
              <p className="text-brand-text-sub text-sm leading-relaxed">{notice.content}</p>
            </article>
          ))}
        </div>
      )}

      {/* 초보자 가이드 */}
      {section === 'guide' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {GUIDES.map((guide) => (
            <div key={guide.title} className="bg-white rounded-xl p-5 shadow-card">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-2xl">{guide.icon}</span>
                <h3 className="text-lg font-bold text-brand-text">{guide.title}</h3>
              </div>
              <ol className="space-y-2">
                {guide.steps.map((step, i) => (
                  <li key={i} className="flex gap-2 text-sm text-brand-text-sub">
                    <span className="text-brand-pink font-bold shrink-0">{i + 1}.</span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          ))}
        </div>
      )}

      {/* FAQ */}
      {section === 'faq' && (
        <div className="space-y-2">
          {FAQS.map((faq, i) => (
            <div key={i} className="bg-white rounded-xl shadow-card overflow-hidden">
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="w-full p-4 flex items-center justify-between text-left"
              >
                <span className="font-medium text-brand-text text-sm">{faq.q}</span>
                <span className={`text-brand-text-muted transition-transform ${openFaq === i ? 'rotate-180' : ''}`}>
                  ▼
                </span>
              </button>
              {openFaq === i && (
                <div className="px-4 pb-4 text-brand-text-sub text-sm leading-relaxed border-t border-brand-bg pt-3">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
