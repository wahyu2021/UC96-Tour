# Implementation Plan: Pendaftaran Tim & Pemain

## Phase 1: Persiapan API Upload Logo & Library

- [ ] Task: Instalasi dependensi _frontend_.
  - [ ] Pasang `react-hook-form` (manajemen form), `@hookform/resolvers` & `zod` (validasi), serta `sonner` (untuk _toast_ notifikasi modern).
- [ ] Task: Pembuatan API Endpoint untuk _Upload_ File.
  - [ ] Buat file _backend_ `src/app/api/upload/route.ts`.
  - [ ] Tulis logika Node.js untuk menangkap file gambar dan menyimpannya secara fisik ke `public/uploads`.
- [ ] Task: Conductor - User Manual Verification 'Persiapan API Upload Logo'

## Phase 2: Pembuatan Skema Validasi & API Registrasi

- [ ] Task: Pembuatan skema validasi Zod.
  - [ ] Definisikan aturan ketat `TeamRegistrationSchema` (nama wajib diisi, ukuran file logo maksimal, dll) di folder `src/lib/validations/`.
- [ ] Task: Pembuatan API Endpoint untuk Registrasi Data.
  - [ ] Buat file _backend_ `src/app/api/register/route.ts`.
  - [ ] Tulis logika penyimpanan data relasional `Team` dan ke-4 `Player` (dengan status awal `PENDING`) ke MySQL menggunakan Prisma.
- [ ] Task: Conductor - User Manual Verification 'Pembuatan Skema Validasi & API Registrasi'

## Phase 3: Pembangunan Komponen UI Multi-step Form

- [ ] Task: Pembuatan sub-komponen formulir.
  - [ ] Buat `TeamInfoStep.tsx` (Kolom Nama Tim & Area unggah Logo).
  - [ ] Buat `PlayersInfoStep.tsx` (Kolom In-Game Name & ID untuk Kapten + 3 Anggota).
- [ ] Task: Pembuatan kerangka Induk Formulir.
  - [ ] Buat `RegistrationForm.tsx` untuk mengatur transisi logika dari Step 1 ke Step 2, serta _state loading_ saat data dikirim.
- [ ] Task: Conductor - User Manual Verification 'Pembangunan Komponen UI Multi-step Form'

## Phase 4: Halaman Registrasi & Pengujian

- [ ] Task: Pembuatan Halaman Publik.
  - [ ] Rakit komponen form ke dalam _route_ halaman `/register` (`src/app/register/page.tsx`).
- [ ] Task: Penulisan Pengujian (_Testing_).
  - [ ] Tulis uji fungsionalitas Vitest untuk memastikan logika transisi _multi-step form_ berjalan lancar.
- [ ] Task: Conductor - User Manual Verification 'Halaman Registrasi & Pengujian'
