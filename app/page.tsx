'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Hero from "@/components/Hero";
import FooterWithContact from "@/components/FooterWithContact";
import Link from "next/link";

interface Project {
  _id: string;
  title: string;
  image: string;
  images?: string[];
  description: string;
  tags: string[];
  tools: string[];
  outcomes: string[];
  pdfUrl?: string;
  featured?: boolean;
}

export default function Home() {
  const router = useRouter();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loadingProjects, setLoadingProjects] = useState(true);

  // Fetch projects from database
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch('/api/projects');
        const data = await res.json();
        if (data.success) {
          // Get only featured projects (max 3)
          const featuredProjects = data.data.filter((p: Project) => p.featured === true);
          setProjects(featuredProjects.slice(0, 3));
        }
      } catch (error) {
        console.error('Error fetching projects:', error);
      } finally {
        setLoadingProjects(false);
      }
    };

    fetchProjects();
    
    // Auto-refresh projects every 30 seconds
    const interval = setInterval(() => {
      fetchProjects();
    }, 30000);
    
    return () => clearInterval(interval);
  }, []);



  return (
    <main className="min-h-screen">
      <Hero />
      
      {/* Skills Preview */}
      <section className="py-16 sm:py-20 md:py-24 px-4 sm:px-6 md:px-12 max-w-7xl mx-auto">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="font-extrabold mb-4 md:mb-5" style={{ color: 'var(--text-primary)' }}>
            Technical Expertise
          </h2>
          <p className="text-base sm:text-lg max-w-2xl mx-auto" style={{ color: 'var(--text-secondary)' }}>
            Specialized in cutting-edge engineering tools and technologies
          </p>
        </div>
        
        <div className="grid grid-cols-3 gap-3 sm:gap-6 md:gap-8 mb-10 md:mb-12">
          {[
            { icon: '🔧', name: 'SolidWorks', level: '90%' },
            { icon: '📊', name: 'ANSYS', level: '80%' },
            { icon: '🖨️', name: '3D Printing', level: '85%' },
          ].map((skill) => (
            <div
              key={skill.name}
              className="p-3 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl transition-all duration-300 hover:-translate-y-2 active:scale-95"
              style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)' }}
            >
              <div className="text-2xl sm:text-4xl md:text-5xl mb-2 sm:mb-3 md:mb-4">{skill.icon}</div>
              <h3 className="text-xs sm:text-lg md:text-xl font-bold mb-2 sm:mb-3">{skill.name}</h3>
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="flex-1 h-1.5 sm:h-2 rounded-full" style={{ background: 'var(--border)' }}>
                  <div
                    className="h-full rounded-full transition-all duration-1000"
                    style={{ width: skill.level, background: 'linear-gradient(90deg, var(--accent), #8b5cf6)' }}
                  />
                </div>
                <span className="text-[10px] sm:text-xs md:text-sm font-semibold whitespace-nowrap" style={{ color: 'var(--accent)' }}>{skill.level}</span>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center">
          <Link
            href="/skills"
            className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-[var(--accent)] text-white rounded-full font-semibold text-sm sm:text-base transition-all duration-300 hover:-translate-y-1 active:scale-95"
            style={{ boxShadow: '0 4px 15px rgba(59, 130, 246, 0.3)' }}
          >
            Explore All Skills →
          </Link>
        </div>
      </section>

      {/* Projects Preview */}
      <section className="py-16 sm:py-20 md:py-24 px-4 sm:px-6 md:px-12" style={{ background: 'var(--bg-secondary)' }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="font-extrabold mb-4 md:mb-5" style={{ color: 'var(--text-primary)' }}>
              Featured Projects
            </h2>
            <p className="text-base sm:text-lg max-w-2xl mx-auto" style={{ color: 'var(--text-secondary)' }}>
              Engineering excellence in action
            </p>
          </div>
          
          {loadingProjects ? (
            <div className="flex flex-col items-center gap-6 py-12">
              <div className="relative w-16 h-16">
                <div 
                  className="absolute inset-0 rounded-full border-4 border-t-transparent animate-spin"
                  style={{ 
                    borderColor: 'var(--accent)',
                    borderTopColor: 'transparent'
                  }}
                />
              </div>
              <p className="text-lg font-semibold animate-pulse" style={{ color: 'var(--text-primary)' }}>
                Loading projects...
              </p>
            </div>
          ) : projects.length === 0 ? (
            <div className="text-center py-12" style={{ color: 'var(--text-secondary)' }}>
              <p className="text-lg">No featured projects available.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 mb-10 md:mb-12">
              {projects.map((project, index) => (
                <div
                  key={project._id}
                  onClick={() => router.push(`/projects/${project._id}`)}
                  className={`rounded-xl sm:rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-2 active:scale-95 ${
                    index === 2 ? 'hidden lg:block' : ''
                  }`}
                  style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)' }}
                >
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <img 
                      src={project.image} 
                      alt={project.title} 
                      className="w-full h-full object-cover transition-transform duration-400 hover:scale-110"
                      loading="lazy"
                      onError={(e) => {
                        e.currentTarget.src = 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800&h=600&fit=crop';
                      }}
                    />
                  </div>
                  <div className="p-4 sm:p-5 md:p-6">
                    <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-2 sm:mb-3" style={{ color: 'var(--text-primary)' }}>
                      {project.title}
                    </h3>
                    <p className="text-sm sm:text-base mb-3 sm:mb-4 leading-relaxed line-clamp-2" style={{ color: 'var(--text-secondary)' }}>
                      {project.description}
                    </p>
                    <div className="flex gap-2 flex-wrap">
                      {project.tags.slice(0, 3).map((tag, index) => (
                        <span 
                          key={`${tag}-${index}`} 
                          className="px-3 py-1 rounded-full text-xs sm:text-sm font-semibold"
                          style={{ background: 'rgba(59, 130, 246, 0.1)', color: 'var(--accent)', border: '1px solid rgba(59, 130, 246, 0.2)' }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          <div className="text-center">
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-[var(--accent)] text-white rounded-full font-semibold text-sm sm:text-base transition-all duration-300 hover:-translate-y-1 active:scale-95"
              style={{ boxShadow: '0 4px 15px rgba(59, 130, 246, 0.3)' }}
            >
              View All Projects →
            </Link>
          </div>
        </div>
      </section>

      {/* Experience Preview */}
      <section className="py-16 sm:py-20 md:py-24 px-4 sm:px-6 md:px-12 max-w-7xl mx-auto">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="font-extrabold mb-4 md:mb-5" style={{ color: 'var(--text-primary)' }}>
            Professional Journey
          </h2>
          <p className="text-base sm:text-lg max-w-2xl mx-auto" style={{ color: 'var(--text-secondary)' }}>
            Building expertise through education and hands-on experience
          </p>
        </div>
        
        <div className="grid grid-cols-2 gap-3 sm:gap-6 md:gap-8 mb-10 md:mb-12">
          <div className="p-3 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl transition-all duration-300 hover:-translate-y-2" style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)' }}>
            <div className="text-[10px] sm:text-xs md:text-sm font-semibold mb-1 sm:mb-2" style={{ color: 'var(--accent)' }}>2024 - Present</div>
            <h3 className="text-sm sm:text-xl md:text-2xl font-bold mb-1 sm:mb-2">Mechanical Engineering Student</h3>
            <p className="text-xs sm:text-sm md:text-base" style={{ color: 'var(--text-secondary)' }}>COMSATS University Islamabad, Sahiwal Campus</p>
          </div>
          <div className="p-3 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl transition-all duration-300 hover:-translate-y-2" style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)' }}>
            <div className="text-[10px] sm:text-xs md:text-sm font-semibold mb-1 sm:mb-2" style={{ color: 'var(--accent)' }}>2023 - 2024</div>
            <h3 className="text-sm sm:text-xl md:text-2xl font-bold mb-1 sm:mb-2">Freelance CAD Designer</h3>
            <p className="text-xs sm:text-sm md:text-base" style={{ color: 'var(--text-secondary)' }}>15+ successful projects completed</p>
          </div>
        </div>
        
        <div className="text-center">
          <Link
            href="/experience"
            className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-[var(--accent)] text-white rounded-full font-semibold text-sm sm:text-base transition-all duration-300 hover:-translate-y-1 active:scale-95"
            style={{ boxShadow: '0 4px 15px rgba(59, 130, 246, 0.3)' }}
          >
            View Full Experience →
          </Link>
        </div>
      </section>

      {/* Blog Preview */}
      <section className="py-16 sm:py-20 md:py-24 px-4 sm:px-6 md:px-12" style={{ background: 'var(--bg-secondary)' }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="font-extrabold mb-4 md:mb-5" style={{ color: 'var(--text-primary)' }}>
              Latest Insights
            </h2>
            <p className="text-base sm:text-lg max-w-2xl mx-auto" style={{ color: 'var(--text-secondary)' }}>
              Thoughts on engineering, design, and innovation
            </p>
          </div>
          
          <div className="grid grid-cols-3 gap-3 sm:gap-6 md:gap-8 mb-10 md:mb-12">
            {[
              { icon: '🔧', title: 'Mastering SolidWorks', category: 'CAD Design' },
              { icon: '📊', title: 'FEA Analysis Best Practices', category: 'Simulation' },
              { icon: '🖨️', title: 'Design for 3D Printing', category: '3D Printing' },
            ].map((post) => (
              <div
                key={post.title}
                className="p-3 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl transition-all duration-300 hover:-translate-y-2 active:scale-95 cursor-pointer"
                style={{ background: 'var(--bg-primary)', border: '1px solid var(--border)' }}
              >
                <div className="text-2xl sm:text-4xl md:text-5xl mb-2 sm:mb-3 md:mb-4">{post.icon}</div>
                <div className="text-[10px] sm:text-xs md:text-sm font-semibold mb-1 sm:mb-2" style={{ color: 'var(--accent)' }}>{post.category}</div>
                <h3 className="text-xs sm:text-lg md:text-xl font-bold">{post.title}</h3>
              </div>
            ))}
          </div>
          
          <div className="text-center">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-[var(--accent)] text-white rounded-full font-semibold text-sm sm:text-base transition-all duration-300 hover:-translate-y-1 active:scale-95"
              style={{ boxShadow: '0 4px 15px rgba(59, 130, 246, 0.3)' }}
            >
              Read More Articles →
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-20 md:py-24 px-4 sm:px-6 md:px-12 max-w-7xl mx-auto text-center">
        <h2 className="font-extrabold mb-4 sm:mb-6" style={{ color: 'var(--text-primary)' }}>
          Let's Work Together
        </h2>
        <p className="text-base sm:text-lg md:text-xl mb-8 sm:mb-10 max-w-2xl mx-auto" style={{ color: 'var(--text-secondary)' }}>
          Have a project in mind? Let's create something extraordinary together.
        </p>
        <Link
          href="/contact"
          className="inline-flex items-center gap-2 px-8 sm:px-10 py-4 sm:py-5 bg-[var(--accent)] text-white rounded-full font-semibold text-base sm:text-lg transition-all duration-300 hover:-translate-y-1 active:scale-95"
          style={{ boxShadow: '0 8px 25px rgba(59, 130, 246, 0.4)' }}
        >
          Get In Touch →
        </Link>
      </section>

      <FooterWithContact />
    </main>
  );
}
