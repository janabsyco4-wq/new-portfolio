export default function FooterWithContact() {
  return (
    <footer
      className="py-10 sm:py-12 md:py-16 px-4 sm:px-6 md:px-12"
      style={{ borderTop: '1px solid var(--border)' }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Contact Info Text */}
        <div className="text-center mb-8 sm:mb-10 md:mb-12">
          <div className="flex flex-wrap justify-center items-center gap-3 sm:gap-4 md:gap-6 text-xs sm:text-sm md:text-base" style={{ color: 'var(--text-secondary)' }}>
            <span className="flex items-center gap-2">
              <span>📍</span>
              <span>Sahiwal, Pakistan</span>
            </span>
            <span className="hidden sm:inline">•</span>
            <a href="mailto:coderbuddywork@gmail.com" className="flex items-center gap-2 hover:text-[var(--accent)] transition-colors">
              <span>📧</span>
              <span>coderbuddywork@gmail.com</span>
            </a>
            <span className="hidden sm:inline">•</span>
            <a href="tel:+923104594964" className="flex items-center gap-2 hover:text-[var(--accent)] transition-colors">
              <span>📱</span>
              <span>+92 310 4594964</span>
            </a>
            <span className="hidden sm:inline">•</span>
            <span className="flex items-center gap-2">
              <span>🎓</span>
              <span>COMSATS Islamabad</span>
            </span>
          </div>
        </div>

        {/* Copyright */}
        <p className="text-xs sm:text-sm text-center" style={{ color: 'var(--text-secondary)' }}>
          © 2025 Nasrullah. Engineered with precision and passion.
        </p>
      </div>
    </footer>
  );
}
