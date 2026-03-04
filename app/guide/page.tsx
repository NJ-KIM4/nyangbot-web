// 게임 정보 페이지 - 냥봇의 모든 게임 콘텐츠를 한눈에 볼 수 있는 도감/가이드
'use client'

import { useState } from 'react'

// ──────────────────────────────────────────
// 탭 목록
// ──────────────────────────────────────────
const TABS = [
  { id: 'overview', label: '전체 개요', icon: '📋' },
  { id: 'jobs', label: '일하기', icon: '💼' },
  { id: 'fish', label: '물고기 도감', icon: '🐟' },
  { id: 'cats', label: '고양이 도감', icon: '🐱' },
  { id: 'games', label: '미니게임', icon: '🎮' },
  { id: 'invest', label: '투자', icon: '📈' },
  { id: 'raid', label: '레이드', icon: '⚔️' },
  { id: 'items', label: '아이템', icon: '🎒' },
  { id: 'craft', label: '제작소', icon: '🔧' },
  { id: 'etc', label: '기타 시스템', icon: '⚙️' },
]

// ──────────────────────────────────────────
// 게임 데이터 정의
// ──────────────────────────────────────────

// 일하기 데이터
const JOBS_BASIC = [
  { name: '박스 포장 알바', pay: '1,500', time: '오후 (12~18시)', bonus: 'x2' },
  { name: '꾹꾹이 마사지사', pay: '3,000', time: '항시', bonus: '-' },
  { name: '쥐잡이 용병', pay: '4,500', time: '야간 (18~6시)', bonus: 'x2' },
  { name: '피자가게 알바', pay: '2,500', time: '오후', bonus: 'x2' },
  { name: '쿠팡 물류센터 알바', pay: '3,500', time: '야간', bonus: 'x2' },
  { name: '고양이 모델 알바', pay: '5,000', time: '오전 (6~12시)', bonus: 'x2' },
  { name: '골골송 ASMR 알바', pay: '4,000', time: '야간', bonus: 'x3' },
  { name: '어시장 가드 알바', pay: '3,200', time: '오전', bonus: 'x2' },
  { name: '츄르 공장 시식 알바', pay: '2,000', time: '항시', bonus: '-' },
  { name: '캣맘 감시 알바', pay: '4,800', time: '오전', bonus: 'x2' },
  { name: '편의점 야간 알바', pay: '3,800', time: '야간', bonus: 'x4' },
  { name: '택배 분류 알바', pay: '2,800', time: '오전', bonus: 'x2' },
  { name: '유튜브 광고 시청 알바', pay: '2,200', time: '항시', bonus: '-' },
  { name: '목욕탕 때밀이 알바', pay: '4,200', time: '오후', bonus: 'x2' },
]

const JOBS_MID = [
  { name: '냥이 유치원 보육사', pay: '7,000', time: '오전' },
  { name: '고급 레스토랑 서빙', pay: '6,500', time: '오후' },
  { name: 'IT 기업 QA 알바', pay: '8,000', time: '오후' },
  { name: '반려동물 사진작가', pay: '7,500', time: '오전' },
  { name: '냥이 유튜버 편집 알바', pay: '9,000', time: '야간' },
]

const JOBS_HIGH = [
  { name: '주식 리딩방 운영', pay: '15,000', time: '오전 (x3)' },
  { name: '보안 취약점 제보', pay: '18,000', time: '항시' },
  { name: '명품 쇼룸 전속 모델', pay: '20,000', time: '오후' },
]

// 물고기 도감
const FISH_DATA = [
  // Tier 0 - 잡어
  { name: '멸치', icon: '🐟', tier: 0, tierName: '잡어', price: '300', season: '항시', time: '항시', level: 1, rod: 0 },
  { name: '붕어', icon: '🐠', tier: 0, tierName: '잡어', price: '400', season: '봄 (+15%)', time: '항시', level: 1, rod: 0 },
  { name: '빙어', icon: '🐟', tier: 0, tierName: '잡어', price: '500', season: '겨울 (+25%)', time: '새벽', level: 1, rod: 0 },
  // Tier 1 - 일반
  { name: '고등어', icon: '🐠', tier: 1, tierName: '일반', price: '800', season: '가을 (+20%)', time: '항시', level: 1, rod: 0 },
  { name: '농어', icon: '🐟', tier: 1, tierName: '일반', price: '1,800', season: '항시', time: '밤', level: 3, rod: 0 },
  { name: '도미', icon: '🐡', tier: 1, tierName: '일반', price: '2,200', season: '봄 (+12%)', time: '아침', level: 3, rod: 0 },
  { name: '방어', icon: '🐟', tier: 1, tierName: '일반', price: '3,000', season: '겨울 (+20%)', time: '아침', level: 4, rod: 5 },
  // Tier 2 - 고급
  { name: '연어', icon: '🍣', tier: 2, tierName: '고급', price: '2,000', season: '겨울 (+15%)', time: '새벽', level: 5, rod: 10 },
  { name: '황다랑어', icon: '🐟', tier: 2, tierName: '고급', price: '5,500', season: '여름 (+18%)', time: '낮', level: 6, rod: 15 },
  { name: '가자미', icon: '🐡', tier: 2, tierName: '고급', price: '4,000', season: '가을 (+15%)', time: '아침', level: 5, rod: 10 },
  // Tier 3 - 희귀
  { name: '참치', icon: '🐟', tier: 3, tierName: '희귀', price: '6,000', season: '여름 (+10%)', time: '새벽', level: 8, rod: 20 },
  { name: '옥돔', icon: '🐡', tier: 3, tierName: '희귀', price: '8,000', season: '겨울 (+10%)', time: '아침', level: 8, rod: 25 },
  { name: '자바리(다금바리)', icon: '🐠', tier: 3, tierName: '희귀', price: '12,000', season: '항시', time: '밤', level: 10, rod: 30 },
  { name: '홍어', icon: '🦈', tier: 3, tierName: '희귀', price: '10,000', season: '겨울 (+12%)', time: '낮', level: 10, rod: 30 },
  { name: '아귀', icon: '🐡', tier: 3, tierName: '희귀', price: '14,000', season: '겨울 (+8%)', time: '밤', level: 12, rod: 35 },
  { name: '민어', icon: '🐟', tier: 3, tierName: '희귀', price: '15,000', season: '여름 (+15%)', time: '저녁', level: 12, rod: 35 },
  // Tier 4 - 심해/전설
  { name: '돗돔', icon: '🐟', tier: 4, tierName: '심해', price: '30,000', season: '항시', time: '밤', level: 15, rod: 50 },
  { name: '철갑상어', icon: '🦈', tier: 4, tierName: '심해', price: '40,000', season: '봄 (+5%)', time: '새벽', level: 15, rod: 50 },
  // Tier 5 - 전설
  { name: '전설의 황금물고기', icon: '✨', tier: 5, tierName: '전설', price: '50,000', season: '항시', time: '항시', level: 1, rod: 0 },
]

