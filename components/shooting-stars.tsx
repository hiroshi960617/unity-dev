"use client"

import { useEffect, useRef } from "react"

interface ShootingStar {
  x: number
  y: number
  length: number
  speed: number
  size: number
  color: string
  active: boolean
  angle: number
  trail: { x: number; y: number; alpha: number }[]
}

export function ShootingStars() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // Create shooting stars array
    const stars: ShootingStar[] = []
    const maxStars = 20
    const colors = ["#ffffff", "#00ffff", "#88ccff", "#8888ff", "#ff88ff"]

    // Initialize stars
    for (let i = 0; i < maxStars; i++) {
      stars.push(createShootingStar())
    }

    function createShootingStar(): ShootingStar {
      const angle = (Math.random() * Math.PI) / 4 + Math.PI / 4 // Angle between PI/4 and PI/2 (diagonal)
      return {
        x: Math.random() * canvas.width,
        y: 0,
        length: Math.floor(Math.random() * 80) + 40,
        speed: Math.random() * 10 + 5,
        size: Math.random() * 2 + 0.5,
        color: colors[Math.floor(Math.random() * colors.length)],
        active: false,
        angle: angle,
        trail: [],
      }
    }

    // Animation loop
    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Randomly activate stars
      if (Math.random() < 0.03) {
        const inactiveStar = stars.find((star) => !star.active)
        if (inactiveStar) {
          inactiveStar.active = true
          inactiveStar.x = Math.random() * canvas.width
          inactiveStar.y = 0
          inactiveStar.trail = []
          inactiveStar.angle = (Math.random() * Math.PI) / 4 + Math.PI / 4
        }
      }

      // Update and draw stars
      stars.forEach((star) => {
        if (star.active) {
          // Update position
          star.x += Math.cos(star.angle) * star.speed
          star.y += Math.sin(star.angle) * star.speed

          // Add to trail
          star.trail.push({ x: star.x, y: star.y, alpha: 1 })

          // Limit trail length
          if (star.trail.length > star.length) {
            star.trail.shift()
          }

          // Draw trail
          ctx.save()
          for (let i = 0; i < star.trail.length; i++) {
            const point = star.trail[i]
            const alpha = i / star.trail.length

            ctx.beginPath()
            ctx.arc(point.x, point.y, star.size * alpha, 0, Math.PI * 2)
            ctx.fillStyle = star.color.replace(")", `, ${alpha})`)
            ctx.shadowBlur = 10
            ctx.shadowColor = star.color
            ctx.fill()
          }
          ctx.restore()

          // Check if star is out of bounds
          if (star.y > canvas.height || star.x < 0 || star.x > canvas.width) {
            star.active = false
          }
        }
      })

      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
    }
  }, [])

  return <canvas ref={canvasRef} className="fixed inset-0 z-0 pointer-events-none" />
}
