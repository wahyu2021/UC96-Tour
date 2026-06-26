import * as React from 'react';
import { prisma } from '@/lib/db';
import { AlertCircle, FileText, CheckCircle2 } from 'lucide-react';

export const metadata = {
  title: 'Aturan & Regulasi | UC96',
};

export default async function RulesPage() {
  const setting = await prisma.appSetting.findUnique({
    where: { key: 'rules_general' },
  });
  const rulesText = setting?.value || '';
  const rulesList = rulesText.split('\n').filter((r) => r.trim() !== '');

  const scoring = await prisma.scoringConfig.findMany({
    orderBy: { rank: 'asc' },
  });

  return (
    <div className="min-h-screen bg-[#0a0a0a] pt-24 pb-20 text-white">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <h1 className="font-heading mb-4 text-4xl font-black uppercase italic md:text-5xl">
            Kitab{' '}
            <span className="text-[var(--color-primary)]">Undang-Undang</span>
          </h1>
          <p className="text-neutral-400">
            Aturan resmi turnamen UC96. Wajib dibaca dan dipatuhi oleh seluruh
            peserta.
          </p>
        </div>

        {/* Warning Alert */}
        <div className="mb-12 flex items-start gap-4 rounded-xl border border-red-500/30 bg-red-500/10 p-6">
          <AlertCircle className="mt-1 h-6 w-6 shrink-0 text-red-500" />
          <div>
            <h3 className="text-lg font-bold text-red-500">Peringatan Keras</h3>
            <p className="mt-1 text-neutral-300">
              Segala bentuk kecurangan (Cheating, Teaming, Eksploitasi Bug) akan
              berakibat diskualifikasi langsung dan BANNED permanen dari seluruh
              ekosistem UC96.
            </p>
          </div>
        </div>

        {/* General Rules */}
        <div className="mb-12">
          <h2 className="mb-6 flex items-center gap-3 text-2xl font-black uppercase">
            <FileText className="h-6 w-6 text-[var(--color-primary)]" />
            Aturan Umum
          </h2>
          <div className="rounded-2xl border border-neutral-800 bg-[#121212] p-2">
            {rulesList.map((rule, idx) => {
              const text = rule.replace(/^\d+\.\s*/, '');
              return (
                <div
                  key={idx}
                  className="flex items-start gap-4 border-b border-neutral-800/50 p-4 last:border-0"
                >
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-neutral-800 font-bold text-neutral-400">
                    {idx + 1}
                  </div>
                  <p className="mt-1 text-neutral-300">{text}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Scoring Table */}
        <div>
          <h2 className="mb-6 flex items-center gap-3 text-2xl font-black uppercase">
            <CheckCircle2 className="h-6 w-6 text-[var(--color-primary)]" />
            Sistem Poin (Placement)
          </h2>
          <div className="overflow-hidden rounded-2xl border border-neutral-800 bg-[#121212]">
            <table className="w-full text-left">
              <thead className="border-b border-neutral-800 bg-neutral-900">
                <tr>
                  <th className="px-6 py-4 text-sm font-bold text-neutral-400 uppercase">
                    Peringkat Akhir (Rank)
                  </th>
                  <th className="px-6 py-4 text-right text-sm font-bold text-neutral-400 uppercase">
                    Placement Points
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-800">
                {scoring.length > 0 ? (
                  scoring.map((score) => (
                    <tr
                      key={score.rank}
                      className="transition-colors hover:bg-neutral-900/50"
                    >
                      <td className="px-6 py-3 font-bold text-white">
                        #{score.rank}
                      </td>
                      <td className="px-6 py-3 text-right font-black text-[var(--color-primary)]">
                        {score.placementPoints} Pts
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={2}
                      className="py-8 text-center text-neutral-500"
                    >
                      Sistem poin belum dikonfigurasi.
                    </td>
                  </tr>
                )}
                <tr className="bg-neutral-900/30">
                  <td className="px-6 py-4 font-bold text-neutral-300">
                    Setiap 1 Kill
                  </td>
                  <td className="px-6 py-4 text-right font-black text-white">
                    1 Pts
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
