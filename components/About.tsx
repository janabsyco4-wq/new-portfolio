'use client';

import { useEffect, useState } from 'react';

export default function About() {
  const [isVisible, setIsVisible] = useState(false);

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

    const section = document.getElementById('about');
    if (section) observer.observe(section);

    return () => observer.disconnect();
  }, []);

  const skills = [
    'SolidWorks',
    'ANSYS',
    'AutoCAD',
    'MATLAB',
    '3D Printing',
    'GD&T',
  ];

  return (
    <section
      id="about"
      className={`py-32 px-12 max-w-7xl mx-auto fade-in ${isVisible ? 'visible' : ''}`}
    >
      <div className="text-center mb-20">
        <h2
          className="text-5xl md:text-6xl font-extrabold tracking-tight mb-5"
          style={{ color: 'var(--text-primary)' }}
        >
          About Me
        </h2>
        <p
          className="text-lg max-w-2xl mx-auto"
          style={{ color: 'var(--text-secondary)' }}
        >
          Passion meets precision in mechanical engineering
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-20 items-center">
        <div>
          <h3 className="text-3xl font-bold mb-5">Engineering Excellence</h3>
          <p
            className="text-lg leading-relaxed mb-5"
            style={{ color: 'var(--text-secondary)' }}
          >
            I'm a mechanical engineer passionate about transforming complex
            engineering challenges into elegant, innovative solutions. With
            expertise in CAD design, FEA simulation, and advanced manufacturing,
            I bring precision and creativity to every project.
          </p>
          <p
            className="text-lg leading-relaxed mb-8"
            style={{ color: 'var(--text-secondary)' }}
          >
            Currently studying at COMSATS University Islamabad, Sahiwal Campus,
            I specialize in SolidWorks, ANSYS, and cutting-edge engineering
            technologies. My work spans from robotic systems to thermal
            analysis, always pushing the boundaries of what's possible.
          </p>

          <div className="grid grid-cols-2 gap-4 mt-8">
            {skills.map((skill) => (
              <div
                key={skill}
                className="p-4 rounded-xl font-semibold text-center transition-all duration-300 hover:-translate-y-1 cursor-pointer"
                style={{ background: 'var(--bg-secondary)' }}
              >
                {skill}
              </div>
            ))}
          </div>
        </div>

        <div
          className="h-[500px] rounded-3xl flex items-center justify-center text-[120px]"
          style={{ background: 'var(--bg-secondary)' }}
        >
          🔧
        </div>
      </div>
    </section>
  );
}
