import * as React from 'react';
import { prisma } from '@/lib/db';
import { Target, Flag, Shield, Users } from 'lucide-react';

export const metadata = {
  title: 'Tentang UC96 | Unit Combat 96',
  description: 'Mengenal komunitas E-Sports Unit Combat 96',
};

export default async function AboutPage() {
  const settings = await prisma.appSetting.findMany({
    where: { key: { in: ['about_vision', 'about_mission', 'about_history'] } },
  });
  const data = settings.reduce(
    (acc, curr) => ({ ...acc, [curr.key]: curr.value }),
    {} as Record<string, string>
  );

  return (
    <div className="min-h-screen bg-[#0a0a0a] pt-24 pb-20 text-white">
      {/* Hero Section */}
      <section className="relative mx-auto max-w-7xl overflow-hidden px-4 py-20 sm:px-6 lg:px-8">
        <div className="absolute inset-0 top-1/2 left-1/2 -z-10 h-96 w-96 -translate-x-1/2 -translate-y-1/2 transform rounded-full bg-[var(--color-primary)]/10 blur-[100px]"></div>
        <div className="text-center">
          <h1 className="font-heading mb-6 text-5xl font-black tracking-tighter uppercase italic md:text-7xl">
            TENTANG <span className="text-[var(--color-primary)]">UC96</span>
          </h1>
          <p className="mx-auto max-w-3xl text-xl font-semibold text-neutral-300 italic md:text-2xl">
            &quot;
            {data.about_vision ||
              'Menjadi wadah kompetitif utama bagi pemain PUBG.'}
            &quot;
          </p>
        </div>
      </section>

      {/* History Section */}
      <section className="mx-auto mt-12 max-w-4xl px-4 sm:px-6">
        <div className="relative overflow-hidden rounded-3xl border border-neutral-800 bg-[#121212] p-8 shadow-2xl md:p-12">
          <Shield className="absolute -right-10 -bottom-10 -z-10 h-64 w-64 text-neutral-900/50" />
          <h2 className="relative z-10 mb-6 inline-block border-b border-neutral-800 pb-4 text-2xl font-black text-white uppercase md:text-3xl">
            Sejarah Singkat
          </h2>
          <p className="relative z-10 text-lg leading-relaxed whitespace-pre-wrap text-neutral-400">
            {data.about_history || 'Belum ada sejarah yang ditambahkan.'}
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="mx-auto mt-20 max-w-5xl px-4 sm:px-6">
        <h2 className="mb-12 text-center text-3xl font-black uppercase">
          Misi <span className="text-[var(--color-primary)]">Kami</span>
        </h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {(data.about_mission || '').split('\n').map((m, i) => {
            if (!m.trim()) return null;
            const text = m.replace(/^\d+\.\s*/, '');
            return (
              <div
                key={i}
                className="flex flex-col items-center rounded-2xl border border-neutral-800 bg-[#121212] p-8 text-center transition-colors hover:border-[var(--color-primary)]/50"
              >
                <div className="mb-6 rounded-full bg-red-500/10 p-4 text-[var(--color-primary)]">
                  {i % 3 === 0 ? (
                    <Target className="h-8 w-8" />
                  ) : i % 3 === 1 ? (
                    <Flag className="h-8 w-8" />
                  ) : (
                    <Users className="h-8 w-8" />
                  )}
                </div>
                <h3 className="text-lg font-bold text-neutral-200">{text}</h3>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
