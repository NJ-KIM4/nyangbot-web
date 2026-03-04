// JWT 토큰 검증 API
import { NextRequest, NextResponse } from 'next/server'
import { verifyToken } from '@/lib/auth'

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get('authorization')
  if (!authHeader?.startsWith('Bearer ')) {
    return NextResponse.json({ success: false, error: '토큰이 없습니다.' }, { status: 401 })
  }

  const token = authHeader.slice(7)
  const payload = await verifyToken(token)

  if (!payload) {
    return NextResponse.json({ success: false, error: '토큰이 유효하지 않습니다.' }, { status: 401 })
  }

  return NextResponse.json({
    success: true,
    data: {
      id: payload.sub,
      username: payload.username,
      avatar: payload.avatar,
      global_name: payload.global_name,
    },
  })
}
