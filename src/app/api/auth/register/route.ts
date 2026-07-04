import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import bcrypt from 'bcryptjs';
import { z } from 'zod';

const registerSchema = z.object({
  username: z.string().min(3, 'Username minimal 3 karakter').max(50),
  email: z
    .string()
    .email('Format email tidak valid')
    .optional()
    .or(z.literal('')),
  password: z.string().min(6, 'Password minimal 6 karakter'),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const result = registerSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        {
          error: 'Data tidak valid',
          details: result.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const { username, email, password } = result.data;

    // Cek apakah username sudah ada
    const existingUser = await prisma.user.findUnique({
      where: { username },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: 'Username sudah digunakan, silakan pilih yang lain' },
        { status: 409 }
      );
    }

    // Jika ada email, pastikan belum dipakai
    if (email) {
      const existingEmail = await prisma.user.findUnique({
        where: { email },
      });

      if (existingEmail) {
        return NextResponse.json(
          { error: 'Email sudah terdaftar' },
          { status: 409 }
        );
      }
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Simpan user baru dengan role PLAYER
    const user = await prisma.user.create({
      data: {
        username,
        email: email || undefined,
        password: hashedPassword,
        role: 'PLAYER',
      },
    });

    return NextResponse.json(
      { message: 'Akun berhasil dibuat!', userId: user.id },
      { status: 201 }
    );
  } catch (error) {
    console.error('Register API error:', error);
    return NextResponse.json(
      { error: 'Terjadi kesalahan internal pada server' },
      { status: 500 }
    );
  }
}
