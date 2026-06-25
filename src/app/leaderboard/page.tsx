import { Metadata } from 'next';
import { LeaderboardTable } from '@/components/features/public/LeaderboardTable';

export const metadata: Metadata = {
  title: 'Leaderboard - UC96 PUBG Tournament',
  description: 'Klasemen dan akumulasi poin terbaru dari UC96 PUBG Tournament',
};

export default function LeaderboardPage() {
  return (
    <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8 max-w-3xl">
        <h1 className="text-4xl font-extrabold tracking-tight text-neutral-900 sm:text-5xl dark:text-white">
          Leaderboard
        </h1>
        <p className="mt-4 text-lg text-neutral-600 dark:text-neutral-400">
          Pantau perolehan poin dan klasemen tim favorit Anda. Poin dihitung
          berdasarkan aturan resmi PUBG E-sports.
        </p>
      </div>

      <LeaderboardTable />
    </div>
  );
}
