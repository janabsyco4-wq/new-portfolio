'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import FooterWithContact from '@/components/FooterWithContact';

interface Project {
  _id?: string;
  title: string;
  image: string;
  images?: string[]; // Multiple images for gallery
  tags: string[];
  description: string;
  tools: string[];
  outcomes: string[];
  pdfUrl?: string;
}

export default function ProjectsPage() {
  const router = useRouter();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch projects from API
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch('/api/projects');
        const data = await res.json();
        if (data.success) {
          setProjects(data.data);
        }
      } catch (error) {
        console.error('Error fetching projects:', error);
      } finally {
        setLoading(false);
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
              Engineering Projects
            </h1>
            <p className="text-base sm:text-lg md:text-xl max-w-3xl mx-auto" style={{ color: 'var(--text-secondary)' }}>
              A comprehensive showcase of innovative engineering solutions and technical excellence
            </p>
          </div>
        </section>

        {/* Projects Grid */}
        <section className="py-16 sm:py-20 md:py-24 px-4 sm:px-6 md:px-12 max-w-7xl mx-auto">
          {loading ? (
            <div className="flex flex-col items-center gap-6 py-20">
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
              <p className="text-lg">No projects available yet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 lg:gap-10">
              {projects.map((project) => (
                <div
                  key={project._id}
                  onClick={() => router.push(`/projects/${project._id}`)}
                  className="rounded-2xl sm:rounded-3xl overflow-hidden cursor-pointer transition-all duration-400 hover:-translate-y-3"
                  style={{
                    background: 'var(--bg-secondary)',
                    border: '1px solid var(--border)',
                    boxShadow: '0 25px 50px var(--shadow)',
                  }}
                >
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-400 hover:scale-110"
                      onError={(e) => {
                        e.currentTarget.src = 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800&h=600&fit=crop';
                      }}
                    />
                  </div>
                  <div className="p-5 sm:p-6 md:p-8">
                    <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4" style={{ color: 'var(--text-primary)' }}>
                      {project.title}
                    </h3>
                    <p className="text-sm sm:text-base mb-4 sm:mb-5 leading-relaxed line-clamp-2" style={{ color: 'var(--text-secondary)' }}>
                      {project.description}
                    </p>
                    <div className="flex gap-2 flex-wrap mb-4">
                      {project.tags.map((tag, index) => (
                        <span
                          key={`${tag}-${index}`}
                          className="px-3 py-1 rounded-full text-xs sm:text-sm font-semibold"
                          style={{
                            background: 'rgba(59, 130, 246, 0.1)',
                            color: 'var(--accent)',
                            border: '1px solid rgba(59, 130, 246, 0.2)',
                          }}
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
        </section>

      </main>

      <FooterWithContact />
    </>
  );
}
