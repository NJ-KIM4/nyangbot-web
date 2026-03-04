// 히어로 섹션 - 봇 소개 + 초대 링크
'use client'

export default function Hero() {
  return (
    <section id="hero" className="relative overflow-hidden py-20 md:py-32 scroll-mt-16">
      {/* 배경 장식 */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-10 left-10 w-72 h-72 bg-brand-pink-soft/40 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-brand-mint-light/30 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-brand-lavender-light/20 rounded-full blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto px-4 text-center">
        {/* 메인 캐릭터 */}
        <div className="animate-float mb-8">
          <img
            src="/main_cat.png"
            alt="냥봇 메인 캐릭터"
            className="w-40 h-40 md:w-52 md:h-52 mx-auto drop-shadow-lg"
          />
        </div>

        {/* 타이틀 */}
        <h1 className="text-4xl md:text-6xl font-bold mb-4 animate-fade-in-up">
          <span className="text-gradient-pink">냥봇</span>
        </h1>

        {/* 서브타이틀 */}
        <p className="text-lg md:text-xl text-brand-text-sub max-w-2xl mx-auto mb-4 animate-fade-in-up animate-delay-100 opacity-0">
          디스코드에서 즐기는 고양이 경제 RPG
        </p>
        <p className="text-sm md:text-base text-brand-text-muted max-w-xl mx-auto mb-10 animate-fade-in-up animate-delay-200 opacity-0">
          츄르를 모으고, 귀여운 고양이를 수집하고, 부동산과 주식에 투자하고,
          <br className="hidden md:block" />
          레이드 보스를 물리치세요!
        </p>

        {/* CTA 버튼 */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up animate-delay-300 opacity-0">
          <a
            href="https://discord.com/oauth2/authorize?client_id=YOUR_BOT_ID&permissions=8&scope=bot%20applications.commands"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-3 bg-brand-pink text-white rounded-full font-bold text-lg shadow-pink btn-bounce hover:bg-brand-pink/90 flex items-center gap-2"
          >
            <svg className="w-5 h-5" viewBox="0 0 127.14 96.36" fill="currentColor">
              <path d="M107.7,8.07A105.15,105.15,0,0,0,81.47,0a72.06,72.06,0,0,0-3.36,6.83A97.68,97.68,0,0,0,49,6.83,72.37,72.37,0,0,0,45.64,0,105.89,105.89,0,0,0,19.39,8.09C2.79,32.65-1.71,56.6.54,80.21h0A105.73,105.73,0,0,0,32.71,96.36,77.7,77.7,0,0,0,39.6,85.25a68.42,68.42,0,0,1-10.85-5.18c.91-.66,1.8-1.34,2.66-2a75.57,75.57,0,0,0,64.32,0c.87.71,1.76,1.39,2.66,2a68.68,68.68,0,0,1-10.87,5.19,77,77,0,0,0,6.89,11.1A105.25,105.25,0,0,0,126.6,80.22h0C129.24,52.84,122.09,29.11,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53s5-12.74,11.43-12.74S54,46,53.89,53,48.84,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.25,60,73.25,53s5-12.74,11.44-12.74S96.23,46,96.12,53,91.08,65.69,84.69,65.69Z" />
            </svg>
            봇 초대하기
          </a>
          <a
            href="https://discord.gg/YOUR_SERVER"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-3 border-2 border-brand-mint text-brand-mint rounded-full font-bold text-lg btn-bounce hover:bg-brand-mint hover:text-white transition-colors flex items-center gap-2"
          >
            서버 참여하기
          </a>
        </div>
      </div>
    </section>
  )
}
