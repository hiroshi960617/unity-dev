"use client"

import { type ReactNode, useState } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface AnimatedButtonProps {
  children: ReactNode
  className?: string
  variant?: "primary" | "outline" | "ghost"
  size?: "default" | "sm" | "lg" | "icon"
  onClick?: () => void
  disabled?: boolean
  type?: "button" | "submit" | "reset"
  icon?: ReactNode
  glowColor?: string
}

export function AnimatedButton({
  children,
  className,
  variant = "primary",
  size = "default",
  onClick,
  disabled = false,
  type = "button",
  icon,
  glowColor = "rgba(0, 255, 255, 0.5)",
}: AnimatedButtonProps) {
  const [isHovered, setIsHovered] = useState(false)

  const getVariantClasses = () => {
    switch (variant) {
      case "primary":
        return "bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white"
      case "outline":
        return "border border-white/20 text-white hover:bg-white/10"
      case "ghost":
        return "text-white/70 hover:text-white hover:bg-white/10"
      default:
        return "bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white"
    }
  }

  const getSizeClasses = () => {
    switch (size) {
      case "sm":
        return "text-sm px-3 py-1.5"
      case "lg":
        return "text-lg px-8 py-4"
      case "icon":
        return "w-10 h-10 p-0"
      default:
        return "px-4 py-2"
    }
  }

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "relative rounded-full font-medium transition-all duration-300 flex items-center justify-center overflow-hidden",
        getVariantClasses(),
        getSizeClasses(),
        disabled && "opacity-50 cursor-not-allowed",
        className,
      )}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      {variant === "primary" && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-purple-500 opacity-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 0.5 : 0 }}
          transition={{ duration: 0.3 }}
        />
      )}

      {isHovered && (
        <motion.div
          className="absolute inset-0 rounded-full"
          initial={{ boxShadow: `0 0 0px ${glowColor}` }}
          animate={{ boxShadow: `0 0 20px ${glowColor}` }}
          transition={{ duration: 0.3 }}
        />
      )}

      <motion.div
        className="absolute inset-0 bg-black/10"
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 0.2 : 0 }}
        transition={{ duration: 0.3 }}
      />

      <motion.div className="relative flex items-center justify-center gap-2">
        {icon && (
          <motion.span animate={{ rotate: isHovered ? 360 : 0 }} transition={{ duration: 0.5 }}>
            {icon}
          </motion.span>
        )}
        {children}
      </motion.div>

      {variant === "primary" && (
        <motion.div
          className="absolute -inset-1 rounded-full bg-gradient-to-r from-cyan-500/20 to-purple-600/20 blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />
      )}
    </motion.button>
  )
}
