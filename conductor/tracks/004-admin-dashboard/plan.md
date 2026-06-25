# Implementation Plan: Admin Dashboard & Autentikasi

## Phase 1: Persiapan Database & Keamanan Dasar

- [ ] Task: Modifikasi Skema Prisma.
  - [ ] Tambahkan model tabel `User` (berisi _username_ & _password_ ter-_hash_) ke `schema.prisma`.
  - [ ] Terapkan perubahan ke MySQL (_Prisma db push / migrate_).
- [ ] Task: Instalasi Senjata Keamanan.
  - [ ] Instal `next-auth` dan `bcryptjs` (serta `@types/bcryptjs`).
- [ ] Task: Conductor - User Manual Verification 'Persiapan Database & Keamanan Dasar'

## Phase 2: Jantung NextAuth & Penjaga Middleware

- [ ] Task: Pembuatan Otak Autentikasi.
  - [ ] Buat file konfigurasi inti NextAuth (`src/lib/auth.ts` & API _route_).
  - [ ] Tulis logika _Credentials Provider_ untuk membandingkan input _login_ panitia dengan data di _database_.
- [ ] Task: Pemasangan Next.js Middleware.
  - [ ] Tulis file penjaga gawang `src/middleware.ts` untuk mem-blokir akses masuk tanpa izin ke `/admin`.
- [ ] Task: Conductor - User Manual Verification 'Jantung NextAuth & Penjaga Middleware'

## Phase 3: Gerbang Masuk (Halaman Login UI)

- [ ] Task: Pembuatan Formulir Login Publik.
  - [ ] Buat desain form _login_ yang elegan di `src/app/login/page.tsx`.
  - [ ] Sambungkan tombol "Masuk" ke fungsi `signIn()` milik NextAuth.
- [ ] Task: Conductor - User Manual Verification 'Gerbang Masuk (Halaman Login UI)'

## Phase 4: Pusat Kendali Admin (Dashboard & Verifikasi Tim)

- [ ] Task: Pembuatan Layout Khusus Admin.
  - [ ] Buat kerangka navigasi _Sidebar_ Admin di `src/app/admin/layout.tsx`.
- [ ] Task: Halaman Daftar & Manajemen Tim.
  - [ ] Buat halaman utama Dasbor (`src/app/admin/page.tsx` atau `/teams`) yang menarik semua data dari Prisma.
  - [ ] Buat tampilan Tabel Data Tim lengkap dengan kotak pencarian (Filter).
- [ ] Task: Fungsi Eksekusi Persetujuan Tim (Approval API).
  - [ ] Buat _backend_ API untuk mengeksekusi perubahan status (PENDING menjadi APPROVED).
- [ ] Task: Conductor - User Manual Verification 'Pusat Kendali Admin'

## Phase: Review Fixes

- [x] Task: Apply review suggestions 904020a
