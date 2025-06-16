"use client"

import { motion } from "framer-motion"

interface SimpleSkillBarProps {
  name: string
  level: number
  color: string
  index: number
}

export function SimpleSkillBar({ name, level, color, index }: SimpleSkillBarProps) {
  return (
    <div className="mb-4">
      <div className="flex justify-between mb-2">
        <span className="text-white font-medium">{name}</span>
        <span className="text-cyan-400 font-bold">{level}%</span>
      </div>
      <div className="relative h-2 w-full bg-white/10 rounded-full overflow-hidden">
        <motion.div
          className={`h-full bg-gradient-to-r ${color} rounded-full`}
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          transition={{ duration: 1, delay: index * 0.1 }}
          viewport={{ once: true }}
        />
      </div>
    </div>
  )
}
