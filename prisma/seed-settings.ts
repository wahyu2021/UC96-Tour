import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const defaultSettings = [
  {
    key: 'about_vision',
    value:
      'Menjadi wadah kompetitif utama bagi pemain PUBG yang menjunjung tinggi fair play dan sportivitas.',
    description: 'Visi utama komunitas UC96',
  },
  {
    key: 'about_mission',
    value:
      '1. Mengadakan turnamen rutin berkala.\n2. Menyediakan ekosistem bebas cheater.\n3. Mengembangkan talenta-talenta esports lokal.',
    description: 'Misi komunitas UC96',
  },
  {
    key: 'about_history',
    value:
      'Unit Combat 96 (UC96) didirikan untuk mempererat tali persaudaraan antar pemain PUBG dan memberikan panggung bagi mereka yang ingin terjun ke ranah kompetitif.',
    description: 'Sejarah singkat UC96',
  },
  {
    key: 'rules_general',
    value:
      '1. Semua pemain wajib menjunjung tinggi sportivitas.\n2. Teaming, Cheating, dan eksploitasi bug akan berakibat BANNED PERMANEN.\n3. Keputusan panitia tidak dapat diganggu gugat.',
    description: 'Aturan umum turnamen',
  },
  {
    key: 'contact_whatsapp',
    value: 'https://wa.me/6281234567890',
    description: 'Link WhatsApp Admin',
  },
  {
    key: 'contact_discord',
    value: 'https://discord.gg/uc96tour',
    description: 'Link Server Discord',
  },
  {
    key: 'contact_instagram',
    value: 'https://instagram.com/uc96_esports',
    description: 'Link Instagram',
  },
  {
    key: 'contact_faq',
    value:
      '[{"q":"Kapan turnamen berikutnya diadakan?","a":"Pendaftaran biasanya dibuka setiap pertengahan bulan. Pantau terus Instagram kami!"},{"q":"Apakah boleh menggunakan emulator?","a":"Ini adalah turnamen khusus PUBG PC (Steam). Pemain mobile tidak dapat berpartisipasi."}]',
    description: 'FAQ (Format JSON String)',
  },
];

async function main() {
  for (const setting of defaultSettings) {
    await prisma.appSetting.upsert({
      where: { key: setting.key },
      update: {},
      create: setting,
    });
  }
  console.log('Seeded App Settings successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
