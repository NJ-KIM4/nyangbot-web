// Discord OAuth2 콜백 처리 - 인증 코드 → 액세스 토큰 → JWT 발급
import { NextRequest, NextResponse } from 'next/server'
import { signToken } from '@/lib/auth'
import type { DiscordUser } from '@/lib/types'

const DISCORD_CLIENT_ID = process.env.DISCORD_CLIENT_ID || ''
const DISCORD_CLIENT_SECRET = process.env.DISCORD_CLIENT_SECRET || ''
const REDIRECT_URI = process.env.NEXT_PUBLIC_BASE_URL
  ? `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/discord`
  : 'http://localhost:3000/api/auth/discord'

// GET: Discord OAuth 콜백 (code 파라미터 수신)
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const code = searchParams.get('code')

  // 코드 없으면 Discord 인증 페이지로 리다이렉트
  if (!code) {
    const params = new URLSearchParams({
      client_id: DISCORD_CLIENT_ID,
      redirect_uri: REDIRECT_URI,
      response_type: 'code',
      scope: 'identify',
    })
    return NextResponse.redirect(`https://discord.com/api/oauth2/authorize?${params}`)
  }

  try {
    // 1. 인증 코드로 액세스 토큰 교환
    const tokenRes = await fetch('https://discord.com/api/oauth2/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        client_id: DISCORD_CLIENT_ID,
        client_secret: DISCORD_CLIENT_SECRET,
        grant_type: 'authorization_code',
        code,
        redirect_uri: REDIRECT_URI,
      }),
    })

    if (!tokenRes.ok) {
      return NextResponse.redirect(new URL('/?error=token_failed', request.url))
    }

    const tokenData = await tokenRes.json()

    // 2. 액세스 토큰으로 유저 정보 조회
    const userRes = await fetch('https://discord.com/api/users/@me', {
      headers: { Authorization: `Bearer ${tokenData.access_token}` },
    })

    if (!userRes.ok) {
      return NextResponse.redirect(new URL('/?error=user_failed', request.url))
    }

    const discordUser: DiscordUser = await userRes.json()

    // 3. JWT 발급
    const jwt = await signToken(discordUser)

    // 4. 대시보드로 리다이렉트 + JWT를 쿼리 파라미터로 전달 (클라이언트에서 저장)
    const redirectUrl = new URL('/dashboard', request.url)
    redirectUrl.searchParams.set('token', jwt)
    redirectUrl.searchParams.set('user', JSON.stringify({
      id: discordUser.id,
      username: discordUser.username,
      discriminator: discordUser.discriminator,
      avatar: discordUser.avatar,
      global_name: discordUser.global_name,
    }))

    return NextResponse.redirect(redirectUrl)
  } catch {
    return NextResponse.redirect(new URL('/?error=auth_failed', request.url))
  }
}
