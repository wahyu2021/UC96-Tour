import { NextResponse } from 'next/server';
import { withAdminRoute } from '@/lib/api-middleware';
import { prisma } from '@/lib/db';

import { updateTournamentSchema } from '@/lib/validations/tournament';

export const PATCH = withAdminRoute(async (request, context) => {
  try {
    const { id } = await context.params;

    const body = await request.json();
    const validatedData = updateTournamentSchema.parse(body);

    const dataToUpdate: Record<string, unknown> = { ...validatedData };
    if (validatedData.startDate)
      dataToUpdate.startDate = new Date(validatedData.startDate);
    if (validatedData.endDate)
      dataToUpdate.endDate = new Date(validatedData.endDate);

    const tournament = await prisma.tournament.update({
      where: { id },
      data: dataToUpdate,
    });

    return NextResponse.json(tournament);
  } catch {
    return NextResponse.json({ error: 'Failed to update' }, { status: 500 });
  }
});

export const DELETE = withAdminRoute(async (request, context) => {
  try {
    const { id } = await context.params;

    await prisma.tournament.delete({ where: { id } });
    return NextResponse.json({ message: 'Deleted successfully' });
  } catch {
    return NextResponse.json({ error: 'Failed to delete' }, { status: 500 });
  }
});
