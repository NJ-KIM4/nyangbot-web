// 통계 카운터 섹션 - 유저 수, 거래량 등
'use client'

import { useEffect, useState, useRef } from 'react'

interface StatItem {
  label: string
  value: number
  suffix: string
  icon: string
}

const STATS: StatItem[] = [
  { label: '활성 유저', value: 50, suffix: '+', icon: '👥' },
  { label: '총 거래량', value: 1000, suffix: '만+', icon: '💰' },
  { label: '가챠 횟수', value: 500, suffix: '+', icon: '🎴' },
  { label: '레이드 격파', value: 30, suffix: '+', icon: '⚔️' },
]

function useCountUp(target: number, duration = 2000, start = false) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!start) return
    let startTime: number | null = null
    let raf: number

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      // easeOutExpo 이징
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress)
      setCount(Math.floor(eased * target))
      if (progress < 1) raf = requestAnimationFrame(animate)
    }

    raf = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(raf)
  }, [target, duration, start])

  return count
}

function StatCard({ stat, index }: { stat: StatItem; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  const count = useCountUp(stat.value, 2000, visible)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.3 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className="text-center animate-fade-in-up opacity-0"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div className="text-4xl mb-2">{stat.icon}</div>
      <div className="text-3xl md:text-4xl font-bold text-brand-text mb-1">
        {visible ? count.toLocaleString() : '0'}
        <span className="text-brand-pink">{stat.suffix}</span>
      </div>
      <div className="text-brand-text-sub text-sm">{stat.label}</div>
    </div>
  )
}

export default function Stats() {
  return (
    <section id="stats" className="py-20 relative overflow-hidden scroll-mt-16">
      {/* 배경 */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-brand-bg to-white" />

      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-brand-text mb-3">
            냥봇의 세계
          </h2>
          <p className="text-brand-text-sub">
            함께하는 집사들의 기록
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {STATS.map((stat, i) => (
            <StatCard key={stat.label} stat={stat} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
