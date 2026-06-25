import { LoginForm } from '@/components/features/auth/LoginForm';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';

export const metadata = {
  title: 'Admin Login | UC96 Tournament',
  description: 'Masuk ke panel kontrol panitia UC96 Tournament.',
};

export default async function LoginPage() {
  const session = await getServerSession(authOptions);

  // Jika user sudah login, arahkan langsung ke halaman admin
  if (session) {
    redirect('/admin');
  }

  return (
    <div className="flex min-h-[calc(100vh-8rem)] w-full items-center justify-center bg-neutral-50 px-4 py-12 dark:bg-[#0a0a0a]">
      <LoginForm />
    </div>
  );
}
