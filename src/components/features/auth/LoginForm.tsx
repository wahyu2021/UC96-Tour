'use client';

import * as React from 'react';
import { signIn } from 'next-auth/react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

export function LoginForm() {
  const router = useRouter();
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const toastId = toast.loading('Memverifikasi Akun...');

    try {
      const res = await signIn('credentials', {
        username,
        password,
        redirect: false,
      });

      if (res?.error) {
        throw new Error(res.error);
      }

      toast.success('Selamat Datang!', { id: toastId });
      window.location.reload();
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message, { id: toastId });
      } else {
        toast.error('Gagal memverifikasi data', { id: toastId });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md space-y-8 rounded-2xl border border-neutral-200 bg-white p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] sm:p-10 dark:border-neutral-800 dark:bg-[#121212]">
      <div className="text-center">
        <h2 className="font-heading text-3xl font-bold tracking-tight text-neutral-900 dark:text-white">
          Masuk Ke{' '}
          <span className="text-[var(--color-primary)]">Akun Anda</span>
        </h2>
        <p className="mt-3 text-sm text-neutral-600 dark:text-neutral-400">
          Silakan masuk menggunakan akun Anda.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="mb-2 block text-sm font-medium text-neutral-700 dark:text-neutral-300">
            Username
          </label>
          <input
            type="text"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="block w-full rounded-lg border border-neutral-300 px-4 py-3 text-sm transition-colors focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)] focus:outline-none dark:border-neutral-700 dark:bg-neutral-900 dark:text-white"
            placeholder="Masukkan username"
          />
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium text-neutral-700 dark:text-neutral-300">
            Kata Sandi
          </label>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="block w-full rounded-lg border border-neutral-300 px-4 py-3 text-sm transition-colors focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)] focus:outline-none dark:border-neutral-700 dark:bg-neutral-900 dark:text-white"
            placeholder="••••••••"
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="mt-8 flex w-full items-center justify-center rounded-lg bg-[var(--color-primary)] px-4 py-3.5 text-sm font-bold tracking-wide text-white transition-all hover:bg-[var(--color-primary-hover)] disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isLoading ? 'Mengautentikasi...' : 'Masuk'}
        </button>

        <p className="text-center text-sm text-neutral-600 dark:text-neutral-400">
          Belum punya akun Kapten?{' '}
          <a
            href="/signup"
            className="font-medium text-[var(--color-primary)] hover:underline"
          >
            Daftar sekarang
          </a>
        </p>
      </form>
    </div>
  );
}
