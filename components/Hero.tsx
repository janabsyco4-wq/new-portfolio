'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function Hero() {
  const [typedText, setTypedText] = useState('');
  const phrases = [
    'Mechanical Engineer',
    'CAD Design Specialist',
    'FEA Simulation Expert',
    'Innovation Engineer',
  ];
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(
      () => {
        const currentPhrase = phrases[phraseIndex];

        if (isDeleting) {
          setTypedText(currentPhrase.substring(0, charIndex - 1));
          setCharIndex(charIndex - 1);

          if (charIndex === 0) {
            setIsDeleting(false);
            setPhraseIndex((phraseIndex + 1) % phrases.length);
          }
        } else {
          setTypedText(currentPhrase.substring(0, charIndex + 1));
          setCharIndex(charIndex + 1);

          if (charIndex === currentPhrase.length) {
            setTimeout(() => setIsDeleting(true), 2000);
          }
        }
      },
      isDeleting ? 50 : 100
    );

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, phraseIndex]);

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center relative overflow-hidden px-4 sm:px-6 md:px-12 py-20 md:py-0"
    >
      {/* Background */}
      <div className="absolute top-0 left-0 w-full h-full -z-10">
        <div
          className="absolute w-[300px] sm:w-[400px] md:w-[500px] h-[300px] sm:h-[400px] md:h-[500px] rounded-full blur-[60px] md:blur-[80px] opacity-20 md:opacity-30 top-[-100px] sm:top-[-150px] md:top-[-200px] left-[-100px] sm:left-[-150px] md:left-[-200px]"
          style={{
            background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
            animation: 'float 20s ease-in-out infinite',
          }}
        />
        <div
          className="absolute w-[250px] sm:w-[350px] md:w-[400px] h-[250px] sm:h-[350px] md:h-[400px] rounded-full blur-[60px] md:blur-[80px] opacity-20 md:opacity-30 bottom-[-75px] sm:bottom-[-100px] md:bottom-[-150px] right-[-75px] sm:right-[-100px] md:right-[-150px]"
          style={{
            background: 'linear-gradient(135deg, #8b5cf6, #ec4899)',
            animation: 'float 20s ease-in-out infinite 5s',
          }}
        />
      </div>

      <div
        className="max-w-7xl w-full grid grid-cols-1 md:grid-cols-2 gap-10 sm:gap-12 md:gap-16 lg:gap-20 items-center opacity-0"
        style={{ animation: 'fadeInUp 1s ease forwards 0.3s' }}
      >
        {/* Text Content */}
        <div className="text-center md:text-left order-2 md:order-1">
          <h1
            className="font-extrabold tracking-tight mb-4 md:mb-5 leading-tight"
            style={{ color: 'var(--text-primary)' }}
          >
            Nasrullah
          </h1>
          <div
            className="text-xl sm:text-2xl md:text-3xl mb-6 md:mb-8 min-h-[32px] sm:min-h-[40px]"
            style={{ color: 'var(--text-secondary)' }}
          >
            {typedText}
          </div>
          <p
            className="text-base sm:text-lg leading-relaxed mb-8 md:mb-10 max-w-[500px] mx-auto md:mx-0"
            style={{ color: 'var(--text-secondary)' }}
          >
            Transforming complex engineering challenges into elegant, innovative
            solutions through precision design, advanced analysis, and creative
            problem-solving.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-5 justify-center md:justify-start">
            <Link
              href="/projects"
              className="px-8 sm:px-10 py-3 sm:py-4 bg-[var(--accent)] text-white rounded-full font-semibold text-sm sm:text-base transition-all duration-300 hover:-translate-y-1 inline-block text-center"
              style={{ boxShadow: '0 4px 15px rgba(59, 130, 246, 0.3)' }}
            >
              View Work
            </Link>
            <Link
              href="/contact"
              className="px-8 sm:px-10 py-3 sm:py-4 bg-transparent rounded-full font-semibold text-sm sm:text-base border-2 transition-all duration-300 hover:-translate-y-1 inline-block text-center"
              style={{
                color: 'var(--text-primary)',
                borderColor: 'var(--border)',
              }}
            >
              Get In Touch
            </Link>
          </div>
        </div>

        {/* Profile Image */}
        <div className="relative order-1 md:order-2 lg:mt-[45px]">
          <div className="relative w-full max-w-[280px] sm:max-w-[350px] md:max-w-[450px] mx-auto">
            <div
              className="absolute top-[-15px] sm:top-[-20px] left-[-15px] sm:left-[-20px] right-[-15px] sm:right-[-20px] bottom-[-15px] sm:bottom-[-20px] border-2 rounded-full opacity-30"
              style={{
                borderColor: 'var(--accent)',
                animation: 'rotate 20s linear infinite',
              }}
            />
            <div className="relative w-full aspect-square rounded-full overflow-hidden border-4 transition-transform duration-300 hover:scale-105"
              style={{
                borderColor: 'var(--bg-secondary)',
                boxShadow: '0 20px 60px var(--shadow)',
              }}
            >
              <Image
                src="/WhatsApp Image 2025-11-19 at 23.02.52_d651eb37.jpg"
                alt="Nasrullah"
                fill
                className="object-cover"
                priority
                sizes="(max-width: 640px) 280px, (max-width: 768px) 350px, 450px"
                onError={(e) => {
                  e.currentTarget.src = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=450&h=450&fit=crop';
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
