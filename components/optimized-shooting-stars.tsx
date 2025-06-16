"use client"

import { useEffect, useRef } from "react"

interface ShootingStar {
  x: number
  y: number
  speed: number
  size: number
  active: boolean
  angle: number
  opacity: number
}

export function OptimizedShootingStars() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const stars: ShootingStar[] = []
    const maxStars = 5 // Reduced from 15

    for (let i = 0; i < maxStars; i++) {
      stars.push({
        x: 0,
        y: 0,
        speed: 0,
        size: 0,
        active: false,
        angle: 0,
        opacity: 0,
      })
    }

    function createStar(star: ShootingStar) {
      star.x = Math.random() * canvas.width
      star.y = -50
      star.speed = Math.random() * 5 + 3
      star.size = Math.random() * 2 + 1
      star.angle = Math.PI / 4
      star.opacity = 1
      star.active = true
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Spawn stars less frequently
      if (Math.random() < 0.005) {
        const inactiveStar = stars.find((star) => !star.active)
        if (inactiveStar) createStar(inactiveStar)
      }

      stars.forEach((star) => {
        if (star.active) {
          star.x += Math.cos(star.angle) * star.speed
          star.y += Math.sin(star.angle) * star.speed
          star.opacity -= 0.01

          // Simple drawing
          ctx.save()
          ctx.globalAlpha = star.opacity
          ctx.fillStyle = "#ffffff"
          ctx.beginPath()
          ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2)
          ctx.fill()
          ctx.restore()

          if (star.y > canvas.height || star.opacity <= 0) {
            star.active = false
          }
        }
      })

      requestAnimationFrame(animate)
    }

    animate()

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    window.addEventListener("resize", handleResize)

    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return <canvas ref={canvasRef} className="fixed inset-0 z-0 pointer-events-none" />
}
