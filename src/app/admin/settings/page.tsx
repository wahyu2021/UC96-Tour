import { SettingsClient } from '@/components/features/admin/SettingsClient';
import { prisma } from '@/lib/db';

export const metadata = {
  title: 'Pengaturan Halaman Publik | Admin UC96',
};

export default async function AdminSettingsPage() {
  const settings = await prisma.appSetting.findMany({
    orderBy: { key: 'asc' },
  });

  const configMap = settings.reduce(
    (acc, curr) => {
      acc[curr.key] = curr.value;
      return acc;
    },
    {} as Record<string, string>
  );

  return (
    <div className="mx-auto max-w-5xl">
      <div className="mb-8">
        <h1 className="text-3xl font-black tracking-tight text-neutral-900 uppercase dark:text-white">
          Pengaturan{' '}
          <span className="text-[var(--color-primary)]">Halaman Publik</span>
        </h1>
        <p className="mt-2 text-neutral-600 dark:text-neutral-400">
          Ubah konten teks pada halaman Tentang, Aturan, dan Kontak tanpa perlu
          mengubah kode.
        </p>
      </div>

      <SettingsClient initialSettings={configMap} />
    </div>
  );
}
