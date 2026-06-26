# Implementation Plan: Track 016

## Phase 1: Database & API Setup

- [ ] Task: Memperbarui schema Prisma untuk menambahkan model `AppSetting` (menyimpan key-value teks dinamis).
- [ ] Task: Menjalankan `npx prisma db push` dan men-seed nilai default (placeholder) untuk Visi Misi, Aturan, dan Kontak.
- [ ] Task: Membuat API Endpoints (`/api/settings` publik & `/api/admin/settings`).
- [ ] Task: Conductor - User Manual Verification 'Phase 1: Database & API Setup' (Protocol in workflow.md)

## Phase 2: Admin CMS Development

- [ ] Task: Membuat halaman Admin `/admin/settings` untuk mengedit konten teks.
- [ ] Task: Mengembangkan form UI yang mudah digunakan agar Admin bisa mengupdate JSON teks dengan praktis.
- [ ] Task: Menambahkan tautan navigasi 'Pengaturan' di Sidebar Admin.
- [ ] Task: Conductor - User Manual Verification 'Phase 2: Admin CMS Development' (Protocol in workflow.md)

## Phase 3: Public UI Implementation

- [ ] Task: Membuat halaman publik `/about/page.tsx` (menampilkan Visi Misi dari Database).
- [ ] Task: Membuat halaman publik `/rules/page.tsx` (menampilkan tabel & teks aturan dengan desain UI Accordion ber-kontras tinggi).
- [ ] Task: Membuat halaman publik `/contact/page.tsx` (menampilkan ikon Sosial Media dan FAQ dari Database).
- [ ] Task: Conductor - User Manual Verification 'Phase 3: Public UI Implementation' (Protocol in workflow.md)
