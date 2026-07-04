import * as React from 'react';
import Link from 'next/link';
import { Swords, Trophy } from 'lucide-react';

export function HeroSection() {
  return (
    <section className="relative flex min-h-[85vh] w-full flex-col items-center justify-center overflow-hidden bg-white dark:bg-[#0a0a0a]">
      {/* Background Image */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/default-bg.webp"
        alt="Hero Background"
        className="absolute inset-0 h-full w-full object-cover opacity-40 mix-blend-luminosity"
      />
      {/* Gradients */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/80 via-transparent to-white dark:from-[#0a0a0a]/80 dark:to-[#0a0a0a]"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-white via-transparent to-white dark:from-[#0a0a0a] dark:to-[#0a0a0a]"></div>

      <div className="relative z-10 mx-auto max-w-5xl px-4 py-24 text-center sm:px-6 lg:px-8">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[var(--color-primary)]/30 bg-[var(--color-primary)]/10 px-4 py-1.5 backdrop-blur-sm">
          <span className="flex h-2 w-2 animate-pulse rounded-full bg-[var(--color-primary)]"></span>
          <span className="text-sm font-bold tracking-wider text-[var(--color-primary)] uppercase">
            Musim Turnamen Terbuka
          </span>
        </div>

        <h1 className="font-heading mt-6 text-4xl font-black tracking-tighter text-neutral-900 uppercase drop-shadow-2xl sm:text-6xl md:text-7xl lg:text-8xl dark:text-white">
          <span className="block leading-none text-neutral-600 italic dark:text-neutral-300">
            Medan Laga
          </span>
          <span className="mt-2 block bg-gradient-to-br from-[var(--color-primary)] to-orange-500 bg-clip-text text-transparent">
            Unit Combat 96
          </span>
        </h1>

        <p className="mx-auto mt-8 max-w-2xl text-lg font-medium text-neutral-600 sm:text-xl dark:text-neutral-300">
          Daftarkan tim e-sports terbaik Anda, buktikan kemampuan di arena, dan
          raih posisi puncak dalam turnamen PUBG paling bergengsi tahun ini!
        </p>

        <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="/register"
            className="group flex w-full items-center justify-center gap-3 rounded-md bg-[var(--color-primary)] px-8 py-4 text-lg font-bold text-white transition-all hover:bg-[var(--color-primary-hover)] hover:shadow-[0_0_20px_rgba(211,47,47,0.5)] sm:w-auto"
          >
            <Swords className="h-5 w-5 transition-transform group-hover:scale-125" />
            Daftarkan Timmu
          </Link>
          <Link
            href="/tournaments"
            className="flex w-full items-center justify-center gap-3 rounded-md border-2 border-neutral-300 bg-transparent px-8 py-4 text-lg font-bold text-neutral-900 backdrop-blur-sm transition-all hover:border-neutral-400 hover:bg-neutral-100 sm:w-auto dark:border-neutral-700 dark:text-white dark:hover:border-neutral-500 dark:hover:bg-neutral-800/50"
          >
            <Trophy className="h-5 w-5" />
            Lihat Turnamen Aktif
          </Link>
        </div>
      </div>
    </section>
  );
}
