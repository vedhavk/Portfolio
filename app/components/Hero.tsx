"use client"

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'

export default function Hero() {
  const avatarRef = useRef<HTMLDivElement>(null)
  const roles = ['Frontend Developer', 'Full Stack Developer', 'AI / ML Developer']
  const [roleIndex, setRoleIndex] = useState(0)

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

  return (
    <section className="relative w-full h-screen overflow-hidden bg-[#0a0a0a]">

      {/* Nav */}
      <motion.nav 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        transition={{ duration: 0.8 }}
        className="fixed top-12 w-full max-w-[85vw] left-1/2 -translate-x-1/2 z-50 flex justify-between text-[#888] uppercase tracking-[0.18em] text-[0.68rem] font-mono"
      >
        {['About', 'Customers', 'Projects', 'Contact'].map((item) => (
          <a key={item} href={`#${item.toLowerCase()}`} className="hover:text-white transition-colors">
            {item}
          </a>
        ))}
      </motion.nav>

      {/* Giant headline — wipes left to right after avatar */}
      <motion.h1 
        initial={{ clipPath: 'inset(0 100% 0 0)', opacity: 1 }} 
        animate={{ clipPath: 'inset(0 0% 0 0)', opacity: 1 }} 
        transition={{ delay: 1.6, duration: 1.0, ease: 'easeInOut' }}
        className="absolute top-[28%] left-1/2 -translate-x-1/2 -translate-y-1/2 text-center text-[#c9c5bc] z-[1] whitespace-nowrap leading-none m-0 pointer-events-none"
        style={{
          fontFamily: 'var(--font-bebas-neue)',
          fontSize: 'clamp(5rem, 17vw, 18rem)'
        }}
      >
        HI, I&apos;M VEDHA
      </motion.h1>

      {/* Avatar image — appears first */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.85 }} 
        animate={{ opacity: 1, scale: 1 }} 
        transition={{ delay: 0.2, duration: 1.0, ease: 'easeOut' }}
        className="absolute top-1/2 left-1/2 z-10 w-[clamp(420px,58vw,800px)]"
        style={{ perspective: '1000px', transform: 'translate(-50%, -46%)' }}
      >
        <div ref={avatarRef} className="w-full will-change-transform" style={{ filter: 'drop-shadow(0 30px 60px rgba(0,0,0,0.9))' }}>
          <Image 
            src="/avatarnew.png" 
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
            className="uppercase text-[#888] leading-[1.8] font-mono tracking-[0.12em] whitespace-nowrap" style={{ fontSize: 'clamp(1.1rem, 2vw, 1.6rem)' }}
          >
            {roles[roleIndex]}
          </motion.p>
        </AnimatePresence>
      </motion.div>

      {/* CTA button */}
      <motion.button 
        initial={{ opacity: 0, y: 28 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ delay: 3.0, duration: 0.8 }}
        className="absolute top-1/2 right-[8%] -translate-y-1/2 rounded-full text-white uppercase text-[0.7rem] font-mono px-8 py-4 z-20 hover:scale-105 transition-transform"
        style={{ 
          background: 'linear-gradient(135deg, #c471ed, #f64f59)',
          boxShadow: '0 0 40px rgba(196,113,237,0.35)'
        }}
      >
        Contact me &rarr;
      </motion.button>
    </section>
  )
}
