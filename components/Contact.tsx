'use client';

import { useState, useEffect, FormEvent } from 'react';

export default function Contact() {
  const [isVisible, setIsVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -100px 0px' }
    );

    const section = document.getElementById('contact');
    if (section) observer.observe(section);

    return () => observer.disconnect();
  }, []);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      message: formData.get('message'),
    };

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (result.success) {
        alert("Thank you for your message! I'll get back to you soon.");
        e.currentTarget.reset();
      } else {
        alert('Failed to send message. Please try again.');
      }
    } catch (error) {
      alert('Error sending message. Please try again.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const socialLinks = [
    { icon: '💼', label: 'LinkedIn', href: '#' },
    { icon: '🐙', label: 'GitHub', href: '#' },
    { icon: '📧', label: 'Email', href: 'mailto:coderbuddywork@gmail.com' },
    { icon: '🎨', label: 'Behance', href: '#' },
  ];

  return (
    <section
      id="contact"
      className={`py-32 px-12 max-w-7xl mx-auto fade-in ${isVisible ? 'visible' : ''}`}
    >
      <div className="text-center mb-20">
        <h2
          className="text-5xl md:text-6xl font-extrabold tracking-tight mb-5"
          style={{ color: 'var(--text-primary)' }}
        >
          Let's Connect
        </h2>
        <p
          className="text-lg max-w-2xl mx-auto"
          style={{ color: 'var(--text-secondary)' }}
        >
          Ready to collaborate on your next engineering challenge?
        </p>
      </div>

      <div className="max-w-3xl mx-auto">
        <p
          className="text-center text-xl mb-12"
          style={{ color: 'var(--text-secondary)' }}
        >
          Have a project in mind? Let's create something extraordinary together.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="flex flex-col">
            <label
              htmlFor="name"
              className="text-sm font-semibold mb-2"
              style={{ color: 'var(--text-secondary)' }}
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              className="p-5 rounded-xl text-base transition-all duration-300 focus:outline-none"
              style={{
                background: 'var(--bg-secondary)',
                border: '2px solid var(--border)',
                color: 'var(--text-primary)',
              }}
            />
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="email"
              className="text-sm font-semibold mb-2"
              style={{ color: 'var(--text-secondary)' }}
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className="p-5 rounded-xl text-base transition-all duration-300 focus:outline-none"
              style={{
                background: 'var(--bg-secondary)',
                border: '2px solid var(--border)',
                color: 'var(--text-primary)',
              }}
            />
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="message"
              className="text-sm font-semibold mb-2"
              style={{ color: 'var(--text-secondary)' }}
            >
              Message
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows={6}
              className="p-5 rounded-xl text-base resize-vertical transition-all duration-300 focus:outline-none"
              style={{
                background: 'var(--bg-secondary)',
                border: '2px solid var(--border)',
                color: 'var(--text-primary)',
              }}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="p-5 bg-[var(--accent)] text-white rounded-xl text-base font-semibold cursor-pointer transition-all duration-300 hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ boxShadow: '0 10px 30px rgba(59, 130, 246, 0.4)' }}
          >
            {loading ? 'Sending...' : 'Send Message'}
          </button>
        </form>

        <div className="flex justify-center gap-5 mt-12">
          {socialLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              title={link.label}
              aria-label={link.label}
              className="w-16 h-16 rounded-full flex items-center justify-center text-2xl transition-all duration-300 hover:-translate-y-2"
              style={{
                background: 'var(--bg-secondary)',
                color: 'var(--text-primary)',
              }}
            >
              {link.icon}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
