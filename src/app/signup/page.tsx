import { SignupForm } from '@/components/features/auth/SignupForm';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';

export const metadata = {
  title: 'Pendaftaran Akun Kapten | UC96 Tournament',
  description:
    'Daftar sebagai Kapten untuk mengelola tim dan mendaftar turnamen e-sports dengan cepat.',
};

export default async function SignupPage() {
  const session = await getServerSession(authOptions);

  if (session) {
    if (session.user?.role === 'ADMIN' || session.user?.role === 'SUPERADMIN') {
      redirect('/admin');
    } else {
      redirect('/player');
    }
  }

  return (
    <div className="flex min-h-[calc(100vh-8rem)] w-full items-center justify-center bg-neutral-50 px-4 py-12 dark:bg-[#0a0a0a]">
      <SignupForm />
    </div>
  );
}
