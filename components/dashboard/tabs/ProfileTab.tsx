// 내 정보 탭 - 잔액, 레벨, 출석일수, 스킬 현황
'use client'

import { MOCK_USER } from '@/lib/mock-data'

function StatCard({ icon, label, value, sub }: { icon: string; label: string; value: string; sub?: string }) {
  return (
    <div className="bg-white rounded-xl p-4 shadow-card">
      <div className="flex items-center gap-2 mb-2">
        <span className="text-xl">{icon}</span>
        <span className="text-brand-text-sub text-xs">{label}</span>
      </div>
      <div className="text-xl font-bold text-brand-text">{value}</div>
      {sub && <div className="text-brand-text-muted text-xs mt-1">{sub}</div>}
    </div>
  )
}

function SkillBar({ name, level, exp, maxExp, icon }: { name: string; level: number; exp: number; maxExp: number; icon: string }) {
  const pct = Math.min((exp / maxExp) * 100, 100)
  return (
    <div className="bg-white rounded-xl p-4 shadow-card">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <span>{icon}</span>
          <span className="font-medium text-brand-text text-sm">{name}</span>
        </div>
        <span className="text-brand-pink font-bold text-sm">Lv.{level}</span>
      </div>
      <div className="w-full h-2 bg-brand-bg rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-brand-pink to-brand-lavender rounded-full transition-all duration-500"
          style={{ width: `${pct}%` }}
        />
      </div>
      <div className="text-brand-text-muted text-xs mt-1 text-right">
        {exp} / {maxExp} EXP
      </div>
    </div>
  )
}

export default function ProfileTab({ userId }: { userId: string }) {
  // TODO: API에서 실제 데이터 가져오기
  const data = MOCK_USER

  return (
    <div className="space-y-6">
      {/* 기본 정보 카드 */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <StatCard icon="💰" label="츄르 잔액" value={data.money.toLocaleString()} sub="츄르" />
        <StatCard icon="📅" label="연속 출석" value={`${data.dailyCount}일`} sub={`마지막: ${data.lastDailyDate}`} />
        <StatCard icon="🎖️" label="칭호" value={data.title} />
        <StatCard icon="🎫" label="파산구제권" value={data.bankruptcy_tickets.toLocaleString()} />
      </div>

      {/* 스킬 레벨 */}
      <div>
        <h3 className="text-lg font-bold text-brand-text mb-3">스킬 현황</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <SkillBar name="알바" level={data.jobLevel} exp={data.jobExp} maxExp={100} icon="💼" />
          <SkillBar name="광산" level={data.mineLevel} exp={data.mineExp} maxExp={300} icon="⛏️" />
          <SkillBar name="낚시" level={data.fishLevel} exp={data.fishExp} maxExp={300} icon="🎣" />
          <SkillBar name="소매치기" level={data.robLevel} exp={data.robExp} maxExp={100} icon="🥷" />
        </div>
      </div>

      {/* 장비 레벨 */}
      <div>
        <h3 className="text-lg font-bold text-brand-text mb-3">장비</h3>
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white rounded-xl p-4 shadow-card flex items-center gap-3">
            <span className="text-2xl">⛏️</span>
            <div>
              <div className="text-brand-text-sub text-xs">곡괭이</div>
              <div className="text-brand-text font-bold">Lv.{data.pickaxeLevel}</div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-card flex items-center gap-3">
            <span className="text-2xl">🎣</span>
            <div>
              <div className="text-brand-text-sub text-xs">낚싯대</div>
              <div className="text-brand-text font-bold">Lv.{data.rodLevel}</div>
            </div>
          </div>
        </div>
      </div>

      {/* 부동산 보유 */}
      {Object.keys(data.estates).length > 0 && (
        <div>
          <h3 className="text-lg font-bold text-brand-text mb-3">부동산</h3>
          <div className="flex flex-wrap gap-2">
            {Object.entries(data.estates).map(([name, count]) => (
              <div key={name} className="bg-white rounded-lg px-4 py-2 shadow-card flex items-center gap-2">
                <span>🏠</span>
                <span className="text-brand-text font-medium text-sm">{name}</span>
                {count > 1 && <span className="text-brand-pink text-xs font-bold">x{count}</span>}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
