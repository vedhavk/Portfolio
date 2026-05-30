"use client"

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

/* ─────────────────────────────────────────────
   Experience Data
   ───────────────────────────────────────────── */
interface ExperienceItem {
  id: number
  role: string
  company: string
  duration: string
  description: string
  tags: string[]
}

const EXPERIENCES: ExperienceItem[] = [
  {
    id: 0,
    role: 'Frontend Developer',
    company: 'Mulearn Foundation',
    duration: 'Jan 2024 – Present',
    description:
      'Contributed to frontend development using modern web technologies, building modular and reusable components. Worked on improving high-impact UI elements across the platform.',
    tags: ['React', 'Next.js', 'TypeScript'],
  },
  {
    id: 1,
    role: 'Campus Lead',
    company: 'Mulearn CUCEK',
    duration: 'Aug 2023 – Present',
    description:
      'Leading campus-wide tech community initiatives, peer learning programs, and technical bootcamps. Coordinating student engagement and peer mentoring sessions.',
    tags: ['Leadership', 'Community', 'Mentoring'],
  },
  {
    id: 2,
    role: 'QA Engineer Intern',
    company: 'PetroInfoTech',
    duration: 'Jun 2024 – Aug 2024',
    description:
      'Performed rigorous automated end-to-end (E2E) testing on enterprise applications using Cypress. Designed and executed 100+ comprehensive test cases.',
    tags: ['Cypress', 'E2E Testing', 'QA'],
  },
  {
    id: 3,
    role: 'Frontend Developer',
    company: 'OSINT Journo',
    duration: 'Mar 2024 – Jun 2024',
    description:
      'Developed and successfully deployed multiple Next.js applications featuring optimized performance. Built a fully functional highly responsive dynamic blog platform.',
    tags: ['Next.js', 'Prisma', 'PostgreSQL'],
  },
  {
    id: 4,
    role: 'AI/ML Engineer',
    company: 'IBM CSRBOX Program',
    duration: 'Jan 2024 – Mar 2024',
    description:
      'Contributed to WildGuard AI wildlife protection system aligned with UN SDG-15. Developed ML-based intrusion detection pipeline to identify animals in real time.',
    tags: ['Python', 'TensorFlow', 'IBM WatsonX'],
  },
  {
    id: 5,
    role: 'AI Chatbot Developer',
    company: 'IBM CSRBOX Program',
    duration: 'Nov 2023 – Jan 2024',
    description:
      'Built an intelligent AI chatbot using IBM WatsonX to promote Clean Water & Sanitation awareness (UN SDG-6). Integrated natural language processing flows.',
    tags: ['WatsonX', 'NLP', 'SDG-6'],
  },
  {
    id: 6,
    role: 'Web Developer Intern',
    company: 'Bridgeon Solutions',
    duration: 'Jul 2023 – Sep 2023',
    description:
      'Developed and optimized clean, highly responsive web interfaces utilizing HTML, CSS, and modern JavaScript. Contributed to production-grade modules.',
    tags: ['HTML', 'CSS', 'JavaScript'],
  },
]

/* ─────────────────────────────────────────────
   Helpers
   ───────────────────────────────────────────── */

/** Given the active index, return the visual ordering of all cards. */
function getCardOrder(activeIndex: number, total: number) {
  const cards: { dataIndex: number; position: number }[] = []
  for (let i = 0; i < total; i++) {
    // position relative to active: -3, -2, -1, 0, 1, 2, 3 …
    let pos = i - activeIndex
    // Wrap around for infinite feel
    if (pos > Math.floor(total / 2)) pos -= total
    if (pos < -Math.floor(total / 2)) pos += total
    cards.push({ dataIndex: i, position: pos })
  }
  return cards
}

/* ─────────────────────────────────────────────
   Component
   ───────────────────────────────────────────── */
