'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import FooterWithContact from '@/components/FooterWithContact';

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

export default function ProjectDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleDownloadPDF = (pdfUrl: string) => {
    // Just open the PDF in a new tab - browser will handle download
    window.open(pdfUrl, '_blank');
  };

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const res = await fetch(`/api/projects/${params.id}`);
        
        // Check if response is ok
        if (!res.ok) {
          console.error('API returned error status:', res.status);
          router.push('/projects');
          return;
        }
        
        // Check content type
        const contentType = res.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
          console.error('API returned non-JSON response:', contentType);
          router.push('/projects');
          return;
        }
        
        const data = await res.json();
        if (data.success) {
          setProject(data.data);
        } else {
          console.error('API returned error:', data.error);
          router.push('/projects');
        }
      } catch (error) {
        console.error('Error fetching project:', error);
        router.push('/projects');
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchProject();
    }
  }, [params.id, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--bg-primary)' }}>
        <div className="flex flex-col items-center gap-6">
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
            Loading project...
          </p>
        </div>
      </div>
    );
  }

  if (!project) {
    return null;
  }

  const allImages = project.images && project.images.length > 0
    ? [project.image, ...project.images]
    : [project.image];

  return (
    <div className="min-h-screen" style={{ background: 'var(--bg-primary)' }}>
      <Navbar />
      
      <main className="pt-32 pb-20 px-6 sm:px-12 max-w-4xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="mb-8 px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:-translate-y-1 flex items-center gap-2"
          style={{ background: 'var(--bg-secondary)', color: 'var(--text-primary)' }}
        >
          ← Back
        </button>

        {/* Project Title */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6" style={{ color: 'var(--text-primary)' }}>
          {project.title}
        </h1>

        {/* Tags */}
        <div className="flex flex-wrap gap-3 mb-8">
          {project.tags.map((tag, index) => (
            <span
              key={`${tag}-${index}`}
              className="px-4 py-2 rounded-full text-sm font-semibold"
              style={{ background: 'rgba(59, 130, 246, 0.2)', color: '#60a5fa' }}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Image Gallery */}
        <div className="mb-8">
          <div className="relative w-full h-64 sm:h-80 md:h-96 rounded-2xl overflow-hidden mb-4" style={{ boxShadow: '0 20px 40px var(--shadow)' }}>
            <img
              src={allImages[currentImageIndex]}
              alt={`${project.title} - Image ${currentImageIndex + 1}`}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.src = 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=1200&h=800&fit=crop';
              }}
            />
            
            {allImages.length > 1 && (
              <>
                {/* Previous Button */}
                <button
                  onClick={() => setCurrentImageIndex((prev) => 
                    prev === 0 ? allImages.length - 1 : prev - 1
                  )}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/50 text-white flex items-center justify-center transition-all duration-300 hover:bg-black/70 text-2xl"
                >
                  ←
                </button>
                
                {/* Next Button */}
                <button
                  onClick={() => setCurrentImageIndex((prev) => 
                    prev === allImages.length - 1 ? 0 : prev + 1
                  )}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/50 text-white flex items-center justify-center transition-all duration-300 hover:bg-black/70 text-2xl"
                >
                  →
                </button>
                
                {/* Image Counter */}
                <div className="absolute bottom-4 right-4 px-4 py-2 rounded-full bg-black/50 text-white text-sm font-semibold">
                  {currentImageIndex + 1} / {allImages.length}
                </div>
              </>
            )}
          </div>
          
          {/* Thumbnail Gallery */}
          {allImages.length > 1 && (
            <div className="flex gap-3 overflow-x-auto pb-2">
              {allImages.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`flex-shrink-0 w-24 h-24 rounded-xl overflow-hidden transition-all duration-300 ${
                    currentImageIndex === index ? 'ring-4 ring-[var(--accent)] scale-105' : 'opacity-60 hover:opacity-100'
                  }`}
                >
                  <img
                    src={img}
                    alt={`Thumbnail ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Description */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
            About This Project
          </h2>
          <p className="text-lg leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            {project.description}
          </p>
        </div>

        {/* Tools Used */}
        {project.tools && project.tools.length > 0 && (
          <div className="mb-12">
            <h2 className="text-3xl font-bold mb-6" style={{ color: 'var(--text-primary)' }}>
              Tools & Technologies
            </h2>
            <div className="flex gap-4 flex-wrap">
              {project.tools.map((tool, index) => (
                <span
                  key={`${tool}-${index}`}
                  className="px-6 py-3 rounded-2xl text-base font-semibold"
                  style={{ background: 'var(--bg-secondary)', color: 'var(--text-primary)' }}
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Key Outcomes */}
        {project.outcomes && project.outcomes.length > 0 && (
          <div className="mb-12">
            <h2 className="text-3xl font-bold mb-6" style={{ color: 'var(--text-primary)' }}>
              Key Outcomes & Achievements
            </h2>
            <ul className="space-y-4">
              {project.outcomes.map((outcome, index) => (
                <li
                  key={index}
                  className="flex items-start gap-4 text-lg"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  <span className="text-2xl font-bold flex-shrink-0" style={{ color: 'var(--accent)' }}>
                    ✓
                  </span>
                  <span>{outcome}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* PDF Download */}
        {project.pdfUrl && (
          <div className="mb-12">
            <button
              onClick={() => handleDownloadPDF(project.pdfUrl!)}
              className="inline-flex items-center gap-3 px-8 py-4 bg-[var(--accent)] text-white rounded-2xl font-bold text-lg transition-all duration-300 hover:-translate-y-2 cursor-pointer"
              style={{ boxShadow: '0 10px 30px rgba(59, 130, 246, 0.3)' }}
            >
              <span>📄</span>
              <span>View Project Documentation</span>
            </button>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex gap-4 pt-8 border-t" style={{ borderColor: 'var(--border)' }}>
          <button
            onClick={() => router.push('/projects')}
            className="px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-300 hover:-translate-y-1"
            style={{ background: 'var(--bg-secondary)', color: 'var(--text-primary)' }}
          >
            View All Projects
          </button>
          <button
            onClick={() => router.push('/contact')}
            className="px-8 py-4 bg-[var(--accent)] text-white rounded-2xl font-bold text-lg transition-all duration-300 hover:-translate-y-1"
          >
            Get In Touch
          </button>
        </div>
      </main>

      <FooterWithContact />
    </div>
  );
}
