import { NextResponse } from 'next/server';
import { withAdminRoute } from '@/lib/api-middleware';
import { prisma } from '@/lib/db';
import { UpdateSettingsRequest } from '@/types';

export const GET = withAdminRoute(async () => {
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
});

export const PUT = withAdminRoute(async (req) => {
  try {
    const body: UpdateSettingsRequest = await req.json();
    const { settings } = body;

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
});
