import * as React from 'react';
import { prisma } from '@/lib/db';
import { MessageCircle, HelpCircle, Camera } from 'lucide-react';

export const metadata = {
  title: 'Kontak & FAQ | UC96',
};

export default async function ContactPage() {
  const settings = await prisma.appSetting.findMany({
    where: {
      key: {
        in: [
          'contact_whatsapp',
          'contact_discord',
          'contact_instagram',
          'contact_faq',
        ],
      },
    },
  });
  const data = settings.reduce(
    (acc, curr) => ({ ...acc, [curr.key]: curr.value }),
    {} as Record<string, string>
  );

  let faqList: { q: string; a: string }[] = [];
  try {
    if (data.contact_faq) faqList = JSON.parse(data.contact_faq);
  } catch {}

  return (
    <div className="min-h-screen bg-[#0a0a0a] pt-24 pb-20 text-white">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <h1 className="font-heading mb-4 text-4xl font-black uppercase italic md:text-5xl">
            Hubungi <span className="text-[var(--color-primary)]">Kami</span>
          </h1>
          <p className="text-neutral-400">
            Punya pertanyaan atau kendala? Hubungi tim admin kami.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
          {/* Direct Contact Cards */}
          <div className="space-y-6">
            <h2 className="mb-6 flex items-center gap-3 text-2xl font-black uppercase">
              <MessageCircle className="h-6 w-6 text-[var(--color-primary)]" />
              Kontak Langsung
            </h2>

            {data.contact_whatsapp && (
              <a
                href={data.contact_whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 rounded-2xl border border-green-500/30 bg-green-500/10 p-6 transition-all hover:bg-green-500/20"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-green-500">
                  <MessageCircle className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white transition-colors group-hover:text-green-400">
                    WhatsApp Admin
                  </h3>
                  <p className="text-sm text-neutral-400">
                    Respon cepat untuk kendala pendaftaran
                  </p>
                </div>
              </a>
            )}

            {data.contact_discord && (
              <a
                href={data.contact_discord}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 rounded-2xl border border-indigo-500/30 bg-indigo-500/10 p-6 transition-all hover:bg-indigo-500/20"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-indigo-500">
                  <span className="text-xl font-black text-white">D</span>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white transition-colors group-hover:text-indigo-400">
                    Server Discord
                  </h3>
                  <p className="text-sm text-neutral-400">
                    Bergabung dengan komunitas & cari tim
                  </p>
                </div>
              </a>
            )}

            {data.contact_instagram && (
              <a
                href={data.contact_instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 rounded-2xl border border-pink-500/30 bg-pink-500/10 p-6 transition-all hover:bg-pink-500/20"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-tr from-yellow-500 via-pink-500 to-purple-500">
                  <Camera className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white transition-colors group-hover:text-pink-400">
                    Instagram
                  </h3>
                  <p className="text-sm text-neutral-400">
                    Update info turnamen & highlight
                  </p>
                </div>
              </a>
            )}
          </div>

          {/* FAQ */}
          <div>
            <h2 className="mb-6 flex items-center gap-3 text-2xl font-black uppercase">
              <HelpCircle className="h-6 w-6 text-[var(--color-primary)]" />
              Pertanyaan Umum
            </h2>

            <div className="space-y-4">
              {faqList.length > 0 ? (
                faqList.map((faq, idx) => (
                  <div
                    key={idx}
                    className="rounded-2xl border border-neutral-800 bg-[#121212] p-6 transition-colors hover:border-[var(--color-primary)]/50"
                  >
                    <h3 className="mb-2 text-lg font-bold text-white">
                      {faq.q}
                    </h3>
                    <p className="text-neutral-400">{faq.a}</p>
                  </div>
                ))
              ) : (
                <p className="text-neutral-500 italic">Belum ada FAQ.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
