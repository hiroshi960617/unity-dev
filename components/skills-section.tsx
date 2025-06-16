"use client"

import { motion } from "framer-motion"
import { OptimizedSkillBar } from "@/components/optimized-skill-bar"
import { SectionScrollButton } from "@/components/section-scroll-button"

export function SkillsSection() {
  const skills = [
    { name: "Gameplay Programming ", level: 90, color: "from-cyan-500 to-cyan-300" },
    { name: "Clean Architecture", level: 85, color: "from-blue-500 to-blue-300" },
    { name: "UI/UX Design", level: 90, color: "from-indigo-500 to-indigo-300" },
    { name: "Multiplayer Development", level: 95, color: "from-purple-500 to-purple-300" },
    { name: "AI Programming", level: 90, color: "from-pink-500 to-pink-300" },
    { name: "Animation Systems", level: 85, color: "from-cyan-500 to-cyan-300" },
    { name: "Optimization ", level: 80, color: "from-green-500 to-green-300" },
  ]

  const technologies = [
    "Unity (URP / HDRP, WebGL, Mobile, PC)",
    "C#",
    "Photon (PUN, Fusion)",
    "Mirror",
    "Netcode for GameObjects",
    "Shader Graph",
    "Cinemachine",
    "Timeline",
    "DOTween",
    "Unity UI Toolkit",
    "TextMeshPro",
    "Blender",
    "Jira / Trello / Notion",
    "Photoshop",
  ]

  return (
    <section id="skills" className="py-20 bg-black/30 relative">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-2 text-center">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-600">
              Skills & Technologies
            </span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-cyan-500 to-purple-600 mx-auto mb-10" />

          <div className="grid md:grid-cols-2 gap-10">
            <div className="bg-black/40 rounded-2xl p-6 border border-white/20">
              <h3 className="text-2xl font-bold mb-6 text-center">Core Skills</h3>
              <div className="space-y-6">
                {skills.map((skill, index) => (
                  <OptimizedSkillBar
                    key={skill.name}
                    name={skill.name}
                    level={skill.level}
                    color={skill.color}
                    index={index}
                  />
                ))}
              </div>
            </div>

            <div className="bg-black/40 rounded-2xl p-6 border border-white/20">
              <h3 className="text-2xl font-bold mb-6 text-center">Technologies</h3>
              <div className="flex flex-wrap gap-3">
                {technologies.map((tech, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    viewport={{ once: true }}
                    className="px-4 py-2 rounded-full bg-white/10 border border-white/20 hover:bg-white/20 hover:border-cyan-500/30 transition-all duration-300"
                  >
                    {tech}
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2">
        <SectionScrollButton targetId="projects" />
      </div>
    </section>
  )
}
