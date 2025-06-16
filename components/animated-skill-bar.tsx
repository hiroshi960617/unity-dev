"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"

interface AnimatedSkillBarProps {
  name: string
  level: number
  color: string
  index: number
}

export function AnimatedSkillBar({ name, level, color, index }: AnimatedSkillBarProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight

    const particles: Particle[] = []
    const particleCount = 15

    class Particle {
      x: number
      y: number
      size: number
      speed: number
      opacity: number
      color: string

      constructor() {
        this.x = -10
        this.y = Math.random() * canvas.height
        this.size = Math.random() * 3 + 1
        this.speed = Math.random() * 2 + 1
        this.opacity = Math.random() * 0.8 + 0.2
        this.color = color.includes("cyan") ? "#00FFFF" : color.includes("purple") ? "#8B5CF6" : "#FFFFFF"
      }

      update() {
        this.x += this.speed
        if (this.x > canvas.width + 10) {
          this.x = -10
          this.y = Math.random() * canvas.height
        }
      }

      draw() {
        if (!ctx) return
        ctx.save()
        ctx.globalAlpha = this.opacity
        ctx.fillStyle = this.color
        ctx.shadowBlur = 10
        ctx.shadowColor = this.color
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
      gradient.addColorStop(0.5, "rgba(139, 92, 246, 0.2)")
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

    // Start animation after a delay based on index
    const timeoutId = setTimeout(() => {
      animate()
    }, index * 200)

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
      <div className="relative h-3 w-full bg-white/5 rounded-full overflow-hidden border border-white/10">
        <motion.div
          className={`absolute inset-0 bg-gradient-to-r ${color} rounded-full`}
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          transition={{ duration: 1.5, delay: index * 0.1, ease: "easeOut" }}
          viewport={{ once: true }}
        />
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full rounded-full"
          style={{ width: `${level}%` }}
        />
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent rounded-full"
          animate={{
            x: ["-100%", "200%"],
          }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
            delay: index * 0.2,
          }}
          style={{ width: "50px" }}
        />
      </div>
    </div>
  )
}
