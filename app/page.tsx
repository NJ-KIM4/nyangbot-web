// 랜딩 페이지 - 봇 소개 + 기능 쇼케이스 + 통계 + CTA
import Hero from '@/components/landing/Hero'
import Features from '@/components/landing/Features'
import Screenshots from '@/components/landing/Screenshots'
import Stats from '@/components/landing/Stats'
import CTA from '@/components/landing/CTA'

export default function Home() {
  return (
    <>
      <Hero />
      <Features />
      <Screenshots />
      <Stats />
      <CTA />
    </>
  )
}
