import { RegistrationForm } from '@/components/features/register/RegistrationForm';

export const metadata = {
  title: 'Pendaftaran Tim | UC96 Tournament',
  description: 'Daftarkan tim PUBG e-sports Anda ke turnamen UC96.',
};

import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/db';

export const dynamic = 'force-dynamic';

export default async function RegisterPage() {
  const session = await getServerSession(authOptions);

  let masterTeam = null;
  if (session?.user?.id) {
    const t = await prisma.team.findFirst({
      where: {
        ownerId: session.user.id,
        tournamentId: null,
      },
      include: { players: true },
    });
    // Serialize
    if (t) {
      masterTeam = {
        id: t.id,
        name: t.name,
        tag: t.tag,
        logoUrl: t.logoUrl,
        players: t.players.map((p) => ({
          ign: p.ign,
          inGameId: p.inGameId,
          role: p.role,
        })),
      };
    }
  }

  const now = new Date();
  const availableTournaments = await prisma.tournament.findMany({
    where: {
      endDate: { gte: now },
      status: { not: 'COMPLETED' },
    },
    select: {
      id: true,
      name: true,
      _count: { select: { teams: { where: { status: 'APPROVED' } } } },
      maxSlots: true,
    },
    orderBy: { startDate: 'asc' },
  });

  const activeTournaments = availableTournaments.filter(
    (t) => t._count.teams < t.maxSlots
  );

  return (
    <div className="relative flex min-h-[calc(100vh-8rem)] w-full flex-col items-center justify-center overflow-hidden bg-[#0a0a0a] px-4 py-16 sm:px-6 lg:px-8">
      {/* Background Image */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/default-bg.webp"
        alt="Background"
        className="absolute inset-0 h-full w-full object-cover opacity-30"
      />
      {/* Gradients to blend with page */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/60 to-[#0a0a0a]/80"></div>

      <div className="relative z-10 mb-10 max-w-2xl text-center">
        <h1 className="font-heading text-3xl font-extrabold tracking-tight text-white drop-shadow-md sm:text-4xl md:text-5xl">
          Pendaftaran Turnamen
        </h1>
        <p className="mt-4 text-base text-neutral-300 sm:text-lg">
          Lengkapi data identitas tim dan susunan pemain dengan benar. Tim yang
          terdaftar akan diverifikasi oleh panitia sebelum dimasukkan ke dalam
          klasemen.
        </p>
      </div>

      <div className="relative z-10 w-full max-w-3xl">
        <RegistrationForm
          availableTournaments={activeTournaments}
          masterTeam={masterTeam}
        />
      </div>
    </div>
  );
}
