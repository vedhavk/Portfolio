"use client"

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import Navbar from './Navbar'

export default function Hero() {
  const avatarRef = useRef<HTMLDivElement>(null)
  const roles = ['Frontend Developer', 'Full Stack Developer', 'AI / ML Developer']
  const [roleIndex, setRoleIndex] = useState(0)

  const [projectsPos, setProjectsPos] = useState({ x: 0, y: 0 })
  const [expPos, setExpPos] = useState({ x: 0, y: 0 })

  const handleFleeProjects = () => {
    const width = window.innerWidth
    const height = window.innerHeight
    const padding = 120
    const randomX = Math.random() * (width - 2 * padding) + padding
    const randomY = Math.random() * (height - 2 * padding) + padding

    // Relative to left: 15%, bottom: 15% (top: 85%)
    const originalX = width * 0.15 + 70
    const originalY = height * 0.85
    setProjectsPos({
      x: randomX - originalX,
      y: randomY - originalY
    })
  }

  const handleFleeExp = () => {
    const width = window.innerWidth
    const height = window.innerHeight
    const padding = 120
    const randomX = Math.random() * (width - 2 * padding) + padding
    const randomY = Math.random() * (height - 2 * padding) + padding

    // Relative to right: 15% (left: 85%), bottom: 15% (top: 85%)
    const originalX = width * 0.85 - 70
    const originalY = height * 0.85
    setExpPos({
      x: randomX - originalX,
      y: randomY - originalY
    })
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex(prev => (prev + 1) % roles.length)
    }, 2200)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    let animFrame: number
    let cx = 0, cy = 0
    let mouseX = window.innerWidth / 2
    let mouseY = window.innerHeight / 2

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t

    function animate() {
      if (!avatarRef.current) return
      const rect = avatarRef.current.getBoundingClientRect()
      const dx = (mouseX - (rect.left + rect.width / 2))  / (window.innerWidth / 2)
      const dy = (mouseY - (rect.top  + rect.height / 2)) / (window.innerHeight / 2)
      cx = lerp(cx, dx * 18, 0.07)
      cy = lerp(cy, dy * 18, 0.07)
      const tx = lerp(0, dx * 28, 0.07)
      const ty = lerp(0, dy * 28, 0.07)
      avatarRef.current.style.transform = `
        translate(calc(-50% + ${tx.toFixed(2)}px), calc(-44% + ${ty.toFixed(2)}px))
        rotateY(${cx.toFixed(2)}deg)
        rotateX(${(-cy).toFixed(2)}deg)
      `
      animFrame = requestAnimationFrame(animate)
    }

    const onMove = (e: MouseEvent) => { mouseX = e.clientX; mouseY = e.clientY }
    window.addEventListener('mousemove', onMove)
    animate()

    // mobile gyroscope fallback
    const onOrient = (e: DeviceOrientationEvent) => {
      if (e.gamma === null) return
      mouseX = window.innerWidth  / 2 + ((e.gamma ?? 0) / 45) * window.innerWidth  / 2
      mouseY = window.innerHeight / 2 + ((e.beta  ?? 0) / 45) * window.innerHeight / 2
    }
    window.addEventListener('deviceorientation', onOrient)

    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('deviceorientation', onOrient)
      cancelAnimationFrame(animFrame)
    }
  }, [])

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>, targetId: string) => {
    e.preventDefault()

    if (targetId === 'contact') {
      window.dispatchEvent(new CustomEvent('open-contact'))
    }

    setTimeout(() => {
      const element = document.getElementById(targetId)
      if (!element) return

      const offset = 0
      const targetPosition = element.getBoundingClientRect().top + window.scrollY - offset
      const startPosition = window.scrollY
      const distance = targetPosition - startPosition
      const duration = 1250 // fluid 1.25s scroll for water-like flow
      let start: number | null = null

      const easeOutQuint = (t: number) => 1 - Math.pow(1 - t, 5)

      const step = (timestamp: number) => {
        if (!start) start = timestamp
        const progress = Math.min((timestamp - start) / duration, 1)
        window.scrollTo(0, startPosition + distance * easeOutQuint(progress))
        if (progress < 1) {
          window.requestAnimationFrame(step)
        }
      }

      window.requestAnimationFrame(step)
    }, 0)
  }

  return (
    <section id="home" className="relative w-full h-screen bg-[#0a0a0a]">

      {/* Navbar is absolute-positioned inside this relative section — scrolls away with Hero */}
      <Navbar />

      {/* Giant headline — wipes left to right after avatar */}
      <motion.h1 
        initial={{ clipPath: 'inset(0 100% 0 0)', opacity: 1 }} 
        animate={{ clipPath: 'inset(0 0% 0 0)', opacity: 1 }} 
        transition={{ delay: 1.6, duration: 1.0, ease: 'easeInOut' }}
        className="absolute top-[28%] left-1/2 -translate-x-1/2 -translate-y-1/2 text-center text-[#c9c5bc] z-[1] whitespace-nowrap leading-none m-0 pointer-events-none"
        style={{
          fontFamily: 'var(--font-bebas-neue)',
          fontSize: 'clamp(3rem, 12vw, 12rem)'
        }}
      >
        HI, I&apos;M VEDHA
      </motion.h1>

      {/* Location Subtext */}
      <motion.p
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 2.4, duration: 0.8 }}
        className="absolute top-[38%] left-[60%] text-[#888] text-[0.72rem] uppercase tracking-[0.2em] font-mono z-20 pointer-events-none select-none whitespace-nowrap"
      >
        I&apos;m from Kozhikode, Kerala 
      </motion.p>

      {/* Avatar image — appears first */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.85 }} 
        animate={{ opacity: 1, scale: 1 }} 
        transition={{ delay: 0.2, duration: 1.0, ease: 'easeOut' }}
        className="absolute top-[63%] left-1/2 z-10 w-[clamp(200px,28vw,400px)]"
        style={{ perspective: '1000px', transform: 'translate(-50%, -46%)' }}
      >
        <div ref={avatarRef} className="w-full will-change-transform" >
          <Image 
            src="/about_img copy.png" 
            alt="Avatar" 
            width={800} 
            height={800} 
            className="w-full h-auto object-contain pointer-events-none"
            priority
          />
        </div>
      </motion.div>

      {/* Cycling role tagline */}
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.8, duration: 0.8 }}
        className="absolute top-1/2 left-[8%] -translate-y-1/2 z-20"
      >
        <AnimatePresence mode="wait">
          <motion.p
            key={roleIndex}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -14 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            className="uppercase text-[#888] leading-[1.8] font-mono tracking-[0.12em] whitespace-nowrap" style={{ fontSize: 'clamp(0.85rem, 1.4vw, 1.2rem)' }}
          >
            {roles[roleIndex]}
          </motion.p>
        </AnimatePresence>
      </motion.div>

      {/* CTA button */}
      <motion.button 
        onClick={(e) => handleNavClick(e, 'contact')}
        initial={{ opacity: 0, y: 28, rotate: -10 }} 
        animate={{ opacity: 1, y: 0, rotate: -10 }} 
        transition={{ delay: 3.0, duration: 0.8 }}
        className="absolute top-1/2 right-[8%] -translate-y-1/2 rounded-full text-white uppercase text-[0.78rem] font-mono font-bold tracking-[0.16em] px-7 py-2.5 z-20 hover:scale-105 hover:rotate-[-8deg] transition-all border border-white/50"
        style={{ 
          background: 'linear-gradient(90deg, #05010a 0%, #b80085 45%, #e65c00 100%)',
          boxShadow: '0 0 25px rgba(184, 0, 133, 0.4)'
        }}
      >
        CONTACT ME
      </motion.button>

      {/* 5+ Projects (Fleeing Stat) */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, x: projectsPos.x, y: projectsPos.y }}
        transition={{ 
          type: 'spring', 
          stiffness: 300, 
          damping: 20,
          opacity: { delay: 3.2, duration: 0.8 },
          x: { type: 'spring', stiffness: 450, damping: 18 },
          y: { type: 'spring', stiffness: 450, damping: 18 }
        }}
        onMouseEnter={handleFleeProjects}
        className="absolute bottom-[15%] left-[15%] z-20 cursor-default select-none pointer-events-auto"
      >
        <div className="flex flex-col items-center justify-center p-4 border border-white/10 bg-black/60 backdrop-blur-md rounded-xl min-w-[110px] hover:border-[#c471ed]/30 transition-all select-none">
          <span className="text-[1.6rem] font-bold text-[#c9c5bc] leading-none" style={{ fontFamily: 'var(--font-bebas-neue)' }}>5+</span>
          <span className="text-[0.52rem] tracking-[0.2em] text-[#888] font-mono uppercase mt-1">Projects</span>
        </div>
      </motion.div>

      {/* 2+ Years Experience (Fleeing Stat) */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, x: expPos.x, y: expPos.y }}
        transition={{ 
          type: 'spring', 
          stiffness: 300, 
          damping: 20,
          opacity: { delay: 3.4, duration: 0.8 },
          x: { type: 'spring', stiffness: 450, damping: 18 },
          y: { type: 'spring', stiffness: 450, damping: 18 }
        }}
        onMouseEnter={handleFleeExp}
        className="absolute bottom-[15%] right-[15%] z-20 cursor-default select-none pointer-events-auto"
      >
        <div className="flex flex-col items-center justify-center p-4 border border-white/10 bg-black/60 backdrop-blur-md rounded-xl min-w-[110px] hover:border-[#f64f59]/30 transition-all select-none">
          <span className="text-[1.6rem] font-bold text-[#c9c5bc] leading-none" style={{ fontFamily: 'var(--font-bebas-neue)' }}>2+</span>
          <span className="text-[0.52rem] tracking-[0.2em] text-[#888] font-mono uppercase mt-1">Years Exp</span>
        </div>
      </motion.div>
    </section>
  )
}
