# Implementation Plan: 021-daily-scrim-system

- [x] **Phase 1: Setup & Database Schema (Auth & Teams)**
  - [x] Task: Memperbarui otentikasi (NextAuth) untuk mendukung pendaftaran (Register) publik dan peran `PLAYER`.
  - [x] Task: Menambahkan relasi _User_ ke _Team_ di `prisma/schema.prisma` agar profil Tim ditautkan permanen ke akun kapten (User).
  - [x] Task: Menyesuaikan perhitungan logika kuota turnamen agar pendaftaran berstatus `PENDING` tidak memakan jatah `maxSlots`.
  - [x] Task: Conductor - User Manual Verification 'Phase 1' (Protocol in workflow.md)

- [x] **Phase 2: Pengembangan API / Backend**
  - [x] Task: Membuat _endpoint_ API otentikasi untuk registrasi akun Kapten.
  - [x] Task: Membuat _endpoint_ CRUD (Create, Read, Update) Profil Tim & Roster Pemain untuk Dasbor Kapten.
  - [x] Task: Merombak _endpoint_ Registrasi Turnamen publik menjadi sistem 1-Klik (menerima ID Tim langsung dari kapten).
  - [x] Task: Membuat _endpoint_ khusus fitur _Auto-Generate Daily Scrim_ untuk Admin (Otomatis _Tournament_ + 3 _Matches_).
  - [x] Task: Conductor - User Manual Verification 'Phase 2' (Protocol in workflow.md)

- [x] **Phase 3: Pengembangan UI / Frontend**
  - [x] Task: Membangun halaman _Login_ dan _Register_ publik.
  - [x] Task: Membangun UI Dasbor Kapten untuk manajemen Profil Tim dan Roster.
  - [x] Task: Merombak UI formulir pendaftaran turnamen publik menjadi dialog pendaftaran 1-Klik jika statusnya sudah _login_.
  - [x] Task: Menambahkan UI _Waiting List_ di panel Admin untuk meninjau status _Anti-Smurfing_ dan tombol _Generate Daily Scrim_.
  - [x] Task: Conductor - User Manual Verification 'Phase 3' (Protocol in workflow.md)

- [x] **Phase 4: Automated Testing & Validasi**
  - [x] Task: Menulis pengujian otomatis (`*.test.tsx` / `*.test.ts`) untuk memastikan logika _Waiting List_ dan _Auto-Generate Scrim_ berjalan aman.
  - [x] Task: Menjalankan skrip CI/CD internal (jika ada) atau melakukan manual test untuk semua fitur yang dibangun.
  - [x] Task: Conductor - Track Completion Verification (Protocol in workflow.md)
