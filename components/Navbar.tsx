'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [theme, setTheme] = useState('light');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
    document.body.setAttribute('data-theme', savedTheme);

    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [mobileMenuOpen]);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    document.body.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/skills', label: 'Skills' },
    { href: '/projects', label: 'Projects' },
    { href: '/experience', label: 'Experience' },
    { href: '/blog', label: 'Blog' },
    { href: '/contact', label: 'Contact' },
  ];

  const getNavBackground = () => {
    if (!scrolled) return 'transparent';
    return theme === 'dark' 
      ? 'rgba(10, 10, 10, 0.95)' 
      : 'rgba(255, 255, 255, 0.95)';
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 ${
          scrolled ? 'backdrop-blur-md shadow-lg' : ''
        }`}
        style={{
          background: getNavBackground(),
        }}
      >
        <div className="flex justify-between items-center px-4 sm:px-6 md:px-12 py-4 md:py-6 max-w-[1600px] mx-auto">
          <Link href="/" className="text-xl md:text-2xl font-bold tracking-tight flex-shrink-0" style={{ color: 'var(--text-primary)' }}>
            N
          </Link>

        {/* Desktop Navigation */}
        <ul className="hidden lg:flex gap-6 xl:gap-10 list-none">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`relative text-sm xl:text-[15px] font-medium transition-colors duration-300 hover:text-[var(--text-primary)] after:content-[''] after:absolute after:bottom-[-5px] after:left-0 after:h-[2px] after:bg-[var(--accent)] after:transition-all after:duration-300 hover:after:w-full ${
                  pathname === link.href
                    ? 'text-[var(--text-primary)] after:w-full'
                    : 'text-[var(--text-secondary)] after:w-0'
                }`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

          <div className="flex items-center gap-3 md:gap-4 flex-shrink-0">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="w-10 h-10 md:w-11 md:h-11 rounded-full flex items-center justify-center text-lg transition-all duration-300 hover:scale-110"
              style={{
                background: 'var(--bg-secondary)',
                border: '1px solid var(--border)',
              }}
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? '☀️' : '🌙'}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMobileMenu}
              className="lg:hidden w-10 h-10 md:w-11 md:h-11 flex flex-col items-center justify-center gap-1.5 rounded-lg transition-all duration-300"
              style={{
                background: 'var(--bg-secondary)',
                border: '1px solid var(--border)',
              }}
              aria-label="Toggle menu"
            >
              <span
                className={`w-5 h-0.5 transition-all duration-300 ${
                  mobileMenuOpen ? 'rotate-45 translate-y-2' : ''
                }`}
                style={{ background: 'var(--text-primary)' }}
              />
              <span
                className={`w-5 h-0.5 transition-all duration-300 ${
                  mobileMenuOpen ? 'opacity-0' : ''
                }`}
                style={{ background: 'var(--text-primary)' }}
              />
              <span
                className={`w-5 h-0.5 transition-all duration-300 ${
                  mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''
                }`}
                style={{ background: 'var(--text-primary)' }}
              />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 lg:hidden transition-all duration-300 ${
          mobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
        style={{ background: 'rgba(0, 0, 0, 0.5)' }}
        onClick={closeMobileMenu}
      />

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 right-0 bottom-0 z-40 w-[280px] sm:w-[320px] lg:hidden transition-transform duration-300 ${
          mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{
          background: 'var(--bg-primary)',
          boxShadow: '-4px 0 20px var(--shadow)',
        }}
      >
        <div className="flex flex-col h-full pt-24 px-6">
          <ul className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={closeMobileMenu}
                  className={`block px-6 py-4 rounded-xl text-base font-medium transition-all duration-300 ${
                    pathname === link.href
                      ? 'text-white'
                      : 'text-[var(--text-primary)]'
                  }`}
                  style={{
                    background: pathname === link.href ? 'var(--accent)' : 'var(--bg-secondary)',
                  }}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
