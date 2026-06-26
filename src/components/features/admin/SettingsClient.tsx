'use client';

import * as React from 'react';
import { toast } from 'sonner';
import { Save, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface Props {
  initialSettings: Record<string, string>;
}

export function SettingsClient({ initialSettings }: Props) {
  const [settings, setSettings] = React.useState(initialSettings);
  const [isSaving, setIsSaving] = React.useState(false);

  const handleChange = (key: string, value: string) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    const toastId = toast.loading('Menyimpan pengaturan...');
    try {
      const res = await fetch('/api/admin/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ settings }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || 'Gagal menyimpan');

      toast.success(data.message, { id: toastId });
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message, { id: toastId });
      }
    } finally {
      setIsSaving(false);
    }
  };

  const sections = [
    {
      title: 'Halaman Tentang (/about)',
      items: [
        { key: 'about_vision', label: 'Visi UC96', type: 'textarea' },
        {
          key: 'about_mission',
          label: 'Misi UC96 (Pisahkan dengan baris baru)',
          type: 'textarea',
        },
        { key: 'about_history', label: 'Sejarah Singkat', type: 'textarea' },
      ],
    },
    {
      title: 'Halaman Aturan (/rules)',
      items: [
        {
          key: 'rules_general',
          label: 'Aturan Umum (Pisahkan dengan baris baru)',
          type: 'textarea',
        },
      ],
    },
    {
      title: 'Kontak & Sosial Media (/contact)',
      items: [
        { key: 'contact_whatsapp', label: 'Link WhatsApp Admin', type: 'text' },
        { key: 'contact_discord', label: 'Link Discord', type: 'text' },
        { key: 'contact_instagram', label: 'Link Instagram', type: 'text' },
        {
          key: 'contact_faq',
          label: 'Data FAQ (Harus format Array JSON valid)',
          type: 'textarea',
        },
      ],
    },
  ];

  return (
    <div className="space-y-8">
      {/* Alert Warning for JSON */}
      <div className="flex items-start gap-3 rounded-lg border border-amber-200 bg-amber-50 p-4 dark:border-amber-900/30 dark:bg-amber-900/10">
        <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-amber-600 dark:text-amber-500" />
        <div>
          <h3 className="text-sm font-semibold text-amber-800 dark:text-amber-400">
            Perhatian saat mengedit Data FAQ
          </h3>
          <p className="mt-1 text-sm text-amber-700 dark:text-amber-500">
            Pastikan Data FAQ menggunakan format JSON yang valid, contoh: <br />
            <code>
              [{'{'}&quot;q&quot;:&quot;Pertanyaan?&quot;,
              &quot;a&quot;:&quot;Jawaban&quot;{'}'}]
            </code>
          </p>
        </div>
      </div>

      <div className="space-y-6">
        {sections.map((section) => (
          <div
            key={section.title}
            className="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm dark:border-neutral-800 dark:bg-[#121212]"
          >
            <h2 className="mb-6 border-b border-neutral-200 pb-2 text-xl font-bold text-neutral-900 dark:border-neutral-800 dark:text-white">
              {section.title}
            </h2>
            <div className="space-y-5">
              {section.items.map((item) => (
                <div key={item.key} className="space-y-2">
                  <label className="text-sm font-bold text-neutral-700 dark:text-neutral-300">
                    {item.label}
                  </label>
                  {item.type === 'textarea' ? (
                    <textarea
                      rows={4}
                      value={settings[item.key] || ''}
                      onChange={(e) => handleChange(item.key, e.target.value)}
                      className="w-full rounded-md border border-neutral-300 bg-transparent px-3 py-2 text-sm text-neutral-900 placeholder:text-neutral-400 focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)] focus:outline-none dark:border-neutral-700 dark:text-white"
                    />
                  ) : (
                    <input
                      type="text"
                      value={settings[item.key] || ''}
                      onChange={(e) => handleChange(item.key, e.target.value)}
                      className="w-full rounded-md border border-neutral-300 bg-transparent px-3 py-2 text-sm text-neutral-900 placeholder:text-neutral-400 focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)] focus:outline-none dark:border-neutral-700 dark:text-white"
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-end pt-4 pb-12">
        <Button
          onClick={handleSave}
          disabled={isSaving}
          size="lg"
          className="min-w-[160px]"
        >
          {isSaving ? (
            'Menyimpan...'
          ) : (
            <>
              <Save className="mr-2 h-5 w-5" />
              Simpan Semua Perubahan
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
