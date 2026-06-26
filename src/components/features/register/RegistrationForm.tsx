'use client';

import * as React from 'react';
import { useForm, useFieldArray, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  teamRegistrationSchema,
  type TeamRegistrationInput,
} from '@/lib/validations/team';
import { toast } from 'sonner';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Select } from '@/components/ui/Select';

type TournamentOption = { id: string; name: string };

export function RegistrationForm({ availableTournaments }: { availableTournaments: TournamentOption[] }) {
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
      tournamentId: '',
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

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'players',
  });

  const handleNext = async () => {
    // Validasi Step 1 sebelum bisa lanjut
    const isStep1Valid = await trigger(['name', 'tag', 'logoUrl', 'tournamentId']);
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
                Pilih Turnamen *
              </label>
              <Controller
                name="tournamentId"
                control={control}
                render={({ field }) => (
                  <Select
                    options={availableTournaments.map(t => ({ value: t.id, label: t.name }))}
                    value={field.value}
                    onChange={field.onChange}
                    error={errors.tournamentId?.message}
                    placeholder="-- Pilih Turnamen --"
                  />
                )}
              />
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-neutral-700 dark:text-neutral-300">
                Nama Tim Lengkap *
              </label>
              <Input
                {...register('name')}
                placeholder="Contoh: Rex Regum Qeon"
                error={errors.name?.message}
              />
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-neutral-700 dark:text-neutral-300">
                Tag Tim (Inisial)
              </label>
              <Input
                {...register('tag')}
                className="uppercase"
                placeholder="Contoh: RRQ"
                error={errors.tag?.message}
              />
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
            <Button
              type="button"
              onClick={handleNext}
              variant="secondary"
              className="px-8 py-3"
            >
              Lanjutkan ke Roster Pemain
            </Button>
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
                {/* Pita Indikator Role */}
                {index === 0 && (
                  <div className="absolute top-0 right-0 rounded-bl-lg bg-[var(--color-primary)] px-3 py-1 text-[10px] font-bold tracking-wider text-white">
                    KAPTEN TIM
                  </div>
                )}
                {index === 4 && (
                  <div className="absolute top-0 right-0 rounded-bl-lg bg-neutral-600 px-3 py-1 text-[10px] font-bold tracking-wider text-white">
                    CADANGAN (OPSIONAL)
                  </div>
                )}

                <div className="mb-4 flex items-center justify-between">
                  <h3 className="font-heading font-semibold text-neutral-900 dark:text-white">
                    {index === 0 ? 'Data Kapten' : index === 4 ? 'Pemain Cadangan' : `Anggota Tim ${index}`}
                  </h3>
                  {index === 4 && (
                    <button type="button" onClick={() => remove(4)} className="text-xs text-red-500 hover:underline">Hapus</button>
                  )}
                </div>

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-xs font-medium text-neutral-500 dark:text-neutral-400">
                      ID PUBG (Nickname)
                    </label>
                    <Input
                      {...register(`players.${index}.ign` as const)}
                      placeholder="Contoh: UC96_Faker"
                      error={errors.players?.[index]?.ign?.message}
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-xs font-medium text-neutral-500 dark:text-neutral-400">
                      ID Discord
                    </label>
                    <Input
                      {...register(`players.${index}.inGameId` as const)}
                      placeholder="Contoh: faker#1234 / faker_uc"
                      error={errors.players?.[index]?.inGameId?.message}
                    />
                  </div>
                </div>
              </div>
            ))}
            
            {fields.length < 5 && (
              <Button
                type="button"
                variant="outline"
                className="w-full border-dashed border-neutral-300 py-6 text-neutral-500 dark:border-neutral-700 dark:text-neutral-400"
                onClick={() => append({ ign: '', inGameId: '' })}
              >
                + Tambah Pemain Cadangan (Maksimal 1)
              </Button>
            )}
          </div>

          <div className="mt-10 flex items-center justify-between">
            <Button
              type="button"
              onClick={handlePrev}
              variant="outline"
              className="px-8 py-3"
            >
              Kembali
            </Button>
            <Button
              type="submit"
              isLoading={isSubmitting}
              className="px-10 py-3 text-sm font-bold shadow-[0_0_15px_rgba(211,47,47,0.4)]"
            >
              {isSubmitting ? 'Mendaftarkan Tim...' : 'Kirim Pendaftaran'}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
