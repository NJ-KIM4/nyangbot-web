// 공통 푸터 - NYANG GAMES 정보 + 링크
import Link from 'next/link'
import Image from 'next/image'

export default function Footer() {
  return (
    <footer className="bg-white border-t border-brand-pink-soft/30 mt-auto">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* 브랜드 */}
          <div>
            <div className="flex items-center gap-2.5 mb-3">
              <Image
                src="/nyang_games_symbol.png"
                alt="NYANG GAMES"
                width={36}
                height={36}
                className="w-9 h-9 rounded-full object-cover shadow-card"
              />
              <span className="font-logo text-lg font-bold text-gradient-pink">NYANG GAMES</span>
            </div>
            <p className="text-brand-text-sub text-sm leading-relaxed">
              밝고 귀여운 게임을 만드는 냥 게임즈입니다.
              <br />
              냥봇으로 디스코드에서 경제 RPG를 즐겨보세요!
            </p>
          </div>

          {/* 링크 */}
          <div>
            <h3 className="font-bold text-brand-text mb-3">바로가기</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/community" className="text-brand-text-sub hover:text-brand-pink transition-colors">
                  공지사항
                </Link>
              </li>
              <li>
                <Link href="/community" className="text-brand-text-sub hover:text-brand-pink transition-colors">
                  초보자 가이드
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="text-brand-text-sub hover:text-brand-pink transition-colors">
                  내 대시보드
                </Link>
              </li>
            </ul>
          </div>

          {/* 디스코드 */}
          <div>
            <h3 className="font-bold text-brand-text mb-3">커뮤니티</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="https://github.com/NJ-KIM4/nyangbot-anti"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand-text-sub hover:text-brand-mint transition-colors"
                >
                  GitHub
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* 하단 */}
        <div className="mt-8 pt-6 border-t border-brand-pink-soft/30 text-center text-brand-text-muted text-xs space-y-1">
          <div>냥봇 v1.0.0</div>
          <div>&copy; {new Date().getFullYear()} NYANG GAMES. All rights reserved.</div>
        </div>
      </div>
    </footer>
  )
}
