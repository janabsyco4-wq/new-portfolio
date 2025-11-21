'use client';

import { useState, useEffect } from 'react';

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.pageYOffset > 500);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-6 right-6 sm:bottom-8 sm:right-8 md:bottom-10 md:right-10 w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-[var(--accent)] rounded-full flex items-center justify-center text-white text-xl sm:text-2xl cursor-pointer transition-all duration-300 z-[999] ${
        isVisible ? 'flex' : 'hidden'
      } hover:-translate-y-2 active:scale-95`}
      style={{ boxShadow: '0 5px 20px rgba(59, 130, 246, 0.4)' }}
      aria-label="Scroll to top"
    >
      ↑
    </button>
  );
}
