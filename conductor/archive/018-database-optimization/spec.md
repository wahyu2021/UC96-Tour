# Specification: 018-database-optimization

## Overview

Track ini berfokus pada optimasi struktur _database schema_ menggunakan Prisma ORM. Perubahan ini bertujuan untuk meningkatkan performa akses data, memperkuat integritas data dengan relasi bertingkat (_cascade_), dan menyesuaikan konvensi penamaan standar tabel MySQL.

## Functional Requirements

1. **Pemberian Anotasi Indeks (`@@index`):** Menambahkan indeks pada setiap kolom _Foreign Key_ (seperti `tournamentId` pada tabel Team dan Match, serta `teamId` pada Player) untuk mempercepat pencarian data relasional.
2. **Standardisasi Tipe Data Role:** Mengubah kolom `role` pada model `User` dari tipe data `String` biasa menjadi tipe data enumerasi `enum UserRole { ADMIN }`.
3. **Penerapan _Cascade Delete_:** Mengkonfigurasi relasi di `schema.prisma` agar ketika entitas induk dihapus (misal: Tournament), seluruh entitas anak yang terkait (Team, Match) akan terhapus otomatis (`onDelete: Cascade`).
4. **Penamaan Tabel (`@@map`):** Memetakan model _PascalCase_ Prisma ke konvensi penamaan tabel _snake_case_ atau jamak yang umum di MySQL (contoh: model `Tournament` dipetakan ke tabel `tournaments`).

## Non-Functional Requirements

- Perubahan skema tidak boleh merusak logika API Prisma Client yang sudah berjalan (keuntungan dari `@@map` adalah kode TS tidak perlu berubah).
- Wajib menghasilkan berkas _migration_ SQL baru (`prisma migrate dev` atau `prisma db push`) yang tervalidasi.

## Out of Scope

- Perubahan alur bisnis pada fitur turnamen (contoh: penambahan model klasemen baru) tidak masuk ke dalam pengerjaan ini.
