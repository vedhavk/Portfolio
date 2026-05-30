"use client"

import Image from 'next/image'

export default function Footer() {
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault()
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <footer className="w-full bg-[#070707] border-t border-white/[0.02] py-16 px-6 md:px-12 relative overflow-hidden">
      {/* Subtle gold glow at the bottom background */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[150px] bg-[#b8860b]/5 filter blur-[100px] rounded-full pointer-events-none" />

      {/* Girl Illustration at the bottom right */}
      <div className="absolute bottom-0 right-4 lg:right-16 w-[280px] h-[280px] lg:w-[330px] lg:h-[330px] hidden md:block pointer-events-none select-none z-10">
        <Image 
          src="/girl-removebg-preview.png"
          alt="Illustration"
          fill
          className="object-contain object-bottom"
          priority
        />
      </div>

      <div className="max-w-6xl mx-auto flex flex-col gap-12 relative z-20">
        
        {/* Top Split */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 pb-12 border-b border-white/[0.04]">
          
          {/* Logo & Bio Column */}
          <div className="md:col-span-5 flex flex-col gap-4 text-left">
            <div className="flex items-center gap-3">
              <span className="text-2xl md:text-3xl font-extrabold text-[#ffd700] bg-black border border-[#b8860b]/30 w-12 h-12 rounded-full flex items-center justify-center font-mono shadow-[0_0_15px_rgba(218,165,32,0.15)]">
                V
              </span>
              <span className="text-white font-sans text-xl font-bold tracking-wide">
                Vedha VK
              </span>
            </div>
            <p className="text-[#888] text-sm leading-relaxed max-w-[420px] font-sans mt-2">
              B.Tech CSE student at CUSAT building impactful web apps and AI systems. Frontend-focused, AI-curious, and always shipping.
            </p>
          </div>

          {/* Spacer */}
          <div className="hidden md:block md:col-span-1" />

          {/* Navigation Links Column */}
          <div className="col-span-1 md:col-span-2 text-left">
            <h4 className="text-[#ffd700] text-xs font-mono tracking-[0.2em] uppercase font-bold mb-4">
              Navigate
            </h4>
            <ul className="flex flex-col gap-2">
              {['Home', 'About', 'Experience', 'Projects', 'Skills', 'Contact'].map((item) => (
                <li key={item}>
                  <a 
                    href={`#${item.toLowerCase()}`}
                    onClick={(e) => handleNavClick(e, item.toLowerCase())}
                    className="text-[#666] hover:text-[#ffd700] transition-colors duration-300 text-sm font-sans"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Reach Out Column */}
          <div className="col-span-1 md:col-span-3 text-left">
            <h4 className="text-[#ffd700] text-xs font-mono tracking-[0.2em] uppercase font-bold mb-4">
              Reach Out
            </h4>
            <ul className="flex flex-col gap-3">
              <li>
                <a 
                  href="mailto:vedhavk2004@gmail.com"
                  className="text-[#666] hover:text-white transition-colors duration-300 text-sm font-sans flex items-center gap-2"
                >
                  vedhavk2004@gmail.com
                </a>
              </li>
              <li>
                <a 
                  href="tel:+918848717045"
                  className="text-[#666] hover:text-white transition-colors duration-300 text-sm font-sans flex items-center gap-2"
                >
                  +91 8848717045
                </a>
              </li>
              <li className="flex gap-4 mt-2">
                <a 
                  href="https://github.com/vedhavk"
                  target="_blank"
                  rel="noreferrer"
                  className="text-[#666] hover:text-[#ffd700] transition-colors duration-300 text-sm font-sans"
                >
                  GitHub
                </a>
                <span className="text-white/10">|</span>
                <a 
                  href="https://linkedin.com/in/vedhavk"
                  target="_blank"
                  rel="noreferrer"
                  className="text-[#666] hover:text-[#ffd700] transition-colors duration-300 text-sm font-sans"
                >
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-mono text-[#444] uppercase tracking-wider">
          <div>
            &copy; 2026 Vedha VK. Built with Next.js
          </div>
          <div className="flex items-center gap-2 text-[#ffd700]/70 mr-0 md:mr-[280px] lg:mr-[330px] transition-all">
            <span>Kozhikode, Kerala</span>
            <span className="text-white/10">•</span>
            <span>Open to Opportunities</span>
          </div>
        </div>

      </div>
    </footer>
  )
}
