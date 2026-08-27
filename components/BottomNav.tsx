'use client';
import Link from 'next/link';
import { Home, Trophy, Users, History, User } from 'lucide-react';

export default function BottomNav({ activeTab }: { activeTab: string }) {
  const tabs = [
    { id: 'home', icon: Home, label: 'Home', href: '/home' },
    { id: 'individual', icon: Trophy, label: 'Ranking', href: '/ranking/individual' },
    { id: 'times', icon: Users, label: 'Times', href: '/ranking/times' },
    { id: 'historico', icon: History, label: 'Histórico', href: '/historico' },
    { id: 'perfil', icon: User, label: 'Perfil', href: '/perfil' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-slate-900/95 backdrop-blur-lg border-t border-slate-800 px-4 py-2 z-50">
      <div className="max-w-md mx-auto flex justify-around items-center">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <Link key={tab.id} href={tab.href} className={`flex flex-col items-center gap-1 p-2 rounded-xl transition-colors ${isActive ? 'text-blue-500' : 'text-gray-400'}`}>
              <Icon className="w-6 h-6" />
              <span className="text-xs">{tab.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}