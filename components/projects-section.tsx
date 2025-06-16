"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowUpRight, Github } from "lucide-react"
import { AnimatedButton } from "@/components/ui/animated-button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { SectionScrollButton } from "@/components/section-scroll-button"

export function ProjectsSection() {
  const [activeFilter, setActiveFilter] = useState("all")

  const projects = [
    {
      id: 1,
      title: "Mid-Term",
      description:
        "MidTerm Project FPS for Interactive Video Game Development. This project is a project assignment for Interactive Video Game Development Course at Yuan Ze University.",
      image: "/images/MidTerm.png",
      tags: ["casual"],
      demoUrl: "https://MidTerm-demo.vercel.app",
      githubUrl: "https://github.com/MidTerm-platform",
    },
    {
      id: 2,
      title: "A shooting game",
      description:
        "A fast-paced 3D shooting game developed in Unity, focusing on responsive controls, satisfying weapon mechanics, and immersive level design. The game features real-time combat, enemy AI, and a progression system with multiple weapons and upgrades.",
      image: "/images/shooting-game.png",
      tags: ["shooting"],
      demoUrl: "https://shooting-demo.vercel.app",
      githubUrl: "https://github.com/shooting-marketplace",
    },
    {
      id: 3,
      title: "Paradise City",
      description:
        "Paradise City is a real-time simulation which presents behaviors occur in big city. In the project many actions are performing independently of each other. The main goal is created the full of life environment with a lot of characters and vehicles. Specific people have their own sequences of the behaviors which is executed in proper order.",
      image: "/images/Paradise-City.png",
      tags: ["casual"],
      demoUrl: "https://Paradise-City-demo.vercel.app",
      githubUrl: "https://github.com/Paradise-City-platform",
    },
    {
      id: 4,
      title: "Whispers of the Withered Bloom",
      description:
        "A peaceful garden hides a chilling past. As night falls, you explore the quiet halls of an old Japanese house, but you’re not alone. Lights flicker, doors creak, and something moves in the shadows near the old tree. Uncover the story, survive the night, and escape before the spirits find you.",
      image: "/images/Garden.png",
      tags: ["horror"],
      demoUrl: "https://Whispers-Game-demo",
      githubUrl: "https://github.com/Whispers-platform",
    },
    {
      id: 5,
      title: "The excavation and earth transportation",
      description:
        "It is developed based on the game engine 'Unity' and provides a simulation environment for excavation and earth transportation using heavy machinery.",
      image: "/images/heavy-machinery.png",
      tags: ["simulation"],
      demoUrl: "https://crypto-tracker-demo.vercel.app",
      githubUrl: "https://github.com/alexchen-dev/crypto-portfolio-tracker",
    },
    {
      id: 6,
      title: "Starcore Reboot",
      description:
        "The game likely involves reclaiming or restoring control over a powerful sci-fi system after a collapse or attack. Expect intense action, advanced tech, and a high-stakes mission to bring the 'Starcore' back online before it's too late.",
      image: "/images/audit-tool.png",
      tags: ["shooting"],
      demoUrl: "https://Starcore-Reboot-demo.vercel.app",
      githubUrl: "https://github.com/Starcore-Reboot-platform",
    },
  ]

  const filters = [
    { id: "all", label: "All Projects" },
    { id: "shooting", label: "Shooting Games" },
    { id: "simulation", label: "Simulation Games" },
    { id: "horror", label: "Horror Games" },
    { id: "casual", label: "Casual Games" },
  ]

  const filteredProjects =
    activeFilter === "all" ? projects : projects.filter((project) => project.tags.includes(activeFilter))

  return (
    <section id="projects" className="py-20 bg-black/25 relative">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-2 text-center">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-600">
              Featured Projects
            </span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-cyan-500 to-purple-600 mx-auto mb-10" />

          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {filters.map((filter) => (
              <AnimatedButton
                key={filter.id}
                variant={activeFilter === filter.id ? "primary" : "outline"}
                size="sm"
                onClick={() => setActiveFilter(filter.id)}
              >
                {filter.label}
              </AnimatedButton>
            ))}
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="h-full" // Ensure full height
              >
                <Card className="overflow-hidden bg-black/50 border-white/30 hover:border-cyan-500/50 transition-all duration-300 group h-full flex flex-col">
                  {/* Fixed aspect ratio image container */}
                  <div className="relative aspect-video overflow-hidden flex-shrink-0">
                    <img
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>

                  {/* Content container with flex-grow */}
                  <CardContent className="p-6 flex flex-col flex-grow">
                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-3">
                      {project.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="border-white/30 text-xs bg-white/30">
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    {/* Title */}
                    <h3 className="text-white/60 font-bold mb-2 group-hover:text-cyan-300 transition-colors duration-300">
                      {project.title}
                    </h3>

                    {/* Description with flex-grow to push buttons to bottom */}
                    <p className="text-white/80 mb-4 text-sm leading-relaxed flex-grow">{project.description}</p>

                    {/* Buttons container - always at bottom */}
                    <div className="flex gap-3 mt-auto">
                      {/* <Link href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                        <AnimatedButton size="sm" variant="primary" icon={<Github className="h-4 w-4" />}>
                          Code
                        </AnimatedButton>
                      </Link> */}
                      {/* <Link href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                        <AnimatedButton size="sm" variant="primary" icon={<ArrowUpRight className="h-4 w-4" />}>
                          Live Demo
                        </AnimatedButton>
                      </Link> */}
                      {/* <Link href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                        <AnimatedButton size="sm" variant="outline" icon={<Github className="h-4 w-4" />}>
                          Code
                        </AnimatedButton>
                      </Link> */}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2">
        <SectionScrollButton targetId="contact" />
      </div>
    </section>
  )
}