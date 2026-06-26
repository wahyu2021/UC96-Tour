import * as React from 'react';
import { Trophy, Shield, Users } from 'lucide-react';

interface StatsProps {
  stats: {
    tournamentsCount: number;
    teamsCount: number;
    playersCount: number;
  };
}

export function LiveStatistics({ stats }: StatsProps) {
  const statItems = [
    {
      title: 'Turnamen Digelar',
      value: stats.tournamentsCount,
      icon: Trophy,
      suffix: '+',
      color: 'text-yellow-500',
      bg: 'bg-yellow-500/10',
    },
    {
      title: 'Tim Terdaftar',
      value: stats.teamsCount,
      icon: Shield,
      suffix: '+',
      color: 'text-[var(--color-primary)]',
      bg: 'bg-[var(--color-primary)]/10',
    },
    {
      title: 'Pemain Aktif',
      value: stats.playersCount,
      icon: Users,
      suffix: '',
      color: 'text-blue-500',
      bg: 'bg-blue-500/10',
    },
  ];

  return (
    <section className="relative z-20 -mt-20 w-full px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl rounded-2xl border border-neutral-800 bg-[#121212] p-8 shadow-2xl backdrop-blur-xl">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3 md:divide-x md:divide-neutral-800">
          {statItems.map((item, idx) => (
            <div key={idx} className="flex flex-col items-center justify-center text-center">
              <div className={`mb-4 rounded-full p-4 ${item.bg}`}>
                <item.icon className={`h-8 w-8 ${item.color}`} />
              </div>
              <div className="text-4xl font-black text-white">
                {item.value}
                <span className={`text-xl ${item.color}`}>{item.suffix}</span>
              </div>
              <div className="mt-2 text-sm font-medium uppercase tracking-widest text-neutral-400">
                {item.title}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
