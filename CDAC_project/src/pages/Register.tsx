import React, { useState } from 'react';
import AuthModal from '../components/AuthModal';

export default function Register() {
  const [isOpen, setIsOpen] = useState(true);
  const [mode, setMode] = useState<'login' | 'signup'>('signup');

  const handleClose = () => setIsOpen(false);
  const handleToggleMode = () => setMode(mode === 'login' ? 'signup' : 'login');

  return (
    <>
      {isOpen && (
        <AuthModal
          isOpen={isOpen}
          mode={mode}
          onClose={handleClose}
          onToggleMode={handleToggleMode}
        />
      )}
    </>
  );
}
