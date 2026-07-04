'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export function SignupForm() {
  const [username, setUsername] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error('Konfirmasi kata sandi tidak cocok!');
      return;
    }

    setIsLoading(true);
    const toastId = toast.loading('Memproses pendaftaran...');

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Gagal mendaftar. Silakan coba lagi.');
      }

      toast.success('Pendaftaran berhasil! Silakan masuk.', { id: toastId });
      router.push('/login');
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
          Daftar <span className="text-[var(--color-primary)]">Kapten</span>
        </h2>
        <p className="mt-3 text-sm text-neutral-600 dark:text-neutral-400">
          Buat akun untuk mengelola tim dan mendaftar ke turnamen dengan sistem
          1-Klik.
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
            placeholder="Ketik username unik"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-neutral-700 dark:text-neutral-300">
            Email (Opsional)
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="block w-full rounded-lg border border-neutral-300 px-4 py-3 text-sm transition-colors focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)] focus:outline-none dark:border-neutral-700 dark:bg-neutral-900 dark:text-white"
            placeholder="kapten@email.com"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-neutral-700 dark:text-neutral-300">
            Kata Sandi
          </label>
          <input
            type="password"
            required
            minLength={6}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="block w-full rounded-lg border border-neutral-300 px-4 py-3 text-sm transition-colors focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)] focus:outline-none dark:border-neutral-700 dark:bg-neutral-900 dark:text-white"
            placeholder="Minimal 6 karakter"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-neutral-700 dark:text-neutral-300">
            Konfirmasi Kata Sandi
          </label>
          <input
            type="password"
            required
            minLength={6}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="block w-full rounded-lg border border-neutral-300 px-4 py-3 text-sm transition-colors focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)] focus:outline-none dark:border-neutral-700 dark:bg-neutral-900 dark:text-white"
            placeholder="Ketik ulang kata sandi"
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="mt-8 flex w-full items-center justify-center rounded-lg bg-[var(--color-primary)] px-4 py-3.5 text-sm font-bold tracking-wide text-white transition-all hover:bg-[var(--color-primary-hover)] hover:shadow-[0_0_15px_rgba(211,47,47,0.4)] disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isLoading ? 'Memproses...' : 'Buat Akun'}
        </button>

        <p className="text-center text-sm text-neutral-600 dark:text-neutral-400">
          Sudah punya akun?{' '}
          <a
            href="/login"
            className="font-medium text-[var(--color-primary)] hover:underline"
          >
            Masuk sekarang
          </a>
        </p>
      </form>
    </div>
  );
}
