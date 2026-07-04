import { NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/auth';
import { prisma } from '@/lib/db';

import { updateTournamentSchema } from '@/lib/validations/tournament';

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const session = await requireAdmin();
    if (!session)
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    if (!session || session.user?.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

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
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const session = await requireAdmin();
    if (!session)
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    if (!session || session.user?.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await prisma.tournament.delete({ where: { id } });
    return NextResponse.json({ message: 'Deleted successfully' });
  } catch {
    return NextResponse.json({ error: 'Failed to delete' }, { status: 500 });
  }
}
