"use client"

import { motion } from "framer-motion"
import { ArrowDown } from "lucide-react"
import { smoothScrollTo } from "@/components/smooth-scroll"

interface AnimatedScrollButtonProps {
  targetId: string
  className?: string
}

export function AnimatedScrollButton({ targetId, className = "" }: AnimatedScrollButtonProps) {
  const handleClick = () => {
    smoothScrollTo(targetId)
  }

  return (
    <motion.button
      onClick={handleClick}
      className={`group relative w-12 h-12 rounded-full border-2 border-white/30 bg-black/50 backdrop-blur-sm hover:border-cyan-400 hover:bg-cyan-400/10 transition-all duration-300 ${className}`}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 1 }}
    >
      {/* Pulsing ring effect */}
      <motion.div
        className="absolute inset-0 rounded-full border-2 border-cyan-400/50"
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.5, 0, 0.5],
        }}
        transition={{
          duration: 2,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />

      {/* Glowing background */}
      <motion.div
        className="absolute inset-0 rounded-full bg-cyan-400/20"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      />

      {/* Arrow icon */}
      <motion.div
        className="relative z-10 flex items-center justify-center w-full h-full"
        animate={{
          y: [0, 3, 0],
        }}
        transition={{
          duration: 1.5,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      >
        <ArrowDown className="w-5 h-5 text-white group-hover:text-cyan-400 transition-colors duration-300" />
      </motion.div>

      {/* Hover glow effect */}
      <motion.div
        className="absolute inset-0 rounded-full"
        initial={{ boxShadow: "0 0 0px rgba(0, 255, 255, 0)" }}
        whileHover={{ boxShadow: "0 0 20px rgba(0, 255, 255, 0.5)" }}
        transition={{ duration: 0.3 }}
      />
    </motion.button>
  )
}
