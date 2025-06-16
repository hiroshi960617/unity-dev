"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"

interface DigitalRainSkillsProps {
  name: string
  level: number
  color: string
  index: number
}

export function DigitalRainSkills({ name, level, color, index }: DigitalRainSkillsProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight

    const chars = "01"
    const fontSize = 8
    const columns = Math.floor(canvas.width / fontSize)
    const drops: number[] = []

    for (let i = 0; i < columns; i++) {
      drops[i] = Math.random() * -20
    }

    let animationId: number

    function animate() {
      ctx.fillStyle = "rgba(0, 0, 0, 0.1)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      ctx.fillStyle = color.includes("cyan") ? "#00ffff" : "#8b5cf6"
      ctx.font = `${fontSize}px monospace`

      for (let i = 0; i < drops.length; i++) {
        if (Math.random() > 0.9) {
          const char = chars[Math.floor(Math.random() * chars.length)]
          const x = i * fontSize
          const y = drops[i] * fontSize

          ctx.fillText(char, x, y)

          if (y > canvas.height && Math.random() > 0.95) {
            drops[i] = 0
          }

          drops[i]++
        }
      }

      animationId = requestAnimationFrame(animate)
    }

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
          className="absolute inset-0 w-full h-full rounded-full opacity-60"
          style={{ width: `${level}%` }}
        />
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent rounded-full"
          animate={{
            x: ["-100%", "200%"],
          }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
            delay: index * 0.3,
          }}
          style={{ width: "30px" }}
        />
      </div>
    </div>
  )
}
