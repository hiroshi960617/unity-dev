"use client"

import { useEffect, useRef } from "react"

interface Star {
  x: number
  y: number
  size: number
  opacity: number
  pulseSpeed: number
  twinklePhase: number
}

export function CosmicBackground() {
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

    // Create stars
    const stars: Star[] = []
    const starCount = Math.min(window.innerWidth, window.innerHeight) / 2

    for (let i = 0; i < starCount; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 1.5 + 0.5,
        opacity: Math.random() * 0.5 + 0.3,
        pulseSpeed: Math.random() * 0.01 + 0.005,
        twinklePhase: Math.random() * Math.PI * 2,
      })
    }

    // Animation loop
    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw stars
      stars.forEach((star) => {
        star.twinklePhase += star.pulseSpeed
        const opacity = star.opacity + Math.sin(star.twinklePhase) * 0.2

        ctx.save()
        ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`
        ctx.shadowBlur = star.size * 2
        ctx.shadowColor = "rgba(255, 255, 255, 0.5)"
        ctx.beginPath()
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()
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
