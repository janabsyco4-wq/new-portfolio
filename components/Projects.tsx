'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface Project {
  _id?: string;
  title: string;
  image: string;
  images?: string[];
  tags: string[];
  description: string;
  tools: string[];
  outcomes: string[];
}

export default function Projects() {
  const router = useRouter();
  const [projects, setProjects] = useState<Project[]>([]);
  const [isVisible, setIsVisible] = useState(false);
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

    const section = document.getElementById('projects');
    if (section) observer.observe(section);

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <section
        id="projects"
        className={`py-32 px-12 max-w-7xl mx-auto fade-in ${isVisible ? 'visible' : ''}`}
      >
        <div className="text-center mb-20">
          <h2
            className="text-5xl md:text-6xl font-extrabold tracking-tight mb-5"
            style={{ color: 'var(--text-primary)' }}
          >
            Selected Projects
          </h2>
          <p
            className="text-lg max-w-2xl mx-auto"
            style={{ color: 'var(--text-secondary)' }}
          >
            A showcase of engineering excellence and innovative solutions
          </p>
        </div>

        {loading ? (
          <div className="text-center py-12" style={{ color: 'var(--text-secondary)' }}>
            <p className="text-lg">Loading projects...</p>
          </div>
        ) : projects.length === 0 ? (
          <div className="text-center py-12" style={{ color: 'var(--text-secondary)' }}>
            <p className="text-lg">No projects available yet.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-10">
            {projects.map((project) => (
              <div
                key={project._id}
                onClick={() => router.push(`/projects/${project._id}`)}
                className="relative aspect-[4/3] rounded-3xl overflow-hidden cursor-pointer transition-all duration-400 hover:-translate-y-3"
                style={{
                  background: 'var(--bg-secondary)',
                  boxShadow: '0 25px 50px var(--shadow)',
                }}
              >
                <img
                  src={project.image}
                  alt={project.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-400 hover:scale-110"
                  onError={(e) => {
                    e.currentTarget.src = 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800&h=600&fit=crop';
                  }}
                />
                <div
                  className="absolute bottom-0 left-0 right-0 p-8 translate-y-full hover:translate-y-0 transition-transform duration-400"
                  style={{
                    background: 'linear-gradient(to top, rgba(0,0,0,0.9), transparent)',
                  }}
                >
                  <h3 className="text-2xl font-bold text-white mb-3">
                    {project.title}
                  </h3>
                  <div className="flex gap-2 flex-wrap">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 rounded-2xl text-xs font-semibold"
                        style={{
                          background: 'rgba(59, 130, 246, 0.2)',
                          color: '#60a5fa',
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
    </>
  );
}
