"use client"

import { motion } from "framer-motion"
import { Code, Database, Globe, Server } from "lucide-react"
import Link from "next/link"
import { AnimatedButton } from "@/components/ui/animated-button"
import { SectionScrollButton } from "@/components/section-scroll-button"

export function AboutSection() {
  return (
    <section id="about" className="py-20 bg-black/20 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-2 text-center">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-600">About Me</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-cyan-500 to-purple-600 mx-auto mb-10" />

          <div className="grid md:grid-cols-2 gap-10 items-center">
            <motion.div
              className="relative"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="aspect-square rounded-2xl overflow-hidden border-2 border-cyan-400/30 bg-black/40 relative group">
                {/* Animated border glow */}
                <motion.div
                  className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-400/20 to-purple-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  animate={{
                    background: [
                      "linear-gradient(45deg, rgba(0,255,255,0.1), rgba(139,92,246,0.1))",
                      "linear-gradient(45deg, rgba(139,92,246,0.1), rgba(0,255,255,0.1))",
                      "linear-gradient(45deg, rgba(0,255,255,0.1), rgba(139,92,246,0.1))",
                    ],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                  }}
                />

                {/* Profile image container */}
                <div className="relative w-full h-full p-4">
                  <div className="w-full h-full rounded-xl overflow-hidden bg-gradient-to-br from-cyan-500/10 to-purple-600/10 border border-white/20 relative">
                    <img
                      src="/images/profile-avatar.png"
                      alt="Blockchain Developer"
                      className="w-full h-full object-cover filter brightness-95 contrast-105"
                    />

                    {/* Subtle tech overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />

                    {/* Floating tech elements */}
                    <motion.div
                      className="absolute top-4 right-4 w-8 h-8 rounded-full bg-cyan-400/20 border border-cyan-400/40 flex items-center justify-center backdrop-blur-sm"
                      animate={{
                        scale: [1, 1.1, 1],
                        opacity: [0.7, 1, 0.7],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "easeInOut",
                      }}
                    >
                      <div className="w-2 h-2 rounded-full bg-cyan-400" />
                    </motion.div>

                    <motion.div
                      className="absolute bottom-4 left-4 w-6 h-6 rounded border border-purple-500/40 bg-purple-500/20 backdrop-blur-sm"
                      animate={{
                        rotate: [0, 180, 360],
                        opacity: [0.5, 0.8, 0.5],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "linear",
                      }}
                    />

                    {/* Digital scan line effect */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-400/10 to-transparent h-8"
                      animate={{
                        y: ["-2rem", "100%", "-2rem"],
                      }}
                      transition={{
                        duration: 4,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "easeInOut",
                      }}
                    />
                  </div>
                </div>

                {/* Corner accent lines */}
                <div className="absolute top-0 left-0 w-8 h-8 border-l-2 border-t-2 border-cyan-400/50 rounded-tl-2xl" />
                <div className="absolute bottom-0 right-0 w-8 h-8 border-r-2 border-b-2 border-purple-500/50 rounded-br-2xl" />

                {/* Additional corner accents */}
                <div className="absolute top-0 right-0 w-6 h-6 border-r-2 border-t-2 border-purple-400/30 rounded-tr-2xl" />
                <div className="absolute bottom-0 left-0 w-6 h-6 border-l-2 border-b-2 border-cyan-400/30 rounded-bl-2xl" />
              </div>
            </motion.div>

            <motion.div
              className="bg-black/40 rounded-2xl p-6 border border-white/20 backdrop-blur-sm"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <h3 className="text-1xl font-bold mb-2">Unity Game Developer</h3>
              <i><span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-600">I am FujiiGenji.</span></i>
              <p className="text-white/80 mb-6 leading-relaxed">
                I’m a Unity game developer with 7 years of experience bringing interactive worlds to life. 
                I specialize in crafting engaging gameplay systems, smooth user interfaces, and polished game mechanics using Unity and C#.
                Whether it’s a solo prototype or a full-featured team project, I focus on clean code architecture, immersive player experiences, and performance-optimized builds. 
                I’ve worked on a range of game types, 2D, 3D, multiplayer, and experimental.
                And I’m always excited to push boundaries in gameplay design and interaction.
              </p>
              <Link href="/resume">
                <AnimatedButton variant="primary" icon={<Code className="h-5 w-5" />}>
                  Download Resume
                </AnimatedButton>
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2">
        <SectionScrollButton targetId="skills" />
      </div>
    </section>
  )
}
