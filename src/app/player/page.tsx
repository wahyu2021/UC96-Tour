import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/db';
import { PlayerDashboard } from '@/components/features/player/PlayerDashboard';

export const metadata = {
  title: 'Dasbor Kapten | UC96 Tournament',
  description: 'Kelola profil tim dan pemain untuk turnamen.',
};

export const dynamic = 'force-dynamic';

export default async function PlayerPage() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user?.id) {
    redirect('/login');
  }

  // Ambil profil tim master
  const masterTeam = await prisma.team.findFirst({
    where: {
      ownerId: session.user.id,
      tournamentId: null,
    },
    include: {
      players: true,
    },
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="font-heading text-3xl font-extrabold tracking-tight text-neutral-900 sm:text-4xl dark:text-white">
          Dasbor <span className="text-[var(--color-primary)]">Kapten</span>
        </h1>
        <p className="mt-2 text-neutral-600 dark:text-neutral-400">
          Selamat datang, {session.user.name}. Kelola profil tim utama Anda di
          sini.
        </p>
      </div>

      <PlayerDashboard initialTeam={masterTeam} />
    </div>
  );
}
