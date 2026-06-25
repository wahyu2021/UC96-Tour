import { RegistrationForm } from '@/components/features/register/RegistrationForm';

export const metadata = {
  title: 'Pendaftaran Tim | UC96 Tournament',
  description: 'Daftarkan tim PUBG e-sports Anda ke turnamen UC96.',
};

import { prisma } from '@/lib/db';

export const dynamic = 'force-dynamic';

export default async function RegisterPage() {
  const now = new Date();
  const availableTournaments = await prisma.tournament.findMany({
    where: {
      endDate: { gte: now },
      status: { not: 'COMPLETED' },
    },
    select: {
      id: true,
      name: true,
      _count: { select: { teams: true } },
      maxSlots: true,
    },
    orderBy: { startDate: 'asc' },
  });

  const activeTournaments = availableTournaments.filter(t => t._count.teams < t.maxSlots);

  return (
    <div className="flex min-h-[calc(100vh-8rem)] w-full flex-col items-center justify-center bg-neutral-50 px-4 py-16 sm:px-6 lg:px-8 dark:bg-[#0a0a0a]">
      <div className="mb-10 max-w-2xl text-center">
        <h1 className="font-heading text-3xl font-extrabold tracking-tight text-neutral-900 sm:text-4xl md:text-5xl dark:text-white">
          Pendaftaran Turnamen
        </h1>
        <p className="mt-4 text-base text-neutral-600 sm:text-lg dark:text-neutral-400">
          Lengkapi data identitas tim dan susunan pemain dengan benar. Tim yang
          terdaftar akan diverifikasi oleh panitia sebelum dimasukkan ke dalam
          klasemen.
        </p>
      </div>
      <RegistrationForm availableTournaments={activeTournaments} />
    </div>
  );
}
