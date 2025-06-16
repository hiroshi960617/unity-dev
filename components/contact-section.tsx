"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Github, Mail, Send } from "lucide-react"
import { AnimatedButton } from "@/components/ui/animated-button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"

export function ContactSection() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log(formState)
    // Reset form
    setFormState({ name: "", email: "", message: "" })
    // Show success message
    alert("Message sent successfully!")
  }

  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault()
  //   setIsSubmitting(true)
  //   setSubmitStatus({ type: null, message: '' })

  //   try {
  //     const res = await fetch('/api/contact', {
  //       method: 'POST',
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify(formState),
  //     })
  
  //     const data = await res.json()

  //     if (res.ok) {
  //       setSubmitStatus({
  //         type: 'success',
  //         message: 'Message sent successfully! I will get back to you soon.'
  //       })
  //       setFormState({ name: "", email: "", message: "" })
  //     } else {
  //       setSubmitStatus({
  //         type: 'error',
  //         message: data.error || 'Failed to send message. Please try again.'
  //       })
  //     }
  //   } catch (error) {
  //     console.error('Error:', error)
  //     setSubmitStatus({
  //       type: 'error',
  //       message: 'Something went wrong. Please try again later.'
  //     })
  //   } finally {
  //     setIsSubmitting(false)
  //   }
  // }
  
  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: "fgenji@outlook.com",
      href: "mailto:fgenji@outlook.com",
      color: "from-cyan-500 to-blue-500",
    },
    {
      icon: Github,
      label: "GitHub",
      value: "github.com",
      href: "https://github.com",
      color: "from-gray-500 to-gray-700",
    },
  ]

  // Ultra-lightweight animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.3,
        staggerChildren: 0.05,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.2 },
    },
  }

  const titleVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.3, ease: "easeOut" },
    },
  }

  return (
    <section id="contact" className="py-20 bg-black/10 relative overflow-hidden">
      {/* Lightweight background gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(128,0,255,0.03),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_70%,rgba(0,255,255,0.02),transparent_50%)]" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={containerVariants}
          className="max-w-6xl mx-auto"
        >
          {/* Animated Title Section */}
          <motion.div variants={titleVariants} className="text-center mb-16 relative">
            <motion.h2
              className="text-3xl md:text-4xl font-bold mb-2 relative inline-block"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
            >
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-600">
                Get In Touch
              </span>

              {/* Subtle glow effect on hover */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 to-purple-600/20 blur-xl opacity-0"
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.2 }}
              />
            </motion.h2>

            {/* Animated underline */}
            <motion.div
              className="w-20 h-1 bg-gradient-to-r from-cyan-500 to-purple-600 mx-auto relative overflow-hidden"
              initial={{ width: 0 }}
              whileInView={{ width: 80 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              viewport={{ once: true }}
            >
              {/* Flowing light effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                animate={{ x: ["-100%", "200%"] }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "linear",
                  delay: 0.5,
                }}
                style={{ width: "50%" }}
              />
            </motion.div>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Left Column - Let's Connect */}
            <motion.div variants={itemVariants} className="space-y-8">
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
                viewport={{ once: true }}
              >
                <h3 className="text-2xl font-bold mb-6 text-white">Let's Connect</h3>
                <p className="text-white/70 text-lg leading-relaxed">
                  I'm currently available for freelance work and full-time positions. If you have a project or want to discuss potential collaborations, feel free to reach out.
                </p>
              </motion.div>

              <div className="space-y-4">
                {contactInfo.map((info, index) => (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    whileHover={{ scale: 1.01, x: 5 }}
                    whileTap={{ scale: 0.99 }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  >
                    <Card className="bg-black/30 border-white/10 hover:bg-black/40 hover:border-cyan-500/30 transition-all duration-200 group relative overflow-hidden">
                      {/* Subtle scan line effect */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/5 to-transparent opacity-0 group-hover:opacity-100"
                        animate={{ x: ["-100%", "200%"] }}
                        transition={{
                          duration: 1.5,
                          repeat: Number.POSITIVE_INFINITY,
                          ease: "linear",
                        }}
                        style={{ width: "30%" }}
                      />

                      <CardContent className="p-6 relative z-10">
                        <a
                          href={info.href}
                          target={info.href.startsWith("http") ? "_blank" : undefined}
                          rel={info.href.startsWith("http") ? "noopener noreferrer" : undefined}
                          className="flex items-center gap-4 w-full"
                        >
                          <motion.div
                            className={`w-14 h-14 rounded-full bg-gradient-to-r ${info.color} flex items-center justify-center flex-shrink-0 group-hover:shadow-lg transition-all duration-200`}
                            whileHover={{ rotate: 3, scale: 1.05 }}
                            transition={{ type: "spring", stiffness: 400, damping: 25 }}
                          >
                            <info.icon className="h-7 w-7 text-white" />
                          </motion.div>
                          <div className="flex-1 min-w-0">
                            <div className="text-sm text-white/50 mb-1 font-medium">{info.label}</div>
                            <div className="text-white text-lg font-medium truncate group-hover:text-cyan-300 transition-colors duration-200">
                              {info.value}
                            </div>
                          </div>
                        </a>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Right Column - Send Message Form */}
            <motion.div variants={itemVariants}>
              <motion.h3
                className="text-2xl font-bold mb-6 text-white"
                initial={{ opacity: 0, x: 10 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
                viewport={{ once: true }}
              >
                Send Me a Message
              </motion.h3>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="bg-black/30 border-white/10 relative overflow-hidden group">
                  {/* Subtle border glow */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    animate={{
                      background: [
                        "linear-gradient(90deg, rgba(6,182,212,0.1) 0%, rgba(168,85,247,0.1) 50%, rgba(6,182,212,0.1) 100%)",
                        "linear-gradient(90deg, rgba(168,85,247,0.1) 0%, rgba(6,182,212,0.1) 50%, rgba(168,85,247,0.1) 100%)",
                      ],
                    }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                  />

                  <CardContent className="p-8 relative z-10">
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <motion.div
                        initial={{ opacity: 0, x: 10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.2, delay: 0.1 }}
                        viewport={{ once: true }}
                      >
                        <Input
                          name="name"
                          placeholder="Your Name"
                          value={formState.name}
                          onChange={handleChange}
                          className="bg-black/20 border-white/20 focus-visible:ring-cyan-500 focus-visible:border-cyan-500 transition-all duration-200 h-12 text-white placeholder:text-white/50"
                          required
                          disabled={isSubmitting}
                        />
                      </motion.div>
                      <motion.div
                        initial={{ opacity: 0, x: 10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.2, delay: 0.15 }}
                        viewport={{ once: true }}
                      >
                        <Input
                          name="email"
                          type="email"
                          placeholder="Your Email"
                          value={formState.email}
                          onChange={handleChange}
                          className="bg-black/20 border-white/20 focus-visible:ring-cyan-500 focus-visible:border-cyan-500 transition-all duration-200 h-12 text-white placeholder:text-white/50"
                          required
                          disabled={isSubmitting}
                        />
                      </motion.div>
                      <motion.div
                        initial={{ opacity: 0, x: 10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.2, delay: 0.2 }}
                        viewport={{ once: true }}
                      >
                        <Textarea
                          name="message"
                          placeholder="Your Message"
                          value={formState.message}
                          onChange={handleChange}
                          className="bg-black/20 border-white/20 focus-visible:ring-cyan-500 focus-visible:border-cyan-500 min-h-[120px] transition-all duration-200 text-white placeholder:text-white/50 resize-none"
                          required
                          disabled={isSubmitting}
                        />
                      </motion.div>
                      {submitStatus.type && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className={`p-3 rounded-md ${
                            submitStatus.type === 'success'
                              ? 'bg-green-500/20 text-green-300'
                              : 'bg-red-500/20 text-red-300'
                          }`}
                        >
                          {submitStatus.message}
                        </motion.div>
                      )}
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.2, delay: 0.25 }}
                        viewport={{ once: true }}
                      >
                        <AnimatedButton
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full"
                        >
                          {isSubmitting ? (
                            <div className="flex items-center justify-center gap-2">
                              <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                              Sending...
                            </div>
                          ) : (
                            <div className="flex items-center justify-center gap-2">
                              <Send className="w-4 h-4" />
                              Send Message
                            </div>
                          )}
                        </AnimatedButton>
                      </motion.div>
                    </form>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
