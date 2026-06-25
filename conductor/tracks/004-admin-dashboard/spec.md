# Track Specification: Admin Dashboard & Autentikasi

## Overview

Track ini berfokus pada pembangunan gerbang keamanan dan pusat kendali panitia. Kita akan menggunakan **NextAuth.js** (Credentials Provider) yang terkoneksi dengan database, serta **Middleware** tangguh untuk memblokir akses ke rute `/admin` bagi siapa pun yang belum _login_.

## Functional Requirements

- **Sistem Login:** Mengintegrasikan `NextAuth.js` dengan username & password (menggunakan algoritma _hashing_ bcryptjs).
- **Manajemen Tim:** Membuat dasbor Admin berisi tabel daftar tim. Admin memiliki wewenang mengubah status pendaftar (PENDING -> APPROVED / REJECTED).
- **Pencarian & Filter:** Menyediakan kolom cari nama tim dan menu filter (menampilkan yang _Pending_ saja, dll).
- **Keamanan Rute:** File `middleware.ts` akan otomatis memukul mundur tamu tak diundang ke halaman `/login`.

## Non-Functional Requirements (UX & Code Quality)

- **Perubahan Skema Database:** Menambahkan model tabel baru (misal: `User` atau `Admin`) di `schema.prisma`.
- **Desain UI Dasbor:** Menggunakan _Layout Sidebar_ modern yang memuat menu "Manajemen Tim" dan menyiapkan kerangka navigasi "Input Skor Pertandingan" untuk masa depan.
- **Keamanan Tingkat Tinggi:** Password panitia dilarang disimpan dalam format teks asli (wajib di-_hash_).

## Acceptance Criteria

- [ ] Perubahan skema _database_ berhasil dimigrasi (tabel admin baru).
- [ ] Rute `/admin` terbukti mustahil dibuka tanpa sesi NextAuth.
- [ ] Formulir _Login_ berhasil memvalidasi _username_ & sandi ter-_hash_.
- [ ] Tabel Dasbor berhasil menampilkan semua tim dari _database_.
- [ ] Fitur pengubah status (Persetujuan Pendaftaran Tim) berjalan lancar.
