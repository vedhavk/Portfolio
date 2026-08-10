"use client"

import { useEffect, useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Image from 'next/image'

const projectsData = [
  {
    id: 'mulearn',
    index: '01',
    name: 'µLearn Platform',
    subtitle: 'Community Micro-Learning Platform',
    description: 'Contributed to frontend development for µLearn (mulearn.org), an open community platform empowering students through gamified learning, peer enablement, and skill building.',
    accomplishments: [
      'Built modular, reusable frontend components using modern web technologies for high-impact platform features.',
      'Enhanced user experience and interface consistency across community interest groups and event portals.'
    ],
    tech: ['React.js', 'Next.js', 'TypeScript', 'Tailwind CSS'],
    year: '2024 – Present',
    image: '/mulearn1.png',
    link: 'https://mulearn.org/',
  },
  {
    id: 'ducktrack',
    index: '02',
    name: 'Duck-Track',
    subtitle: 'AI Disease Surveillance System',
    description: 'An agricultural AI platform built to detect abnormal behavioral patterns in ducks to predict and prevent epidemic outbreaks.',
    accomplishments: [
      'Engineered an ML vision analyzer to identify lethargy, behavioral anomalies, and early symptoms of disease in live poultry.',
      'Built a warning dashboard providing preemptive, telemetry-driven insights to veterinary authorities and farmers.'
    ],
    tech: ['Python', 'Computer Vision', 'React', 'Predictive Analytics'],
    year: '2025',
    image: '/Duck_Track.png',
    link: 'https://duck-track-2.onrender.com',
  },
  {
    id: 'osint-journo',
    index: '03',
    name: 'OSINT Journo',
    subtitle: 'Investigative Journalism Platform',
    description: 'An independent investigative journalism blog powered by Open-Source Intelligence (OSINT). Focuses on verifying, documenting, and presenting evidence-based investigations using publicly available information.',
    accomplishments: [
      'Published 10 research-driven investigative reports, including 6 on conflict analysis, 3 on geospatial investigations, and 1 on data security.',
      'Founder, Creator, and Developer of the entire platform and its operations.'
    ],
    tech: ['OSINT', 'Geospatial Intelligence', 'Data Security', 'Next.js'],
    year: '2024 – Present',
    image: '/osint1.png',
    link:'https://blogs.osintjourno.com/'
  },
  {
    id: 'wildguard',
    index: '04',
    name: 'WildGuard',
    subtitle: 'AI Wildlife Detection & Alert System',
    description: 'An AI-powered forest monitoring system designed to prevent human-animal conflicts through ML detection and rapid geo-targeted alerts.',
    accomplishments: [
      'Developed real-time animal detection models using computer vision pipelines to recognize wild intrusions immediately.',
      'Implemented a localized PIN-code-based alert routing protocol to notify adjacent civilian hubs and forest officials instantly.'
    ],
    tech: ['Python', 'Machine Learning', 'FastAPI', 'UN SDG-15'],
    year: '2025',
    image: '/Wild_Guard.png',
  },
  {
    id: 'forensics',
    index: '05',
    name: 'Take-it-down & Trace-an-object',
    subtitle: 'Privacy-First Perceptual Hashing System',
    description: 'A secure, digital forensics tool leveraging perceptual hashing (PhotoDNA-inspired) to trace and flag illegal digital assets on-device.',
    accomplishments: [
      'Programmed a lightweight hashing algorithm enabling rapid content matching without decrypting or exposing original user images.',
      'Designed cross-system correlation workflows to help forensic analysts build chain-of-evidence maps safely.'
    ],
    tech: ['React.js', 'Python', 'Perceptual Hashing', 'Privacy Tech'],
    year: '2024',
    image: '/hackp.png',
    badge: 'HACKP Finalist 2025 · Kerala Police Cyberdome',
  },
  // {
  //   id: 'chatbot',
  //   index: '06',
  //   name: 'AI Chatbot for Water Conservation',
  //   subtitle: 'IBM WatsonX · UN SDG-6',
  //   description: 'A conversational AI engine built on top of IBM WatsonX dedicated to teaching water literacy and clean sanitation practices.',
  //   accomplishments: [
  //     'Configured semantic intent models and responsive dialogue workflows on IBM WatsonX to deliver engaging, resource-rich guides.',
  //     'Achieved a high automated query-resolution rate regarding community water sanitation guidelines and resources.'
  //   ],
  //   tech: ['IBM WatsonX', 'NLU', 'Conversational AI', 'UN SDG-6'],
  //   year: '2024',
  //   image: '/Water.png',
  // }
]

export default function MissionControl() {
  const containerRef = useRef<HTMLElement>(null)
  const isInView = useInView(containerRef, { amount: 0.3 })
  const [activeIndex, setActiveIndex] = useState(0)
  const [showContent, setShowContent] = useState(false)

  const project = projectsData[activeIndex]

  useEffect(() => {
    if (!isInView) return

    setShowContent(false)

    const revealTimer = setTimeout(() => setShowContent(true), 3000)
    const nextTimer = setTimeout(() => {
      setActiveIndex(prev => (prev + 1) % projectsData.length)
    }, 8500)

    return () => {
      clearTimeout(revealTimer)
      clearTimeout(nextTimer)
    }
  }, [activeIndex, isInView])

  return (
    <section
      ref={containerRef}
      id="projects"
      className="relative min-h-screen w-full bg-[#030407] text-white py-28 px-4 sm:px-8 overflow-hidden select-none flex flex-col items-center justify-center"
    >
      <div className="relative z-10 w-full max-w-6xl mx-auto flex flex-col items-center">

        {/* Title */}
        <div className="text-center mb-14">
          <h2
            className="text-5xl md:text-7xl font-bold tracking-[0.08em] text-white leading-none"
            style={{ fontFamily: 'var(--font-bebas-neue)' }}
          >
            PROJECTS
          </h2>
          <div className="h-[1px] w-20 bg-white/10 mx-auto mt-4" />
        </div>

        {/* Main Layout: Cards + Right Ladder */}
        <div className="flex items-stretch gap-8 w-full">

          {/* Cards Area */}
          <div className="relative flex-1 flex items-center justify-center" style={{ height: '480px' }}>
            {projectsData.map((proj, i) => {
              const offset = i - activeIndex
              if (offset > 0) return null

              const isActive = offset === 0
              const depth = Math.abs(offset)
              const xShift = offset * 80
              const scaleVal = isActive ? 1 : Math.max(0.82, 1 - depth * 0.06)
              const blur = isActive ? 0 : Math.min(depth * 5, 14)
              const dim = isActive ? 1 : Math.max(0.35, 1 - depth * 0.22)

              return (
                <motion.div
                  key={proj.id}
                  className="absolute rounded-2xl border border-white/[0.07] bg-[#0b0d14] overflow-hidden cursor-pointer"
                  onClick={() => setActiveIndex(i)}
                  animate={{
                    x: xShift,
                    scale: scaleVal,
                    opacity: dim,
                    filter: `blur(${blur}px)`,
                  }}
                  transition={{ duration: 0.55, ease: [0.25, 1, 0.5, 1] }}
                  style={{
                    zIndex: i,
                    width: '100%',
                    maxWidth: '780px',
                    height: '460px',
                  }}
                >
                  {/* Header overlay */}
                  <div className="absolute top-0 left-0 right-0 z-20 p-6 flex items-center justify-between pointer-events-none bg-gradient-to-b from-black/80 via-black/40 to-transparent">
                    <div className="flex items-center gap-4">
                      <span className="text-4xl font-black text-white leading-none" style={{ fontFamily: 'var(--font-bebas-neue)' }}>
                        {proj.index}
                      </span>
                      <div>
                        <span className="text-[10px] font-mono text-white/50 tracking-[0.2em] uppercase block">PROJECT</span>
                        <span className="text-base font-bold tracking-wide uppercase text-white mt-0.5 block" style={{ fontFamily: 'var(--font-bebas-neue)', letterSpacing: '0.05em' }}>
                          {proj.name}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {proj.link && (
                        <a
                          href={proj.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[11px] font-mono text-white/90 hover:text-white px-3.5 py-1.5 rounded-full border border-white/30 bg-white/[0.1] hover:bg-white/[0.2] transition-colors tracking-wider uppercase flex items-center gap-1.5 pointer-events-auto"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <span>VISIT SITE</span>
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                        </a>
                      )}
                      <span className="text-[11px] font-mono text-white/60 px-4 py-1.5 rounded-full border border-white/20 bg-white/[0.04] tracking-wider uppercase">
                        LIVE PROJECT
                      </span>
                    </div>
                  </div>

                  {/* Image */}
                  {isActive ? (
                    <motion.div
                      className="absolute inset-0 z-10"
                      animate={{ y: showContent ? '-42%' : '0%' }}
                      transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
                    >
                      {proj.image ? (
                        <Image src={proj.image} alt={proj.name} fill sizes="800px" className="object-cover" priority />
                      ) : (
                        <div className="relative w-full h-full">
                          <Image src="/Water.png" alt="Water Conservation" fill className="object-cover" priority />
                        </div>
                      )}
                    </motion.div>
                  ) : (
                    <div className="absolute inset-0 z-10">
                      {proj.image ? (
                        <Image src={proj.image} alt={proj.name} fill sizes="800px" className="object-cover" />
                      ) : (
                        <div className="relative w-full h-full">
                          <Image src="/Water.png" alt="Water Conservation" fill className="object-cover" />
                        </div>
                      )}
                    </div>
                  )}

                  {/* Content panel */}
                  {isActive && (
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 h-[58%] z-20 bg-[#0b0d14] border-t border-white/[0.07] px-7 py-6 flex flex-col justify-between"
                      initial={{ y: '100%' }}
                      animate={{ y: showContent ? '0%' : '100%' }}
                      transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
                    >
                      <div>
                        <h3 className="text-2xl font-bold uppercase tracking-wide text-white leading-tight" style={{ fontFamily: 'var(--font-bebas-neue)', letterSpacing: '0.04em' }}>
                          {project.subtitle}
                        </h3>
                        <p className="text-sm text-white/70 leading-relaxed mt-3">{project.description}</p>
                        <ul className="mt-4 space-y-2">
                          {project.accomplishments.map((a, j) => (
                            <li key={j} className="flex gap-2.5 items-start text-[13px] text-white/60">
                              <span className="text-white/30 select-none mt-0.5">•</span>
                              <span className="leading-relaxed">{a}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="flex flex-wrap items-center gap-2.5 pt-4 border-t border-white/[0.06]">
                        {project.tech.map(t => (
                          <span key={t} className="text-[11px] font-mono uppercase tracking-wider px-3 py-1 rounded-full border border-white/15 text-white/60 bg-white/[0.03]">{t}</span>
                        ))}
                        <span className="ml-auto text-sm font-mono text-white/40">{project.year}</span>
                        {project.badge && (
                          <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full">
                            {project.badge}
                          </span>
                        )}
                        {project.link && (
                          <a
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[11px] font-mono text-emerald-400 hover:text-emerald-300 px-3 py-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 transition-colors uppercase flex items-center gap-1.5"
                          >
                            <span>Visit site</span>
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                          </a>
                        )}
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              )
            })}
          </div>

          {/* Right Ladder Navigation */}
          <div className="hidden md:flex flex-col items-center justify-center w-48 flex-shrink-0">
            {projectsData.map((proj, i) => {
              const isActive = activeIndex === i
              const isPast = i < activeIndex
              return (
                <div key={proj.id} className="flex flex-col items-center w-full">
                  {/* Connector line above */}
                  {i > 0 && (
                    <div
                      className="w-[1px] h-8 transition-colors duration-500"
                      style={{ backgroundColor: isPast || isActive ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.05)' }}
                    />
                  )}

                  {/* Step button */}
                  <button
                    onClick={() => setActiveIndex(i)}
                    className={`w-full text-left px-4 py-3.5 rounded-xl cursor-pointer transition-all duration-400 outline-none group relative ${
                      isActive
                        ? 'bg-white/[0.06] border border-white/15'
                        : 'bg-transparent border border-transparent hover:bg-white/[0.03] hover:border-white/8'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      {/* Project image thumbnail instead of dot */}
                      <div className="flex-shrink-0 relative">
                        <div
                          className={`w-9 h-9 rounded-full overflow-hidden transition-all duration-500 border relative ${
                            isActive
                              ? 'border-white scale-110 shadow-[0_0_12px_rgba(255,255,255,0.25)]'
                              : isPast
                                ? 'border-white/30 opacity-60'
                                : 'border-white/10 opacity-30'
                          }`}
                        >
                          <Image
                            src={proj.image}
                            alt={proj.name}
                            fill
                            sizes="36px"
                            className="object-cover"
                          />
                        </div>
                        {isActive && (
                          <div className="absolute inset-0 w-9 h-9 rounded-full border border-white/40 animate-ping pointer-events-none" />
                        )}
                      </div>

                      <div className="min-w-0">
                        <span className="text-[9px] font-mono text-white/30 tracking-[0.15em] uppercase block">
                          {proj.index}
                        </span>
                        <span
                          className={`text-sm font-bold uppercase tracking-wide block truncate transition-colors duration-300 ${
                            isActive ? 'text-white' : 'text-white/35 group-hover:text-white/55'
                          }`}
                          style={{ fontFamily: 'var(--font-bebas-neue)', letterSpacing: '0.04em' }}
                        >
                          {proj.name}
                        </span>
                      </div>
                    </div>
                  </button>

                  {/* Connector line below */}
                  {i < projectsData.length - 1 && (
                    <div
                      className="w-[1px] h-8 transition-colors duration-500"
                      style={{ backgroundColor: isPast ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.05)' }}
                    />
                  )}
                </div>
              )
            })}
          </div>

        </div>
      </div>
    </section>
  )
}
