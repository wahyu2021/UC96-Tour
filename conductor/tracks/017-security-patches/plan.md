# Implementation Plan: 017-security-patches

- [ ] **Phase 1: Setup & Scripts**
  - [ ] Task: Memperbarui `src/scripts/create-admin.ts` untuk menggunakan _environment variable_ sebagai pengganti _password_ statis.
  - [ ] Task: Conductor - User Manual Verification 'Phase 1' (Protocol in workflow.md)

- [ ] **Phase 2: Pengembangan API / Backend (Security Patches)**
  - [ ] Task: Menghapus argumen `mode: 'insensitive'` dari kueri Prisma di `src/lib/api/teams.ts`.
  - [ ] Task: Menambahkan logika verifikasi sesi otentikasi (`getServerSession`) di seluruh endpoint dalam folder `src/app/api/admin/`.
  - [ ] Task: Memperketat endpoint `/api/upload/route.ts` dengan pengecekan _login_, validasi tipe MIME (hanya `.jpg, .png, .webp`), dan limitasi ukuran file (5MB).
  - [ ] Task: Conductor - User Manual Verification 'Phase 2' (Protocol in workflow.md)

- [ ] **Phase 3: Pengembangan UI / Frontend**
  - [ ] Task: (Melewati fase ini karena _track_ hanya berfokus pada pengamanan rute _backend_)
  - [ ] Task: Conductor - User Manual Verification 'Phase 3' (Protocol in workflow.md)

- [ ] **Phase 4: Automated Testing & Validasi**
  - [ ] Task: Menjalankan `npm run test` untuk memastikan implementasi otentikasi tidak merusak tes yang ada (dan memperbaiki pengujian yang mungkin gagal akibat tambahan _auth check_).
  - [ ] Task: Menguji manual via API tester untuk memastikan rute `admin` dan `upload` menolak akses tanpa sesi yang valid.
  - [ ] Task: Conductor - User Manual Verification 'Phase 4' (Protocol in workflow.md)
