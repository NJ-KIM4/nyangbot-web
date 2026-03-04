// API 호출 유틸리티 - 봇 서버 API 연동
import { clientAuth } from './auth'
import type { ApiResponse } from './types'

// 봇 API 베이스 URL (환경변수에서 가져옴)
const BOT_API_URL = process.env.NEXT_PUBLIC_BOT_API_URL || 'http://localhost:3001/api'

// 인증 헤더 자동 첨부 fetch 래퍼
export async function apiFetch<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  const token = clientAuth.get()
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string>),
  }

  if (token) {
    headers['Authorization'] = `Bearer ${token}`
  }

  try {
    const res = await fetch(`${BOT_API_URL}${endpoint}`, {
      ...options,
      headers,
    })

    // 인증 실패 시 토큰 제거
    if (res.status === 401) {
      clientAuth.clear()
      if (typeof window !== 'undefined') {
        window.location.href = '/'
      }
      return { success: false, error: '인증이 만료되었습니다.' }
    }

    const data = await res.json()
    return data
  } catch (error) {
    return { success: false, error: '서버에 연결할 수 없습니다.' }
  }
}

// 유저 데이터 조회
export const api = {
  // 내 프로필
  getMyProfile: () => apiFetch('/users/me'),

  // 랭킹
  getRankings: (type: 'money' | 'gacha' = 'money') =>
    apiFetch(`/rankings?type=${type}`),

  // 서버 통계
  getStats: () => apiFetch('/stats'),

  // 활동 로그
  getLogs: (page = 1, limit = 20) =>
    apiFetch(`/logs?page=${page}&limit=${limit}`),

  // 관리자: 유저 검색
  adminSearchUsers: (query: string) =>
    apiFetch(`/admin/users?q=${encodeURIComponent(query)}`),

  // 관리자: 유저 정보 수정
  adminUpdateUser: (userId: string, data: Record<string, unknown>) =>
    apiFetch(`/admin/users/${userId}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    }),
}