// 미끼
const BAITS = [
  { name: '지렁이 미끼', icon: '🪱', price: '500', desc: '민물 어종 특화 (붕어 등)' },
  { name: '깐새우 미끼', icon: '🦐', price: '1,200', desc: '바닷고기 전반 효과' },
  { name: '오징어 미끼', icon: '🦑', price: '2,000', desc: '중고급 바다어종 특화 (참치/방어)' },
  { name: '살아있는 새우 미끼', icon: '🦞', price: '5,000', desc: '최고급 희귀 어종 전용' },
]

// 낚싯대 등급
const ROD_GRADES = [
  { level: '0', name: '맨손 낚시' },
  { level: '1~4', name: '낡은 낚싯대' },
  { level: '5~19', name: '평범한 낚싯대' },
  { level: '20~49', name: '숙련자의 낚싯대' },
  { level: '50~79', name: '장인의 낚싯대' },
  { level: '80+', name: '전설의 낚싯대' },
]

// 고양이 가챠
const CATS_NORMAL = [
  { name: '턱시도냥', score: 1 },
  { name: '치즈태비', score: 1 },
  { name: '고등어태비', score: 1 },
  { name: '카오스냥', score: 1 },
  { name: '삼색이', score: 1 },
  { name: '검은콩냥', score: 1 },
]
const CATS_RARE = [
  { name: '장화신은 치즈냥', score: 5 },
  { name: '오드아이 백냥', score: 5 },
  { name: '스핑크스', score: 5 },
  { name: '먼치킨 숏레그', score: 5 },
]
const CATS_EPIC = [
  { name: '마법사 고양이', score: 15 },
  { name: '우주비행사 냥이', score: 15 },
  { name: '해적선장 냥이', score: 15 },
]
const CATS_LEGEND = [
  { name: '왕관 쓴 사자냥', score: 50 },
  { name: '전설의 황금 고양이', score: 50 },
  { name: '신비한 구미호냥', score: 50 },
]

// 미니게임
const MINIGAMES = [
  { name: '주사위', desc: '50% 확률로 2배 배당', detail: '홀/짝 선택 후 주사위 굴림' },
  { name: '동전 홀짝', desc: '50% 확률로 2배 배당', detail: '홀수/짝수 선택' },
  { name: '즉석 복권', desc: '1장 10,000 츄르', detail: '1등(1%) 100만 / 2등(4%) 10만 / 3등(10%) 3만 / 4등(20%) 본전' },
  { name: '슬롯머신', desc: '페어 x2.5 / 트리플 x10 / 777 x50', detail: '고배율 잭팟 존재' },
  { name: '블랙잭', desc: '블랙잭 x2.5 / 일반 승 x2', detail: '최소 배팅 10,000 / 딜러 17이상 정지' },
  { name: '쥐경주', desc: '5마리 쥐 중 택 1', detail: '날쌘돌이(x2) / 뚱땡이(x3.5) / 닌자(x5) / 황금(x10) / 다리다친(x30)' },
  { name: '고양이 가챠', desc: '1회 10,000 츄르', detail: '16종 고양이 수집' },
]

// 쥐경주 참가자
const RATS = [
  { num: 1, name: '날쌘돌이 쥐', odds: 'x2.0', chance: '40%' },
  { num: 2, name: '뚱땡이 쥐', odds: 'x3.5', chance: '25%' },
  { num: 3, name: '닌자 쥐', odds: 'x5.0', chance: '20%' },
  { num: 4, name: '황금 쥐', odds: 'x10.0', chance: '10%' },
  { num: 5, name: '다리다친 쥐', odds: 'x30.0', chance: '5%' },
]

// 주식
const STOCKS = [
  { name: '냥냥전자', base: '65,000', volatility: '보통 (0.15)', type: '중형 안정주' },
  { name: '츄르바이오', base: '120,000', volatility: '높음 (0.35)', type: '고가 고변동 테마주' },
  { name: '참치원양어업', base: '28,000', volatility: '낮음 (0.08)', type: '저가 안정주' },
  { name: '골골송엔터', base: '51,000', volatility: '보통 (0.25)', type: '중형 테마주' },
  { name: '집사보험협회', base: '36,000', volatility: '매우 낮음 (0.03)', type: '초안정 배당주' },
]

// 부동산
const ESTATES = [
  { name: '비에 젖은 종이상자', price: '50,000', income: '2,000', roi: '25일' },
  { name: '3층 원목 캣타워', price: '300,000', income: '15,000', roi: '20일' },
  { name: '냥냥 북카페', price: '1,500,000', income: '80,000', roi: '약 19일' },
  { name: '대형 츄르 제조공장', price: '10,000,000', income: '500,000', roi: '20일' },
]

// 레이드 보스
const BOSSES = [
  { name: '거대 진공청소기 괴물', hp: '1,000,000', bounty: '5,000,000', drop: '🌀 고장난 청소기 부품' },
  { name: '더 거대해진 청소기 로봇', hp: '2,000,000', bounty: '8,000,000', drop: '🤖 로봇 코어' },
  { name: '심해의 어왕 鯨冥', hp: '1,500,000', bounty: '6,000,000', drop: '👑 어왕의 비늘' },
  { name: '도둑들의 왕 쥐대왕', hp: '800,000', bounty: '4,000,000', drop: '🐀 쥐대왕의 왕관' },
  { name: '우주냥이 메테오캣', hp: '3,000,000', bounty: '12,000,000', drop: '🌠 별똥별 조각' },
]

