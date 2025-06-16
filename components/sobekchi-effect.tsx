"use client"

import { useEffect, useRef } from "react"

export function SobekchiEffect() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    // Matrix characters - blockchain/crypto themed
    const chars =
      "01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲンETHBTCSOL₿⟐⧫◊◈⬢⬡⬟⬠⬢⬣⬤⬥⬦⬧⬨⬩⬪⬫⬬⬭⬮⬯⬰⬱⬲⬳"
    const fontSize = 14
    const columns = Math.floor(canvas.width / fontSize)

    // Optimized drops array
    const drops: number[] = []
    for (let i = 0; i < columns; i++) {
      drops[i] = Math.random() * -100
    }

    let frame = 0

    function draw() {
      // Semi-transparent black for trail effect
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Set text properties
      ctx.fillStyle = "#00ff41" // Classic matrix green
      ctx.font = `${fontSize}px monospace`

      // Draw characters
      for (let i = 0; i < drops.length; i++) {
        // Skip some columns for performance
        if (frame % 3 !== 0 && Math.random() > 0.7) continue

        const char = chars[Math.floor(Math.random() * chars.length)]
        const x = i * fontSize
        const y = drops[i] * fontSize

        // Add glow effect for some characters
        if (Math.random() > 0.95) {
          ctx.shadowBlur = 10
          ctx.shadowColor = "#00ff41"
        } else {
          ctx.shadowBlur = 0
        }

        ctx.fillText(char, x, y)

        // Reset drop when it goes off screen
        if (y > canvas.height && Math.random() > 0.975) {
          drops[i] = 0
        }

        drops[i]++
      }

      frame++
    }

    // Optimized animation loop
    const interval = setInterval(draw, 50) // 20 FPS for performance

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    window.addEventListener("resize", handleResize)

    return () => {
      clearInterval(interval)
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return <canvas ref={canvasRef} className="fixed inset-0 z-0 pointer-events-none opacity-30" />
}
