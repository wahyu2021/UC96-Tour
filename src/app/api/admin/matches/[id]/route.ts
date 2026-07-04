import { NextResponse } from 'next/server';
import { withAdminRoute } from '@/lib/api-middleware';
import { prisma } from '@/lib/db';
import { z } from 'zod';

const updateStatusSchema = z.object({
  status: z.enum(['SCHEDULED', 'ONGOING', 'COMPLETED']),
});

export const PATCH = withAdminRoute(async (request, context) => {
  try {
    const { id } = await context.params;
    const body = await request.json();
    const { status } = updateStatusSchema.parse(body);

    const updatedMatch = await prisma.match.update({
      where: { id },
      data: { status },
      include: {
        tournament: {
          select: { name: true },
        },
      },
    });

    return NextResponse.json(updatedMatch);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Status tidak valid' },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
});

export const DELETE = withAdminRoute(async (request, context) => {
  try {
    const { id } = await context.params;

    await prisma.match.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
});
