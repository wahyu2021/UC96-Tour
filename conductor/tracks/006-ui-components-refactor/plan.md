# Implementation Plan: UI Components Refactoring

## Phase 1: Pembuatan Komponen Dasar (Primitives)

- [ ] Task: Buat komponen `Button` (`src/components/ui/Button.tsx`)
  - [ ] Tentukan varian kelas warna/ukuran dan prop untuk _loading state_.
- [ ] Task: Buat komponen `Input` (`src/components/ui/Input.tsx`)
  - [ ] Buat _styling_ dasar dengan desain responsif, status fokus, dan error.
- [ ] Task: Buat komponen `Badge` (`src/components/ui/Badge.tsx`)
  - [ ] Implementasikan varian warna untuk indikator status tabel.
- [ ] Task: Conductor - User Manual Verification 'Phase 1' (Protocol in workflow.md)

## Phase 2: Pembuatan Komponen Kompleks

- [ ] Task: Buat komponen `Modal` (`src/components/ui/Modal.tsx`)
  - [ ] Implementasikan pembungkus _backdrop_ transparan dan animasi penutupan.
- [ ] Task: Buat komponen `Select` (Custom Dropdown) (`src/components/ui/Select.tsx`)
  - [ ] Rancang kerangka _dropdown_ menggunakan React State murni untuk menghindari `<select>` _default_ browser.
  - [ ] Tambahkan logika penanganan aksi klik di luar (_click outside_) untuk menutup menu.
  - [ ] Pastikan warna sesuai gaya _Dark Mode_ dan interaksi prop `value` / `onChange` sejalan dengan Form.
- [ ] Task: Conductor - User Manual Verification 'Phase 2' (Protocol in workflow.md)

## Phase 3: Integrasi & Refactoring Penuh

- [ ] Task: Refaktor Form Pendaftaran Publik
  - [ ] Integrasikan `Select` kustom ke dalam `RegistrationForm.tsx` untuk pilihan Turnamen.
  - [ ] Bersihkan dan pasang komponen `Input` serta `Button`.
- [ ] Task: Refaktor Dasbor Admin (Manajemen Turnamen & Tim)
  - [ ] Ganti kode elemen lencana yang panjang di dalam tabel dengan komponen `Badge`.
  - [ ] Bungkus ulang Form "Tambah Turnamen" menggunakan komponen `Modal` kustom.
  - [ ] Refaktor filter status tim menggunakan `Select` kustom.
- [ ] Task: Conductor - User Manual Verification 'Phase 3' (Protocol in workflow.md)
