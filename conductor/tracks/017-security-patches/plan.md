# Implementation Plan: 017-security-patches

- [ ] **Phase 1: Setup & Scripts**
  - [x] Task: Memperbarui `src/scripts/create-admin.ts` untuk menggunakan _environment variable_ sebagai pengganti _password_ statis.
  - [x] Task: Conductor - User Manual Verification 'Phase 1' (Protocol in workflow.md)

- [ ] **Phase 2: Pengembangan API / Backend (Security Patches)**
  - [x] Task: Menghapus argumen `mode: 'insensitive'` dari kueri Prisma di `src/lib/api/teams.ts`.
  - [x] Task: Menambahkan logika verifikasi sesi otentikasi (`getServerSession`) di seluruh endpoint dalam folder `src/app/api/admin/`.
  - [x] Task: Memperketat endpoint `/api/upload/route.ts` dengan pengecekan _login_, validasi tipe MIME (hanya `.jpg, .png, .webp`), dan limitasi ukuran file (5MB).
  - [x] Task: Conductor - User Manual Verification 'Phase 2' (Protocol in workflow.md)

- [ ] **Phase 3: Pengembangan UI / Frontend**
  - [x] Task: (Melewati fase ini karena _track_ hanya berfokus pada pengamanan rute _backend_)
  - [x] Task: Conductor - User Manual Verification 'Phase 3' (Protocol in workflow.md)

- [ ] **Phase 4: Automated Testing & Validasi**
  - [x] Task: Menjalankan `npm run test` untuk memastikan implementasi otentikasi tidak merusak tes yang ada (dan memperbaiki pengujian yang mungkin gagal akibat tambahan _auth check_).
  - [x] Task: Menguji manual via API tester untuk memastikan rute `admin` dan `upload` menolak akses tanpa sesi yang valid.
  - [x] Task: Conductor - User Manual Verification 'Phase 4' (Protocol in workflow.md)