// 아이템
const ITEMS_GACHA_SHIELD = [
  { name: '의문의 츄르 상자', type: '가챠', source: '알바 (1%)', desc: '1만~50만 츄르 무작위' },
  { name: '빛나는 다이아몬드 원석', type: '가챠', source: '광산 (0.5%)', desc: '35% 확률 100만 / 실패 시 소멸' },
  { name: '강원랜드 프리패스권', type: '방어', source: '소매치기 (2%)', desc: '도박 패배 1회 보호' },
]
const ITEMS_BUFF = [
  { name: '고농축 캣닢 앰플', source: '알바 (1.5%)', desc: '1시간 EXP 2배' },
  { name: '황금 참치캔', source: '낚시 (1%)', desc: '다음 5회 노동 수익 1.5배' },
  { name: '행운의 네잎클로버', source: '낚시 (0.5%)', desc: '강화 성공률 +15%' },
  { name: '정령의 결정', source: '광산 (0.3%)', desc: '곡괭이 강화 성공률 +20%' },
  { name: '어왕의 비늘', source: '레이드', desc: '낚싯대 강화 성공률 +20%' },
  { name: '쥐대왕의 왕관', source: '레이드', desc: '1시간 소매치기 성공률 +20%' },
]
const ITEMS_TRAP = [
  { name: '강력접착 쥐덫', source: '소매치기 (1%)', desc: '타겟 다음 노동 90% 대실패' },
  { name: '경찰 호출기', source: '소매치기 (1%)', desc: '1시간 내 소매치기범 적발 → 벌금+포상' },
  { name: '가짜 츄르 봉투', source: '소매치기 (1%)', desc: '소매치기당할 때 역습 (가짜만 도둑맞음)' },
  { name: '도둑 방지 목걸이', source: '소매치기 (1%)', desc: '소매치기 1회 방어' },
]
const ITEMS_ETC = [
  { name: '파산구제권', source: '알바 (0.3%)', desc: '파산 시 1회 구제' },
  { name: '보물 지도 조각', source: '광산 (1%)', desc: '수집형 아이템' },
  { name: '고장난 청소기 부품', source: '레이드', desc: '비밀 제작소 재료' },
  { name: '로봇 코어', source: '레이드', desc: '비밀 제작소 재료' },
  { name: '별똥별 조각', source: '레이드', desc: '비밀 제작소 재료' },
]

// 제작소 레시피
const RECIPES = [
  { name: '비밀 금고 폭파', material: '🗝️ 비밀 금고 열쇠 x3', result: '10만~50만 츄르' },
  { name: '은하수 칭호 제작', material: '✨ 별의 파편 x10', result: '[은하수 정복묘] 칭호' },
  { name: '자동 노동권 제작', material: '✨ 별의 파편 x5', result: '자동 노동 이용권 1시간' },
  { name: '캣닢 앰플 제작', material: '✨ 별의 파편 x3', result: '고농축 캣닢 앰플' },
  { name: '황금 참치캔 제작', material: '✨ 별의 파편 x15', result: '황금 참치캔 + 5만 츄르' },
  { name: '상여금 봉투 환금', material: '✉️ 두둑한 상여금 x1', result: '2만~8만 츄르' },
  { name: '낡은 곡괭이 제련', material: '⛏️ 누군가 쓰던 곡괭이 x5', result: '의문의 츄르 상자 + 3만 츄르' },
  { name: '별똥별 조각 봉납', material: '🌠 별똥별 조각 x3', result: '20만~70만 츄르 또는 캣닢 앰플' },
  { name: '청소 로봇 합성', material: '🌀 청소기 부품 x3 + 🤖 로봇 코어 x1', result: '황금 참치캔 + 10만 츄르' },
  { name: '용왕의 흔적 환금', material: '🔱 용왕의 흔적 x1', result: '5만 츄르' },
]

// 낚시 레시피
const FISH_RECIPES = [
  { material: '전설의 황금물고기 x1', result: '황금 참치캔 (노동 수익 1.5배 5회)' },
  { material: '자바리(다금바리) x1', result: '강원랜드 프리패스권 (도박 패배 1회 보호)' },
  { material: '철갑상어 x1', result: '정령의 결정 (곡괭이 강화 +20%)' },
  { material: '돗돔 x1', result: '어왕의 비늘 (낚싯대 강화 +20%)' },
  { material: '참치 x3', result: '황금 참치캔' },
  { material: '돗돔 x1 + 철갑상어 x1', result: '고농축 캣닢 앰플 (1시간 EXP 2배)' },
  { material: '민어 x2 + 아귀 x1', result: '강력접착 쥐덫 (타겟 노동 방해)' },
  { material: '황다랑어 x2 + 연어 x2', result: '행운의 네잎클로버 (강화 +15%)' },
  { material: '홍어 x2 + 아귀 x2', result: '가짜 츄르 봉투 (소매치기 역습)' },
  { material: '옥돔 x3', result: '파산구제권' },
]

// 곡괭이 등급
const PICKAXE_GRADES = [
  { level: 0, name: '나무', range: '100 ~ 500', upgradeCost: '5,000', successRate: '80%', downgrade: '0%' },
  { level: 1, name: '돌', range: '300 ~ 1,000', upgradeCost: '20,000', successRate: '60%', downgrade: '10%' },
  { level: 2, name: '철', range: '1,000 ~ 3,000', upgradeCost: '50,000', successRate: '40%', downgrade: '30%' },
  { level: 3, name: '금', range: '3,000 ~ 8,000', upgradeCost: '150,000', successRate: '25%', downgrade: '50%' },
  { level: 4, name: '다이아', range: '8,000 ~ 20,000', upgradeCost: '500,000', successRate: '10%', downgrade: '60%' },
  { level: 5, name: '마스터', range: '20,000 ~ 50,000', upgradeCost: '-', successRate: '-', downgrade: '-' },
]

// 칭호
const TITLES = [
  { name: '초보 집사', price: '5,000 츄르' },
  { name: '츄르 부자', price: '50,000 츄르' },
  { name: '강원랜드 VIP', price: '100,000 츄르' },
  { name: '곡괭이 장인', price: '70,000 츄르' },
  { name: '냥국 통치자', price: '1,000,000 츄르' },
  { name: '은하수 정복묘', price: '별의 파편 10개 (제작소)' },
]

// ──────────────────────────────────────────
// 공통 컴포넌트
// ──────────────────────────────────────────

