# Implementation Plan: 018-database-optimization

- [ ] **Phase 1: Setup & Database Schema**
  - [x] Task: Memodifikasi file `prisma/schema.prisma` untuk menambahkan `enum UserRole`, atribut `@@index`, properti `onDelete: Cascade`, dan penamaan tabel kustom (`@@map`).
  - [x] Task: Menjalankan perintah sinkronisasi struktur Prisma (seperti `npx prisma db push` atau pembaruan klien Prisma) agar skema baru dikenali oleh tipe Typescript.
  - [ ] Task: Conductor - User Manual Verification 'Phase 1' (Protocol in workflow.md)

- [ ] **Phase 2: Pengembangan API / Backend**
  - [x] Task: Memperbarui referensi nilai "ADMIN" ber-tipe _string_ menjadi referensi tipe yang sesuai dalam skrip inisialisasi (`create-admin.ts`) jika diperlukan oleh perubahan Enum.
  - [x] Task: Memverifikasi kode API yang menggunakan pemanggilan terkait `role` agar bebas dari _Type Error_.
  - [ ] Task: Conductor - User Manual Verification 'Phase 2' (Protocol in workflow.md)

- [x] **Phase 3: Pengembangan UI / Frontend**
  - [x] Task: (Fase ini dilewati karena optimasi Prisma tidak mengubah komponen antarmuka pengguna)
  - [x] Task: Conductor - User Manual Verification 'Phase 3' (Protocol in workflow.md)

- [ ] **Phase 4: Automated Testing & Validasi**
  - [x] Task: Menjalankan rutin pengujian `npm run test` untuk memastikan semua koneksi kueri database masih berfungsi mulus pasca-penerapan `@@map`.
  - [x] Task: Conductor - User Manual Verification 'Phase 4' (Protocol in workflow.md)
