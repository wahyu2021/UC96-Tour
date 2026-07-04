'use client';

import * as React from 'react';
import { toast } from 'sonner';
import { Save, Trash2, Plus } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { SettingsClientProps } from '@/types';

export function SettingsClient({ initialSettings }: SettingsClientProps) {
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
          label: 'Daftar Pertanyaan Umum (FAQ)',
          type: 'faq',
        },
      ],
    },
  ];

  return (
    <div className="space-y-8">
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
                  ) : item.type === 'faq' ? (
                    (() => {
                      const faqString = settings[item.key] || '[]';
                      let faqs: { q: string; a: string }[] = [];
                      try {
                        faqs = JSON.parse(faqString);
                        if (!Array.isArray(faqs)) faqs = [];
                      } catch {
                        faqs = [];
                      }

                      const updateFaq = (
                        index: number,
                        field: 'q' | 'a',
                        value: string
                      ) => {
                        const newFaqs = [...faqs];
                        newFaqs[index][field] = value;
                        handleChange(item.key, JSON.stringify(newFaqs));
                      };

                      const addFaq = () => {
                        const newFaqs = [...faqs, { q: '', a: '' }];
                        handleChange(item.key, JSON.stringify(newFaqs));
                      };

                      const removeFaq = (index: number) => {
                        const newFaqs = faqs.filter((_, i) => i !== index);
                        handleChange(item.key, JSON.stringify(newFaqs));
                      };

                      return (
                        <div className="space-y-4 rounded-xl border border-neutral-200 bg-neutral-50/50 p-4 dark:border-neutral-800 dark:bg-black/20">
                          {faqs.map((faq, index) => (
                            <div
                              key={index}
                              className="relative flex items-start gap-4 rounded-lg border border-neutral-200 bg-white p-4 shadow-sm transition-all dark:border-neutral-800 dark:bg-[#1a1a1a]"
                            >
                              <div className="flex-1 space-y-3">
                                <input
                                  type="text"
                                  value={faq.q}
                                  onChange={(e) =>
                                    updateFaq(index, 'q', e.target.value)
                                  }
                                  placeholder="Tulis pertanyaan..."
                                  className="w-full rounded-md border border-neutral-300 bg-transparent px-3 py-2 text-sm font-bold text-neutral-900 placeholder:text-neutral-400 focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)] focus:outline-none dark:border-neutral-700 dark:text-white"
                                />
                                <textarea
                                  rows={2}
                                  value={faq.a}
                                  onChange={(e) =>
                                    updateFaq(index, 'a', e.target.value)
                                  }
                                  placeholder="Tulis jawaban..."
                                  className="w-full rounded-md border border-neutral-300 bg-transparent px-3 py-2 text-sm text-neutral-900 placeholder:text-neutral-400 focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)] focus:outline-none dark:border-neutral-700 dark:text-white"
                                />
                              </div>
                              <button
                                type="button"
                                onClick={() => removeFaq(index)}
                                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md text-red-500 transition-colors hover:bg-red-50 dark:hover:bg-red-500/10"
                                title="Hapus Pertanyaan"
                              >
                                <Trash2 className="h-5 w-5" />
                              </button>
                            </div>
                          ))}
                          {faqs.length === 0 && (
                            <p className="py-4 text-center text-sm text-neutral-500 italic">
                              Belum ada pertanyaan FAQ ditambahkan.
                            </p>
                          )}
                          <Button
                            type="button"
                            variant="outline"
                            onClick={addFaq}
                            className="w-full border-dashed"
                          >
                            <Plus className="mr-2 h-4 w-4" /> Tambah Pertanyaan
                          </Button>
                        </div>
                      );
                    })()
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
