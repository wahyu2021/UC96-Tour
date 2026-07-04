import { NextResponse } from 'next/server';
import { requireAuth, requireAdmin } from '@/lib/auth';
import { Session } from 'next-auth';

// Tipe untuk handler API yang sudah diverifikasi sesinya
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AuthenticatedRouteHandler<TContext = any> = (
  req: Request,
  context: TContext,
  session: Session
) => Promise<NextResponse> | NextResponse;

/**
 * Wrapper untuk API route yang mewajibkan user login (Role apa saja).
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function withAuthRoute<TContext = any>(handler: AuthenticatedRouteHandler<TContext>) {
  return async (req?: Request, context?: TContext) => {
    try {
      const session = await requireAuth();
      if (!session) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      }

      const actualReq = req || new Request('http://localhost');
      return await handler(actualReq, context as TContext, session);
    } catch (error) {
      console.error('API Error:', error);
      return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
  };
}

/**
 * Wrapper untuk API route yang mewajibkan user adalah ADMIN.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function withAdminRoute<TContext = any>(handler: AuthenticatedRouteHandler<TContext>) {
  return async (req?: Request, context?: TContext) => {
    try {
      const session = await requireAdmin();
      if (!session) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      }

      const actualReq = req || new Request('http://localhost');
      return await handler(actualReq, context as TContext, session);
    } catch (error) {
      console.error('Admin API Error:', error);
      return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
  };
}
