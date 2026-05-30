"use client"

import { useRef, useState, useEffect } from 'react'
import Image from 'next/image'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [activeCard, setActiveCard] = useState<number | null>(null)

  useEffect(() => {
    const handleOpenContact = () => {
      setActiveCard(4)
    }
    window.addEventListener('open-contact', handleOpenContact)
    return () => window.removeEventListener('open-contact', handleOpenContact)
  }, [])
  // Track scroll position of this container for the middle-to-left transition
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  // Desktop Scroll Transforms (Flexbox-based offsets):
  // 1. Image starts centered (offset by ~300px to the right) and moves to its natural left position (0px)
  const imageX = useTransform(scrollYProgress, [0, 0.08, 0.35], ["300px", "300px", "0px"])
  const imageScale = useTransform(scrollYProgress, [0, 0.08, 0.35], [0.85, 1, 1])
  const imageOpacity = useTransform(scrollYProgress, [0, 0.08], [0, 1])
  
  // 2. Description starts transparent, offset slightly left, and fades/slides to its natural right position (0px)
  const descOpacity = useTransform(scrollYProgress, [0, 0.10, 0.22], [0, 0, 1])
  const descX = useTransform(scrollYProgress, [0, 0.10, 0.22], ["-80px", "-80px", "0px"])

  return (
    <section 
      id="about" 
      ref={containerRef}
      className="relative w-full min-h-screen bg-[#0a0a0a] flex flex-col items-center justify-start py-28 px-6 md:px-12 overflow-hidden"
    >
      {/* Scroll-Linked Flexbox Section */}
      <div className="w-full max-w-6xl flex flex-col md:flex-row items-center justify-center gap-12 md:gap-[6rem] min-h-[520px] mb-24">
        
        {/* Left Image Container (flex: 1) */}
        <motion.div
          className="flex-1 w-full max-w-[360px] aspect-square flex items-center justify-center z-10"
          style={{
            x: typeof window !== 'undefined' && window.innerWidth >= 768 ? imageX : 0,
            scale: typeof window !== 'undefined' && window.innerWidth >= 768 ? imageScale : 1,
            opacity: typeof window !== 'undefined' && window.innerWidth >= 768 ? imageOpacity : 1,
            perspective: '1000px'
          }}
        >
          <div className="w-full h-full relative" >
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

      {/* Magazine-Style 2x2 Centered grid in Collided Deck Style */}
      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-0 mb-16 z-10 shadow-[0_30px_70px_rgba(0,0,0,0.8)] rounded-[2rem] overflow-hidden border border-white/5">
        
        {/* Card 01 - Education */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          onClick={() => setActiveCard(activeCard === 1 ? null : 1)}
          className="relative bg-[#121212] p-8 md:p-10 border border-white/5 md:border-r-0 md:border-b-0 flex flex-col justify-between cursor-pointer hover:bg-[#151515] transition-colors duration-300 group z-10"
        >
          {/* Subtle grid pattern background */}
          <div className="absolute inset-0 bg-[radial-gradient(#ffffff03_1.5px,transparent_1.5px)] [background-size:20px_20px] pointer-events-none opacity-50" />
          
          <div>
            {/* Header row: Left Title, Right Number */}
            <div className="flex justify-between items-start z-10 relative">
              <div>
                <p className="font-mono text-[0.68rem] uppercase tracking-[0.3em] text-[#888]">Academic Journey</p>
                <h3 className="font-serif text-2xl md:text-3xl text-white tracking-wider mt-2.5 uppercase font-medium">
                  Education
                </h3>
                <div className="w-16 h-[1.5px] bg-gradient-to-r from-[#c471ed] to-[#f64f59] mt-3.5" />
              </div>
              <span 
                className="text-[4.5rem] md:text-[5.5rem] font-serif font-black text-transparent bg-clip-text select-none leading-none tracking-tighter"
                style={{ 
                  backgroundImage: "url('/about_img.png')",
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  filter: 'brightness(1.3) contrast(1.1)'
                }}
              >
                01
              </span>
            </div>

            {/* Expandable Content Details */}
            <motion.div
              initial={false}
              animate={{ height: activeCard === 1 ? "auto" : 0, opacity: activeCard === 1 ? 1 : 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden z-10 relative"
            >
              <div className="space-y-6 mt-6 border-t border-white/5 pt-6">
                <div>
                  <h4 className="text-white font-serif text-[1.15rem] tracking-wide leading-snug">
                    B.Tech — Computer Science & Engineering
                  </h4>
                  <p className="text-[#aaa] text-[0.88rem] mt-2 font-mono leading-relaxed">
                    Cochin University College of Engineering, Kuttanad (CUSAT)
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-[0.8rem] border-t border-white/5 pt-5 mt-4">
                  <span className="text-[#888] font-mono tracking-wider uppercase">Period: 2023 – 2027 • Enrolled</span>
                  <span className="px-4 py-2 bg-white/5 text-white rounded-full font-mono text-[0.85rem] border border-white/10 font-bold tracking-wider flex items-center gap-2 shadow-[0_0_15px_rgba(255,255,255,0.03)]">
                    <span className="text-yellow-400">★</span> CGPA: 9.5 / 10.0
                  </span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Footer view prompt */}
          <div className="flex justify-between items-center border-t border-white/5 pt-4 mt-6 z-10 relative text-[0.68rem] font-mono tracking-widest text-[#888] uppercase select-none">
            <span className="group-hover:text-white transition-colors">
              {activeCard === 1 ? "CLOSE DETAILS" : "DISCOVER DETAILS"}
            </span>
            <motion.span 
              animate={{ rotate: activeCard === 1 ? 45 : 0 }} 
              className="text-lg font-bold text-[#c471ed]"
            >
              +
            </motion.span>
          </div>
        </motion.div>

        {/* Card 02 - Internships */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          onClick={() => setActiveCard(activeCard === 2 ? null : 2)}
          className="relative bg-[#121212] p-8 md:p-10 border border-white/5 md:border-b-0 flex flex-col justify-between cursor-pointer hover:bg-[#151515] transition-colors duration-300 group z-10"
        >
          <div className="absolute inset-0 bg-[radial-gradient(#ffffff03_1.5px,transparent_1.5px)] [background-size:20px_20px] pointer-events-none opacity-50" />
          
          <div>
            {/* Header row */}
            <div className="flex justify-between items-start z-10 relative">
              <div>
                <p className="font-mono text-[0.68rem] uppercase tracking-[0.3em] text-[#888]">Professional Experience</p>
                <h3 className="font-serif text-2xl md:text-3xl text-white tracking-wider mt-2.5 uppercase font-medium">
                  Featured Roles
                </h3>
                <div className="w-16 h-[1.5px] bg-gradient-to-r from-[#f64f59] to-[#c471ed] mt-3.5" />
              </div>
              <span 
                className="text-[4.5rem] md:text-[5.5rem] font-serif font-black text-transparent bg-clip-text select-none leading-none tracking-tighter"
                style={{ 
                  backgroundImage: "url('/about_img.png')",
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  filter: 'brightness(1.3) contrast(1.1)'
                }}
              >
                02
              </span>
            </div>

            {/* Expandable Stacked Roles Layout */}
            <motion.div
              initial={false}
              animate={{ height: activeCard === 2 ? "auto" : 0, opacity: activeCard === 2 ? 1 : 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden z-10 relative"
            >
              <div className="grid grid-cols-1 gap-4 mt-6 border-t border-white/5 pt-6">
                {[
                  { role: "Campus Lead", org: "MuLearn CUCEK", icon: "🎓", badge: "Leadership" },
                  { role: "FrontEnd Intern", org: "MuLearn Foundation", icon: "💼", badge: "Community" },
                  { role: "FrontEnd Intern", org: "OSINT JOURNO", icon: "🛡️", badge: "Research" },
                  { role: "Software Testing Intern", org: "PetroInfotech", icon: "⚙️", badge: "QA" },
                  { role: "Web Development Intern", org: "Bridgeon Solutions", icon: "💻", badge: "Dev" }
                ].map((item, idx) => (
                  <div 
                    key={idx} 
                    className="group relative rounded-xl bg-black/40 border border-white/5 hover:border-white/15 p-4 flex items-center justify-between transition-all duration-300 shadow-sm"
                  >
                    <div className="flex items-center gap-4">
                      <span className="text-xl p-2 rounded-lg bg-white/5">{item.icon}</span>
                      <div>
                        <p className="text-white font-serif text-[0.95rem] tracking-wide leading-tight transition-colors">{item.role}</p>
                        <p className="text-[#888] font-mono text-[0.7rem] uppercase tracking-wider mt-1">{item.org}</p>
                      </div>
                    </div>
                    <span className="text-[0.62rem] font-mono uppercase tracking-widest text-[#aaa] border border-white/10 px-2.5 py-1 rounded bg-white/5">
                      {item.badge}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Footer view prompt */}
          <div className="flex justify-between items-center border-t border-white/5 pt-4 mt-6 z-10 relative text-[0.68rem] font-mono tracking-widest text-[#888] uppercase select-none">
            <span className="group-hover:text-white transition-colors">
              {activeCard === 2 ? "CLOSE DETAILS" : "DISCOVER DETAILS"}
            </span>
            <motion.span 
              animate={{ rotate: activeCard === 2 ? 45 : 0 }} 
              className="text-lg font-bold text-[#f64f59]"
            >
              +
            </motion.span>
          </div>
        </motion.div>

        {/* Card 03 - Projects */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          onClick={() => setActiveCard(activeCard === 3 ? null : 3)}
          className="relative bg-[#121212] p-8 md:p-10 border border-white/5 md:border-r-0 flex flex-col justify-between cursor-pointer hover:bg-[#151515] transition-colors duration-300 group z-10"
        >
          <div className="absolute inset-0 bg-[radial-gradient(#ffffff03_1.5px,transparent_1.5px)] [background-size:20px_20px] pointer-events-none opacity-50" />
          
          <div>
            {/* Header row */}
            <div className="flex justify-between items-start z-10 relative">
              <div>
                <p className="font-mono text-[0.68rem] uppercase tracking-[0.3em] text-[#888]">Creative Portfolio</p>
                <h3 className="font-serif text-2xl md:text-3xl text-white tracking-wider mt-2.5 mb-3.5 uppercase font-medium">
                  Creations
                </h3>
                <div className="w-16 h-[1.5px] bg-gradient-to-r from-[#c471ed] to-[#f64f59] mt-3.5" />
              </div>
              <span 
                className="text-[4.5rem] md:text-[5.5rem] font-serif font-black text-transparent bg-clip-text select-none leading-none tracking-tighter"
                style={{ 
                  backgroundImage: "url('/about_img.png')",
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  filter: 'brightness(1.3) contrast(1.1)'
                }}
              >
                03
              </span>
            </div>

            {/* Expandable Projects List */}
            <motion.div
              initial={false}
              animate={{ height: activeCard === 3 ? "auto" : 0, opacity: activeCard === 3 ? 1 : 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden z-10 relative"
            >
              <div className="space-y-4 mt-6 border-t border-white/5 pt-6">
                {[
                  { name: "WildGuard", desc: "AI Wildlife Detection & Emergency Protection System." },
                  { name: "Duck-Track", desc: "Automated AI Disease Surveillance and Analysis." },
                  { name: "Take-it-down & Trace-an-object", desc: "Computer vision suite for digital tracking & tracing." },
                  { name: "Water Conservation Chatbot", desc: "AI companion guiding smart water footprint metrics." }
                ].map((proj, idx) => (
                  <div key={idx} className="flex gap-4 items-start border-b border-white/5 pb-3.5 last:border-0 last:pb-0">
                    <span className="text-[0.8rem] text-[#c471ed] font-mono font-bold mt-0.5">0{idx + 1}</span>
                    <div>
                      <h5 className="text-white font-serif text-[0.96rem] tracking-wide font-medium leading-none">{proj.name}</h5>
                      <p className="text-[#888] text-[0.8rem] font-sans mt-1.5 leading-relaxed">{proj.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Footer view prompt */}
          <div className="flex justify-between items-center border-t border-white/5 pt-4 mt-6 z-10 relative text-[0.68rem] font-mono tracking-widest text-[#888] uppercase select-none">
            <span className="group-hover:text-white transition-colors">
              {activeCard === 3 ? "CLOSE DETAILS" : "DISCOVER DETAILS"}
            </span>
            <motion.span 
              animate={{ rotate: activeCard === 3 ? 45 : 0 }} 
              className="text-lg font-bold text-[#c471ed]"
            >
              +
            </motion.span>
          </div>
        </motion.div>

        {/* Card 04 - Socials */}
        <motion.div 
          id="contact"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          onClick={() => setActiveCard(activeCard === 4 ? null : 4)}
          className="relative bg-[#121212] p-8 md:p-10 border border-white/5 flex flex-col justify-between cursor-pointer hover:bg-[#151515] transition-colors duration-300 group z-10"
        >
          <div className="absolute inset-0 bg-[radial-gradient(#ffffff03_1.5px,transparent_1.5px)] [background-size:20px_20px] pointer-events-none opacity-50" />
          
          <div>
            {/* Header row */}
            <div className="flex justify-between items-start z-10 relative">
              <div>
                <p className="font-mono text-[0.68rem] uppercase tracking-[0.3em] text-[#888]">Get In Touch</p>
                <h3 className="font-serif text-2xl md:text-3xl text-white tracking-wider mt-2.5 mb-3.5 uppercase font-medium">
                  The Directory
                </h3>
                <div className="w-16 h-[1.5px] bg-gradient-to-r from-[#f64f59] to-[#c471ed] mt-3.5" />
              </div>
              <span 
                className="text-[4.5rem] md:text-[5.5rem] font-serif font-black text-transparent bg-clip-text select-none leading-none tracking-tighter"
                style={{ 
                  backgroundImage: "url('/about_img.png')",
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  filter: 'brightness(1.3) contrast(1.1)'
                }}
              >
                04
              </span>
            </div>

            {/* Expandable Social Grid */}
            <motion.div
              initial={false}
              animate={{ height: activeCard === 4 ? "auto" : 0, opacity: activeCard === 4 ? 1 : 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden z-10 relative"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6 border-t border-white/5 pt-6">
                <a 
                  href="mailto:vedhavk.work@gmail.com" 
                  className="flex items-center gap-4 bg-white/5 border border-white/10 hover:border-white/20 p-4 rounded-xl transition-all duration-300 shadow-md hover:-translate-y-0.5"
                  onClick={(e) => e.stopPropagation()}
                >
                  <span className="text-xl">✉️</span>
                  <div className="min-w-0">
                    <p className="text-white font-serif text-[0.9rem] tracking-wide font-medium leading-none">Email</p>
                    <p className="text-[#888] font-mono text-[0.68rem] mt-1.5 truncate">vedhavk.work@gmail.com</p>
                  </div>
                </a>

                <a 
                  href="https://linkedin.com/in/vedhavk" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center gap-4 bg-white/5 border border-white/10 hover:border-white/20 p-4 rounded-xl transition-all duration-300 shadow-md hover:-translate-y-0.5"
                  onClick={(e) => e.stopPropagation()}
                >
                  <span className="text-xl">💼</span>
                  <div className="min-w-0">
                    <p className="text-white font-serif text-[0.9rem] tracking-wide font-medium leading-none">LinkedIn</p>
                    <p className="text-[#888] font-mono text-[0.68rem] mt-1.5">@vedhavk</p>
                  </div>
                </a>

                <a 
                  href="https://github.com/vedhavk" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center gap-4 bg-white/5 border border-white/10 hover:border-white/20 p-4 rounded-xl transition-all duration-300 shadow-md hover:-translate-y-0.5"
                  onClick={(e) => e.stopPropagation()}
                >
                  <span className="text-xl">🐙</span>
                  <div className="min-w-0">
                    <p className="text-white font-serif text-[0.9rem] tracking-wide font-medium leading-none">GitHub</p>
                    <p className="text-[#888] font-mono text-[0.68rem] mt-1.5">@vedhavk</p>
                  </div>
                </a>

                <a 
                  href="https://instagram.com/ve_dh_a_v" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center gap-4 bg-white/5 border border-white/10 hover:border-white/20 p-4 rounded-xl transition-all duration-300 shadow-md hover:-translate-y-0.5"
                  onClick={(e) => e.stopPropagation()}
                >
                  <span className="text-xl">📸</span>
                  <div className="min-w-0">
                    <p className="text-white font-serif text-[0.9rem] tracking-wide font-medium leading-none">Instagram</p>
                    <p className="text-[#888] font-mono text-[0.68rem] mt-1.5">@vedha.vk</p>
                  </div>
                </a>
              </div>
            </motion.div>
          </div>

          {/* Footer view prompt */}
          <div className="flex justify-between items-center border-t border-white/5 pt-4 mt-6 z-10 relative text-[0.68rem] font-mono tracking-widest text-[#888] uppercase select-none">
            <span className="group-hover:text-white transition-colors">
              {activeCard === 4 ? "CLOSE DETAILS" : "DISCOVER DETAILS"}
            </span>
            <motion.span 
              animate={{ rotate: activeCard === 4 ? 45 : 0 }} 
              className="text-lg font-bold text-[#f64f59]"
            >
              +
            </motion.span>
          </div>
        </motion.div>

      </div>
    </section>
  )
}
