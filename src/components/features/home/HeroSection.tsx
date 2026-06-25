import * as React from 'react';
import Link from 'next/link';

export function HeroSection() {
  return (
    <section className="relative w-full overflow-hidden bg-white px-4 py-24 sm:px-6 sm:py-32 lg:px-8 dark:bg-[#121212]">
      <div className="mx-auto max-w-4xl text-center">
        <h1 className="font-heading text-4xl font-extrabold tracking-tight text-neutral-900 sm:text-5xl md:text-6xl lg:text-7xl dark:text-white">
          <span className="block">Pertempuran Penentu di</span>
          <span className="block text-[var(--color-primary)]">
            Unit Combat 96
          </span>
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-neutral-600 sm:text-xl dark:text-neutral-400">
          Daftarkan tim e-sports terbaik Anda, buktikan kemampuan, dan raih
          posisi puncak di turnamen PUBG paling bergengsi tahun ini.
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="/register"
            className="flex w-full items-center justify-center rounded-md bg-[var(--color-primary)] px-8 py-3 text-base font-medium text-white transition-all hover:bg-[var(--color-primary-hover)] hover:shadow-[0_0_15px_rgba(211,47,47,0.5)] sm:w-auto md:px-10 md:py-4 md:text-lg"
          >
            Daftar Sekarang
          </Link>
          <Link
            href="/leaderboard"
            className="flex w-full items-center justify-center rounded-md border border-neutral-300 bg-transparent px-8 py-3 text-base font-medium text-neutral-700 transition-colors hover:bg-neutral-50 sm:w-auto md:px-10 md:py-4 md:text-lg dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-800"
          >
            Lihat Papan Peringkat
          </Link>
        </div>
      </div>
    </section>
  );
}
