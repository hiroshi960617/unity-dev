"use client"

import Link from "next/link"
import { Github, Mail } from "lucide-react"
import { motion } from "framer-motion"
import { AnimatedButton } from "@/components/ui/animated-button"

export function Footer() {
  return (
    <footer className="bg-black/20 backdrop-blur-sm border-t border-white/20 py-10 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-t from-purple-900/10 to-transparent" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <motion.div
            className="mb-6 md:mb-0"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Link href="/" className="text-xl font-bold tracking-tighter">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-600">
                DEV<span className="text-white">.FGenji</span>
              </span>
            </Link>
            <p className="text-white/60 mt-2 text-sm"></p>
          </motion.div>

          <motion.div
            className="flex gap-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            {[
              { icon: Github, href: "https://github.com", label: "GitHub" },
              { icon: Mail, href: "mailto:fgenji@outlook.com", label: "Email" },
            ].map((social, index) => (
              <motion.div
                key={social.label}
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <Link href={social.href} target="_blank" rel="noopener noreferrer">
                  <AnimatedButton
                    variant="ghost"
                    size="icon"
                    className="rounded-full border border-white/20"
                    icon={<social.icon className="h-5 w-5" />}
                    glowColor="rgba(0, 255, 255, 0.3)"
                  >
                    <span className="sr-only">{social.label}</span>
                  </AnimatedButton>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>

        <motion.div
          className="border-t border-white/20 mt-6 pt-6 text-center text-white/60 text-sm"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          © {new Date().getFullYear()} - All rights reserved.
        </motion.div>
      </div>
    </footer>
  )
}
