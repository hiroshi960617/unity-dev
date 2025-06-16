import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json()

    // Input validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email and message are required' },
        { status: 400 }
      )
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      )
    }

    // Check if environment variables are set
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS || !process.env.EMAIL_TO) {
      console.error('Missing email configuration')
      return NextResponse.json(
        { error: 'Email service not configured' },
        { status: 500 }
      )
    }

    // Create transporter with direct IP configuration
    const transporter = nodemailer.createTransport({
      host: '74.125.24.108', // Gmail's SMTP server IP
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      tls: {
        rejectUnauthorized: false,
        servername: 'smtp.gmail.com'
      },
      pool: true,
      maxConnections: 1,
      maxMessages: 3,
      socketTimeout: 10000,
      connectionTimeout: 10000,
      greetingTimeout: 10000,
      debug: true,
      logger: true
    })

    // Test the connection
    try {
      await transporter.verify()
    } catch (error) {
      console.error('SMTP Connection Error:', error)
      return NextResponse.json(
        { error: 'Could not connect to email server. Please try again later.' },
        { status: 500 }
      )
    }

    // Prepare email content
    const mailOptions = {
      from: {
        name: 'Portfolio Contact',
        address: process.env.EMAIL_USER
      },
      to: process.env.EMAIL_TO,
      subject: `📩 New message from ${name}`,
      text: `From: ${name} <${email}>\n\nMessage:\n${message}`,
      replyTo: email,
    }

    // Send the email
    try {
      const info = await transporter.sendMail(mailOptions)
      console.log('Email sent successfully:', info.messageId)
      return NextResponse.json({ success: true })
    } catch (error) {
      console.error('Email sending error:', error)
      return NextResponse.json(
        { error: 'Failed to send email. Please try again later.' },
        { status: 500 }
      )
    }
  } catch (err) {
    console.error('General error:', err)
    return NextResponse.json(
      { error: 'An unexpected error occurred. Please try again later.' },
      { status: 500 }
    )
  }
}
