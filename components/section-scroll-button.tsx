"use client"

import { motion } from "framer-motion"
import { ArrowDown } from "lucide-react"
import { smoothScrollTo } from "@/components/smooth-scroll"

interface SectionScrollButtonProps {
  targetId: string
  className?: string
}

export function SectionScrollButton({ targetId, className = "" }: SectionScrollButtonProps) {
  const handleClick = () => {
    smoothScrollTo(targetId)
  }

  return (
    <motion.button
      onClick={handleClick}
      className={`group relative w-10 h-10 rounded-full border border-cyan-400/30 bg-black/30 backdrop-blur-sm hover:border-cyan-400 transition-all duration-300 ${className}`}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      {/* Subtle pulsing ring */}
      <motion.div
        className="absolute inset-0 rounded-full border border-cyan-400/20"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0, 0.3],
        }}
        transition={{
          duration: 2,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />

      {/* Arrow icon */}
      <motion.div
        className="relative z-10 flex items-center justify-center w-full h-full"
        animate={{
          y: [0, 2, 0],
        }}
        transition={{
          duration: 1.5,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      >
        <ArrowDown className="w-4 h-4 text-cyan-400 group-hover:text-white transition-colors duration-300" />
      </motion.div>
    </motion.button>
  )
}
