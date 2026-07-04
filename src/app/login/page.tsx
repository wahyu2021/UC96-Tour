import { LoginForm } from '@/components/features/auth/LoginForm';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';

export const metadata = {
  title: 'Login | UC96 Tournament',
  description: 'Masuk ke akun UC96 Tournament.',
};

export default async function LoginPage() {
  const session = await getServerSession(authOptions);

  if (session && session.user?.id) {
    if (session.user?.role === 'ADMIN') {
      redirect('/admin');
    } else {
      redirect('/player');
    }
  }

  return (
    <div className="flex min-h-[calc(100vh-8rem)] w-full items-center justify-center bg-neutral-50 px-4 py-12 dark:bg-[#0a0a0a]">
      <LoginForm />
    </div>
  );
}
