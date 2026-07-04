# Implementation Plan: 021-daily-scrim-system

- [ ] **Phase 1: Setup & Database Schema (Auth & Teams)**
  - [ ] Task: Memperbarui otentikasi (NextAuth) untuk mendukung pendaftaran (Register) publik dan peran `PLAYER`.
  - [ ] Task: Menambahkan relasi _User_ ke _Team_ di `prisma/schema.prisma` agar profil Tim ditautkan permanen ke akun kapten (User).
  - [ ] Task: Menyesuaikan perhitungan logika kuota turnamen agar pendaftaran berstatus `PENDING` tidak memakan jatah `maxSlots`.
  - [ ] Task: Conductor - User Manual Verification 'Phase 1' (Protocol in workflow.md)

- [ ] **Phase 2: Pengembangan API / Backend**
  - [ ] Task: Membuat _endpoint_ API otentikasi untuk registrasi akun Kapten.
  - [ ] Task: Membuat _endpoint_ CRUD (Create, Read, Update) Profil Tim & Roster Pemain untuk Dasbor Kapten.
  - [ ] Task: Merombak _endpoint_ Registrasi Turnamen publik menjadi sistem 1-Klik (menerima ID Tim langsung dari kapten).
  - [ ] Task: Membuat _endpoint_ khusus fitur _Auto-Generate Daily Scrim_ untuk Admin (Otomatis _Tournament_ + 3 _Matches_).
  - [ ] Task: Conductor - User Manual Verification 'Phase 2' (Protocol in workflow.md)

- [ ] **Phase 3: Pengembangan UI / Frontend**
  - [ ] Task: Membangun halaman _Login_ dan _Register_ publik.
  - [ ] Task: Membangun UI Dasbor Kapten untuk manajemen Profil Tim dan Roster.
  - [ ] Task: Merombak UI formulir pendaftaran turnamen publik menjadi dialog pendaftaran 1-Klik jika statusnya sudah _login_.
  - [ ] Task: Menambahkan UI _Waiting List_ di panel Admin untuk meninjau status _Anti-Smurfing_ dan tombol _Generate Daily Scrim_.
  - [ ] Task: Conductor - User Manual Verification 'Phase 3' (Protocol in workflow.md)

- [ ] **Phase 4: Automated Testing & Validasi**
  - [ ] Task: Menulis pengujian otomatis (`*.test.tsx` / `*.test.ts`) untuk memastikan logika _Waiting List_ dan _Auto-Generate Scrim_ berjalan aman.
  - [ ] Task: Menjalankan keseluruhan `npm run test` dan `tsc --noEmit` untuk mengonfirmasi stabilitas kode.
  - [ ] Task: Conductor - User Manual Verification 'Phase 4' (Protocol in workflow.md)
