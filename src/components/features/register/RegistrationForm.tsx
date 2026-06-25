'use client';

import * as React from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  teamRegistrationSchema,
  type TeamRegistrationInput,
} from '@/lib/validations/team';
import { toast } from 'sonner';

export function RegistrationForm() {
  const [step, setStep] = React.useState<1 | 2>(1);
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const {
    register,
    handleSubmit,
    control,
    trigger,
    setValue,
    watch,
    formState: { errors },
  } = useForm<TeamRegistrationInput>({
    resolver: zodResolver(teamRegistrationSchema),
    defaultValues: {
      name: '',
      tag: '',
      logoUrl: '',
      players: [
        { ign: '', inGameId: '' }, // Kapten
        { ign: '', inGameId: '' }, // Anggota 1
        { ign: '', inGameId: '' }, // Anggota 2
        { ign: '', inGameId: '' }, // Anggota 3
      ],
    },
  });

  const { fields } = useFieldArray({
    control,
    name: 'players',
  });

  const handleNext = async () => {
    // Validasi Step 1 sebelum bisa lanjut
    const isStep1Valid = await trigger(['name', 'tag', 'logoUrl']);
    if (isStep1Valid) {
      setStep(2);
    }
  };

  const handlePrev = () => {
    setStep(1);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      toast.error('Ukuran logo maksimal 5MB!');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    const toastId = toast.loading('Mengunggah logo...');

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || 'Gagal mengunggah logo');

      setValue('logoUrl', data.url);
      toast.success('Logo tim berhasil diunggah!', { id: toastId });
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message, { id: toastId });
      } else {
        toast.error('Gagal mengunggah logo', { id: toastId });
      }
    }
  };

  const onSubmit = async (data: TeamRegistrationInput) => {
    setIsSubmitting(true);
    const toastId = toast.loading('Memproses pendaftaran...');

    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.error || 'Terjadi kesalahan sistem');
      }

      toast.success(result.message, { id: toastId });

      // Jika sukses, kembalikan ke beranda setelah 2 detik
      setTimeout(() => {
        window.location.href = '/';
      }, 2000);
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message, { id: toastId });
      } else {
        toast.error('Terjadi kesalahan sistem', { id: toastId });
      }
      setIsSubmitting(false);
    }
  };

  const logoUrlWatcher = watch('logoUrl');

  return (
    <div className="w-full max-w-3xl rounded-xl border border-neutral-200 bg-white p-6 shadow-sm sm:p-10 dark:border-neutral-800 dark:bg-[#1e1e1e]">
      {/* Indikator Progres */}
      <div className="mb-8 flex items-center justify-between">
        <div className="flex flex-col">
          <span className="text-sm font-semibold tracking-wider text-[var(--color-primary)]">
            LANGKAH {step} DARI 2
          </span>
          <h2 className="font-heading mt-1 text-3xl font-bold text-neutral-900 dark:text-white">
            {step === 1 ? 'Identitas Tim' : 'Roster Pemain'}
          </h2>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* ================= STEP 1: INFO TIM ================= */}
        <div
          className={
            step === 1
              ? 'animate-in fade-in slide-in-from-right-4 block duration-500'
              : 'hidden'
          }
        >
          <div className="space-y-5">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-neutral-700 dark:text-neutral-300">
                Nama Tim Lengkap
              </label>
              <input
                {...register('name')}
                className="w-full rounded-md border border-neutral-300 px-4 py-3 text-sm transition-colors focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)] focus:outline-none dark:border-neutral-700 dark:bg-[#121212] dark:text-white"
                placeholder="Contoh: Rex Regum Qeon"
              />
              {errors.name && (
                <p className="mt-1.5 text-xs font-medium text-red-500">
                  {errors.name.message}
                </p>
              )}
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-neutral-700 dark:text-neutral-300">
                Tag Tim (Inisial)
              </label>
              <input
                {...register('tag')}
                className="w-full rounded-md border border-neutral-300 px-4 py-3 text-sm uppercase transition-colors focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)] focus:outline-none dark:border-neutral-700 dark:bg-[#121212] dark:text-white"
                placeholder="Contoh: RRQ"
              />
              {errors.tag && (
                <p className="mt-1.5 text-xs font-medium text-red-500">
                  {errors.tag.message}
                </p>
              )}
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-neutral-700 dark:text-neutral-300">
                Logo Tim (Opsional)
              </label>
              <div className="flex items-center gap-5 rounded-md border border-dashed border-neutral-300 p-4 dark:border-neutral-700 dark:bg-[#121212]">
                {logoUrlWatcher ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={logoUrlWatcher}
                    alt="Logo Preview"
                    className="h-20 w-20 rounded-md border border-neutral-200 object-cover dark:border-neutral-700"
                  />
                ) : (
                  <div className="flex h-20 w-20 items-center justify-center rounded-md border border-neutral-200 bg-neutral-100 dark:border-neutral-700 dark:bg-neutral-800">
                    <span className="text-[10px] text-neutral-400 uppercase">
                      Belum Ada
                    </span>
                  </div>
                )}
                <div className="flex-1">
                  <input
                    type="file"
                    accept="image/jpeg, image/png, image/webp"
                    onChange={handleFileUpload}
                    className="block w-full text-sm text-neutral-500 file:mr-4 file:cursor-pointer file:rounded-md file:border-0 file:bg-[var(--color-primary)] file:px-4 file:py-2.5 file:text-sm file:font-medium file:text-white file:transition-colors hover:file:bg-[var(--color-primary-hover)] dark:text-neutral-400"
                  />
                  <p className="mt-2 text-xs text-neutral-500">
                    Gunakan file JPG, PNG, atau WEBP beresolusi tinggi (Maksimal
                    5MB).
                  </p>
                </div>
              </div>
              <input type="hidden" {...register('logoUrl')} />
            </div>
          </div>

          <div className="mt-10 flex justify-end">
            <button
              type="button"
              onClick={handleNext}
              className="rounded-md bg-neutral-900 px-8 py-3 text-sm font-medium text-white transition-colors hover:bg-neutral-800 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-200"
            >
              Lanjutkan ke Roster Pemain
            </button>
          </div>
        </div>

        {/* ================= STEP 2: INFO PEMAIN ================= */}
        <div
          className={
            step === 2
              ? 'animate-in fade-in slide-in-from-right-4 block duration-500'
              : 'hidden'
          }
        >
          <div className="space-y-6">
            {fields.map((field, index) => (
              <div
                key={field.id}
                className="relative overflow-hidden rounded-lg border border-neutral-200 bg-neutral-50/50 p-5 dark:border-neutral-800 dark:bg-[#121212]/50"
              >
                {/* Pita Indikator Kapten */}
                {index === 0 && (
                  <div className="absolute top-0 right-0 rounded-bl-lg bg-[var(--color-primary)] px-3 py-1 text-[10px] font-bold tracking-wider text-white">
                    KAPTEN TIM
                  </div>
                )}

                <h3 className="font-heading mb-4 font-semibold text-neutral-900 dark:text-white">
                  {index === 0 ? 'Data Kapten' : `Anggota Tim ${index}`}
                </h3>

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-xs font-medium text-neutral-500 dark:text-neutral-400">
                      In-Game Name (IGN)
                    </label>
                    <input
                      {...register(`players.${index}.ign` as const)}
                      className="w-full rounded-md border border-neutral-300 px-4 py-2.5 text-sm transition-colors focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)] focus:outline-none dark:border-neutral-700 dark:bg-neutral-900 dark:text-white"
                      placeholder="Contoh: UC96_Faker"
                    />
                    {errors.players?.[index]?.ign && (
                      <p className="mt-1.5 text-xs font-medium text-red-500">
                        {errors.players[index]?.ign?.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="mb-1.5 block text-xs font-medium text-neutral-500 dark:text-neutral-400">
                      In-Game ID (Angka)
                    </label>
                    <input
                      {...register(`players.${index}.inGameId` as const)}
                      className="w-full rounded-md border border-neutral-300 px-4 py-2.5 text-sm transition-colors focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)] focus:outline-none dark:border-neutral-700 dark:bg-neutral-900 dark:text-white"
                      placeholder="Contoh: 5123456789"
                    />
                    {errors.players?.[index]?.inGameId && (
                      <p className="mt-1.5 text-xs font-medium text-red-500">
                        {errors.players[index]?.inGameId?.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 flex items-center justify-between">
            <button
              type="button"
              onClick={handlePrev}
              className="rounded-md border border-neutral-300 px-8 py-3 text-sm font-medium text-neutral-700 transition-colors hover:bg-neutral-50 dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-800"
            >
              Kembali
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex items-center justify-center rounded-md bg-[var(--color-primary)] px-10 py-3 text-sm font-bold text-white transition-all hover:bg-[var(--color-primary-hover)] hover:shadow-[0_0_15px_rgba(211,47,47,0.4)] disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isSubmitting ? 'Mendaftarkan Tim...' : 'Kirim Pendaftaran'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
