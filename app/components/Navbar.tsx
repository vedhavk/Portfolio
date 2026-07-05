"use client"

import { motion } from 'framer-motion'

export default function Navbar() {
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault()
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <motion.nav 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      transition={{ duration: 0.8 }}
      className="absolute top-12 w-full max-w-[85vw] left-1/2 -translate-x-1/2 z-[999] flex justify-between text-[#888] uppercase tracking-[0.18em] text-[0.68rem] font-mono pointer-events-auto"
    >
      {['Home', 'About', 'Experience', 'Projects', 'Skills', 'Contact'].map((item) => (
        <a 
          key={item} 
          href={`#${item.toLowerCase()}`} 
          onClick={(e) => handleNavClick(e, item.toLowerCase())}
          className="hover:text-white transition-colors"
        >
          {item}
        </a>
      ))}
    </motion.nav>
  )
}
