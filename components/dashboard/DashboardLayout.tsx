// 대시보드 레이아웃 - 탭 네비게이션 + 유저 헤더
'use client'

import { useState } from 'react'
import { clientAuth, clientUser } from '@/lib/auth'
import type { DiscordUser } from '@/lib/types'
import Image from 'next/image'
import ProfileTab from './tabs/ProfileTab'
import InventoryTab from './tabs/InventoryTab'
import CollectionTab from './tabs/CollectionTab'
import InvestTab from './tabs/InvestTab'
import RankingTab from './tabs/RankingTab'

type TabId = 'profile' | 'inventory' | 'collection' | 'invest' | 'ranking'

const TABS: { id: TabId; label: string; icon: string }[] = [
  { id: 'profile', label: '내 정보', icon: '👤' },
  { id: 'inventory', label: '가방', icon: '🎒' },
  { id: 'collection', label: '도감', icon: '🎴' },
  { id: 'invest', label: '투자', icon: '📈' },
  { id: 'ranking', label: '랭킹', icon: '🏆' },
]

function getAvatarUrl(user: DiscordUser) {
  if (user.avatar) {
    return `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png?size=128`
  }
  const defaultIndex = (parseInt(user.id) >> 22) % 6
  return `https://cdn.discordapp.com/embed/avatars/${defaultIndex}.png`
}

export default function DashboardLayout({ user }: { user: DiscordUser }) {
  const [activeTab, setActiveTab] = useState<TabId>('profile')

  const handleLogout = () => {
    clientAuth.clear()
    clientUser.clear()
    window.location.href = '/'
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      {/* 유저 헤더 */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <Image
            src={getAvatarUrl(user)}
            alt={user.username}
            width={48}
            height={48}
            className="w-12 h-12 rounded-full ring-2 ring-brand-pink-soft"
            unoptimized
          />
          <div>
            <h1 className="font-bold text-brand-text text-lg">
              {user.global_name || user.username}
            </h1>
            <p className="text-brand-text-muted text-sm">@{user.username}</p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="px-4 py-2 text-sm text-brand-text-sub border border-brand-pink-soft rounded-full hover:bg-brand-pink-soft/30 transition-colors"
        >
          로그아웃
        </button>
      </div>

      {/* 탭 네비게이션 */}
      <div className="flex gap-1 mb-8 overflow-x-auto pb-2 scrollbar-hide">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-1.5 px-4 py-2.5 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
              activeTab === tab.id
                ? 'bg-brand-pink text-white shadow-pink'
                : 'text-brand-text-sub hover:bg-brand-pink-soft/30'
            }`}
          >
            <span>{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </div>

      {/* 탭 콘텐츠 */}
      <div>
        {activeTab === 'profile' && <ProfileTab userId={user.id} />}
        {activeTab === 'inventory' && <InventoryTab userId={user.id} />}
        {activeTab === 'collection' && <CollectionTab userId={user.id} />}
        {activeTab === 'invest' && <InvestTab userId={user.id} />}
        {activeTab === 'ranking' && <RankingTab />}
      </div>
    </div>
  )
}
