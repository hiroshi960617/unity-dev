"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowLeft, Download, Mail, Github, MapPin, Phone, Calendar, ExternalLink } from "lucide-react"
import { AnimatedButton } from "@/components/ui/animated-button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { SimpleBackground } from "@/components/simple-background"
import { OptimizedShootingStars } from "@/components/optimized-shooting-stars"

export default function ResumePage() {
  const skills = {
    "Programming Languages": ["C#", "JavaScript", "TypeScript"],
    "Game Engines & Frameworks": ["Unity (URP, HDRP, 2D & 3D)", "Photon (PUN, Fusion)", "Mirror", "Netcode for GameObjects"],
    "Gameplay & Systems": ["Gameplay mechanics", "AI (behavior trees, FSM)", "physics", "animation systems (Mecanim, Timeline)"],
    "UI/UX & Visual Tools": ["Unity UI Toolkit", "Shader Graph", "Cinemachine", "DOTween", "TextMeshPro"],
    "Version Control & Collaboration:": ["Git", "Plastic SCM", "Jira", "Trello", "Notion"],
    "3D & Design Tools": ["Blender", "Maya", "3ds Max", "Photoshop"],
    "Platforms": ["PC", "Mobile (iOS/Android)", "WebGL"],
  }

  const experience = [
    {
      title: "Senior Unity Game Developer",
      company: "Sony Interactive Entertainment",
      period: "06/2019 - Present",
      location: "Tokyo, Japan",
      achievements: [
        "Led development of core gameplay systems and multiplayer features using Unity and C#.",
        "Designed UI/UX with Shader Graph, DOTween, and Unity UI Toolkit for polished user experiences.",
        "Collaborated with cross-disciplinary teams to deliver high-quality games across PC, mobile, and WebGL.",
      ],
    },
    {
      title: "Junior Unity Developer",
      company: "Square Enix",
      period: "06/2016 - 05/2019",
      location: "Tokyo, Japan",
      achievements: [
        "Developed AI behaviors, gameplay mechanics, and animation systems under senior supervision.",
        "Maintained code quality and version control using Git, supporting efficient team workflows.",
        "Assisted in testing, debugging, and optimizing game builds for stability and performance.",
      ],
    },
  ]

  const education = [
    {
      degree: "Bachelor of Computer Science",
      school: "Tokyo Institute of Technology",
      period: "April 2012 - March 2016",
      details: "Specialized in game development, software engineering, and artificial intelligence, Active participant in game development clubs and hackathons, Developed several Unity projects as part of coursework and personal initiatives."
    },
  ]

  const projects = [
    {
      name: "Mid-Term",
      description: "MidTerm Project FPS for Interactive Video Game Development. This project is a project assignment for Interactive Video Game Development Course at Yuan Ze University.",
      tech: ["casual"],
      link: "https://github.com",
    },
    {
      name: "A shooting game",
      description: "A fast-paced 3D shooting game developed in Unity, focusing on responsive controls, satisfying weapon mechanics, and immersive level design.",
      tech: ["shooting"],
      link: "https://github.com",
    },
    {
      name: "DAO Governance Platform",
      description: "Paradise City is a real-time simulation which presents behaviors occur in big city. In the project many actions are performing independently of each other.",
      tech: ["Casual"],
      link: "https://github.com",
    },
    {
      name: "Whispers of the Withered Bloom",
      description: "A peaceful garden hides a chilling past. As night falls, you explore the quiet halls of an old Japanese house, but you’re not alone. Lights flicker, doors creak, and something moves in the shadows near the old tree. Uncover the story, survive the night, and escape before the spirits find you.",
      tech: ["horror"],
      link: "https://github.com",
    },
    {
      name: "The excavation and earth transportation",
      description: "It is developed based on the game engine 'Unity' and provides a simulation environment for excavation and earth transportation using heavy machinery.",
      tech: ["simulation"],
      link: "https://github.com",
    },
    {
      name: "Starcore Reboot",
      description: "The game likely involves reclaiming or restoring control over a powerful sci-fi system after a collapse or attack. ",
      tech: ["shooting"],
      link: "https://github.com",
    },

  ]

  return (
    <div className="min-h-screen bg-black text-white relative">
      <SimpleBackground />
      <OptimizedShootingStars />

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 border-b border-white/10">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2 text-white/70 hover:text-white transition-colors">
            <ArrowLeft className="h-5 w-5" />
            <span>Back to Portfolio</span>
          </Link>
          <AnimatedButton variant="primary" icon={<Download className="h-4 w-4" />} onClick={() => window.print()}>
            Download PDF
          </AnimatedButton>
        </div>
      </header>

      <main className="pt-20 pb-10 relative z-10">
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            {/* Header Section */}
            <Card className="bg-black/40 border-white/20 mb-8">
              <CardContent className="p-8">
                <div className="flex flex-col md:flex-row gap-6 items-start">
                  <div className="w-32 h-32 rounded-full overflow-hidden border-2 border-cyan-400/30 flex-shrink-0">
                    <img src="/images/profile-avatar.png" alt="Profile" className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-grow">
                    <h1 className="text-3xl md:text-4xl font-bold mb-2">
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-600">
                        Fujii Genji
                      </span>
                    </h1>
                    <h2 className="text-xl text-white/80 mb-4">Senior Unity Game Developer</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-white/70">
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4" />
                        <span>fgenji@outlook.com</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Github className="h-4 w-4" />
                        <span>github.com</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        <span>Tokyo, Japan</span>
                      </div>
                      {/* <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4" />
                        <span>+81-XX-XXXX-XXXX</span>
                      </div> */}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Professional Summary */}
            <Card className="bg-black/40 border-white/20 mb-8">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4 text-cyan-400">Professional Summary</h3>
                <p className="text-white/80 leading-relaxed">
                  Experienced Unity Game Developer with 7 years of expertise in building interactive, polished, and performance-optimized games across PC, mobile, and WebGL platforms. Skilled in C# programming, gameplay systems, multiplayer networking, and UI/UX design.
                  Proven ability to develop solo projects and collaborate within agile teams to deliver engaging player experiences.
                  Specializes in clean code architecture, rapid prototyping, and shipping high-quality features using modern Unity tools like Shader Graph, Cinemachine, Timeline, and Netcode frameworks.
                  Passionate about crafting responsive controls, immersive environments, and innovative mechanics that push gameplay boundaries..
                </p>
              </CardContent>
            </Card>

            {/* Skills */}
            <Card className="bg-black/40 border-white/20 mb-8">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4 text-cyan-400">Technical Skills</h3>
                <div className="space-y-4">
                  {Object.entries(skills).map(([category, skillList]) => (
                    <div key={category}>
                      <h4 className="text-lg font-semibold mb-2 capitalize text-white/90">
                        {category === "frontend" ? "Frontend" : category === "backend" ? "Backend" : category}
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {skillList.map((skill) => (
                          <Badge key={skill} variant="outline" className="border-white/30 bg-white/30">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Experience */}
            <Card className="bg-black/40 border-white/20 mb-8">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4 text-cyan-400">Professional Experience</h3>
                <div className="space-y-6">
                  {experience.map((job, index) => (
                    <div key={index} className="border-l-2 border-cyan-400/30 pl-4">
                      <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-2">
                        <div>
                          <h4 className="text-lg font-semibold text-white">{job.title}</h4>
                          <p className="text-cyan-300 font-medium">{job.company}</p>
                        </div>
                        <div className="text-sm text-white/70 md:text-right">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {job.period}
                          </div>
                          <div className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {job.location}
                          </div>
                        </div>
                      </div>
                      <ul className="list-disc list-inside space-y-1 text-white/80 text-sm">
                        {job.achievements.map((achievement, i) => (
                          <li key={i}>{achievement}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Education */}
            <Card className="bg-black/40 border-white/20 mb-8">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4 text-cyan-400">Education</h3>
                {education.map((edu, index) => (
                  <div key={index} className="border-l-2 border-cyan-400/30 pl-4">
                    <div className="flex flex-col md:flex-row md:justify-between md:items-start">
                      <div>
                        <h4 className="text-lg font-semibold text-white">{edu.degree}</h4>
                        <p className="text-cyan-300 font-medium">{edu.school}</p>
                        <p className="text-white/70 text-sm">{edu.details}</p>
                      </div>
                      <div className="text-sm text-white/70 flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {edu.period}
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Key Projects */}
            <Card className="bg-black/40 border-white/20 mb-8">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4 text-cyan-400">Key Projects</h3>
                <div className="space-y-4">
                  {projects.map((project, index) => (
                    <div
                      key={index}
                      className="border border-white/10 rounded-lg p-4 hover:border-cyan-400/30 transition-colors"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="text-lg font-semibold text-white">{project.name}</h4>
                        {/* <Link href={project.link} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="h-4 w-4 text-cyan-400 hover:text-cyan-300" />
                        </Link> */}
                      </div>
                      <p className="text-white/80 text-sm mb-3">{project.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {project.tech.map((tech) => (
                          <Badge key={tech} variant="outline" className="border-white/30 bg-white/30 text-xs">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </main>
    </div>
  )
}
