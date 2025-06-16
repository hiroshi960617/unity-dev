"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"

interface OptimizedSkillBarProps {
  name: string
  level: number
  color: string
  index: number
}

export function OptimizedSkillBar({ name, level, color, index }: OptimizedSkillBarProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight

    const particles: Particle[] = []
    const particleCount = 8 // Reduced for performance

    class Particle {
      x: number
      y: number
      size: number
      speed: number
      opacity: number

      constructor() {
        this.x = -5
        this.y = Math.random() * canvas.height
        this.size = Math.random() * 2 + 1
        this.speed = Math.random() * 1.5 + 0.5
        this.opacity = Math.random() * 0.6 + 0.4
      }

      update() {
        this.x += this.speed
        if (this.x > canvas.width + 5) {
          this.x = -5
          this.y = Math.random() * canvas.height
        }
      }

      draw() {
        if (!ctx) return
        ctx.save()
        ctx.globalAlpha = this.opacity
        ctx.fillStyle = color.includes("cyan") ? "#00FFFF" : "#8B5CF6"
        ctx.shadowBlur = 5
        ctx.shadowColor = ctx.fillStyle
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()
      }
    }

    // Create particles
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle())
    }

    let animationId: number

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw flowing gradient
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, 0)
      gradient.addColorStop(0, "rgba(0, 255, 255, 0.1)")
      gradient.addColorStop(0.5, "rgba(139, 92, 246, 0.15)")
      gradient.addColorStop(1, "rgba(0, 255, 255, 0.1)")

      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Update and draw particles
      particles.forEach((particle) => {
        particle.update()
        particle.draw()
      })

      animationId = requestAnimationFrame(animate)
    }

    // Start animation after delay
    const timeoutId = setTimeout(() => {
      animate()
    }, index * 150)

    return () => {
      clearTimeout(timeoutId)
      cancelAnimationFrame(animationId)
    }
  }, [color, index])

  return (
    <div className="mb-6">
      <div className="flex justify-between mb-2">
        <span className="text-white font-medium">{name}</span>
        <span className="text-cyan-400 font-bold">{level}%</span>
      </div>
      <div className="relative h-3 w-full bg-white/10 rounded-full overflow-hidden border border-white/20">
        <motion.div
          className={`absolute inset-0 bg-gradient-to-r ${color} rounded-full`}
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          transition={{ duration: 1.2, delay: index * 0.1, ease: "easeOut" }}
          viewport={{ once: true }}
        />
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full rounded-full"
          style={{ width: `${level}%` }}
        />
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent rounded-full"
          animate={{
            x: ["-100%", "200%"],
          }}
          transition={{
            duration: 2.5,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
            delay: index * 0.2,
          }}
          style={{ width: "40px" }}
        />
      </div>
    </div>
  )
}
