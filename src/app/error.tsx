'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/Button';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log error to error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="flex h-[50vh] w-full flex-col items-center justify-center gap-4 text-center">
      <h2 className="text-2xl font-bold text-red-500">Terjadi Kesalahan!</h2>
      <p className="text-zinc-400 max-w-md">
        Mohon maaf, sistem mengalami masalah saat memproses permintaan Anda.
      </p>
      <Button onClick={() => reset()} variant="outline">
        Coba Lagi
      </Button>
    </div>
  );
}
