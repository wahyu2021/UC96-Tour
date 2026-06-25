import { RegistrationForm } from '@/components/features/register/RegistrationForm';

export const metadata = {
  title: 'Pendaftaran Tim | UC96 Tournament',
  description: 'Daftarkan tim PUBG e-sports Anda ke turnamen UC96.',
};

export default function RegisterPage() {
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
      <RegistrationForm />
    </div>
  );
}
