# Track 1 Plan: Project Initialization & Database Schema

## 1. Setup, Scaffolding & Code Quality

- [ ] Menjalankan `npx create-next-app@latest` dengan TypeScript, Tailwind CSS, dan App Router.
- [ ] Menginstal _dependencies_ inti (`next-themes`, `prisma`, `@prisma/client`).
- [ ] **Absolute Imports:** Mengonfigurasi `tsconfig.json` (`@/*`) agar _import path_ lebih rapi.
- [ ] **Otomatisasi Kualitas Kode:** Mengonfigurasi ESLint, Prettier, serta memasang **Husky** & **lint-staged** untuk memvalidasi kode secara otomatis sebelum di-_commit_.
- [ ] **Keamanan:** Membuat file `.env.example` untuk dokumentasi _environment variables_.

## 2. Struktur Folder Modular & Atomic Design

- [ ] Menyusun struktur folder _Best Practice_ berbasis modul/fitur:
  - **Pemisahan Logika & Tipe:** `types/` (_interface_ terpusat), `lib/` (koneksi eksternal/Prisma), dan `utils/` (fungsi _helper_ murni).
- [ ] Membuat kerangka _Atomic Components_ praktis:
  - `components/ui/` (Komponen visual dasar yang sangat dapat digunakan ulang: _Button, Input_).
  - `components/features/` (Komponen gabungan yang memuat logika spesifik modul: _LeaderboardTable_).
  - `components/layouts/` (Struktur rangka halaman: _Navbar, Footer_).
- [ ] Mengimplementasikan pedoman **Atomic Git Commits** (`feat:`, `fix:`, `test:`).

## 3. Sistem Pengujian (Software Testing)

- [ ] Menginstal **Vitest** dan **React Testing Library** (kombinasi pengujian Next.js paling tangguh dan cepat saat ini).
- [ ] Menerapkan struktur **Colocated Tests** (Pendekatan Per-Fitur/Modul), yaitu meletakkan file `.test.tsx` atau `.test.ts` persis di sebelah file utama komponen/fungsinya.
- [ ] Membuat satu _unit test_ contoh awal (sebagai _boilerplate_) untuk memvalidasi sistem pengujian berjalan sempurna.

## 4. UI Foundation (Sistem Desain)

- [ ] Mengonfigurasi `tailwind.config.ts` sesuai dengan panduan warna di `DESIGN.md`.
- [ ] Mengaktifkan fitur _Dark Mode / Light Mode_ dengan `next-themes`.
- [ ] Membangun komponen antarmuka dasar yang responsif: _Navbar_ dan _Footer_.

## 5. Skema Database Lanjutan (Prisma)

- [ ] Menginisialisasi Prisma di dalam proyek (`npx prisma init`).
- [ ] Merancang skema tabel database yang komprehensif di `schema.prisma`:
  - **Team (Tim):** Id, Nama, Singkatan/Tag, URL Logo, Status.
  - **Player (Pemain):** Id, In-Game Name (IGN), In-Game ID (Nomor PUBG), Steam ID, Role, Id Tim.
  - **Match (Pertandingan):** Id, Waktu, Grup, Peta, Status.
  - **MatchResult (Hasil Skor):** Id, Poin Kill, Poin Placement, Total Poin, Posisi Finish, WWCD, Id Tim, Id Match.
- [ ] Menyiapkan skrip sinkronisasi awal (_migration_) untuk database.
