// 봇 API 프록시 — 브라우저(HTTPS) → Vercel 서버 → GCP 봇(HTTP) 우회
// Mixed Content 문제 해결: 클라이언트가 직접 HTTP를 호출하지 않음
import { NextRequest, NextResponse } from 'next/server'

const BOT_API_URL = process.env.BOT_API_URL || 'http://localhost:3001/api'

async function proxyRequest(req: NextRequest, path: string) {
  const url = `${BOT_API_URL}/${path}${req.nextUrl.search}`

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  }

  // 클라이언트의 Authorization 헤더를 그대로 전달
  const authHeader = req.headers.get('Authorization')
  if (authHeader) {
    headers['Authorization'] = authHeader
  }

  try {
    const res = await fetch(url, {
      method: req.method,
      headers,
      body: req.method !== 'GET' ? await req.text() : undefined,
    })

    const data = await res.json()
    return NextResponse.json(data, { status: res.status })
  } catch {
    return NextResponse.json(
      { success: false, error: '봇 서버에 연결할 수 없습니다.' },
      { status: 502 }
    )
  }
}

export async function GET(req: NextRequest, { params }: { params: Promise<{ path: string[] }> }) {
  const { path } = await params
  return proxyRequest(req, path.join('/'))
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ path: string[] }> }) {
  const { path } = await params
  return proxyRequest(req, path.join('/'))
}
