"use client"

import { useState, useCallback, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function GradCapBadge() {
  const [open, setOpen] = useState(false)
  const panelRef = useRef<HTMLDivElement>(null)

  const toggle = useCallback(() => setOpen(prev => !prev), [])

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle() }
    if (e.key === 'Escape') setOpen(false)
  }, [toggle])

  // Close when clicking outside
  useEffect(() => {
    if (!open) return
    const handler = (e: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [open])

  return (
    <div
      ref={panelRef}
      className="absolute z-30"
      style={{ bottom: '-8px', right: '-8px' }}
    >
      {/* ── Floating Cap Button ── */}
      <motion.button
        onClick={toggle}
        onKeyDown={handleKeyDown}
        aria-label="Toggle Academic Journey details"
        aria-expanded={open}
        tabIndex={0}
        animate={{ y: open ? 0 : [0, -6, 0] }}
        transition={{ y: { duration: 3, repeat: open ? 0 : Infinity, ease: 'easeInOut' } }}
        whileHover={{ scale: 1.1, rotate: 5 }}
        whileFocus={{ scale: 1.1, rotate: 5 }}
        className="w-[52px] h-[52px] rounded-full backdrop-blur-xl border flex items-center justify-center cursor-pointer select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30 transition-colors duration-200"
        style={{
          background: open
            ? 'rgba(255,255,255,0.08)'
            : 'radial-gradient(ellipse at 35% 35%, rgba(196,113,237,0.15) 0%, rgba(10,10,10,0.85) 100%)',
          borderColor: open ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.14)',
          boxShadow: open ? 'none' : '0 0 14px 2px rgba(196,113,237,0.2)',
        }}
      >
        <span aria-hidden="true" className="text-[1.45rem] leading-none">🎓</span>
      </motion.button>

      {/* ── Inline Detail Panel ── */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.97, y: 6 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: 4 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="absolute bottom-full mb-3 right-0 w-[260px] rounded-xl border border-white/10 bg-[#111113]"
            style={{ boxShadow: '0 8px 28px rgba(0,0,0,0.55)' }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 pt-4 pb-2 border-b border-white/[0.06]">
              <span className="text-white text-[0.78rem] font-semibold tracking-wide">
                Academic Journey
              </span>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close"
                className="text-[#555] hover:text-white transition-colors text-[0.9rem] leading-none focus:outline-none"
              >
                ✕
              </button>
            </div>

            {/* Content */}
            <div className="px-4 py-3">
              <p className="text-[#555] text-[0.58rem] font-mono uppercase tracking-[0.22em] mb-2.5">
                Education
              </p>

              <div className="flex items-start gap-2.5">
                <span className="text-[0.95rem] mt-0.5 shrink-0" aria-hidden="true">🎓</span>
                <div>
                  <p className="text-white text-[0.78rem] font-medium leading-snug">
                    B.Tech Computer Science &amp; Engineering
                  </p>
                  <p className="text-[#888] text-[0.68rem] font-mono mt-1 leading-relaxed">
                    Cochin University College of Engineering, Kuttanad (CUSAT)
                  </p>
                  <div className="flex items-center justify-between mt-2">
                    <p className="text-[#555] text-[0.62rem] font-mono uppercase tracking-wider">
                      2023 – Present
                    </p>
                    <span className="text-[0.62rem] font-mono text-[#aaa] border border-white/10 px-2 py-0.5 rounded-full bg-white/[0.03]">
                      CGPA: 9.5 / 10.0
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
