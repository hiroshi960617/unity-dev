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
  trail: { x: number; y: number; alpha: number; size: number }[]
  brightness: number
  fadeSpeed: number
}

export function RealisticShootingStars() {
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
    const maxStars = 15
    const colors = ["#ffffff", "#e6f3ff", "#cce7ff", "#b3dbff", "#99cfff", "#80c3ff", "#66b7ff"]

    // Initialize stars
    for (let i = 0; i < maxStars; i++) {
      stars.push(createShootingStar())
    }

    function createShootingStar(): ShootingStar {
      // More realistic angles - meteors typically fall at 15-75 degree angles
      const angle = (Math.random() * Math.PI) / 3 + Math.PI / 6 // 30-90 degrees
      const startX = Math.random() * (canvas.width + 200) - 100
      const startY = -50

      return {
        x: startX,
        y: startY,
        length: Math.floor(Math.random() * 120) + 60, // Longer trails
        speed: Math.random() * 8 + 4, // Varied speeds
        size: Math.random() * 3 + 1,
        color: colors[Math.floor(Math.random() * colors.length)],
        active: false,
        angle: angle,
        trail: [],
        brightness: Math.random() * 0.5 + 0.5, // Varied brightness
        fadeSpeed: Math.random() * 0.02 + 0.01,
      }
    }

    // Animation loop
    function animate() {
      // Fade out previous frame instead of clearing completely for more realistic trails
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Randomly activate stars with more realistic frequency
      if (Math.random() < 0.008) {
        // Less frequent but more realistic
        const inactiveStar = stars.find((star) => !star.active)
        if (inactiveStar) {
          const newStar = createShootingStar()
          Object.assign(inactiveStar, newStar)
          inactiveStar.active = true
        }
      }

      // Update and draw stars
      stars.forEach((star) => {
        if (star.active) {
          // Update position with more realistic physics
          const gravity = 0.1
          star.speed += gravity * 0.1 // Slight acceleration
          star.x += Math.cos(star.angle) * star.speed
          star.y += Math.sin(star.angle) * star.speed

          // Add to trail with size variation
          star.trail.push({
            x: star.x,
            y: star.y,
            alpha: star.brightness,
            size: star.size,
          })

          // Limit trail length
          if (star.trail.length > star.length) {
            star.trail.shift()
          }

          // Draw trail with more realistic fading
          ctx.save()
          for (let i = 0; i < star.trail.length; i++) {
            const point = star.trail[i]
            const progress = i / star.trail.length
            const alpha = progress * star.brightness * 0.8
            const size = point.size * (0.3 + progress * 0.7)

            // Main star body
            ctx.beginPath()
            ctx.arc(point.x, point.y, size, 0, Math.PI * 2)

            // Create gradient for more realistic glow
            const gradient = ctx.createRadialGradient(point.x, point.y, 0, point.x, point.y, size * 3)
            gradient.addColorStop(0, `rgba(255, 255, 255, ${alpha})`)
            gradient.addColorStop(0.3, `${star.color.replace(")", `, ${alpha * 0.8})`)}`)
            gradient.addColorStop(1, `rgba(255, 255, 255, 0)`)

            ctx.fillStyle = gradient
            ctx.fill()

            // Add bright core
            if (i === star.trail.length - 1) {
              ctx.beginPath()
              ctx.arc(point.x, point.y, size * 0.3, 0, Math.PI * 2)
              ctx.fillStyle = `rgba(255, 255, 255, ${alpha * 1.5})`
              ctx.shadowBlur = 15
              ctx.shadowColor = star.color
              ctx.fill()
            }
          }
          ctx.restore()

          // Fade out star
          star.brightness -= star.fadeSpeed

          // Check if star is out of bounds or faded
          if (star.y > canvas.height + 100 || star.x < -100 || star.x > canvas.width + 100 || star.brightness <= 0) {
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
