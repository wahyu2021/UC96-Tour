import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(
  function middleware() {
    // Pengamanan tambahan bisa diletakkan di sini jika perlu mengecek role
    return NextResponse.next();
  },
  {
    callbacks: {
      // Hanya izinkan akses jika ada token (sesi login valid)
      authorized: ({ token }) => !!token,
    },
  }
);

// Tentukan rute mana saja yang HARUS DIJAGA oleh middleware ini
export const config = {
  matcher: ['/admin/:path*'],
};
