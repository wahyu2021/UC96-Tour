import { MetadataRoute } from 'next';
import { prisma } from '@/lib/db';

export const dynamic = 'force-dynamic';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

  // Dapatkan semua turnamen yang bukan draft
  const tournaments = await prisma.tournament.findMany({
    where: {
      status: {
        in: ['ONGOING', 'COMPLETED']
      }
    },
    select: {
      id: true,
      updatedAt: true,
    },
  });

  const tournamentUrls = tournaments.map((tournament) => ({
    url: `${baseUrl}/tournaments/${tournament.id}`,
    lastModified: tournament.updatedAt,
    changeFrequency: 'daily' as const,
    priority: 0.8,
  }));

  // Dapatkan semua tim
  const teams = await prisma.team.findMany({
    select: {
      id: true,
      updatedAt: true,
    },
  });

  const teamUrls = teams.map((team) => ({
    url: `${baseUrl}/teams/${team.id}`,
    lastModified: team.updatedAt,
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }));

  // Rute statis utama
  const routes = ['', '/tournaments', '/teams', '/leaderboard', '/rules', '/about', '/contact'].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: (route === '' ? 'daily' : 'weekly') as "daily" | "weekly",
    priority: route === '' ? 1 : 0.8,
  }));

  return [...routes, ...tournamentUrls, ...teamUrls];
}
