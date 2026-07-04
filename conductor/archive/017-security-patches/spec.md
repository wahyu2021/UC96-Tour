# Specification: 017-security-patches

## Overview

Track ini berfokus pada penambalan celah keamanan tingkat menengah hingga kritis pada bagian backend dan API aplikasi UC96 TOUR. Perubahan nama `proxy.ts` dibatalkan (out of scope) sesuai arahan.

## Functional Requirements

1. **API Admin Authentication:** Memastikan semua endpoint API Admin (dashboard, matches, results, teams, tournaments, settings) memvalidasi sesi otentikasi sebelum memproses instruksi.
2. **Secure Upload API:** Menambahkan pengecekan autentikasi pada `/api/upload/route.ts`, membatasi jenis ekstensi file (hanya `.jpg, .png, .webp`), dan membatasi ukuran maksimal unggahan (maksimal 5MB).
3. **Database Query Fix:** Menghapus parameter `mode: 'insensitive'` pada eksekusi Prisma di `src/lib/api/teams.ts` agar _query_ berjalan normal di mesin MySQL.
4. **Secure Admin Seed Script:** Mengubah _hardcoded password_ di skrip `create-admin.ts` agar mengambil nilainya dari _environment variables_ atau mengeluarkan log peringatan.

## Out of Scope

- Pengubahan nama file `src/proxy.ts` menjadi `src/middleware.ts` TIDAK dilakukan.
- Penambahan `@@index` pada skema database dan perbaikan sinkronisasi _tiebreaker_ Leaderboard belum masuk dalam rilis keamanan ini (bisa dikerjakan pada Track Optimasi Database berikutnya).
