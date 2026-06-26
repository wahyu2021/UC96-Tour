import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/db';

export async function GET() {
  const session = await getServerSession(authOptions);
  // @ts-expect-error next-auth session user role is not typed by default
  if (!session || session.user?.role !== 'ADMIN') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const settings = await prisma.appSetting.findMany({
      orderBy: { key: 'asc' },
    });
    return NextResponse.json(settings, { status: 200 });
  } catch (error) {
    console.error('Failed to fetch admin settings:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function PUT(req: Request) {
  const session = await getServerSession(authOptions);
  // @ts-expect-error next-auth session user role is not typed by default
  if (!session || session.user?.role !== 'ADMIN') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { settings } = await req.json(); // { key1: val1, key2: val2 }

    if (!settings || typeof settings !== 'object') {
      return NextResponse.json(
        { error: 'Format data tidak valid' },
        { status: 400 }
      );
    }

    // Upsert each setting
    await prisma.$transaction(
      Object.entries(settings).map(([key, value]) =>
        prisma.appSetting.upsert({
          where: { key },
          update: { value: String(value) },
          create: {
            key,
            value: String(value),
            description: `Dynamic key ${key}`,
          },
        })
      )
    );

    return NextResponse.json(
      { message: 'Pengaturan berhasil disimpan!' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Failed to update admin settings:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
