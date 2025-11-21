const experiences = [
  {
    role: "Mechanical Engineering Student",
    company: "COMSATS University Islamabad, Sahiwal Campus",
    period: "2021 - Present",
    achievements: [
      "Maintaining excellent academic performance in core mechanical engineering subjects",
      "Active participation in engineering design competitions and workshops",
      "Completed multiple CAD and simulation projects with industry-standard tools",
    ],
  },
  {
    role: "Engineering Intern",
    company: "Industrial Training",
    period: "Summer 2024",
    achievements: [
      "Gained hands-on experience in manufacturing processes and quality control",
      "Assisted in design modifications and technical documentation",
      "Learned industry best practices and safety protocols",
    ],
  },
];

export default function Experience() {
  return (
    <section id="experience" className="py-20 px-6 bg-gradient-to-b from-slate-900/50 to-transparent">
      <div className="container mx-auto max-w-4xl">
        <h2 className="text-5xl font-bold text-center mb-16">
          Experience & <span className="gradient-text">Education</span>
        </h2>
        <div className="space-y-8">
          {experiences.map((exp, index) => (
            <div key={index} className="glass rounded-2xl p-8 card-hover">
              <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
                <div>
                  <h3 className="text-2xl font-bold mb-2">{exp.role}</h3>
                  <p className="text-xl text-blue-400">{exp.company}</p>
                </div>
                <span className="text-gray-400 mt-2 md:mt-0">{exp.period}</span>
              </div>
              <ul className="space-y-2">
                {exp.achievements.map((achievement, i) => (
                  <li key={i} className="flex items-start gap-3 text-gray-300">
                    <span className="text-blue-500 mt-1">▹</span>
                    <span>{achievement}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
