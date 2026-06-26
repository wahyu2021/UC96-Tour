# Specification: Homepage Upgrade Plan

## Overview

Track ini berfokus pada perombakan total Halaman Beranda (`/`) menjadi portal e-sports yang dinamis, interaktif, dan premium. Tujuannya adalah untuk menarik minat tim dan pemain sekaligus memberikan akses instan ke informasi terpenting seperti turnamen aktif, statistik platform, dan papan peringkat terbaru.

## Functional Requirements

1. **Cinematic Hero Section**: Menampilkan banner dengan gambar `default-bg.webp`, efek dark overlay, typography tebal (Esports style), dan tombol CTA "Daftar Tim" & "Lihat Turnamen".
2. **Live Global Statistics**: Menampilkan angka real-time dari database untuk:
   - Total Pendaftaran Tim
   - Total Turnamen
   - Total Pemain
3. **Featured Tournaments**: Menampilkan 3-4 turnamen berstatus ONGOING/DRAFT dalam format Grid Horizontal/Carousel yang dapat digeser.
4. **Mini Leaderboard**: Menampilkan cuplikan Top 3 atau Top 5 Tim dari turnamen yang sedang berjalan atau baru selesai.
5. **Core Features / Why Join**: Menampilkan keunggulan platform (Sistem Scoring, Manajemen Tim) dalam bentuk _glassmorphism cards_.

## Non-Functional Requirements

- Komponen harus sepenuhnya responsif di semua ukuran layar (Mobile First).
- Menggunakan ikon murni dari `lucide-react` (tanpa emoji).
- Akses data (statistik, turnamen, leaderboard) harus dieksekusi secara efisien (menggunakan React Server Components/Suspense jika perlu) agar tidak memperlambat Initial Page Load.

## Acceptance Criteria

- [ ] Beranda berhasil menampilkan Hero Banner baru dengan _styling_ yang kohesif.
- [ ] Komponen "Live Statistics" berhasil menampilkan hitungan akurat dari database (Teams, Tournaments).
- [ ] Daftar "Featured Tournaments" dapat di-_scroll_ secara horizontal.
- [ ] Komponen "Mini Leaderboard" berhasil mengambil dan menampilkan tim papan atas tanpa kendala.

## Out of Scope

- Penambahan sistem otentikasi pemain/publik (Fokus hanya pada UI presentasional).
- Modifikasi algoritma poin/kalkulasi skor (Hanya bertugas memanggil data klasemen yang sudah ada).
