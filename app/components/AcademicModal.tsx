"use client"

import { useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence, Variants } from 'framer-motion'
import { createPortal } from 'react-dom'

interface AcademicModalProps {
  isOpen: boolean
  onClose: () => void
}

const backdropVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
}
const modalVariants: Variants = {
  hidden: { opacity: 0, scale: 0.93, y: 12 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] as const } },
  exit: { opacity: 0, scale: 0.95, y: 6, transition: { duration: 0.2, ease: 'easeIn' } },
}

export default function AcademicModal({ isOpen, onClose }: AcademicModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)

  /* Lock body scroll while open */
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      setTimeout(() => closeButtonRef.current?.focus(), 50)
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  /* Escape key */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    if (isOpen) window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [isOpen, onClose])

  /* Click outside */
  const handleBackdropClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (e.target === overlayRef.current) onClose()
    },
    [onClose]
  )

  /* Focus trap */
  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key !== 'Tab') return
    const modal = overlayRef.current?.querySelector('[role="dialog"]') as HTMLElement | null
    if (!modal) return
    const focusable = modal.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    )
    const first = focusable[0]
    const last = focusable[focusable.length - 1]
    if (e.shiftKey) {
      if (document.activeElement === first) { e.preventDefault(); last?.focus() }
    } else {
      if (document.activeElement === last) { e.preventDefault(); first?.focus() }
    }
  }, [])

  if (typeof window === 'undefined') return null

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={overlayRef}
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          transition={{ duration: 0.25 }}
          onClick={handleBackdropClick}
          onKeyDown={handleKeyDown}
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
          style={{
            background: 'rgba(5,5,8,0.80)',
            backdropFilter: 'blur(14px)',
            WebkitBackdropFilter: 'blur(14px)',
          }}
          aria-modal="true"
          role="presentation"
        >
          {/* Modal panel — compact width */}
          <motion.div
            role="dialog"
            aria-label="Academic Journey"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="relative w-full max-w-[420px] rounded-[18px] border border-white/[0.09]"
            style={{
              background: 'linear-gradient(160deg, rgba(18,18,22,0.97) 0%, rgba(10,10,13,0.99) 100%)',
              backdropFilter: 'blur(30px)',
              WebkitBackdropFilter: 'blur(30px)',
              boxShadow:
                '0 32px 80px -16px rgba(0,0,0,0.9), 0 0 0 1px rgba(196,113,237,0.07), 0 0 40px -8px rgba(196,113,237,0.1)',
            }}
          >
            {/* Top accent line */}
            <div
              className="h-[1.5px] w-full rounded-t-[18px]"
              style={{
                background:
                  'linear-gradient(90deg, transparent 0%, rgba(196,113,237,0.8) 40%, rgba(246,79,89,0.5) 70%, transparent 100%)',
              }}
            />

            <div className="px-6 py-5">
              {/* Header */}
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-2">
                  <span
                    className="text-[1rem] leading-none"
                    style={{ filter: 'drop-shadow(0 0 5px rgba(196,113,237,0.65))' }}
                    aria-hidden="true"
                  >
                    🎓
                  </span>
                  <h2 className="text-white text-[1rem] font-semibold tracking-wide leading-none">
                    Academic Journey
                  </h2>
                </div>

                <button
                  ref={closeButtonRef}
                  onClick={onClose}
                  aria-label="Close"
                  className="w-7 h-7 rounded-full border border-white/[0.1] bg-white/[0.04] hover:bg-white/[0.1] flex items-center justify-center text-[#555] hover:text-white transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#c471ed]/50"
                >
                  <svg width="10" height="10" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                    <path d="M1 1L13 13M13 1L1 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </button>
              </div>

              {/* Education label */}
              <p className="font-mono text-[0.58rem] uppercase tracking-[0.28em] text-[#555] mb-4">
                Education
              </p>

              {/* Single education card */}
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15, duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="flex items-start gap-3.5"
              >
                {/* Glowing node */}
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-[0.85rem] border shrink-0 mt-0.5"
                  style={{
                    background: 'rgba(196,113,237,0.12)',
                    borderColor: 'rgba(196,113,237,0.8)',
                    boxShadow: '0 0 12px 2px rgba(196,113,237,0.12), 0 0 5px 1px rgba(196,113,237,0.35)',
                  }}
                  aria-hidden="true"
                >
                  🎓
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  {/* Degree + grade badge */}
                  <div className="flex flex-wrap items-start justify-between gap-2 mb-1.5">
                    <h3 className="text-white text-[0.88rem] font-semibold leading-snug tracking-wide">
                      B.Tech Computer Science &amp; Engineering
                    </h3>
                    <span
                      className="shrink-0 text-[0.62rem] font-mono font-bold px-2.5 py-0.5 rounded-full border tracking-wider"
                      style={{
                        color: 'rgba(196,113,237,1)',
                        borderColor: 'rgba(196,113,237,0.35)',
                        background: 'rgba(196,113,237,0.1)',
                      }}
                    >
                      CGPA: 9.5 / 10.0
                    </span>
                  </div>

                  {/* Institution */}
                  <p className="text-[#666] text-[0.74rem] font-mono leading-relaxed">
                    Cochin University College of Engineering, Kuttanad (CUSAT)
                  </p>

                  {/* Period */}
                  <p className="text-[#444] text-[0.68rem] font-mono mt-1 uppercase tracking-wider">
                    2023 – Present
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  )
}
