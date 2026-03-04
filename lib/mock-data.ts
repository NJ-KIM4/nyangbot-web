// 목 데이터 - API 연동 전 UI 프리뷰용
// TODO: 봇 API 연동 후 제거
import type { BotUser, RankingEntry, ServerStats } from './types'

export const MOCK_USER: BotUser = {
  money: 168850,
  joinedAt: '2026-02-25T06:54:41.695Z',
  lastDaily: Date.now(),
  dailyCount: 3,
  lastDailyDate: '2026-03-04',
  jobLevel: 3,
  jobExp: 30,
  mineLevel: 2,
  mineExp: 243,
  pickaxeLevel: 27,
  fishLevel: 2,
  fishExp: 236,
  rodLevel: 26,
  robLevel: 2,
  robExp: 39,
  inventory: {
    '고등어': 10,
    '파산구제권': 993,
    '별의 파편': 2,
    '고농축 캣닢 앰플': 0,
    '황금 참치캔': 0,
    '자동 노동 이용권 30분': 2,
    '지렁이': 5,
    '깐새우': 3,
  },
  gachaCollection: {
    '먼치킨 숏레그': 2,
    '고등어태비': 1,
    '러시안블루': 1,
    '스코티시폴드': 3,
  },
  estates: { '박스집': 1 },
  stocks: { '캣닢화학': 5 },
  stockAvgPrices: { '캣닢화학': 27865 },
  buffs: { expEnd: 0, tunaCharges: 0 },
  ownedTitles: ['뉴비', '초보 집사'],
  title: '초보 집사',
  bankruptcy_tickets: 993,
}

export const MOCK_RANKINGS: RankingEntry[] = [
  { userId: '1', username: '츄르왕', avatar: null, money: 15000000, gachaScore: 120 },
  { userId: '2', username: '냥집사', avatar: null, money: 8500000, gachaScore: 85 },
  { userId: '3', username: '고양이덕후', avatar: null, money: 5200000, gachaScore: 200 },
  { userId: '4', username: '투자의신', avatar: null, money: 3800000, gachaScore: 45 },
  { userId: '5', username: '낚시꾼', avatar: null, money: 2100000, gachaScore: 60 },
]

export const MOCK_STATS: ServerStats = {
  totalUsers: 52,
  totalMoney: 45000000,
  totalTransactions: 12500,
  totalGacha: 580,
  totalRaids: 34,
}

// 고양이 도감 데이터
export const GACHA_CATS: Record<string, { grade: string; score: number; emoji: string }> = {
  '코리안숏헤어': { grade: '노멀', score: 1, emoji: '🐱' },
  '고등어태비': { grade: '노멀', score: 1, emoji: '🐈' },
  '치즈태비': { grade: '노멀', score: 1, emoji: '🟠' },
  '턱시도': { grade: '노멀', score: 1, emoji: '⬛' },
  '삼색이': { grade: '노멀', score: 1, emoji: '🎨' },
  '먼치킨': { grade: '레어', score: 5, emoji: '🦵' },
  '먼치킨 숏레그': { grade: '레어', score: 5, emoji: '🐾' },
  '러시안블루': { grade: '레어', score: 5, emoji: '💎' },
  '스코티시폴드': { grade: '레어', score: 5, emoji: '👂' },
  '브리티시숏헤어': { grade: '레어', score: 5, emoji: '🇬🇧' },
  '뱅갈': { grade: '에픽', score: 15, emoji: '🐆' },
  '메인쿤': { grade: '에픽', score: 15, emoji: '🦁' },
  '페르시안': { grade: '에픽', score: 15, emoji: '👑' },
  '스핑크스': { grade: '에픽', score: 15, emoji: '🏺' },
  '노르웨이숲': { grade: '전설', score: 50, emoji: '🌲' },
  '아비시니안': { grade: '전설', score: 50, emoji: '⭐' },
}

// 등급별 색상
export const GRADE_COLORS: Record<string, string> = {
  '노멀': 'text-gray-500 bg-gray-100',
  '레어': 'text-blue-600 bg-blue-100',
  '에픽': 'text-purple-600 bg-purple-100',
  '전설': 'text-yellow-600 bg-yellow-100',
}

// 부동산 정보
export const ESTATES_INFO = [
  { name: '박스집', price: 50000, dailyRent: 3000, icon: '📦' },
  { name: '캣타워', price: 300000, dailyRent: 20000, icon: '🗼' },
  { name: '냥냥카페', price: 1500000, dailyRent: 120000, icon: '☕' },
  { name: '츄르공장', price: 10000000, dailyRent: 800000, icon: '🏭' },
]
