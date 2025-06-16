"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"
import Link from "next/link"

import { AnimatedButton } from "@/components/ui/animated-button"
import { GlitchText } from "@/components/glitch-text"
import { AnimatedScrollButton } from "@/components/animated-scroll-button"
import { FileText } from "lucide-react"
import { smoothScrollTo } from "@/components/smooth-scroll"

export function EnhancedHero() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    // Binary rain effect for hero
    const binaryChars = "01"
    const fontSize = 12
    const columns = Math.floor(canvas.width / fontSize)
    const drops: number[] = []

    for (let i = 0; i < columns; i++) {
      drops[i] = Math.random() * -50
    }

    function animate() {
      ctx.fillStyle = "rgba(0, 0, 0, 0.1)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      ctx.fillStyle = "#00ffff"
      ctx.font = `${fontSize}px monospace`

      for (let i = 0; i < drops.length; i++) {
        if (Math.random() > 0.8) {
          const char = binaryChars[Math.floor(Math.random() * binaryChars.length)]
          const x = i * fontSize
          const y = drops[i] * fontSize

          if (Math.random() > 0.98) {
            ctx.shadowBlur = 8
            ctx.shadowColor = "#00ffff"
          } else {
            ctx.shadowBlur = 0
          }

          ctx.fillText(char, x, y)

          if (y > canvas.height && Math.random() > 0.98) {
            drops[i] = 0
          }

          drops[i]++
        }
      }

      requestAnimationFrame(animate)
    }

    animate()

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return (
    <section id="hero" className="relative h-screen flex items-center justify-center overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 z-0" />
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-black/20 to-black/60 z-10" />

      <div className="container mx-auto px-4 z-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center"
        >
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
            <GlitchText
              text="Unity Game Developer"
              className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-600 block"
            />
            <br />
            <GlitchText text="I am FujiiGenji" className="text-white block" />
          </h1>
          <motion.p
            className="text-xl md:text-2xl text-white/70 mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Over the last 7 years, I've been developing projects in Unity as a game designer and programmer.
          </motion.p>
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <AnimatedButton
              variant="primary"
              size="lg"
              glowColor="rgba(0, 255, 255, 0.7)"
              onClick={() => smoothScrollTo("projects")}
            >
              View My Work
            </AnimatedButton>
            <Link href="/resume">
              <AnimatedButton
                variant="outline"
                size="lg"
                icon={<FileText className="h-5 w-5" />}
                glowColor="rgba(255, 255, 255, 0.3)"
              >
                Download Resume
              </AnimatedButton>
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* Enhanced Scroll Button */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20">
        <AnimatedScrollButton targetId="about" />
      </div>
    </section>
  )
}
