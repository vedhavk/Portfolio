"use client"

import { useRef, useState } from 'react'
import Image from 'next/image'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null)
  
  // Track scroll position of this container for the middle-to-left transition
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  // Desktop Scroll Transforms (Flexbox-based offsets):
  // 1. Image starts centered (offset by ~300px to the right) and moves to its natural left position (0px)
  const imageX = useTransform(scrollYProgress, [0.12, 0.42], ["300px", "0px"])
  const imageScale = useTransform(scrollYProgress, [0.12, 0.3, 0.42], [0.85, 1.05, 1])
  
  // 2. Description starts transparent, offset slightly left, and fades/slides to its natural right position (0px)
  const descOpacity = useTransform(scrollYProgress, [0.32, 0.48], [0, 1])
  const descX = useTransform(scrollYProgress, [0.32, 0.48], ["-80px", "0px"])

  // State to track which card is currently touched/expanded
  const [expandedCard, setExpandedCard] = useState<number | null>(null)

  const cardsData = [
    {
      id: 1,
      title: "Education",
      summary: "B.Tech CSE",
      detail: "CUSAT",
      icon: "🎓",
      color: "from-[#c471ed] to-[#f64f59]",
      content: (
        <div className="space-y-4 text-left">
          <div>
            <h4 className="text-white font-bold text-lg md:text-xl leading-tight">
              B.Tech — Computer Science & Engineering
            </h4>
            <p className="text-[#ccc] text-[0.88rem] mt-1.5 font-mono">
              Cochin University College of Engineering, Kuttanad (CUSAT)
            </p>
          </div>
          
          <div className="flex justify-between items-center text-[0.82rem] border-t border-white/10 pt-3">
            <span className="text-[#aaa] font-mono">2023 – 2027</span>
            <span className="px-2.5 py-0.5 bg-green-500/20 text-green-300 rounded-full text-[0.7rem] border border-green-500/30 font-bold uppercase tracking-wider">
              Currently Enrolled
            </span>
          </div>

          <div className="bg-white/10 p-3.5 rounded-xl border border-white/10">
            <p className="text-white font-bold font-mono text-[1.05rem] flex items-center gap-2">
              <span className="text-yellow-400">★</span> CGPA: 9.5 / 10.0
            </p>
          </div>
        </div>
      )
    },
    {
      id: 2,
      title: "Internships",
      summary: "6+ Roles",
      detail: "Engineering & Dev",
      icon: "💼",
      color: "from-[#f64f59] to-[#c471ed]",
      content: (
        <div className="space-y-3 text-left">
          <h4 className="text-white font-bold text-lg md:text-xl leading-tight mb-2">
            Professional Experience
          </h4>
          <div className="max-h-[190px] overflow-y-auto pr-1 space-y-3 scrollbar-thin scrollbar-thumb-white/20">
            <div className="border-l-2 border-[#c471ed]/60 pl-3.5">
              <p className="text-white font-semibold text-[0.92rem]">FrontEnd Intern</p>
              <p className="text-[#aaa] text-[0.82rem] font-mono">MuLearn Foundation</p>
            </div>
            <div className="border-l-2 border-[#c471ed]/60 pl-3.5">
              <p className="text-white font-semibold text-[0.92rem]">FrontEnd Intern</p>
              <p className="text-[#aaa] text-[0.82rem] font-mono">OSINT JOURNO</p>
            </div>
            <div className="border-l-2 border-[#c471ed]/60 pl-3.5">
              <p className="text-white font-semibold text-[0.92rem]">Software Testing Intern</p>
              <p className="text-[#aaa] text-[0.82rem] font-mono">PetroInfotech</p>
            </div>
            <div className="border-l-2 border-[#c471ed]/60 pl-3.5">
              <p className="text-white font-semibold text-[0.92rem]">3 Week Program</p>
              <p className="text-[#aaa] text-[0.82rem] font-mono">CSRBOX & IBM (Virtual)</p>
            </div>
            <div className="border-l-2 border-[#c471ed]/60 pl-3.5">
              <p className="text-white font-semibold text-[0.92rem]">Intern</p>
              <p className="text-[#aaa] text-[0.82rem] font-mono">CSRBOX & IBM (Virtual)</p>
            </div>
            <div className="border-l-2 border-[#c471ed]/60 pl-3.5">
              <p className="text-white font-semibold text-[0.92rem]">Web Dev Intern</p>
              <p className="text-[#aaa] text-[0.82rem] font-mono">Bridgeon Solutions</p>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 3,
      title: "Core Projects",
      summary: "4 Innovations",
      detail: "AI & ML focus",
      icon: "🚀",
      color: "from-[#c471ed] to-[#f64f59]",
      content: (
        <div className="space-y-3 text-left">
          <h4 className="text-white font-bold text-lg md:text-xl leading-tight mb-2">
            Selected Work
          </h4>
          <div className="space-y-3">
            {[
              "WildGuard – AI Wildlife Detection System",
              "Duck-Track – AI Disease Surveillance System",
              "Take-it-down and Trace-an-object",
              "AI Chatbot for Water Conservation"
            ].map((proj, idx) => (
              <div key={idx} className="flex gap-3 items-start bg-white/10 p-2.5 rounded-lg border border-white/10">
                <span className="text-[0.82rem] text-[#c471ed] font-mono mt-0.5 font-bold">0{idx + 1}</span>
                <p className="text-white text-[0.88rem] font-semibold leading-tight">{proj}</p>
              </div>
            ))}
          </div>
        </div>
      )
    },
    {
      id: 4,
      title: "Socials & Contact",
      summary: "Get In Touch",
      detail: "Kozhikode, India",
      icon: "📍",
      color: "from-[#f64f59] to-[#c471ed]",
      content: (
        <div className="space-y-3 text-left">
          <h4 className="text-white font-bold text-lg md:text-xl leading-tight mb-3">
            Let&apos;s Connect
          </h4>
          <div className="space-y-3 font-mono text-[0.88rem]">
            <div className="flex items-center gap-3.5 text-[#ddd]">
              <span className="text-xl">📍</span>
              <span>Kozhikode, Kerala</span>
            </div>
            <a href="mailto:vedhavk.work@gmail.com" className="flex items-center gap-3.5 text-[#ddd] hover:text-white transition-colors">
              <span className="text-xl">✉️</span>
              <span className="truncate">vedhavk.work@gmail.com</span>
            </a>
            <a href="https://linkedin.com/in/vedhavk" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3.5 text-[#ddd] hover:text-white transition-colors">
              <span className="text-xl">💼</span>
              <span>LinkedIn</span>
            </a>
            <a href="https://github.com/vedhavk" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3.5 text-[#ddd] hover:text-white transition-colors">
              <span className="text-xl">🐙</span>
              <span>GitHub</span>
            </a>
            <a href="https://instagram.com/vedha.vk" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3.5 text-[#ddd] hover:text-white transition-colors">
              <span className="text-xl">📸</span>
              <span>Instagram</span>
            </a>
          </div>
        </div>
      )
    }
  ]

  return (
    <section 
      id="about" 
      ref={containerRef}
      className="relative w-full min-h-screen bg-[#0a0a0a] flex flex-col items-center justify-start py-28 px-6 md:px-12 overflow-hidden"
    >
      {/* Scroll-Linked Flexbox Section */}
      <div className="w-full max-w-6xl flex flex-col md:flex-row items-center justify-center gap-12 md:gap-[6rem] min-h-[520px] mb-16">
        
        {/* Left Image Container (flex: 1) */}
        <motion.div
          className="flex-1 w-full max-w-[480px] aspect-square flex items-center justify-center z-10"
          style={{
            x: typeof window !== 'undefined' && window.innerWidth >= 768 ? imageX : 0,
            scale: typeof window !== 'undefined' && window.innerWidth >= 768 ? imageScale : 1,
            perspective: '1000px'
          }}
        >
          <div className="w-full h-full relative" style={{ filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.8))' }}>
            <Image
              src="/about_img copy.png"
              alt="Vedha"
              fill
              className="object-contain pointer-events-none"
              priority
            />
          </div>
        </motion.div>

        {/* Right Text Container (flex: 1) */}
        <motion.div
          className="flex-1 w-full max-w-[480px] text-left flex flex-col justify-center z-20 h-[480px]"
          style={{
            opacity: typeof window !== 'undefined' && window.innerWidth >= 768 ? descOpacity : 1,
            x: typeof window !== 'undefined' && window.innerWidth >= 768 ? descX : 0,
          }}
        >
          <h2 className="text-[#ffffff] text-6xl md:text-7xl font-bold uppercase tracking-wider mb-5 leading-none animate-pulse filter drop-shadow-[0_0_12px_rgba(255,255,255,0.15)]" style={{ fontFamily: 'var(--font-bebas-neue)' }}>
            About Me
          </h2>
          <p className="text-[#f3f4f6] font-medium text-[1.08rem] md:text-[1.2rem] leading-relaxed mb-5 font-sans">
            I&apos;m Vedha VK, a B.Tech Computer Science student at CUSAT, passionate about crafting scalable, modern web applications and exploring the frontier of Artificial Intelligence.
          </p>
          <p className="text-[#e2e8f0] text-[0.98rem] md:text-[1.1rem] leading-relaxed font-sans">
            My expertise lies in building fast, responsive interfaces with React and Next.js, backed by hands-on internship experience and community leadership roles, such as serving as the Campus Lead for MuLearn CUCEK.
          </p>
        </motion.div>
      </div>

      {/* Interactive Staggered Cards (Expandable on Touch/Click) */}
      <div className="w-full max-w-6xl mt-12 flex flex-col items-center">
        <p className="text-[#eee] text-[0.75rem] tracking-[0.25em] uppercase font-mono mb-8 select-none animate-pulse filter drop-shadow-[0_0_8px_rgba(255,255,255,0.2)]">
          ⚡ Tap any card below to expand details ⚡
        </p>

        <div className="w-full flex flex-col md:flex-row gap-6 items-stretch min-h-[300px]">
          {cardsData.map((card) => {
            const isExpanded = expandedCard === card.id
            return (
              <motion.div
                key={card.id}
                layout
                onClick={() => setExpandedCard(isExpanded ? null : card.id)}
                className={`relative rounded-3xl border p-7 cursor-pointer overflow-hidden transition-all duration-300 flex flex-col justify-between ${
                  isExpanded 
                    ? "flex-[2.5] border-white/35 bg-gradient-to-br from-black/80 to-black/95 shadow-2xl shadow-purple-500/10" 
                    : "flex-1 border-white/15 bg-black/50 hover:border-white/30 hover:bg-white/[0.04]"
                }`}
                style={{ originX: 0.5 }}
                whileHover={{ y: isExpanded ? 0 : -8 }}
                transition={{ type: "spring", stiffness: 350, damping: 28 }}
              >
                {/* Accent glow on expand */}
                {isExpanded && (
                  <div className={`absolute top-0 left-0 w-2 h-full bg-gradient-to-b ${card.color}`} />
                )}

                <motion.div layout className="w-full">
                  <div className="flex justify-between items-start">
                    <motion.span layout className="text-3xl filter drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]">
                      {card.icon}
                    </motion.span>
                    <motion.span 
                      layout 
                      className={`text-[0.65rem] font-mono uppercase tracking-wider px-2.5 py-1 rounded border ${
                        isExpanded ? "text-white/80 border-white/20" : "text-[#aaa] border-white/10"
                      }`}
                    >
                      {isExpanded ? "Collapse" : "Expand"}
                    </motion.span>
                  </div>

                  <motion.h3 
                    layout 
                    className="text-white text-xl font-bold uppercase tracking-wider mt-5 leading-tight font-mono filter drop-shadow-[0_0_6px_rgba(255,255,255,0.1)]"
                  >
                    {card.title}
                  </motion.h3>

                  {/* Normal / Compressed Card Content */}
                  <AnimatePresence mode="wait">
                    {!isExpanded ? (
                      <motion.div
                        key="collapsed"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="mt-3 text-left space-y-1"
                      >
                        <p className="text-[#ddd] text-[0.9rem] font-sans truncate font-medium">{card.summary}</p>
                        <p className="text-[#aaa] text-[0.78rem] font-mono uppercase tracking-wider truncate">{card.detail}</p>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="expanded"
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -15 }}
                        transition={{ duration: 0.35, ease: "easeOut" }}
                        className="mt-6 w-full"
                      >
                        {card.content}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>

                {/* Card Indicator Bar at Bottom */}
                <motion.div 
                  layout 
                  className={`w-full h-1.5 rounded mt-5 ${
                    isExpanded 
                      ? `bg-gradient-to-r ${card.color} opacity-100` 
                      : "bg-white/10 opacity-60"
                  }`} 
                />
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
