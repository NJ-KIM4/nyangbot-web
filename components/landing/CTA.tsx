// CTA (Call to Action) 섹션 - 봇 초대
// 봇 초대 URL
const BOT_INVITE_URL = 'https://discord.com/oauth2/authorize?client_id=1475711017496608881&permissions=8&integration_type=0&scope=bot+applications.commands'

export default function CTA() {
  return (
    <section id="cta" className="py-20 relative overflow-hidden scroll-mt-16">
      {/* 배경 그라디언트 */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-pink-soft/50 via-white to-brand-mint-light/30" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-lavender-light/20 rounded-full blur-3xl" />
      </div>

      <div className="max-w-3xl mx-auto px-4 text-center">
        <span className="text-6xl mb-6 block animate-float">🐾</span>
        <h2 className="text-3xl md:text-4xl font-bold text-brand-text mb-4">
          지금 바로 시작하세요!
        </h2>
        <p className="text-brand-text-sub text-lg mb-8 leading-relaxed">
          냥봇을 서버에 초대하고, 츄르를 모으며
          <br />
          귀여운 고양이들과 함께하는 모험을 시작하세요.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href={BOT_INVITE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="px-10 py-4 bg-brand-pink text-white rounded-full font-bold text-lg shadow-pink btn-bounce hover:bg-brand-pink/90 flex items-center gap-2"
          >
            <svg className="w-6 h-6" viewBox="0 0 127.14 96.36" fill="currentColor">
              <path d="M107.7,8.07A105.15,105.15,0,0,0,81.47,0a72.06,72.06,0,0,0-3.36,6.83A97.68,97.68,0,0,0,49,6.83,72.37,72.37,0,0,0,45.64,0,105.89,105.89,0,0,0,19.39,8.09C2.79,32.65-1.71,56.6.54,80.21h0A105.73,105.73,0,0,0,32.71,96.36,77.7,77.7,0,0,0,39.6,85.25a68.42,68.42,0,0,1-10.85-5.18c.91-.66,1.8-1.34,2.66-2a75.57,75.57,0,0,0,64.32,0c.87.71,1.76,1.39,2.66,2a68.68,68.68,0,0,1-10.87,5.19,77,77,0,0,0,6.89,11.1A105.25,105.25,0,0,0,126.6,80.22h0C129.24,52.84,122.09,29.11,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53s5-12.74,11.43-12.74S54,46,53.89,53,48.84,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.25,60,73.25,53s5-12.74,11.44-12.74S96.23,46,96.12,53,91.08,65.69,84.69,65.69Z" />
            </svg>
            봇 초대하기
          </a>
        </div>

        {/* 부가 정보 */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-6 text-brand-text-muted text-sm">
          <div className="flex items-center gap-1">
            <span>✅</span> 무료 사용
          </div>
          <div className="flex items-center gap-1">
            <span>⚡</span> 빠른 설정
          </div>
          <div className="flex items-center gap-1">
            <span>🔄</span> 지속 업데이트
          </div>
        </div>
      </div>
    </section>
  )
}
