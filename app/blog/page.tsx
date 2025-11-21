'use client';

import { FormEvent } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import FooterWithContact from '@/components/FooterWithContact';

export default function BlogPage() {

  const handleSubscribe = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert("Thank you for subscribing! You'll receive updates soon.");
    e.currentTarget.reset();
  };

  const blogPosts = [
    {
      image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800&q=80',
      category: 'CAD Design',
      title: 'Mastering SolidWorks: Advanced Techniques',
      excerpt: 'Essential tips and tricks for improving your SolidWorks workflow and creating more efficient designs.',
      readTime: '5 min read',
    },
    {
      image: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800&q=80',
      category: 'Simulation',
      title: 'FEA Analysis: Best Practices',
      excerpt: 'A comprehensive guide to finite element analysis and how to get accurate results from your simulations.',
      readTime: '8 min read',
    },
    {
      image: 'https://images.unsplash.com/photo-1614624532983-4ce03382d63d?w=800&q=80',
      category: '3D Printing',
      title: 'Design for Additive Manufacturing',
      excerpt: 'Key considerations when designing parts for 3D printing and how to optimize for different printing technologies.',
      readTime: '6 min read',
    },
    {
      image: 'https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?w=800&q=80',
      category: 'Manufacturing',
      title: 'GD&T Fundamentals Explained',
      excerpt: 'Understanding geometric dimensioning and tolerancing for precise manufacturing specifications.',
      readTime: '7 min read',
    },
    {
      image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&q=80',
      category: 'Thermal Analysis',
      title: 'CFD Simulation Workflow',
      excerpt: 'Step-by-step guide to setting up and running computational fluid dynamics simulations effectively.',
      readTime: '9 min read',
    },
    {
      image: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=800&q=80',
      category: 'Innovation',
      title: 'Sustainable Engineering Design',
      excerpt: 'How to incorporate sustainability principles into your engineering design process for a better future.',
      readTime: '4 min read',
    },
  ];

  return (
    <>
    <main className="min-h-screen">
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
        
        <div>
          <h1 className="font-extrabold mb-4 md:mb-5 tracking-tight" style={{ color: 'var(--text-primary)' }}>
            Blog & Insights
          </h1>
          <p className="text-base sm:text-lg md:text-xl max-w-3xl mx-auto" style={{ color: 'var(--text-secondary)' }}>
            Thoughts on engineering, design, and innovation
          </p>
        </div>
      </section>

      {/* Featured Post */}
      <section className="py-16 sm:py-20 md:py-24 px-4 sm:px-6 md:px-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 md:gap-10 rounded-2xl sm:rounded-3xl overflow-hidden mb-12 sm:mb-16" style={{ background: 'var(--bg-secondary)' }}>
          <div className="relative min-h-[200px] sm:min-h-[250px] md:min-h-[300px]">
            <Image
              src="https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&q=80"
              alt="The Future of Mechanical Engineering"
              fill
              className="object-cover"
            />
          </div>
          <div className="p-6 sm:p-10 md:p-12 flex flex-col justify-center">
            <span
              className="inline-block px-4 sm:px-5 py-1.5 sm:py-2 rounded-full text-xs font-semibold mb-4 sm:mb-5 w-fit"
              style={{ background: 'var(--accent)', color: 'white' }}
            >
              FEATURED
            </span>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold mb-3 sm:mb-4 md:mb-5">
              The Future of Mechanical Engineering
            </h2>
            <p className="text-sm sm:text-base leading-relaxed mb-4 sm:mb-5" style={{ color: 'var(--text-secondary)' }}>
              Exploring how AI, automation, and advanced materials are reshaping the landscape
              of mechanical engineering and what it means for the next generation of engineers.
            </p>
            <div className="flex gap-2 sm:gap-3 text-xs sm:text-sm mb-4 sm:mb-5" style={{ color: 'var(--text-secondary)' }}>
              <span style={{ color: 'var(--accent)', fontWeight: 600 }}>Engineering</span>
              <span>•</span>
              <span>10 min read</span>
              <span>•</span>
              <span>Jan 15, 2025</span>
            </div>
            <a href="#" className="font-semibold inline-flex items-center gap-2 transition-all text-sm sm:text-base" style={{ color: 'var(--accent)' }}>
              Read Article →
            </a>
          </div>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 lg:gap-10">
          {blogPosts.map((post, index) => (
            <div
              key={index}
              className="rounded-xl sm:rounded-2xl md:rounded-3xl overflow-hidden transition-all duration-300 hover:-translate-y-3 cursor-pointer"
              style={{
                background: 'var(--bg-secondary)',
                border: '1px solid var(--border)',
                boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
              }}
            >
              <div className="relative h-32 sm:h-48 md:h-64">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-4 sm:p-6 md:p-8">
                <div className="flex gap-2 sm:gap-3 md:gap-5 mb-2 sm:mb-3 md:mb-4 text-xs sm:text-sm" style={{ color: 'var(--text-secondary)' }}>
                  <span style={{ color: 'var(--accent)', fontWeight: 600 }}>{post.category}</span>
                  <span>•</span>
                  <span>{post.readTime}</span>
                </div>
                <h3 className="text-sm sm:text-lg md:text-2xl font-bold mb-2 sm:mb-3 md:mb-4 leading-tight">{post.title}</h3>
                <p className="text-xs sm:text-sm md:text-base leading-relaxed mb-3 sm:mb-4 md:mb-5 line-clamp-2" style={{ color: 'var(--text-secondary)' }}>
                  {post.excerpt}
                </p>
                <a
                  href="#"
                  className="font-semibold inline-flex items-center gap-2 transition-all hover:gap-3 text-xs sm:text-sm md:text-base"
                  style={{ color: 'var(--accent)' }}
                >
                  Read More →
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-24 px-12" style={{ background: 'var(--bg-secondary)' }}>
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-5">Stay Updated</h2>
          <p className="text-lg mb-10" style={{ color: 'var(--text-secondary)' }}>
            Subscribe to get the latest insights on engineering, design, and technology delivered to your inbox.
          </p>
          <form onSubmit={handleSubscribe} className="flex gap-4 max-w-lg mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              required
              className="flex-1 px-5 py-4 rounded-xl text-base"
              style={{
                border: '2px solid var(--border)',
                background: 'var(--bg-primary)',
                color: 'var(--text-primary)',
              }}
            />
            <button
              type="submit"
              className="px-10 py-4 bg-[var(--accent)] text-white rounded-xl font-semibold transition-all duration-300 hover:-translate-y-1"
              style={{ boxShadow: '0 10px 30px rgba(59, 130, 246, 0.4)' }}
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>

    </main>
    
    <FooterWithContact />
    </>
  );
}
