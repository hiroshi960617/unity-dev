"use client"

import Link from "next/link"
import { ArrowRight, Github } from "lucide-react"

import { Button } from "@/components/ui/button"
import { AnimatedButton } from "@/components/ui/animated-button"
import { EnhancedHero } from "@/components/enhanced-hero"
import { AboutSection } from "@/components/about-section"
import { SkillsSection } from "@/components/skills-section"
import { ProjectsSection } from "@/components/projects-section"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"
import { SimpleBackground } from "@/components/simple-background"
import { OptimizedShootingStars } from "@/components/optimized-shooting-stars"
import { SobekchiEffect } from "@/components/sobekchi-effect"
import { ScrollToTopButton } from "@/components/scroll-to-top-button"
import { smoothScrollTo } from "@/components/smooth-scroll"

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white">
      <SimpleBackground />
      <OptimizedShootingStars />
      <SobekchiEffect />
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 border-b border-white/10">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="text-xl font-bold tracking-tighter">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-600">
              DEV<span className="text-white">.FGenji</span>
            </span>
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            <button
              onClick={() => smoothScrollTo("about")}
              className="text-sm text-white/70 hover:text-white transition-colors cursor-pointer"
            >
              About
            </button>
            <button
              onClick={() => smoothScrollTo("skills")}
              className="text-sm text-white/70 hover:text-white transition-colors cursor-pointer"
            >
              Skills
            </button>
            <button
              onClick={() => smoothScrollTo("projects")}
              className="text-sm text-white/70 hover:text-white transition-colors cursor-pointer"
            >
              Projects
            </button>
            <button
              onClick={() => smoothScrollTo("contact")}
              className="text-sm text-white/70 hover:text-white transition-colors cursor-pointer"
            >
              Contact
            </button>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="https://github.com" target="_blank" rel="noopener noreferrer">
              <Button variant="ghost" size="icon" className="rounded-full text-white/70 hover:text-white">
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </Button>
            </Link>
            <button onClick={() => smoothScrollTo("contact")}>
              <AnimatedButton variant="primary" icon={<ArrowRight className="h-4 w-4" />}>
                Contact Me
              </AnimatedButton>
            </button>
          </div>
        </div>
      </header>
      <main>
        <EnhancedHero />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <ContactSection />
      </main>
      <Footer />
      <ScrollToTopButton />
    </div>
  )
}