// 물고기 티어별 색상
function getTierColor(tier: number) {
  switch (tier) {
    case 0: return 'bg-gray-100 text-gray-600'
    case 1: return 'bg-green-50 text-green-700'
    case 2: return 'bg-blue-50 text-blue-700'
    case 3: return 'bg-purple-50 text-purple-700'
    case 4: return 'bg-amber-50 text-amber-700'
    case 5: return 'bg-yellow-50 text-yellow-700'
    default: return 'bg-gray-100 text-gray-600'
  }
}

// 고양이 등급별 색상
function getGradeStyle(grade: string) {
  switch (grade) {
    case '노멀': return { bg: 'bg-gray-50', border: 'border-gray-200', text: 'text-gray-600', badge: 'bg-gray-200 text-gray-700' }
    case '레어': return { bg: 'bg-blue-50', border: 'border-blue-200', text: 'text-blue-700', badge: 'bg-blue-200 text-blue-700' }
    case '에픽': return { bg: 'bg-purple-50', border: 'border-purple-200', text: 'text-purple-700', badge: 'bg-purple-200 text-purple-700' }
    case '전설': return { bg: 'bg-amber-50', border: 'border-amber-200', text: 'text-amber-700', badge: 'bg-amber-200 text-amber-700' }
    default: return { bg: 'bg-gray-50', border: 'border-gray-200', text: 'text-gray-600', badge: 'bg-gray-200 text-gray-700' }
  }
}

// 카드 래퍼
function Card({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`bg-white rounded-xl shadow-card p-5 ${className}`}>
      {children}
    </div>
  )
}

// 섹션 헤더
function SectionHeader({ icon, title, subtitle }: { icon: string; title: string; subtitle?: string }) {
  return (
    <div className="mb-6">
      <h3 className="text-xl font-bold text-brand-text flex items-center gap-2">
        <span className="text-2xl">{icon}</span> {title}
      </h3>
      {subtitle && <p className="text-brand-text-sub text-sm mt-1 ml-9">{subtitle}</p>}
    </div>
  )
}

// ──────────────────────────────────────────
// 탭별 콘텐츠 컴포넌트
// ──────────────────────────────────────────

