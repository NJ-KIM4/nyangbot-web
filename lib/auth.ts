// 인증 유틸리티 - Discord OAuth2 + JWT
import { SignJWT, jwtVerify } from 'jose'
import type { DiscordUser } from './types'

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'nyangbot-anti-web-secret-key-change-in-production'
)

// JWT 토큰 생성 (서버사이드)
export async function signToken(user: DiscordUser): Promise<string> {
  return new SignJWT({
    sub: user.id,
    username: user.username,
    avatar: user.avatar,
    global_name: user.global_name,
  })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(JWT_SECRET)
}

// JWT 토큰 검증 (서버사이드)
export async function verifyToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET)
    return payload as {
      sub: string
      username: string
      avatar: string | null
      global_name?: string | null
    }
  } catch {
    return null
  }
}

// 클라이언트 토큰 관리
export const clientAuth = {
  save: (token: string) => localStorage.setItem('nyang_token', token),
  get: () => (typeof window !== 'undefined' ? localStorage.getItem('nyang_token') : null),
  clear: () => localStorage.removeItem('nyang_token'),
}

// 클라이언트 유저 관리
export const clientUser = {
  save: (user: DiscordUser) => localStorage.setItem('nyang_user', JSON.stringify(user)),
  get: (): DiscordUser | null => {
    if (typeof window === 'undefined') return null
    const raw = localStorage.getItem('nyang_user')
    if (!raw) return null
    try { return JSON.parse(raw) } catch { return null }
  },
  clear: () => localStorage.removeItem('nyang_user'),
}
