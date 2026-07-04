import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(
  function middleware(req) {
    const role = req.nextauth.token?.role;
    const path = req.nextUrl.pathname;

    if (path.startsWith('/admin') || path.startsWith('/api/admin')) {
      if (role !== 'ADMIN' && role !== 'SUPERADMIN') {
        if (path.startsWith('/api/')) {
          return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }
        return NextResponse.redirect(new URL('/', req.url));
      }
    }
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
  matcher: ['/admin/:path*', '/api/admin/:path*'],
};
