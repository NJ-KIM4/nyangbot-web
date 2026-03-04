// 타입 정의 - 봇 데이터 모델 기반

// Discord 유저 정보 (OAuth에서 받아오는 기본 정보)
export interface DiscordUser {
  id: string
  username: string
  discriminator: string
  avatar: string | null
  global_name?: string | null
}

// 봇 유저 데이터 (database.json 기반)
export interface BotUser {
  money: number
  joinedAt: string
  lastDaily: number
  dailyCount: number
  lastDailyDate: string
  jobLevel: number
  jobExp: number
  mineLevel: number
  mineExp: number
  pickaxeLevel: number
  fishLevel: number
  fishExp: number
  rodLevel: number
  robLevel: number
  robExp: number
  inventory: Record<string, number>
  gachaCollection: Record<string, number>
  estates: Record<string, number>
  stocks: Record<string, number>
  stockAvgPrices: Record<string, number>
  buffs: {
    expEnd?: number
    tunaCharges?: number
  }
  ownedTitles: string[]
  title: string
  bankruptcy_tickets: number
}

// 대시보드에 표시할 유저 프로필
export interface UserProfile {
  discord: DiscordUser
  bot: BotUser
}

// 랭킹 엔트리
export interface RankingEntry {
  userId: string
  username: string
  avatar: string | null
  money: number
  gachaScore: number
}

// 주식 시세
export interface StockData {
  name: string
  price: number
  trend: 'up' | 'down' | 'stable'
}

// 부동산 정보
export interface EstateInfo {
  name: string
  price: number
  dailyRent: number
  icon: string
}

// 활동 로그
export interface ActivityLog {
  timestamp: string
  userId: string
  action: string
  result: string
  moneyChange: number
  detail: string
}

// 서버 통계
export interface ServerStats {
  totalUsers: number
  totalMoney: number
  totalTransactions: number
  totalGacha: number
  totalRaids: number
}

// API 응답 래퍼
export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
}
