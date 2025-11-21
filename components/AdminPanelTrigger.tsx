'use client';

import { useState, useEffect } from 'react';
import AdminPanel from './AdminPanel';

export default function AdminPanelTrigger() {
  const [isOpen, setIsOpen] = useState(false);
  const [keySequence, setKeySequence] = useState<string[]>([]);

  // Check if admin panel should be open on mount
  useEffect(() => {
    const panelState = localStorage.getItem('adminPanelOpen');
    if (panelState === 'true') {
      setIsOpen(true);
    }
  }, []);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      // Add key to sequence
      const newSequence = [...keySequence, e.key].slice(-7); // Keep last 7 keys
      setKeySequence(newSequence);

      // Check if secret code is entered: "fa22019"
      if (newSequence.join('').toLowerCase() === 'fa22019') {
        setIsOpen(true);
        localStorage.setItem('adminPanelOpen', 'true');
        setKeySequence([]); // Reset sequence
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [keySequence]);

  const handleClose = () => {
    setIsOpen(false);
    localStorage.removeItem('adminPanelOpen');
  };

  return <AdminPanel isOpen={isOpen} onClose={handleClose} />;
}
