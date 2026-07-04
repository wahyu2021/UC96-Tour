# Implementation Plan: 022-confirm-modal-custom

- [ ] **Phase 1: Persiapan Lingkungan & Desain**
  - [ ] Task: Menentukan file target tempat komponen `ConfirmModal` akan dibuat (misalnya `src/components/ui/ConfirmModal.tsx`).
  - [ ] Task: Conductor - User Manual Verification 'Phase 1' (Protocol in workflow.md)

- [ ] **Phase 2: Pengembangan API / Backend**
  - [ ] Task: Tidak ada perubahan _backend_ atau _database_ yang diperlukan untuk _track_ ini.
  - [ ] Task: Conductor - User Manual Verification 'Phase 2' (Protocol in workflow.md)

- [ ] **Phase 3: Pengembangan UI / Frontend**
  - [ ] Task: Membuat komponen `ConfirmModal.tsx` yang dapat menerima _props_ `isOpen`, `onClose`, `onConfirm`, `title`, `description`, `variant` (`default` | `danger`), dan `isLoading`.
  - [ ] Task: Menerapkan _styling_ menggunakan Tailwind CSS dengan tema _dark mode_, efek _fade-in_, dan status _disabled_ saat indikator _loading_ aktif.
  - [ ] Task: Menerapkan `ConfirmModal` pada `TournamentTableClient.tsx` untuk fitur _"Generate Daily Scrim"_, menggantikan `window.confirm`.
  - [ ] Task: Menerapkan `ConfirmModal` pada `TeamTableClient.tsx` (opsional jika diperlukan untuk tolak/hapus tim) atau fitur hapus lainnya untuk menguji varian _danger_.
  - [ ] Task: Conductor - User Manual Verification 'Phase 3' (Protocol in workflow.md)

- [ ] **Phase 4: Automated Testing & Validasi**
  - [ ] Task: Menulis pengujian otomatis (`ConfirmModal.test.tsx`) menggunakan Vitest dan React Testing Library untuk memastikan komponen dirender dengan benar (judul, deskripsi) dan memanggil _callback_ (`onConfirm`, `onClose`) saat diklik.
  - [ ] Task: Menjalankan `npm run test` untuk memastikan semua pengujian berjalan sukses (`passed`).
  - [ ] Task: Conductor - Track Completion Verification (Protocol in workflow.md)
