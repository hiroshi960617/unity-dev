'use client'

import { useState } from 'react'

export default function ContactPage() {
  const [formState, setFormState] = useState({ name: '', email: '', message: '' })
  const [loading, setLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState({ ...formState, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formState),
      })

      if (res.ok) {
        alert('Message sent successfully!')
        setFormState({ name: '', email: '', message: '' })
      } else {
        alert('Failed to send message.')
      }
    } catch (err) {
      console.error(err)
      alert('Something went wrong.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Contact Me</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          name="name"
          value={formState.name}
          onChange={handleChange}
          placeholder="Your Name"
          required
          className="p-2 border rounded"
        />
        <input
          name="email"
          type="email"
          value={formState.email}
          onChange={handleChange}
          placeholder="Your Email"
          required
          className="p-2 border rounded"
        />
        <textarea
          name="message"
          value={formState.message}
          onChange={handleChange}
          placeholder="Your Message"
          rows={5}
          required
          className="p-2 border rounded"
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          {loading ? 'Sending...' : 'Send Message'}
        </button>
      </form>
    </div>
  )
}
