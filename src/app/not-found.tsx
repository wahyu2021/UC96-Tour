import Link from 'next/link';
import { Button } from '@/components/ui/Button';

export default function NotFound() {
  return (
    <div className="flex h-[70vh] w-full flex-col items-center justify-center gap-6 text-center">
      <h1 className="text-8xl font-black text-yellow-500/20">404</h1>
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">Halaman Tidak Ditemukan</h2>
        <p className="text-zinc-400 max-w-md">
          Maaf, halaman yang Anda cari tidak ada atau telah dipindahkan.
        </p>
      </div>
      <Link href="/">
        <Button>Kembali ke Beranda</Button>
      </Link>
    </div>
  );
}
