'use client';

import { FormEvent, useState } from 'react';
import FooterWithContact from '@/components/FooterWithContact';

export default function ContactPage() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    
    const form = e.currentTarget;
    
    try {
      const formData = new FormData(form);
      const data = {
        name: formData.get('name') as string,
        email: formData.get('email') as string,
        message: formData.get('message') as string,
      };

      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (result.success) {
        alert("Thank you for your message! I'll get back to you soon.");
        form.reset();
      } else {
        alert('Failed to send message. Please try again.');
      }
    } catch (error) {
      console.error('Error saving message:', error);
      alert('There was an error saving your message. Please try again.');
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

  const contactInfo = [
    { icon: '📍', label: 'Location', value: 'Sahiwal, Pakistan' },
    { icon: '📧', label: 'Email', value: 'coderbuddywork@gmail.com' },
    { icon: '📱', label: 'Phone', value: '+92 310 4594964' },
    { icon: '🎓', label: 'University', value: 'COMSATS Islamabad' },
  ];

  return (
    <>
    <main className="min-h-screen overflow-x-hidden">
      {/* Hero */}
      <section className="min-h-[24vh] sm:min-h-[50vh] md:min-h-[60vh] flex items-center justify-center text-center px-4 sm:px-6 md:px-12 pt-20 sm:pt-32 md:pt-40 pb-10 sm:pb-20 md:pb-24 relative overflow-hidden">
        {/* Background with animated orbs */}
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
        
        <div className="max-w-full">
          <h1 className="font-extrabold mb-4 md:mb-5 tracking-tight text-2xl sm:text-3xl md:text-4xl lg:text-5xl" style={{ color: 'var(--text-primary)' }}>
            Let's Connect
          </h1>
          <p className="text-base sm:text-lg md:text-xl max-w-3xl mx-auto px-2" style={{ color: 'var(--text-secondary)' }}>
            Ready to collaborate on your next engineering challenge? Let's create something extraordinary together.
          </p>
        </div>
      </section>

      {/* Why Work With Me Section */}
      <section className="py-12 sm:py-16 md:py-24 px-4 sm:px-6 md:px-12 max-w-7xl mx-auto">
        <div className="max-w-4xl mx-auto mb-12 sm:mb-16 md:mb-20">
          <div className="p-5 sm:p-7 md:p-10 rounded-2xl sm:rounded-3xl" style={{ background: 'var(--bg-secondary)' }}>
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-5 sm:mb-6 md:mb-8 text-center">Why Work With Me?</h3>
            <ul className="space-y-3 sm:space-y-4 md:space-y-5">
              {[
                'Expert in CAD design and FEA simulation',
                'Proven track record of successful projects',
                'Strong attention to detail and precision',
                'Excellent communication and collaboration',
                'Committed to delivering quality results',
              ].map((item, index) => (
                <li key={index} className="flex items-start gap-3 sm:gap-4">
                  <span className="text-xl sm:text-2xl md:text-3xl flex-shrink-0" style={{ color: 'var(--accent)' }}>✓</span>
                  <span className="text-sm sm:text-base md:text-lg" style={{ color: 'var(--text-secondary)' }}>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Contact Form */}
        <div className="grid md:grid-cols-2 gap-8 sm:gap-12 md:gap-16 items-start">
          <div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-5 md:mb-6">Send a Message</h2>
            <p className="text-sm sm:text-base md:text-lg mb-6 sm:mb-7 md:mb-8" style={{ color: 'var(--text-secondary)' }}>
              Have a project in mind or just want to say hello? Fill out the form and I'll get back to you as soon as possible.
            </p>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4 sm:gap-5 md:gap-6">
              <div className="grid grid-cols-2 gap-4 sm:gap-5 md:gap-6">
                <div className="flex flex-col">
                  <label
                    htmlFor="name"
                    className="text-xs sm:text-sm font-semibold mb-1.5 sm:mb-2"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className="p-3 sm:p-4 md:p-5 rounded-lg sm:rounded-xl text-sm sm:text-base transition-all duration-300 focus:outline-none"
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
                    className="text-xs sm:text-sm font-semibold mb-1.5 sm:mb-2"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="p-3 sm:p-4 md:p-5 rounded-lg sm:rounded-xl text-sm sm:text-base transition-all duration-300 focus:outline-none"
                    style={{
                      background: 'var(--bg-secondary)',
                      border: '2px solid var(--border)',
                      color: 'var(--text-primary)',
                    }}
                  />
                </div>
              </div>

              <div className="flex flex-col">
                <label
                  htmlFor="subject"
                  className="text-xs sm:text-sm font-semibold mb-1.5 sm:mb-2"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  required
                  className="p-3 sm:p-4 md:p-5 rounded-lg sm:rounded-xl text-sm sm:text-base transition-all duration-300 focus:outline-none"
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
                  className="text-xs sm:text-sm font-semibold mb-1.5 sm:mb-2"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={6}
                  className="p-3 sm:p-4 md:p-5 rounded-lg sm:rounded-xl text-sm sm:text-base resize-vertical transition-all duration-300 focus:outline-none"
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
                className="p-3 sm:p-4 md:p-5 bg-[var(--accent)] text-white rounded-lg sm:rounded-xl text-sm sm:text-base font-semibold cursor-pointer transition-all duration-300 hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ boxShadow: '0 10px 30px rgba(59, 130, 246, 0.4)' }}
              >
                {loading ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>

          {/* Right Side - Social Media */}
          <div>
            <div className="p-5 sm:p-7 md:p-10 rounded-2xl sm:rounded-3xl" style={{ background: 'var(--bg-secondary)' }}>
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-4 sm:mb-5 md:mb-6">Connect on Social Media</h3>
              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                {socialLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    className="p-4 sm:p-5 md:p-6 rounded-xl sm:rounded-2xl text-center transition-all duration-300 hover:-translate-y-2"
                    style={{ background: 'var(--bg-primary)', border: '1px solid var(--border)' }}
                  >
                    <div className="text-2xl sm:text-3xl md:text-4xl mb-1 sm:mb-2">{link.icon}</div>
                    <div className="font-semibold text-[10px] sm:text-xs md:text-sm">{link.label}</div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

      </section>

    </main>
    
    <FooterWithContact />
    </>
  );
}
