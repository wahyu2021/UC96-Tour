import { prisma } from '@/lib/db';
import Link from 'next/link';
import {
  Trophy,
  Users,
  CalendarDays,
  ArrowRight,
  Activity,
  Clock,
  Plus,
  Gamepad2,
  ChevronRight,
  Eye,
  TrendingUp,
} from 'lucide-react';
import { VisitorChart } from '@/components/features/admin/VisitorChart';
import { RegistrationChart } from '@/components/features/admin/RegistrationChart';

export const metadata = {
  title: 'Dashboard | Admin Panel',
};

export const dynamic = 'force-dynamic';

export default async function AdminDashboardPage() {
  const [
    totalTournaments,
    activeTournaments,
    totalTeams,
    approvedTeams,
    totalMatches,
    liveMatches,
    recentTeams,
  ] = await Promise.all([
    prisma.tournament.count(),
    prisma.tournament.count({ where: { status: 'ONGOING' } }),
    prisma.team.count(),
    prisma.team.count({ where: { status: 'APPROVED' } }),
    prisma.match.count(),
    prisma.match.count({ where: { status: 'ONGOING' } }),
    prisma.team.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' },
      include: { tournament: true },
    }),
  ]);

  // Siapkan data untuk Chart Pendaftaran (7 Hari Terakhir)
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 6);
  sevenDaysAgo.setHours(0, 0, 0, 0);

  const recentRegistrations = await prisma.team.findMany({
    where: {
      createdAt: {
        gte: sevenDaysAgo,
      },
    },
    select: {
      createdAt: true,
    },
  });

  const regChartData = Array.from({ length: 7 }).map((_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (6 - i));
    return {
      date: d.toLocaleDateString('id-ID', { day: 'numeric', month: 'short' }),
      count: 0,
      fullDate: d.toDateString(),
    };
  });

  recentRegistrations.forEach((reg) => {
    const dateStr = reg.createdAt.toDateString();
    const day = regChartData.find((d) => d.fullDate === dateStr);
    if (day) {
      day.count += 1;
    }
  });

  // Simulasi data analitik pengunjung selama 7 hari terakhir (statis agar memenuhi aturan React purity)
  const simulatedCounts = [350, 420, 290, 580, 610, 490, 720];
  const visitorChartData = Array.from({ length: 7 }).map((_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (6 - i));

    return {
      date: d.toLocaleDateString('id-ID', { day: 'numeric', month: 'short' }),
      count: simulatedCounts[i] || 300,
    };
  });

  // Total pengunjung hari ini adalah data hari terakhir di chart pengunjung
  const todayVisitors = visitorChartData[visitorChartData.length - 1].count;
  const yesterdayVisitors = visitorChartData[visitorChartData.length - 2].count;

  // Hitung persentase kenaikan/penurunan simulasi
  const growth =
    ((todayVisitors - yesterdayVisitors) / yesterdayVisitors) * 100;
  const isPositiveGrowth = growth >= 0;
  const formattedGrowth = `${isPositiveGrowth ? '+' : ''}${growth.toFixed(1)}%`;

  return (
    <div className="mx-auto w-full max-w-7xl space-y-8">
      {/* Header Section */}
      <div className="rounded-2xl border border-neutral-200 bg-white p-8 shadow-sm dark:border-neutral-800 dark:bg-[#121212]">
        <div className="relative z-10">
          <h1 className="font-heading text-3xl font-black tracking-tight text-neutral-900 sm:text-4xl dark:text-white">
            Selamat Datang di Pusat Komando
          </h1>
          <p className="mt-2 max-w-2xl text-neutral-600 dark:text-neutral-400">
            Pantau seluruh metrik, kelola turnamen, dan awasi pertandingan yang
            sedang berlangsung dalam satu layar dasbor yang komprehensif.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/admin/tournaments"
              className="inline-flex items-center rounded-lg bg-[var(--color-primary)] px-4 py-2 text-sm font-bold text-white transition-all hover:bg-red-700 hover:shadow-[0_0_15px_rgba(220,38,38,0.5)]"
            >
              <Plus className="mr-2 h-4 w-4" />
              Buat Turnamen
            </Link>
            <Link
              href="/admin/matches"
              className="inline-flex items-center rounded-lg border border-neutral-200 bg-transparent px-4 py-2 text-sm font-bold text-neutral-700 transition-all hover:bg-neutral-50 dark:border-neutral-700 dark:text-neutral-200 dark:hover:bg-neutral-800"
            >
              <Gamepad2 className="mr-2 h-4 w-4" />
              Live Control
            </Link>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {/* Card: Visitors (Simulated) */}
        <div className="group relative overflow-hidden rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl dark:border-neutral-800 dark:bg-[#121212]">
          <div className="flex items-center justify-between">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-100 text-orange-600 transition-transform group-hover:scale-110 dark:bg-orange-500/10 dark:text-orange-400">
              <Eye className="h-6 w-6" />
            </div>
            <span
              className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-bold ${
                isPositiveGrowth
                  ? 'bg-green-100 text-green-700 dark:bg-green-500/10 dark:text-green-400'
                  : 'bg-red-100 text-red-700 dark:bg-red-500/10 dark:text-red-400'
              }`}
            >
              <TrendingUp
                className={`mr-1 h-3 w-3 ${!isPositiveGrowth && 'rotate-180'}`}
              />
              {formattedGrowth}
            </span>
          </div>
          <div className="mt-4">
            <h3 className="font-heading text-3xl font-black text-neutral-900 dark:text-white">
              {todayVisitors.toLocaleString('id-ID')}
            </h3>
            <p className="mt-1 text-sm font-medium text-neutral-500 dark:text-neutral-400">
              Pengunjung Hari Ini
            </p>
          </div>
        </div>

        {/* Card: Tournaments */}
        <div className="group relative overflow-hidden rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl dark:border-neutral-800 dark:bg-[#121212]">
          <div className="flex items-center justify-between">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-blue-600 transition-transform group-hover:scale-110 dark:bg-blue-500/10 dark:text-blue-400">
              <Trophy className="h-6 w-6" />
            </div>
          </div>
          <div className="mt-4">
            <h3 className="font-heading text-3xl font-black text-neutral-900 dark:text-white">
              {totalTournaments}
            </h3>
            <p className="mt-1 text-sm font-medium text-neutral-500 dark:text-neutral-400">
              Total Turnamen
            </p>
          </div>
          <div className="mt-4 border-t border-neutral-100 pt-4 dark:border-neutral-800">
            <p className="text-xs font-semibold text-neutral-500">
              <span className="text-blue-600 dark:text-blue-400">
                {activeTournaments}
              </span>{' '}
              Sedang Aktif
            </p>
          </div>
        </div>

        {/* Card: Teams */}
        <div className="group relative overflow-hidden rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl dark:border-neutral-800 dark:bg-[#121212]">
          <div className="flex items-center justify-between">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600 transition-transform group-hover:scale-110 dark:bg-emerald-500/10 dark:text-emerald-400">
              <Users className="h-6 w-6" />
            </div>
          </div>
          <div className="mt-4">
            <h3 className="font-heading text-3xl font-black text-neutral-900 dark:text-white">
              {totalTeams}
            </h3>
            <p className="mt-1 text-sm font-medium text-neutral-500 dark:text-neutral-400">
              Total Tim Terdaftar
            </p>
          </div>
          <div className="mt-4 border-t border-neutral-100 pt-4 dark:border-neutral-800">
            <p className="text-xs font-semibold text-neutral-500">
              <span className="text-emerald-600 dark:text-emerald-400">
                {approvedTeams}
              </span>{' '}
              Tim Disetujui
            </p>
          </div>
        </div>

        {/* Card: Matches */}
        <div className="group relative overflow-hidden rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl dark:border-neutral-800 dark:bg-[#121212]">
          <div className="flex items-center justify-between">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-100 text-purple-600 transition-transform group-hover:scale-110 dark:bg-purple-500/10 dark:text-purple-400">
              <CalendarDays className="h-6 w-6" />
            </div>
            {liveMatches > 0 && (
              <span className="flex h-3 w-3">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex h-3 w-3 rounded-full bg-red-500"></span>
              </span>
            )}
          </div>
          <div className="mt-4">
            <h3 className="font-heading text-3xl font-black text-neutral-900 dark:text-white">
              {totalMatches}
            </h3>
            <p className="mt-1 text-sm font-medium text-neutral-500 dark:text-neutral-400">
              Total Pertandingan
            </p>
          </div>
          <div className="mt-4 border-t border-neutral-100 pt-4 dark:border-neutral-800">
            <p className="text-xs font-semibold text-neutral-500">
              <span className="text-purple-600 dark:text-purple-400">
                {liveMatches}
              </span>{' '}
              Sedang LIVE
            </p>
          </div>
        </div>
      </div>

      {/* Analytics Charts Section */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Grafik Pengunjung (Simulated) */}
        <div className="flex flex-col rounded-2xl border border-neutral-200 bg-white shadow-sm dark:border-neutral-800 dark:bg-[#121212]">
          <div className="border-b border-neutral-100 p-6 dark:border-neutral-800">
            <h2 className="font-heading text-lg font-bold text-neutral-900 dark:text-white">
              Tren Kunjungan Platform
            </h2>
            <p className="text-xs text-neutral-500 dark:text-neutral-400">
              Visualisasi jumlah pengunjung harian selama 7 hari terakhir
            </p>
          </div>
          <div className="p-6">
            <VisitorChart data={visitorChartData} />
          </div>
        </div>

        {/* Grafik Pendaftaran (Real Database Data) */}
        <div className="flex flex-col rounded-2xl border border-neutral-200 bg-white shadow-sm dark:border-neutral-800 dark:bg-[#121212]">
          <div className="border-b border-neutral-100 p-6 dark:border-neutral-800">
            <h2 className="font-heading text-lg font-bold text-neutral-900 dark:text-white">
              Tren Pendaftaran Tim Baru
            </h2>
            <p className="text-xs text-neutral-500 dark:text-neutral-400">
              Tim esports baru yang mendaftar selama 7 hari terakhir
            </p>
          </div>
          <div className="p-6">
            <RegistrationChart data={regChartData} />
          </div>
        </div>
      </div>

      {/* Bottom Section: Recent Activity & Quick Actions */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Aktivitas Pendaftaran Tim */}
        <div className="col-span-1 flex flex-col rounded-2xl border border-neutral-200 bg-white shadow-sm lg:col-span-2 dark:border-neutral-800 dark:bg-[#121212]">
          <div className="flex items-center justify-between border-b border-neutral-100 p-6 dark:border-neutral-800">
            <div>
              <h2 className="font-heading text-lg font-bold text-neutral-900 dark:text-white">
                Pendaftar Tim Terbaru
              </h2>
              <p className="text-xs text-neutral-500 dark:text-neutral-400">
                5 tim terakhir yang mendaftar ke platform
              </p>
            </div>
            <Link
              href="/admin/teams"
              className="flex items-center text-sm font-semibold text-[var(--color-primary)] hover:underline"
            >
              Lihat Semua <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
          <div className="p-0">
            {recentTeams.length > 0 ? (
              <ul className="divide-y divide-neutral-100 dark:divide-neutral-800">
                {recentTeams.map((team) => (
                  <li
                    key={team.id}
                    className="flex items-center justify-between p-6 transition-colors hover:bg-neutral-50 dark:hover:bg-neutral-800/50"
                  >
                    <div className="flex items-center gap-4">
                      {team.logoUrl ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={team.logoUrl}
                          alt={team.name}
                          className="h-10 w-10 rounded-full border border-neutral-200 object-cover dark:border-neutral-700"
                        />
                      ) : (
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-neutral-100 font-bold text-neutral-500 dark:bg-neutral-800">
                          {team.tag.substring(0, 2)}
                        </div>
                      )}
                      <div>
                        <p className="font-bold text-neutral-900 dark:text-white">
                          {team.name}{' '}
                          <span className="text-xs font-normal text-neutral-500">
                            [{team.tag}]
                          </span>
                        </p>
                        <p className="mt-0.5 text-xs text-neutral-500">
                          Turnamen:{' '}
                          <span className="font-semibold">
                            {team.tournament?.name || 'N/A'}
                          </span>
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                          team.status === 'APPROVED'
                            ? 'bg-green-100 text-green-700 dark:bg-green-500/10 dark:text-green-400'
                            : team.status === 'REJECTED'
                              ? 'bg-red-100 text-red-700 dark:bg-red-500/10 dark:text-red-400'
                              : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-500/10 dark:text-yellow-400'
                        }`}
                      >
                        {team.status}
                      </span>
                      <span className="flex items-center text-[10px] text-neutral-400">
                        <Clock className="mr-1 h-3 w-3" />
                        {new Date(team.createdAt).toLocaleDateString('id-ID', {
                          day: 'numeric',
                          month: 'short',
                        })}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-neutral-500">
                <Activity className="mb-2 h-8 w-8 opacity-20" />
                <p>Belum ada aktivitas pendaftaran</p>
              </div>
            )}
          </div>
        </div>

        {/* Quick Links / Panduan Singkat (Takes up 1 column) */}
        <div className="col-span-1 flex flex-col rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm dark:border-neutral-800 dark:bg-[#121212]">
          <h2 className="font-heading text-lg font-bold text-neutral-900 dark:text-white">
            Aksi Cepat
          </h2>
          <p className="mt-1 text-xs text-neutral-500 dark:text-neutral-400">
            Akses langsung ke fitur penting
          </p>

          <div className="mt-6 flex flex-col gap-3">
            <Link
              href="/admin/tournaments"
              className="group flex items-center justify-between rounded-xl border border-neutral-100 bg-neutral-50 p-4 transition-colors hover:border-blue-200 hover:bg-blue-50 dark:border-neutral-800 dark:bg-[#1a1a1a] dark:hover:border-blue-900/50 dark:hover:bg-blue-900/10"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-100 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400">
                  <Trophy className="h-4 w-4" />
                </div>
                <span className="font-semibold text-neutral-700 dark:text-neutral-300">
                  Kelola Turnamen
                </span>
              </div>
              <ChevronRight className="h-4 w-4 text-neutral-400 transition-transform group-hover:translate-x-1" />
            </Link>

            <Link
              href="/admin/matches"
              className="group flex items-center justify-between rounded-xl border border-neutral-100 bg-neutral-50 p-4 transition-colors hover:border-purple-200 hover:bg-purple-50 dark:border-neutral-800 dark:bg-[#1a1a1a] dark:hover:border-purple-900/50 dark:hover:bg-purple-900/10"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-100 text-purple-600 dark:bg-purple-500/20 dark:text-purple-400">
                  <CalendarDays className="h-4 w-4" />
                </div>
                <span className="font-semibold text-neutral-700 dark:text-neutral-300">
                  Perbarui Jadwal
                </span>
              </div>
              <ChevronRight className="h-4 w-4 text-neutral-400 transition-transform group-hover:translate-x-1" />
            </Link>

            <Link
              href="/admin/scoring-rules"
              className="group flex items-center justify-between rounded-xl border border-neutral-100 bg-neutral-50 p-4 transition-colors hover:border-red-200 hover:bg-red-50 dark:border-neutral-800 dark:bg-[#1a1a1a] dark:hover:border-red-900/50 dark:hover:bg-red-900/10"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-100 text-red-600 dark:bg-red-500/20 dark:text-red-400">
                  <Activity className="h-4 w-4" />
                </div>
                <span className="font-semibold text-neutral-700 dark:text-neutral-300">
                  Ubah Sistem Poin
                </span>
              </div>
              <ChevronRight className="h-4 w-4 text-neutral-400 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
