"use client";
import { useState } from "react";

const skills = [
  { name: "SolidWorks", level: 90, icon: "🔧" },
  { name: "AutoCAD", level: 85, icon: "📐" },
  { name: "ANSYS", level: 80, icon: "📊" },
  { name: "MATLAB", level: 75, icon: "📈" },
  { name: "3D Printing", level: 85, icon: "🖨️" },
  { name: "GD&T", level: 70, icon: "📏" },
];

export default function Skills() {
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  return (
    <section id="skills" className="py-20 px-6 bg-gradient-to-b from-transparent to-slate-900/50">
      <div className="container mx-auto">
        <h2 className="text-5xl font-bold text-center mb-16">
          Technical <span className="gradient-text">Skills</span>
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {skills.map((skill) => (
            <div
              key={skill.name}
              className="glass rounded-2xl p-8 card-hover"
              onMouseEnter={() => setHoveredSkill(skill.name)}
              onMouseLeave={() => setHoveredSkill(null)}
            >
              <div className="flex items-center gap-4 mb-4">
                <span className="text-4xl">{skill.icon}</span>
                <h3 className="text-2xl font-semibold">{skill.name}</h3>
              </div>
              <div className="relative h-3 bg-slate-700 rounded-full overflow-hidden">
                <div
                  className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-1000 ease-out"
                  style={{
                    width: hoveredSkill === skill.name ? `${skill.level}%` : "0%",
                  }}
                ></div>
              </div>
              <p className="text-right mt-2 text-gray-400 font-semibold">{skill.level}%</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
