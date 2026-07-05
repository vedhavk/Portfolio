"use client"

import { useRef, useState, useEffect } from 'react'
import Image from 'next/image'
import { motion, useScroll, useTransform } from 'framer-motion'
import GradCapBadge from './GradCapBadge'

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isDesktop, setIsDesktop] = useState(false)

  useEffect(() => {
    setIsDesktop(window.innerWidth >= 768)
    const handleResize = () => setIsDesktop(window.innerWidth >= 768)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Track scroll position of this container for the scroll-linked image entrance
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  })

  // Image: starts centered (offset right) then moves to its natural flex position
  const imageX = useTransform(scrollYProgress, [0, 0.08, 0.35], ['300px', '300px', '0px'])
  const imageScale = useTransform(scrollYProgress, [0, 0.08, 0.35], [0.85, 1, 1])
  const imageOpacity = useTransform(scrollYProgress, [0, 0.08], [0, 1])

  // Text: fades + slides in from the left
  const descOpacity = useTransform(scrollYProgress, [0, 0.10, 0.22], [0, 0, 1])
  const descX = useTransform(scrollYProgress, [0, 0.10, 0.22], ['-80px', '-80px', '0px'])

  return (
    <section
      id="about"
      ref={containerRef}
      className="relative w-full min-h-screen bg-[#0a0a0a] flex flex-col items-center justify-center py-28 px-6 md:px-12 overflow-hidden"
    >
      {/* Scroll-Linked Flexbox Section */}
      <div className="w-full max-w-6xl flex flex-col md:flex-row items-center justify-center gap-12 md:gap-[6rem] min-h-[520px]">

        {/* Left: Profile Image + GradCapBadge */}
        <motion.div
          className="flex-1 w-full max-w-[360px] aspect-square flex items-center justify-center z-10"
          style={{
            x: isDesktop ? imageX : 0,
            scale: isDesktop ? imageScale : 1,
            opacity: isDesktop ? imageOpacity : 1,
            perspective: '1000px',
          }}
        >
          {/* relative so GradCapBadge can position absolutely within this container */}
          <div className="w-full h-full relative">
            <Image
              src="/about_img copy.png"
              alt="Vedha"
              fill
              className="object-contain pointer-events-none"
              priority
            />
            {/* Floating graduation cap badge — opens AcademicModal on click */}
            <GradCapBadge />
          </div>
        </motion.div>

        {/* Right: About Text */}
        <motion.div
          className="flex-1 w-full max-w-[480px] text-left flex flex-col justify-center z-20 h-[480px]"
          style={{
            opacity: isDesktop ? descOpacity : 1,
            x: isDesktop ? descX : 0,
          }}
        >
          <h2
            className="text-[#ffffff] text-6xl md:text-7xl font-bold uppercase tracking-wider mb-5 leading-none animate-pulse filter drop-shadow-[0_0_12px_rgba(255,255,255,0.15)]"
            style={{ fontFamily: 'var(--font-bebas-neue)' }}
          >
            About Me
          </h2>
          <p className="text-[#f3f4f6] font-medium text-[1.08rem] md:text-[1.2rem] leading-relaxed mb-5 font-sans">
            I&apos;m Vedha VK, a B.Tech Computer Science student at CUSAT, passionate about crafting
            scalable, modern web applications and exploring the frontier of Artificial Intelligence.
          </p>
          <p className="text-[#e2e8f0] text-[0.98rem] md:text-[1.1rem] leading-relaxed font-sans">
            My expertise lies in building fast, responsive interfaces with React and Next.js, backed by
            hands-on internship experience and community leadership roles, such as serving as the Campus
            Lead for MuLearn CUCEK.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
