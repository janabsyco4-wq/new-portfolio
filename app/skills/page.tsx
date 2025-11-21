'use client';

import Link from 'next/link';
import FooterWithContact from '@/components/FooterWithContact';

export default function SkillsPage() {

  const skills = [
    {
      icon: '🔧',
      name: 'SolidWorks',
      description: 'Expert in 3D CAD modeling, assembly design, and motion simulation for complex mechanical systems',
      level: 90,
    },
    {
      icon: '📐',
      name: 'AutoCAD',
      description: 'Proficient in 2D technical drawings, GD&T specifications, and detailed engineering documentation',
      level: 85,
    },
    {
      icon: '📊',
      name: 'ANSYS',
      description: 'Advanced finite element analysis, CFD simulation, and thermal analysis for design optimization',
      level: 80,
    },
    {
      icon: '📈',
      name: 'MATLAB',
      description: 'Mathematical modeling, data analysis, and algorithm development for engineering calculations',
      level: 75,
    },
    {
      icon: '🖨️',
      name: '3D Printing',
      description: 'Additive manufacturing expertise including design for 3D printing and rapid prototyping',
      level: 85,
    },
    {
      icon: '📏',
      name: 'GD&T',
      description: 'Geometric dimensioning and tolerancing for precise manufacturing specifications',
      level: 70,
    },
  ];

  const tools = [
    { icon: '🔧', name: 'SolidWorks' },
    { icon: '📐', name: 'AutoCAD' },
    { icon: '📊', name: 'ANSYS' },
    { icon: '📈', name: 'MATLAB' },
    { icon: '🎨', name: 'Fusion 360' },
    { icon: '🖨️', name: '3D Printing' },
    { icon: '⚙️', name: 'CNC' },
    { icon: '📏', name: 'GD&T' },
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
            Skills & Expertise
          </h1>
          <p className="text-base sm:text-lg md:text-xl max-w-3xl mx-auto" style={{ color: 'var(--text-secondary)' }}>
            Comprehensive technical capabilities in mechanical engineering, CAD design, and advanced simulation
          </p>
        </div>
      </section>

      {/* Skills Grid */}
      <section className="py-16 sm:py-20 md:py-24 px-4 sm:px-6 md:px-12 max-w-7xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 md:mb-16">Core Competencies</h2>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-10">
          {skills.map((skill) => (
            <div
              key={skill.name}
              className="p-4 sm:p-6 md:p-10 rounded-2xl sm:rounded-3xl transition-all duration-300 hover:-translate-y-3"
              style={{
                background: 'var(--bg-secondary)',
                border: '1px solid var(--border)',
                boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
              }}
            >
              <div className="text-3xl sm:text-4xl md:text-5xl mb-3 sm:mb-4 md:mb-5">{skill.icon}</div>
              <h3 className="text-base sm:text-xl md:text-2xl font-bold mb-2 sm:mb-3 md:mb-4">{skill.name}</h3>
              <p className="mb-3 sm:mb-4 md:mb-5 leading-relaxed text-xs sm:text-sm md:text-base" style={{ color: 'var(--text-secondary)' }}>
                {skill.description}
              </p>
              <div className="flex items-center gap-2 sm:gap-3 mt-3 sm:mt-4 md:mt-5">
                <div className="flex-1 h-1.5 sm:h-2 rounded-full overflow-hidden" style={{ background: 'var(--border)' }}>
                  <div
                    className="h-full rounded-full transition-all duration-1000"
                    style={{
                      width: `${skill.level}%`,
                      background: 'linear-gradient(90deg, var(--accent), #8b5cf6)',
                    }}
                  />
                </div>
                <span className="font-semibold text-xs sm:text-sm md:text-base whitespace-nowrap" style={{ color: 'var(--accent)' }}>
                  {skill.level}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Tools Section */}
      <section className="py-16 sm:py-20 md:py-24 px-4 sm:px-6 md:px-12" style={{ background: 'var(--bg-secondary)' }}>
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 md:mb-16">Tools & Technologies</h2>
          <div className="grid grid-cols-4 md:grid-cols-4 gap-3 sm:gap-6 md:gap-8">
            {tools.map((tool) => (
              <div
                key={tool.name}
                className="p-3 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl text-center transition-all duration-300 hover:scale-105 cursor-pointer"
                style={{
                  background: 'var(--bg-primary)',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                }}
              >
                <div className="text-2xl sm:text-4xl md:text-5xl mb-2 sm:mb-3 md:mb-4">{tool.icon}</div>
                <div className="font-semibold text-[10px] sm:text-sm md:text-base">{tool.name}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 sm:py-20 md:py-24 px-4 sm:px-6 md:px-12 text-center">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 sm:mb-8">Ready to Collaborate?</h2>
        <p className="text-base sm:text-lg md:text-xl mb-8 sm:mb-10" style={{ color: 'var(--text-secondary)' }}>
          Let's work together on your next engineering project
        </p>
        <Link
          href="/contact"
          className="inline-block px-8 sm:px-10 py-4 sm:py-5 bg-[var(--accent)] text-white rounded-full font-semibold text-sm sm:text-base transition-all duration-300 hover:-translate-y-1"
          style={{ boxShadow: '0 10px 30px rgba(59, 130, 246, 0.4)' }}
        >
          Get In Touch
        </Link>
      </section>

    </main>
    
    <FooterWithContact />
    </>
  );
}
