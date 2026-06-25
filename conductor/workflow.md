# Development Workflow: UC96 PUBG Tournament Website

## 1. Branching Strategy (Strategi Git)

- **Main Branch (`main`):** _Branch_ utama yang berisi kode stabil dan siap rilis.
- **Development Branch (`dev`):** _Branch_ integrasi tempat semua fitur digabungkan sebelum masuk ke `main`.
- **Feature Branches (`feature/<nama-fitur>`):** Dibuat dari `dev` untuk setiap penambahan fitur baru (contoh: `feature/leaderboard`, `feature/auth-admin`).

## 2. Commit Convention (Penamaan Komit)

Menggunakan panduan standar:

- `feat:` Untuk penambahan fitur baru.
- `fix:` Untuk perbaikan _bug_.
- `docs:` Untuk perubahan dokumentasi (seperti _Conductor Plan_).
- `style:` Untuk perubahan _styling_ antarmuka (Tailwind CSS).
- `refactor:` Untuk merapikan kode tanpa mengubah/menambah fitur.

## 3. Siklus Pengembangan (Development Cycle)

- Pengembangan akan dibagi menjadi beberapa fase (disebut **Track**).
- Setiap _Track_ harus diuji terlebih dahulu secara lokal sebelum di-_merge_ ke _branch_ `dev`.
- Fase _deployment_ akhir ke VPS akan dilakukan saat _track_ inti (Pendaftaran & Leaderboard) sudah dinyatakan stabil.

## 4. Standar Implementasi Fitur (Track Phases)

Setiap pembuatan _Track_ baru wajib memiliki `plan.md` yang terstruktur ke dalam 4 Fase berikut:

- **Phase 1: Setup & Database Schema** (Jika ada perubahan struktur data).
- **Phase 2: Pengembangan API / Backend** (Pembuatan endpoint dan logika server).
- **Phase 3: Pengembangan UI / Frontend** (Pembuatan komponen antarmuka pengguna).
- **Phase 4: Automated Testing & Validasi** (WAJIB)
  - Agen **wajib** membuat file _automated test_ (`*.test.tsx` atau `*.test.ts`) untuk fungsi krusial, komponen UI interaktif, atau API Endpoint yang baru dibuat menggunakan `vitest` dan `testing-library`.
  - Agen **wajib** menjalankan `npm run test` untuk memastikan semua _test suite_ sukses (`passed`) sebelum mengakhiri fase pengujian.
  - Setelah otomatis lolos, baru dilanjutkan ke _User Manual Verification_.