export default function Experience() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const total = EXPERIENCES.length

  const goNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % total)
  }, [total])

  const goPrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + total) % total)
  }, [total])

  // Autoplay — 5 second interval
  useEffect(() => {
    if (isPaused) return
    const interval = setInterval(goNext, 1000)
    return () => clearInterval(interval)
  }, [isPaused, goNext])

  const cardsLayout = getCardOrder(activeIndex, total)

  // Progress for the progress bar animation
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    if (isPaused) {
      setProgress(0)
      return
    }
    setProgress(0)
    const start = Date.now()
    const duration = 3000
    let raf: number

    const tick = () => {
      const elapsed = Date.now() - start
      setProgress(Math.min(elapsed / duration, 1))
      if (elapsed < duration) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [activeIndex, isPaused])

  return (
    <section
      id="experience"
      className="relative w-full min-h-screen bg-[#0a0a0a] py-28 overflow-hidden flex flex-col justify-center"
    >
      {/* ── Warm orange ambient glow ── */}
      {/* <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 50% 80%, rgba(255,140,50,0.07) 0%, transparent 70%)',
        }}
      /> */}

      {/* ── Decorative large background heading ── */}
      <div
        className="absolute top-12 left-1/2 -translate-x-1/2 text-center text-white/[0.02] z-0 whitespace-nowrap leading-none pointer-events-none select-none"
        style={{
          fontFamily: 'var(--font-bebas-neue)',
          fontSize: 'clamp(8rem, 20vw, 24rem)',
        }}
      >
        JOURNEY
      </div>

      <div className="w-full z-10 relative">
        {/* ── Header (preserved exactly) ── */}
        <div className="text-center mb-16 px-6">
          <p className="font-mono text-[0.7rem] md:text-[0.75rem] uppercase tracking-[0.3em] text-[#888]">
            Where I&apos;ve Worked &amp; Contributed
          </p>
          <h2
            className="text-white text-5xl md:text-7xl font-bold uppercase tracking-wider mt-3 leading-none filter drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]"
            style={{ fontFamily: 'var(--font-bebas-neue)' }}
          >
            Professional Experience
          </h2>
          <div className="h-[2px] bg-gradient-to-r from-[#c471ed] via-[#f64f59] to-[#38ef7d] mx-auto mt-6 w-[120px]" />
        </div>

        {/* ── Stacked Card Carousel ── */}
        <div
          className="relative mx-auto flex items-center justify-center"
          style={{ perspective: '1400px', height: '500px' }}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <AnimatePresence mode="popLayout">
            {cardsLayout.map(({ dataIndex, position }) => {
              const exp = EXPERIENCES[dataIndex]
              const isActive = position === 0
              const absPos = Math.abs(position)

              // Only render cards within visible range (-2 … +2)
              if (absPos > 2) return null

              // Visual transformations
              const translateX = position * 260 // horizontal offset — tighter stacking
              const translateZ = -absPos * 140 // push deeper for more drama
              const scale = isActive ? 1 : Math.max(0.72, 1 - absPos * 0.14)
              const opacity = isActive ? 1 : Math.max(0.3, 1 - absPos * 0.35)
              const rotateY = position * -5 // slightly more pronounced Y rotation

              // Blur + dim for side cards, sharp + bright for center
              const blurAmount = isActive ? 0 : absPos === 1 ? 2 : 4
              const brightnessAmount = isActive ? 1 : absPos === 1 ? 0.6 : 0.35

              return (
                <motion.div
                  key={`card-${dataIndex}`}
                  layout
                  initial={false}
                  animate={{
                    x: translateX,
                    z: translateZ,
                    scale,
                    opacity,
                    rotateY,
                    filter: `blur(${blurAmount}px) brightness(${brightnessAmount})`,
                  }}
                  transition={{
                    type: 'spring',
                    stiffness: 320,
                    damping: 28,
                    mass: 0.7,
                  }}
                  onClick={() => setActiveIndex(dataIndex)}
                  className="absolute cursor-pointer"
                  style={{
                    zIndex: 10 - absPos,
                    transformStyle: 'preserve-3d',
                    willChange: 'transform, opacity, filter',
                  }}
                >
                  {/* ── Soft glow ring around active card ── */}
                  {isActive && (
                    <motion.div
                      className="absolute -inset-[2px] rounded-[1.6rem] pointer-events-none"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.4 }}
                      style={{
                        background: 'transparent',
                        boxShadow:
                          '0 0 18px 2px rgba(255,255,255,0.07), 0 0 40px 6px rgba(255,255,255,0.04), inset 0 0 18px 2px rgba(255,255,255,0.03)',
                        border: '1px solid rgba(255,255,255,0.12)',
                      }}
                    />
                  )}

                  {/* ── Glass Card ── */}
                  <div
                    className="relative w-[360px] sm:w-[460px] md:w-[520px] overflow-hidden"
                    style={{
                      borderRadius: '1.5rem',
                      background:
                        'linear-gradient(145deg, rgba(22,22,26,0.92) 0%, rgba(12,12,14,0.97) 100%)',
                      backdropFilter: 'blur(24px)',
                      WebkitBackdropFilter: 'blur(24px)',
                      border: isActive
                        ? '1px solid rgba(255,255,255,0.1)'
                        : '1px solid rgba(255,255,255,0.05)',
                      boxShadow: isActive
                        ? '0 30px 70px -10px rgba(0,0,0,0.8), 0 0 50px rgba(255,255,255,0.03), inset 0 1px 0 rgba(255,255,255,0.06)'
                        : '0 15px 40px -8px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.03)',
                    }}
                  >
                    {/* Subtle white accent top line */}
                    <div
                      className="h-[1px] w-full"
                      style={{
                        background:
                          'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.15) 50%, transparent 100%)',
                      }}
                    />

                    <div className="p-7 sm:p-9">
                      {/* Role title */}
                      <h3
                        className="text-white font-bold text-2xl sm:text-3xl leading-tight tracking-wide"
                        style={{ fontFamily: 'var(--font-bebas-neue)' }}
                      >
                        {exp.role}
                      </h3>

                      {/* Company */}
                      <p className="text-[#777] text-xs sm:text-sm font-mono mt-1 tracking-wide">
                        {exp.company}
                      </p>

                      {/* Duration badge */}
                      <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.06] mt-4 mb-5">
                        <svg
                          width="12"
                          height="12"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          className="text-[#555]"
                        >
                          <circle cx="12" cy="12" r="10" />
                          <polyline points="12 6 12 12 16 14" />
                        </svg>
                        <span className="text-[#666] text-[0.65rem] sm:text-xs font-mono tracking-wider uppercase">
                          {exp.duration}
                        </span>
                      </div>

                      {/* Description */}
                      <p className="text-[#999] text-[0.82rem] sm:text-[0.9rem] leading-relaxed mb-6">
                        {exp.description}
                      </p>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2">
                        {exp.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-[0.6rem] sm:text-[0.68rem] font-mono uppercase tracking-wider px-2.5 py-1 rounded-md bg-white/[0.03] border border-white/[0.06] text-[#555]"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </AnimatePresence>
        </div>

        {/* ── Navigation Controls ── */}
        <div className="flex items-center justify-center gap-6 mt-12">
          {/* Prev */}
          <button
            onClick={goPrev}
            aria-label="Previous experience"
            className="w-11 h-11 rounded-full border border-white/[0.08] bg-white/[0.02] backdrop-blur-sm flex items-center justify-center text-white/40 hover:text-white/70 hover:border-white/15 hover:bg-white/[0.04] transition-all duration-300"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>

          {/* Dot indicators with progress */}
          <div className="flex items-center gap-2.5">
            {EXPERIENCES.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveIndex(idx)}
                aria-label={`Go to experience ${idx + 1}`}
                className="relative group"
              >
                <div
                  className="h-2 rounded-full transition-all duration-500 ease-out overflow-hidden"
                  style={{
                    width: idx === activeIndex ? '32px' : '8px',
                    background:
                      idx === activeIndex
                        ? 'rgba(255,255,255,0.08)'
                        : 'rgba(255,255,255,0.1)',
                  }}
                >
                  {idx === activeIndex && (
                    <motion.div
                      className="h-full rounded-full"
                      style={{
                        width: `${progress * 100}%`,
                        background:
                          'linear-gradient(90deg, rgba(255,255,255,0.3), rgba(255,255,255,0.5))',
                      }}
                    />
                  )}
                </div>
              </button>
            ))}
          </div>

          {/* Next */}
          <button
            onClick={goNext}
            aria-label="Next experience"
            className="w-11 h-11 rounded-full border border-white/[0.08] bg-white/[0.02] backdrop-blur-sm flex items-center justify-center text-white/40 hover:text-white/70 hover:border-white/15 hover:bg-white/[0.04] transition-all duration-300"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </div>

        {/* ── Active card counter ── */}
        <div className="text-center mt-6">
          <span className="font-mono text-[0.65rem] text-[#444] tracking-widest uppercase">
            {String(activeIndex + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
          </span>
        </div>
      </div>
    </section>
  )
}
