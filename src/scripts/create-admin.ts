import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const username = 'admin';
  const plainPassword = 'panitia123';

  // Enkripsi password menggunakan bcrypt dengan cost factor 10
  const hashedPassword = await bcrypt.hash(plainPassword, 10);

  const admin = await prisma.user.upsert({
    where: { username },
    update: {},
    create: {
      username,
      password: hashedPassword,
      role: 'ADMIN',
    },
  });

  console.log('✅ Akun Admin berhasil dibuat!');
  console.log(`Username : ${admin.username}`);
  console.log(`Password : ${plainPassword}`);
}

main()
  .catch((e) => {
    console.error('❌ Gagal membuat admin:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
