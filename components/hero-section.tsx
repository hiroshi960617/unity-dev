"use client"

import { useEffect, useRef } from "react"
import Link from "next/link"
import { ArrowDown, FileText } from "lucide-react"
import { motion } from "framer-motion"

import { Button } from "@/components/ui/button"
import { AnimatedButton } from "@/components/ui/animated-button"
import { GlitchText } from "@/components/glitch-text"
import { FloatingElements } from "@/components/floating-elements"

export function HeroSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const particles: Particle[] = []
    const particleCount = 100
    const connectionDistance = 150

    class Particle {
      x: number
      y: number
      size: number
      speedX: number
      speedY: number
      color: string

      constructor() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.size = Math.random() * 2 + 0.5
        this.speedX = (Math.random() - 0.5) * 0.5
        this.speedY = (Math.random() - 0.5) * 0.5
        this.color = "#00FFFF"
      }

      update() {
        this.x += this.speedX
        this.y += this.speedY

        if (this.x > canvas.width) this.x = 0
        else if (this.x < 0) this.x = canvas.width
        if (this.y > canvas.height) this.y = 0
        else if (this.y < 0) this.y = canvas.height
      }

      draw() {
        if (!ctx) return
        ctx.fillStyle = this.color
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    function connectParticles() {
      if (!ctx) return
      for (let i = 0; i < particles.length; i++) {
        for (let j = i; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < connectionDistance) {
            const opacity = 1 - distance / connectionDistance
            ctx.strokeStyle = `rgba(0, 255, 255, ${opacity * 0.2})`
            ctx.lineWidth = 1
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.stroke()
          }
        }
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle())
    }

    function animate() {
      if (!ctx || !canvas) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      for (let i = 0; i < particles.length; i++) {
        particles[i].update()
        particles[i].draw()
      }

      connectParticles()
      requestAnimationFrame(animate)
    }

    animate()

    const handleResize = () => {
      if (!canvas) return
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 z-0" />
      <FloatingElements />
      <div className="absolute inset-0 bg-gradient-radial from-transparent to-black z-10" />

      <div className="container mx-auto px-4 z-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center"
        >
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
            <GlitchText
              text="Unity Game Developer"
              className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-600 block"
            />
            <br />
            <GlitchText text="Fujii Genji" className="text-white block" />
          </h1>
          <p className="text-xl md:text-2xl text-white/70 mb-8">
            Building the decentralized future with cutting-edge web technologies
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <AnimatedButton variant="primary" size="lg" glowColor="rgba(0, 255, 255, 0.7)">
              View My Work
            </AnimatedButton>
            <AnimatedButton
              variant="outline"
              size="lg"
              icon={<FileText className="h-5 w-5" />}
              glowColor="rgba(255, 255, 255, 0.3)"
            >
              Download Resume
            </AnimatedButton>
          </div>
        </motion.div>
      </div>

      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20 animate-bounce">
        <Link href="#about">
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full border border-white/20 bg-black/50 backdrop-blur-sm"
          >
            <ArrowDown className="h-5 w-5" />
            <span className="sr-only">Scroll Down</span>
          </Button>
        </Link>
      </div>
    </section>
  )
}
