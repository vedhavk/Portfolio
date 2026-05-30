"use client"

import { motion } from 'framer-motion'

interface Certificate {
  title: string
  issuer: string
  type: string
  accentColor: string
  sealColor: string
  signature: string
}

const CERTIFICATES: Certificate[] = [
  {
    title: 'Software Development Internship',
    issuer: 'BRIDGEON SOLUTIONS',
    type: 'Internship Certificate',
    accentColor: '#38ef7d', // Mint Green
    sealColor: 'linear-gradient(135deg, #38ef7d 0%, #11998e 100%)',
    signature: 'Bridgeon'
  },
  {
    title: 'Software Testing Internship',
    issuer: 'PETROINFOTECH',
    type: 'Internship Certificate',
    accentColor: '#00f2fe', // Cyan
    sealColor: 'linear-gradient(135deg, #00f2fe 0%, #4facfe 100%)',
    signature: 'PetroInfo'
  },
  {
    title: 'Artificial Intelligence Fundamentals',
    issuer: 'IBM',
    type: 'Certification',
    accentColor: '#ffa05e', // Orange
    sealColor: 'linear-gradient(135deg, #ffa05e 0%, #ff6a00 100%)',
    signature: 'IBM Watson'
  },
  {
    title: 'Project Management Fundamentals',
    issuer: 'IBM',
    type: 'Certification',
    accentColor: '#d38cff', // Soft Purple
    sealColor: 'linear-gradient(135deg, #d38cff 0%, #a18cd1 100%)',
    signature: 'IBM PM'
  },
  {
    title: 'Cybersecurity Foundations',
    issuer: 'GOOGLE',
    type: 'Certification',
    accentColor: '#7dd3fc', // Sky Blue
    sealColor: 'linear-gradient(135deg, #7dd3fc 0%, #0284c7 100%)',
    signature: 'Google Sec'
  },
  {
    title: 'AI/ML Certification',
    issuer: 'CSRBOX (IBM PARTNER)',
    type: 'Program Certificate',
    accentColor: '#ff8a8d', // Coral Pink
    sealColor: 'linear-gradient(135deg, #ff8a8d 0%, #f857a6 100%)',
    signature: 'CSRBOX'
  },
  {
    title: 'HACKP Hackathon – Finalist',
    issuer: 'KERALA POLICE CYBERDOME',
    type: 'Achievement Certificate',
    accentColor: '#ffd700', // Gold
    sealColor: 'linear-gradient(135deg, #ffd700 0%, #b8860b 100%)',
    signature: 'Cyberdome'
  }
]

