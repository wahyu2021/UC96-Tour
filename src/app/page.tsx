import { HeroSection } from '@/components/features/home/HeroSection';
import { LiveStatistics } from '@/components/features/home/LiveStatistics';
import { FeaturedTournaments } from '@/components/features/home/FeaturedTournaments';
import { MiniLeaderboard } from '@/components/features/home/MiniLeaderboard';
import {
  getGlobalStatistics,
  getFeaturedTournaments,
  getMiniLeaderboard,
} from '@/lib/services/homeService';

export const dynamic = 'force-dynamic';

export default async function Home() {
  const [stats, featuredTournaments, miniLeaderboardData] = await Promise.all([
    getGlobalStatistics(),
    getFeaturedTournaments(),
    getMiniLeaderboard(),
  ]);

  return (
    <div className="flex w-full flex-col items-center bg-[#0a0a0a]">
      <HeroSection hasActiveRegistration={stats.hasActiveRegistration} />
      <LiveStatistics stats={stats} />
      <FeaturedTournaments tournaments={featuredTournaments} />
      <MiniLeaderboard data={miniLeaderboardData} />
    </div>
  );
}
