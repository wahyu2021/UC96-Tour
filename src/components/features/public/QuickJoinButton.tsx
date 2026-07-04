'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { ConfirmModal } from '@/components/ui/ConfirmModal';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

interface QuickJoinButtonProps {
  tournamentId: string;
  tournamentName: string;
  isLoggedIn: boolean;
}

export function QuickJoinButton({
  tournamentId,
  tournamentName,
  isLoggedIn,
}: QuickJoinButtonProps) {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [isJoining, setIsJoining] = useState(false);
  const router = useRouter();

  const handleJoinClick = () => {
    if (!isLoggedIn) {
      setShowLoginModal(true);
    } else {
      setShowConfirmModal(true);
    }
  };

  const executeJoin = async () => {
    setIsJoining(true);
    try {
      const res = await fetch('/api/player/tournaments/join', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tournamentId }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error || 'Gagal mendaftar turnamen');
      } else {
        toast.success(data.message);
        setShowConfirmModal(false);
        router.refresh(); // Refresh page to update stats
      }
    } catch {
      toast.error('Terjadi kesalahan jaringan.');
    } finally {
      setIsJoining(false);
    }
  };

  return (
    <>
      <Button onClick={handleJoinClick} className="w-full">
        Daftarkan Tim Anda
      </Button>

      {/* Modal Belum Login */}
      <ConfirmModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        title="Login Diperlukan"
        description="Untuk mendaftar ke turnamen ini, Anda harus memiliki akun Kapten dan membuat profil tim terlebih dahulu."
        confirmText="Login / Daftar"
        cancelText="Batal"
        onConfirm={() => router.push('/login')}
      />

      {/* Modal Konfirmasi Join */}
      <ConfirmModal
        isOpen={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        title="Konfirmasi Pendaftaran"
        description={`Apakah Anda yakin ingin mendaftarkan tim Anda ke turnamen "${tournamentName}"? Pastikan profil tim Anda sudah lengkap (Logo dan minimal 4 pemain).`}
        confirmText={isJoining ? 'Mendaftarkan...' : 'Ya, Daftarkan Tim'}
        cancelText="Batal"
        onConfirm={executeJoin}
      />
    </>
  );
}