// 전체 개요
function OverviewTab() {
  const systems = [
    { icon: '💰', name: '경제', desc: '가입 · 출석 · 송금 · 파산구제 · 부자랭킹', color: 'border-l-brand-pink' },
    { icon: '💼', name: '일하기', desc: '22종 알바 (기본 14 + 중급 5 + 고급 3)', color: 'border-l-brand-mint' },
    { icon: '⛏️', name: '광산', desc: '곡괭이 강화 (나무→마스터 6단계), 3분 쿨타임', color: 'border-l-amber-400' },
    { icon: '🎣', name: '낚시', desc: '20종 어종, 계절/시간대 영향, 어시장 판매', color: 'border-l-blue-400' },
    { icon: '🎮', name: '미니게임', desc: '주사위 · 동전 · 복권 · 슬롯 · 블랙잭 · 쥐경주', color: 'border-l-brand-lavender' },
    { icon: '🐱', name: '가챠', desc: '16종 고양이 수집, 도감 점수 → 출석 보너스', color: 'border-l-brand-pink' },
    { icon: '📈', name: '주식', desc: '5종목, 5분 단위 시세 변동, 광기의 장 이벤트', color: 'border-l-green-400' },
    { icon: '🏠', name: '부동산', desc: '4종 건물 구매, 24시간마다 월세 수금', color: 'border-l-amber-500' },
    { icon: '⚔️', name: '레이드', desc: '5종 보스, 서버 공동 공략, 기여도 분배', color: 'border-l-red-400' },
    { icon: '🐹', name: '반려동물', desc: '햄스터 입양, 6시간마다 밥주기 → 보상', color: 'border-l-brand-mint' },
    { icon: '🗡️', name: '결투', desc: '1:1 가위바위보 배팅 대결', color: 'border-l-brand-lavender' },
    { icon: '🔧', name: '제작소', desc: '10종 조합 레시피, 물고기 조합 10종', color: 'border-l-gray-400' },
    { icon: '🏪', name: '암시장', desc: '미끼 · 이용권 · 치장템 구매', color: 'border-l-brand-text' },
    { icon: '🎭', name: '칭호', desc: '6종 칭호 구매 · 장착', color: 'border-l-brand-pink-light' },
    { icon: '🕵️', name: '소매치기', desc: '다른 유저 츄르 절도 (1시간 쿨)', color: 'border-l-gray-600' },
    { icon: '💸', name: '세금', desc: '1억 이상 보유 시 매일 자정 5% 자동 징수', color: 'border-l-red-300' },
  ]

  return (
    <div>
      <SectionHeader icon="📋" title="냥봇 전체 시스템" subtitle="총 16종의 게임 시스템을 즐길 수 있어요" />

      {/* 요약 카운터 */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
        {[
          { label: '알바', value: '22종', icon: '💼' },
          { label: '물고기', value: '20종', icon: '🐟' },
          { label: '고양이', value: '16종', icon: '🐱' },
          { label: '레이드 보스', value: '5종', icon: '⚔️' },
          { label: '주식 종목', value: '5종', icon: '📈' },
          { label: '부동산', value: '4종', icon: '🏠' },
          { label: '미니게임', value: '7종', icon: '🎮' },
          { label: '아이템', value: '30+종', icon: '🎒' },
        ].map((stat) => (
          <Card key={stat.label} className="text-center !p-4">
            <span className="text-2xl">{stat.icon}</span>
            <div className="text-xl font-bold text-brand-text mt-1">{stat.value}</div>
            <div className="text-xs text-brand-text-sub">{stat.label}</div>
          </Card>
        ))}
      </div>

      {/* 시스템 목록 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {systems.map((sys) => (
          <div key={sys.name} className={`bg-white rounded-lg border-l-4 ${sys.color} p-4 shadow-sm`}>
            <div className="flex items-center gap-2 mb-1">
              <span>{sys.icon}</span>
              <span className="font-bold text-brand-text">{sys.name}</span>
            </div>
            <p className="text-brand-text-sub text-sm ml-7">{sys.desc}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

// 일하기 탭
function JobsTab() {
  return (
    <div className="space-y-8">
      <SectionHeader icon="💼" title="일하기" subtitle="레벨에 따라 해금되는 22종의 알바" />

      {/* 기본 알바 */}
      <Card>
        <h4 className="font-bold text-brand-text mb-3 flex items-center gap-2">
          <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs rounded-full">기본</span>
          Lv.1 이상 — 14종
        </h4>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-brand-text-muted border-b">
                <th className="pb-2 pr-3">알바명</th>
                <th className="pb-2 pr-3">기본 수익</th>
                <th className="pb-2 pr-3">최적 시간대</th>
                <th className="pb-2">보너스</th>
              </tr>
            </thead>
            <tbody>
              {JOBS_BASIC.map((job) => (
                <tr key={job.name} className="border-b border-gray-50">
                  <td className="py-2 pr-3 text-brand-text font-medium">{job.name}</td>
                  <td className="py-2 pr-3 text-brand-mint font-bold">{job.pay} 츄르</td>
                  <td className="py-2 pr-3 text-brand-text-sub">{job.time}</td>
                  <td className="py-2">
                    {job.bonus !== '-' ? (
                      <span className="px-2 py-0.5 bg-brand-pink-soft text-brand-pink text-xs rounded-full">{job.bonus}</span>
                    ) : (
                      <span className="text-brand-text-muted text-xs">-</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* 중급 알바 */}
      <Card>
        <h4 className="font-bold text-brand-text mb-3 flex items-center gap-2">
          <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs rounded-full">중급</span>
          Lv.5 이상 — 5종
        </h4>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-brand-text-muted border-b">
                <th className="pb-2 pr-3">알바명</th>
                <th className="pb-2 pr-3">기본 수익</th>
                <th className="pb-2">최적 시간대</th>
              </tr>
            </thead>
            <tbody>
              {JOBS_MID.map((job) => (
                <tr key={job.name} className="border-b border-gray-50">
                  <td className="py-2 pr-3 text-brand-text font-medium">{job.name}</td>
                  <td className="py-2 pr-3 text-brand-mint font-bold">{job.pay} 츄르</td>
                  <td className="py-2 text-brand-text-sub">{job.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* 고급 알바 */}
      <Card>
        <h4 className="font-bold text-brand-text mb-3 flex items-center gap-2">
          <span className="px-2 py-0.5 bg-purple-100 text-purple-700 text-xs rounded-full">고급</span>
          Lv.10 이상 — 3종
        </h4>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-brand-text-muted border-b">
                <th className="pb-2 pr-3">알바명</th>
                <th className="pb-2 pr-3">기본 수익</th>
                <th className="pb-2">최적 시간대</th>
              </tr>
            </thead>
            <tbody>
              {JOBS_HIGH.map((job) => (
                <tr key={job.name} className="border-b border-gray-50">
                  <td className="py-2 pr-3 text-brand-text font-medium">{job.name}</td>
                  <td className="py-2 pr-3 text-brand-mint font-bold">{job.pay} 츄르</td>
                  <td className="py-2 text-brand-text-sub">{job.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* 시간대 안내 */}
      <Card className="!bg-brand-bg">
        <h4 className="font-bold text-brand-text mb-2">💡 시간대 보너스 안내</h4>
        <p className="text-brand-text-sub text-sm leading-relaxed">
          각 알바에는 최적 시간대가 있어요. 해당 시간에 일하면 수익이 <strong>2~4배</strong>까지 증가합니다!
        </p>
        <div className="flex flex-wrap gap-3 mt-3 text-xs">
          <span className="px-3 py-1 bg-white rounded-full text-brand-text">🌅 오전: 06~12시</span>
          <span className="px-3 py-1 bg-white rounded-full text-brand-text">☀️ 오후: 12~18시</span>
          <span className="px-3 py-1 bg-white rounded-full text-brand-text">🌙 야간: 18~06시</span>
        </div>
      </Card>
    </div>
  )
}

// 물고기 도감 탭
function FishTab() {
  const [selectedTier, setSelectedTier] = useState<number | null>(null)
  const tiers = [
    { tier: 0, label: '잡어', count: 3 },
    { tier: 1, label: '일반', count: 4 },
    { tier: 2, label: '고급', count: 3 },
    { tier: 3, label: '희귀', count: 6 },
    { tier: 4, label: '심해', count: 2 },
    { tier: 5, label: '전설', count: 1 },
  ]
  const filtered = selectedTier !== null ? FISH_DATA.filter(f => f.tier === selectedTier) : FISH_DATA

  return (
    <div className="space-y-6">
      <SectionHeader icon="🐟" title="물고기 도감" subtitle="20종 어종 — 계절과 시간대에 따라 잡히는 어종이 달라요" />

      {/* 티어 필터 */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setSelectedTier(null)}
          className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
            selectedTier === null ? 'bg-brand-pink text-white' : 'bg-gray-100 text-brand-text-sub hover:bg-gray-200'
          }`}
        >
          전체 (20)
        </button>
        {tiers.map((t) => (
          <button
            key={t.tier}
            onClick={() => setSelectedTier(t.tier)}
            className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
              selectedTier === t.tier ? 'bg-brand-pink text-white' : 'bg-gray-100 text-brand-text-sub hover:bg-gray-200'
            }`}
          >
            {t.label} ({t.count})
          </button>
        ))}
      </div>

      {/* 물고기 카드 그리드 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {filtered.map((fish) => (
          <div key={fish.name} className={`rounded-lg border p-4 ${getTierColor(fish.tier)}`}>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-2xl">{fish.icon}</span>
              <div>
                <div className="font-bold text-sm">{fish.name}</div>
                <span className="text-xs opacity-75">Tier {fish.tier} · {fish.tierName}</span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-1 text-xs mt-2">
              <div>💰 {fish.price} 츄르</div>
              <div>🌊 {fish.season}</div>
              <div>🕐 {fish.time}</div>
              <div>🎣 Lv.{fish.level} / 낚싯대 {fish.rod}</div>
            </div>
          </div>
        ))}
      </div>

      {/* 미끼 */}
      <Card>
        <h4 className="font-bold text-brand-text mb-3">🪱 미끼 종류</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {BAITS.map((bait) => (
            <div key={bait.name} className="flex items-center gap-3 bg-brand-bg rounded-lg p-3">
              <span className="text-2xl">{bait.icon}</span>
              <div>
                <div className="font-medium text-brand-text text-sm">{bait.name}</div>
                <div className="text-xs text-brand-text-sub">{bait.desc}</div>
                <div className="text-xs text-brand-mint font-bold mt-0.5">{bait.price} 츄르</div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* 낚싯대 등급 */}
      <Card>
        <h4 className="font-bold text-brand-text mb-3">🎣 낚싯대 등급</h4>
        <div className="flex flex-wrap gap-2">
          {ROD_GRADES.map((rod) => (
            <div key={rod.level} className="bg-brand-bg rounded-lg px-3 py-2 text-sm">
              <span className="text-brand-text-muted">Lv.{rod.level}</span>
              <span className="font-bold text-brand-text ml-1">{rod.name}</span>
            </div>
          ))}
        </div>
      </Card>

      {/* 낚시 조합 */}
      <Card>
        <h4 className="font-bold text-brand-text mb-3">🔧 물고기 조합 레시피</h4>
        <div className="space-y-2">
          {FISH_RECIPES.map((recipe, i) => (
            <div key={i} className="flex items-center gap-2 text-sm bg-brand-bg rounded-lg px-3 py-2">
              <span className="text-brand-text-sub flex-shrink-0">{recipe.material}</span>
              <span className="text-brand-pink">→</span>
              <span className="text-brand-text font-medium">{recipe.result}</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}

// 고양이 도감 탭
function CatsTab() {
  const grades = [
    { name: '노멀', chance: '70%', cats: CATS_NORMAL, fragment: 1 },
    { name: '레어', chance: '25%', cats: CATS_RARE, fragment: 2 },
    { name: '에픽', chance: '4%', cats: CATS_EPIC, fragment: 5 },
    { name: '전설', chance: '1%', cats: CATS_LEGEND, fragment: 10 },
  ]

  return (
    <div className="space-y-6">
      <SectionHeader icon="🐱" title="고양이 도감" subtitle="16종 고양이 수집 — 가챠 1회 10,000 츄르" />

      {/* 확률 안내 */}
      <div className="flex flex-wrap gap-3">
        {grades.map((g) => {
          const style = getGradeStyle(g.name)
          return (
            <div key={g.name} className={`${style.bg} border ${style.border} rounded-lg px-4 py-2 text-center`}>
              <div className={`font-bold ${style.text}`}>{g.name}</div>
              <div className="text-lg font-bold text-brand-text">{g.chance}</div>
              <div className="text-xs text-brand-text-muted">{g.cats.length}종</div>
            </div>
          )
        })}
      </div>

      {/* 등급별 고양이 */}
      {grades.map((g) => {
        const style = getGradeStyle(g.name)
        return (
          <Card key={g.name}>
            <h4 className="font-bold text-brand-text mb-3 flex items-center gap-2">
              <span className={`px-2 py-0.5 ${style.badge} text-xs rounded-full`}>{g.name}</span>
              확률 {g.chance} · 도감 점수 {g.cats[0].score}점 · 중복 시 별의 파편 {g.fragment}개
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {g.cats.map((cat) => (
                <div key={cat.name} className={`${style.bg} border ${style.border} rounded-lg p-3 text-center`}>
                  <div className="text-3xl mb-1">🐱</div>
                  <div className={`font-bold text-sm ${style.text}`}>{cat.name}</div>
                  <div className="text-xs text-brand-text-muted mt-0.5">+{cat.score}점</div>
                </div>
              ))}
            </div>
          </Card>
        )
      })}

      {/* 도감 보너스 안내 */}
      <Card className="!bg-brand-bg">
        <h4 className="font-bold text-brand-text mb-2">💡 도감 점수 패시브 보너스</h4>
        <p className="text-brand-text-sub text-sm leading-relaxed">
          출석 시 도감 점수 1점당 <strong>100 츄르</strong> 추가 지급 (최대 200,000 츄르)
        </p>
      </Card>
    </div>
  )
}

// 미니게임 탭
function GamesTab() {
  return (
    <div className="space-y-6">
      <SectionHeader icon="🎮" title="미니게임" subtitle="7종 도박/게임으로 한탕을 노려보세요" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {MINIGAMES.map((game) => (
          <Card key={game.name}>
            <h4 className="font-bold text-brand-text text-lg mb-1">{game.name}</h4>
            <p className="text-brand-mint font-bold text-sm mb-2">{game.desc}</p>
            <p className="text-brand-text-sub text-sm">{game.detail}</p>
          </Card>
        ))}
      </div>

      {/* 쥐경주 상세 */}
      <Card>
        <h4 className="font-bold text-brand-text mb-3">🐭 쥐경주 참가자</h4>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-brand-text-muted border-b">
                <th className="pb-2 pr-3">번호</th>
                <th className="pb-2 pr-3">이름</th>
                <th className="pb-2 pr-3">배당</th>
                <th className="pb-2">우승 확률</th>
              </tr>
            </thead>
            <tbody>
              {RATS.map((rat) => (
                <tr key={rat.num} className="border-b border-gray-50">
                  <td className="py-2 pr-3 font-bold text-brand-text">{rat.num}번</td>
                  <td className="py-2 pr-3 text-brand-text">{rat.name}</td>
                  <td className="py-2 pr-3 text-brand-mint font-bold">{rat.odds}</td>
                  <td className="py-2 text-brand-text-sub">{rat.chance}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}

// 투자 탭
function InvestTab() {
  return (
    <div className="space-y-6">
      <SectionHeader icon="📈" title="투자 시스템" subtitle="주식과 부동산으로 재테크하세요" />

      {/* 주식 */}
      <Card>
        <h4 className="font-bold text-brand-text mb-3">📊 주식 시장 — 5종목</h4>
        <p className="text-brand-text-sub text-sm mb-3">5분 단위 시세 변동 · 15% 확률로 &quot;광기의 장&quot; (변동폭 2.5배)</p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-brand-text-muted border-b">
                <th className="pb-2 pr-3">종목명</th>
                <th className="pb-2 pr-3">기준가</th>
                <th className="pb-2 pr-3">변동폭</th>
                <th className="pb-2">특성</th>
              </tr>
            </thead>
            <tbody>
              {STOCKS.map((stock) => (
                <tr key={stock.name} className="border-b border-gray-50">
                  <td className="py-2 pr-3 font-bold text-brand-text">{stock.name}</td>
                  <td className="py-2 pr-3 text-brand-mint font-bold">{stock.base}</td>
                  <td className="py-2 pr-3 text-brand-text-sub">{stock.volatility}</td>
                  <td className="py-2 text-brand-text-sub text-xs">{stock.type}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* 부동산 */}
      <Card>
        <h4 className="font-bold text-brand-text mb-3">🏠 부동산 — 4종</h4>
        <p className="text-brand-text-sub text-sm mb-3">24시간마다 월세 수금 가능 · 동일 건물 중복 구매 가능</p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-brand-text-muted border-b">
                <th className="pb-2 pr-3">건물명</th>
                <th className="pb-2 pr-3">구매가</th>
                <th className="pb-2 pr-3">일일 수익</th>
                <th className="pb-2">회수 기간</th>
              </tr>
            </thead>
            <tbody>
              {ESTATES.map((estate) => (
                <tr key={estate.name} className="border-b border-gray-50">
                  <td className="py-2 pr-3 font-bold text-brand-text">{estate.name}</td>
                  <td className="py-2 pr-3 text-brand-text-sub">{estate.price} 츄르</td>
                  <td className="py-2 pr-3 text-brand-mint font-bold">+{estate.income}</td>
                  <td className="py-2 text-brand-text-sub">{estate.roi}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* 어시장 */}
      <Card className="!bg-brand-bg">
        <h4 className="font-bold text-brand-text mb-2">🐟 어시장</h4>
        <p className="text-brand-text-sub text-sm leading-relaxed">
          낚은 물고기를 시장 시세에 판매할 수 있어요. 시세는 <strong>1시간마다 변동</strong>됩니다.
          비싼 시세일 때 판매하면 더 많은 츄르를 벌 수 있어요!
        </p>
      </Card>
    </div>
  )
}

// 레이드 탭
function RaidTab() {
  return (
    <div className="space-y-6">
      <SectionHeader icon="⚔️" title="레이드 보스" subtitle="서버 유저들과 협력하여 보스를 격파하세요" />

      <div className="grid grid-cols-1 gap-4">
        {BOSSES.map((boss) => (
          <Card key={boss.name}>
            <div className="flex flex-col sm:flex-row sm:items-center gap-3">
              <div className="flex-1">
                <h4 className="font-bold text-brand-text text-lg">{boss.name}</h4>
                <div className="flex flex-wrap gap-3 mt-2 text-sm">
                  <span className="text-red-500">❤️ HP: {boss.hp}</span>
                  <span className="text-brand-mint">💰 현상금: {boss.bounty} 츄르</span>
                </div>
              </div>
              <div className="bg-brand-bg rounded-lg px-4 py-2 text-center">
                <div className="text-xs text-brand-text-muted">드랍 아이템</div>
                <div className="font-bold text-brand-text text-sm">{boss.drop}</div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Card className="!bg-brand-bg">
        <h4 className="font-bold text-brand-text mb-2">💡 레이드 규칙</h4>
        <ul className="text-brand-text-sub text-sm space-y-1 list-disc list-inside">
          <li>서버 전체 유저가 공동으로 보스를 공략합니다</li>
          <li>기여도(딜량)에 비례하여 현상금이 분배됩니다</li>
          <li>보스 격파 후 다른 보스가 랜덤으로 등장합니다</li>
        </ul>
      </Card>
    </div>
  )
}

// 아이템 탭
function ItemsTab() {
  return (
    <div className="space-y-6">
      <SectionHeader icon="🎒" title="아이템" subtitle="일하기, 낚시, 광산, 레이드에서 획득 가능" />

      {/* 가챠/방어 */}
      <Card>
        <h4 className="font-bold text-brand-text mb-3">🎁 가챠 & 방어 아이템</h4>
        {ITEMS_GACHA_SHIELD.map((item) => (
          <div key={item.name} className="flex items-start gap-3 py-2 border-b border-gray-50 last:border-0">
            <div className="flex-1">
              <div className="font-medium text-brand-text text-sm">{item.name}</div>
              <div className="text-xs text-brand-text-sub">{item.desc}</div>
            </div>
            <div className="flex-shrink-0 text-xs">
              <span className="px-2 py-0.5 bg-brand-bg rounded-full text-brand-text-sub">{item.source}</span>
            </div>
          </div>
        ))}
      </Card>

      {/* 버프 */}
      <Card>
        <h4 className="font-bold text-brand-text mb-3">⬆️ 버프 아이템</h4>
        {ITEMS_BUFF.map((item) => (
          <div key={item.name} className="flex items-start gap-3 py-2 border-b border-gray-50 last:border-0">
            <div className="flex-1">
              <div className="font-medium text-brand-text text-sm">{item.name}</div>
              <div className="text-xs text-brand-mint font-medium">{item.desc}</div>
            </div>
            <div className="flex-shrink-0 text-xs">
              <span className="px-2 py-0.5 bg-brand-bg rounded-full text-brand-text-sub">{item.source}</span>
            </div>
          </div>
        ))}
      </Card>

      {/* 함정/견제 */}
      <Card>
        <h4 className="font-bold text-brand-text mb-3">🪤 함정 & 견제 아이템</h4>
        {ITEMS_TRAP.map((item) => (
          <div key={item.name} className="flex items-start gap-3 py-2 border-b border-gray-50 last:border-0">
            <div className="flex-1">
              <div className="font-medium text-brand-text text-sm">{item.name}</div>
              <div className="text-xs text-brand-text-sub">{item.desc}</div>
            </div>
            <div className="flex-shrink-0 text-xs">
              <span className="px-2 py-0.5 bg-brand-bg rounded-full text-brand-text-sub">{item.source}</span>
            </div>
          </div>
        ))}
      </Card>

      {/* 기타 */}
      <Card>
        <h4 className="font-bold text-brand-text mb-3">📦 기타 아이템</h4>
        {ITEMS_ETC.map((item) => (
          <div key={item.name} className="flex items-start gap-3 py-2 border-b border-gray-50 last:border-0">
            <div className="flex-1">
              <div className="font-medium text-brand-text text-sm">{item.name}</div>
              <div className="text-xs text-brand-text-sub">{item.desc}</div>
            </div>
            <div className="flex-shrink-0 text-xs">
              <span className="px-2 py-0.5 bg-brand-bg rounded-full text-brand-text-sub">{item.source}</span>
            </div>
          </div>
        ))}
      </Card>
    </div>
  )
}

// 제작소 탭
function CraftTab() {
  return (
    <div className="space-y-6">
      <SectionHeader icon="🔧" title="비밀 제작소" subtitle="특수 재료로 아이템을 조합하세요 (가방에서 접근)" />

      <Card>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-brand-text-muted border-b">
                <th className="pb-2 pr-3">레시피명</th>
                <th className="pb-2 pr-3">필요 재료</th>
                <th className="pb-2">결과물</th>
              </tr>
            </thead>
            <tbody>
              {RECIPES.map((recipe) => (
                <tr key={recipe.name} className="border-b border-gray-50">
                  <td className="py-2 pr-3 font-bold text-brand-text">{recipe.name}</td>
                  <td className="py-2 pr-3 text-brand-text-sub">{recipe.material}</td>
                  <td className="py-2 text-brand-mint font-medium">{recipe.result}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}

// 기타 시스템 탭
function EtcTab() {
  return (
    <div className="space-y-6">
      <SectionHeader icon="⚙️" title="기타 시스템" />

      {/* 광산 & 곡괭이 */}
      <Card>
        <h4 className="font-bold text-brand-text mb-3">⛏️ 광산 & 곡괭이 강화</h4>
        <p className="text-brand-text-sub text-sm mb-3">3분 쿨타임 · 크리티컬(10%) 시 수익 2배</p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-brand-text-muted border-b">
                <th className="pb-2 pr-2">등급</th>
                <th className="pb-2 pr-2">수익 범위</th>
                <th className="pb-2 pr-2">강화 비용</th>
                <th className="pb-2 pr-2">성공률</th>
                <th className="pb-2">하락 확률</th>
              </tr>
            </thead>
            <tbody>
              {PICKAXE_GRADES.map((p) => (
                <tr key={p.level} className="border-b border-gray-50">
                  <td className="py-2 pr-2 font-bold text-brand-text">Lv.{p.level} {p.name}</td>
                  <td className="py-2 pr-2 text-brand-mint">{p.range}</td>
                  <td className="py-2 pr-2 text-brand-text-sub">{p.upgradeCost}</td>
                  <td className="py-2 pr-2 text-brand-text-sub">{p.successRate}</td>
                  <td className="py-2 text-red-400">{p.downgrade}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* 반려동물 */}
      <Card>
        <h4 className="font-bold text-brand-text mb-2">🐹 반려동물 (펫)</h4>
        <ul className="text-brand-text-sub text-sm space-y-1 list-disc list-inside">
          <li>아기 햄스터 입양: <strong>500,000 츄르</strong></li>
          <li>6시간마다 밥주기 가능</li>
          <li>보상: 30,000 + (레벨 x 5,000) 츄르</li>
          <li>20% 확률로 💎 다이아 드랍</li>
        </ul>
      </Card>

      {/* 소매치기 */}
      <Card>
        <h4 className="font-bold text-brand-text mb-2">🕵️ 소매치기</h4>
        <ul className="text-brand-text-sub text-sm space-y-1 list-disc list-inside">
          <li>쿨타임: 1시간</li>
          <li>성공률: Lv.1 기준 30% ~ Lv.16+ 기준 60%</li>
          <li>실패 시 벌금 15,000 츄르</li>
          <li>방어 아이템으로 역습 가능!</li>
        </ul>
      </Card>

      {/* 칭호 */}
      <Card>
        <h4 className="font-bold text-brand-text mb-3">🎭 칭호 시스템</h4>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {TITLES.map((title) => (
            <div key={title.name} className="bg-brand-bg rounded-lg p-3 text-center">
              <div className="font-bold text-brand-text text-sm">{title.name}</div>
              <div className="text-xs text-brand-text-muted mt-0.5">{title.price}</div>
            </div>
          ))}
        </div>
      </Card>

      {/* 출석 */}
      <Card>
        <h4 className="font-bold text-brand-text mb-2">📅 출석 & 경제</h4>
        <ul className="text-brand-text-sub text-sm space-y-1 list-disc list-inside">
          <li>일일 출석 지원금: <strong>10,000 츄르</strong></li>
          <li>7일 연속 출석 보너스: <strong>50,000 츄르</strong></li>
          <li>도감 패시브 보너스: 점수 x 100 (최대 200,000)</li>
          <li>파산구제: 잔액 0 이하 시 30,000 지급 (초기 5장)</li>
          <li>종합재산세: 1억 이상 보유 시 매일 자정 <strong>5%</strong> 자동 징수</li>
        </ul>
      </Card>

      {/* 자동 노동 */}
      <Card>
        <h4 className="font-bold text-brand-text mb-2">🤖 자동 노동 이용권</h4>
        <p className="text-brand-text-sub text-sm mb-2">이벤트/쿠폰/제작소에서 획득 가능한 자동 노동 시스템</p>
        <div className="flex flex-wrap gap-2 text-xs">
          {['30분', '1시간', '3시간', '6시간', '12시간'].map((t) => (
            <span key={t} className="px-3 py-1 bg-brand-bg rounded-full text-brand-text">{t}</span>
          ))}
        </div>
      </Card>
    </div>
  )
}

// ──────────────────────────────────────────
// 메인 페이지
// ──────────────────────────────────────────
export default function GuidePage() {
  const [activeTab, setActiveTab] = useState('overview')

  const renderContent = () => {
    switch (activeTab) {
      case 'overview': return <OverviewTab />
      case 'jobs': return <JobsTab />
      case 'fish': return <FishTab />
      case 'cats': return <CatsTab />
      case 'games': return <GamesTab />
      case 'invest': return <InvestTab />
      case 'raid': return <RaidTab />
      case 'items': return <ItemsTab />
      case 'craft': return <CraftTab />
      case 'etc': return <EtcTab />
      default: return <OverviewTab />
    }
  }

  return (
    <div className="min-h-screen bg-brand-bg">
      {/* 페이지 헤더 */}
      <div className="bg-white border-b border-brand-pink-soft/30">
        <div className="max-w-6xl mx-auto px-4 py-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-brand-text mb-2">
            🐱 냥봇 게임 가이드
          </h1>
          <p className="text-brand-text-sub">
            냥봇의 모든 게임 콘텐츠를 한눈에 확인하세요
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-6">
        {/* 탭 네비게이션 */}
        <div className="flex gap-2 overflow-x-auto pb-4 mb-6 scrollbar-thin">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                activeTab === tab.id
                  ? 'bg-brand-pink text-white shadow-pink'
                  : 'bg-white text-brand-text-sub hover:bg-brand-pink-soft/50 shadow-card'
              }`}
            >
              <span>{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>

        {/* 탭 콘텐츠 */}
        <div className="animate-fade-in-up">
          {renderContent()}
        </div>
      </div>
    </div>
  )
}