export default function Certifications() {
  return (
    <section 
      id="certifications" 
      className="relative w-full bg-[#0a0a0a] py-28 overflow-hidden border-t border-white/[0.03]"
    >
      {/* ── Decorative background text ── */}
      <div
        className="absolute top-10 left-[10%] text-white/[0.01] z-0 whitespace-nowrap leading-none pointer-events-none select-none"
        style={{
          fontFamily: 'var(--font-bebas-neue)',
          fontSize: 'clamp(8rem, 20vw, 24rem)',
        }}
      >
        CREDENTIALS
      </div>

      <div className="w-full max-w-6xl mx-auto px-6 z-10 relative">
        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-12 w-full">
          
          {/* ── Left Sticky Header ── */}
          <div className="w-full lg:w-[30%] flex-shrink-0 flex flex-col items-center lg:items-start text-center lg:text-left pt-2">
            <span 
              className="text-[#38ef7d] text-3xl font-medium tracking-wide mb-3 block"
              style={{ fontFamily: "'Caveat', 'Playpen Sans', 'Comic Sans MS', cursive, sans-serif" }}
            >
              Check Out
            </span>
            <h2 
              className="text-white text-4xl sm:text-5xl font-black uppercase tracking-wider mb-6 leading-tight filter drop-shadow-[0_0_12px_rgba(255,255,255,0.08)]"
              style={{ fontFamily: 'var(--font-bebas-neue)' }}
            >
              MY CERTIFICATE
            </h2>
            <p className="text-[#888] font-sans text-sm md:text-base leading-relaxed max-w-[340px]">
              I have done various programming courses to increase my programming skills and I&apos;m sharing few of them
            </p>
          </div>

          {/* ── Right Scrollable Certificates Row ── */}
          <div className="w-full lg:w-[70%] overflow-hidden relative">
            
            {/* Custom Fade Overlays for Scroll Edge Hint */}
            <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-[#0a0a0a] to-transparent z-20 pointer-events-none hidden sm:block" />
            <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-[#0a0a0a] to-transparent z-20 pointer-events-none hidden sm:block" />

            <div className="flex gap-8 overflow-x-auto pb-8 pt-4 px-4 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent scroll-smooth w-full">
              {CERTIFICATES.map((cert, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-20px' }}
                  transition={{ duration: 0.6, ease: 'easeOut', delay: index * 0.05 }}
                  className="flex-shrink-0 flex flex-col items-center w-[290px] group"
                >
                  {/* Certificate Mockup Paper Sheet */}
                  <div 
                    className="w-[280px] h-[190px] bg-[#fdfdfb] rounded-md shadow-2xl relative p-3 border-[5px] border-[#18181b] overflow-hidden group-hover:scale-[1.03] group-hover:border-[#27272a] transition-all duration-300 flex flex-col justify-between"
                  >
                    {/* Inner certificate frame border */}
                    <div className="border border-[#e4e2d5] h-full w-full p-2.5 flex flex-col justify-between rounded relative bg-[#fdfdfb]">
                      
                      {/* Micro background wave pattern */}
                      <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:6px_6px]" />

                      {/* Header line */}
                      <div className="flex justify-between items-start z-10">
                        <span className="font-serif text-[0.6rem] font-black tracking-wider text-[#222]">
                          {cert.issuer.split(' ')[0]}
                        </span>
                        <span className="font-mono text-[0.4rem] tracking-widest text-[#bbb]">
                          VERIFIED
                        </span>
                      </div>

                      {/* Center credentials */}
                      <div className="text-center flex flex-col items-center z-10">
                        <p className="text-[0.4rem] uppercase tracking-widest text-[#999] font-mono leading-none">
                          This is to certify that
                        </p>
                        <p 
                          className="font-serif italic text-sm font-semibold text-[#18181b] my-0.5 tracking-wide leading-none"
                          style={{ fontFamily: "Georgia, serif" }}
                        >
                          Vedha VK
                        </p>
                        <p className="text-[0.38rem] text-[#666] leading-none mb-1">
                          has successfully completed the requirements for
                        </p>
                        <p 
                          className="font-serif text-[0.58rem] font-bold text-[#1a1a1a] max-w-[210px] leading-tight uppercase tracking-wide"
                          style={{ fontFamily: "Georgia, serif" }}
                        >
                          {cert.title.length > 36 ? cert.title.substring(0, 35) + '...' : cert.title}
                        </p>
                      </div>

                      {/* Footer block */}
                      <div className="flex justify-between items-end z-10">
                        {/* Signature block */}
                        <div className="flex flex-col items-start">
                          <span 
                            className="font-serif italic text-[0.52rem] text-[#555] leading-none tracking-wide"
                            style={{ fontFamily: "'Playpen Sans', cursive, Georgia, serif" }}
                          >
                            {cert.signature}
                          </span>
                          <div className="w-14 h-[0.5px] bg-[#bbb] my-0.5" />
                          <span className="text-[0.35rem] text-[#aaa] font-mono uppercase tracking-wider leading-none">
                            AUTHORISED
                          </span>
                        </div>

                        {/* Gold/Colored Badge Seal */}
                        <div 
                          className="relative flex items-center justify-center w-8 h-8 rounded-full shadow-md" 
                          style={{ background: cert.sealColor }}
                        >
                          {/* Inner seal design */}
                          <div className="w-6 h-6 rounded-full border border-white/20 flex items-center justify-center">
                            <span className="text-[0.25rem] text-white font-mono leading-none tracking-tighter">IBM</span>
                          </div>
                          {/* Decorative seal ribbons */}
                          <div className="absolute -bottom-1 -right-0.5 w-1 h-3 bg-red-700/60 rotate-12 origin-top" />
                          <div className="absolute -bottom-1 right-1 w-1 h-3 bg-red-700/60 -rotate-12 origin-top" />
                        </div>
                      </div>

                    </div>
                  </div>

                  {/* Text details below Certificate Graphic */}
                  <div className="text-center mt-5 w-full px-2">
                    <h4 className="text-white font-bold text-sm leading-snug font-sans group-hover:text-[#38ef7d] transition-colors duration-300 min-h-[40px] flex items-center justify-center">
                      {cert.title}
                    </h4>
                    <p 
                      className="text-[0.68rem] font-mono font-bold tracking-wider uppercase mt-1"
                      style={{ color: cert.accentColor }}
                    >
                      {cert.issuer}
                    </p>
                  </div>

                </motion.div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}
