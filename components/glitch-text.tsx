"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

interface GlitchTextProps {
  text: string
  className?: string
}

export function GlitchText({ text, className = "" }: GlitchTextProps) {
  const [glitchText, setGlitchText] = useState(text)

  useEffect(() => {
    const glitchChars = "!@#$%^&*()_+-=[]{}|;:,.<>?01"
    let interval: NodeJS.Timeout

    const startGlitch = () => {
      let iterations = 0
      interval = setInterval(() => {
        setGlitchText((prev) =>
          prev
            .split("")
            .map((char, index) => {
              if (index < iterations) {
                return text[index]
              }
              return glitchChars[Math.floor(Math.random() * glitchChars.length)]
            })
            .join(""),
        )

        if (iterations >= text.length) {
          clearInterval(interval)
          setGlitchText(text)
        }

        iterations += 1 / 2 // Faster iteration
      }, 20) // Faster interval
    }

    // Much shorter initial delay
    const glitchTimeout = setTimeout(
      () => {
        startGlitch()
      },
      Math.random() * 800 + 200, // Reduced from 5000+2000 to 800+200
    )

    // More frequent glitch effects
    const recurringGlitch = setInterval(() => {
      if (Math.random() > 0.7) {
        // 30% chance every interval
        startGlitch()
      }
    }, 3000) // Every 3 seconds instead of random long delays

    return () => {
      clearInterval(interval)
      clearTimeout(glitchTimeout)
      clearInterval(recurringGlitch)
    }
  }, [text])

  return (
    <motion.span
      className={className}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }} // Faster fade-in
    >
      {glitchText}
    </motion.span>
  )
}
