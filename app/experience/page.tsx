'use client';

import FooterWithContact from '@/components/FooterWithContact';

export default function ExperiencePage() {

  const experiences = [
    {
      date: '2024 - Present',
      title: 'Mechanical Engineering Student',
      company: 'COMSATS University Islamabad, Sahiwal Campus',
      description: 'Pursuing Bachelor\'s degree in Mechanical Engineering with focus on CAD design, FEA simulation, and advanced manufacturing technologies.',
      achievements: [
        'Maintaining excellent academic performance in core engineering subjects',
        'Active participation in engineering design competitions',
        'Completed multiple CAD and simulation projects',
        'Member of university robotics club',
      ],
    },
    {
      date: 'Summer 2024',
      title: 'Engineering Intern',
      company: 'Industrial Training Program',
      description: 'Gained hands-on experience in manufacturing processes, quality control, and engineering design practices.',
      achievements: [
        'Assisted in design modifications and technical documentation',
        'Learned industry best practices and safety protocols',
        'Worked with CNC machines and 3D printers',
        'Participated in quality assurance processes',
      ],
    },
    {
      date: '2023 - 2024',
      title: 'Freelance CAD Designer',
      company: 'Various Clients',
      description: 'Provided CAD design and 3D modeling services for small businesses and startups.',
      achievements: [
        'Completed 15+ design projects successfully',
        'Specialized in product design and prototyping',
        'Maintained 5-star client satisfaction rating',
        'Delivered projects on time and within budget',
      ],
    },
  ];

  const education = [
    {
      icon: '🎓',
      degree: 'Bachelor of Engineering',
      field: 'Mechanical Engineering',
      institution: 'COMSATS University Islamabad',
      location: 'Sahiwal Campus',
      period: '2021 - Present',
    },
    {
      icon: '📚',
      degree: 'Intermediate',
      field: 'Pre-Engineering',
      institution: 'Government College',
      location: 'Sahiwal, Pakistan',
      period: '2019 - 2021',
    },
  ];

  const certifications = [
    { icon: '🏆', name: 'SolidWorks Professional', issuer: 'Dassault Systèmes' },
    { icon: '📊', name: 'ANSYS Certification', issuer: 'ANSYS Inc.' },
    { icon: '🖨️', name: '3D Printing Specialist', issuer: 'Additive Manufacturing' },
    { icon: '📐', name: 'GD&T Fundamentals', issuer: 'ASME' },
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
            Experience & Education
          </h1>
          <p className="text-base sm:text-lg md:text-xl max-w-3xl mx-auto px-2" style={{ color: 'var(--text-secondary)' }}>
            A journey of continuous learning and professional growth in mechanical engineering
          </p>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-12 sm:py-16 md:py-24 px-4 sm:px-6 md:px-12 max-w-5xl mx-auto">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-12 sm:mb-16 md:mb-20">Professional Experience</h2>
        <div className="relative pl-6 sm:pl-8 md:pl-12">
          <div className="absolute left-0 top-0 bottom-0 w-0.5" style={{ background: 'var(--border)' }} />
          {experiences.map((exp, index) => (
            <div key={index} className="relative mb-10 sm:mb-12 md:mb-16 pl-6 sm:pl-8 md:pl-10">
              <div
                className="absolute left-[-9px] sm:left-[-9px] md:left-[-9px] top-0 w-4 sm:w-5 h-4 sm:h-5 rounded-full border-2 sm:border-4"
                style={{
                  background: 'var(--accent)',
                  borderColor: 'var(--bg-primary)',
                  boxShadow: '0 0 0 2px var(--border), 0 0 0 4px var(--border)',
                }}
              />
              <div className="text-xs sm:text-sm font-semibold mb-1.5 sm:mb-2" style={{ color: 'var(--accent)' }}>
                {exp.date}
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-1.5 sm:mb-2 break-words">{exp.title}</h3>
              <div className="text-sm sm:text-base md:text-lg mb-3 sm:mb-4 break-words" style={{ color: 'var(--text-secondary)' }}>
                {exp.company}
              </div>
              <p className="text-sm sm:text-base leading-relaxed mb-3 sm:mb-4 md:mb-5" style={{ color: 'var(--text-secondary)' }}>
                {exp.description}
              </p>
              <ul className="list-none p-0">
                {exp.achievements.map((achievement, i) => (
                  <li key={i} className="py-1.5 sm:py-2 pl-5 sm:pl-6 relative text-xs sm:text-sm md:text-base" style={{ color: 'var(--text-secondary)' }}>
                    <span className="absolute left-0" style={{ color: 'var(--accent)' }}>▹</span>
                    {achievement}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Education */}
      <section className="py-12 sm:py-16 md:py-24 px-4 sm:px-6 md:px-12 max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-6 sm:gap-8 md:gap-10">
          {education.map((edu, index) => (
            <div
              key={index}
              className="p-5 sm:p-7 md:p-10 rounded-2xl sm:rounded-3xl transition-all duration-300 hover:-translate-y-3"
              style={{
                background: 'var(--bg-secondary)',
                border: '1px solid var(--border)',
                boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
              }}
            >
              <div className="text-3xl sm:text-4xl md:text-5xl mb-3 sm:mb-4 md:mb-5">{edu.icon}</div>
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-1.5 sm:mb-2 break-words">{edu.degree}</h3>
              <div className="text-base sm:text-lg mb-3 sm:mb-4 break-words" style={{ color: 'var(--accent)' }}>
                {edu.field}
              </div>
              <p className="font-semibold text-sm sm:text-base break-words">{edu.institution}</p>
              <p className="text-sm sm:text-base break-words" style={{ color: 'var(--text-secondary)' }}>{edu.location}</p>
              <p className="mt-2 sm:mt-3 text-sm sm:text-base" style={{ color: 'var(--text-secondary)' }}>
                {edu.period}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Certifications */}
      <section className="py-12 sm:py-16 md:py-24 px-4 sm:px-6 md:px-12" style={{ background: 'var(--bg-secondary)' }}>
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-10 sm:mb-12 md:mb-16">Certifications & Training</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
            {certifications.map((cert, index) => (
              <div
                key={index}
                className="p-4 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl text-center transition-all duration-300 hover:scale-105"
                style={{
                  background: 'var(--bg-primary)',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                }}
              >
                <div className="text-3xl sm:text-4xl md:text-5xl mb-2 sm:mb-3 md:mb-4">{cert.icon}</div>
                <div className="font-semibold mb-1.5 sm:mb-2 text-xs sm:text-sm md:text-base break-words">{cert.name}</div>
                <div className="text-[10px] sm:text-xs md:text-sm break-words" style={{ color: 'var(--text-secondary)' }}>
                  {cert.issuer}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </main>
    
    <FooterWithContact />
    </>
  );
}
