"use client"

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

interface Skill {
  id: string
  name: string
  category: string
  baseRadius: number
}

const SKILLS_DATA: Skill[] = [
  // Programming Languages
  { id: 'js', name: 'JavaScript', category: 'languages', baseRadius: 54 },
  { id: 'java', name: 'Java', category: 'languages', baseRadius: 46 },
  { id: 'html', name: 'HTML5', category: 'languages', baseRadius: 44 },
  { id: 'css', name: 'CSS3', category: 'languages', baseRadius: 44 },
  { id: 'sql', name: 'SQL', category: 'languages', baseRadius: 46 },
  { id: 'python', name: 'Python', category: 'languages', baseRadius: 52 },

  // Frontend
  { id: 'react', name: 'React.js', category: 'frontend', baseRadius: 58 },
  { id: 'next', name: 'Next.js', category: 'frontend', baseRadius: 56 },
  { id: 'tailwind', name: 'TailwindCSS', category: 'frontend', baseRadius: 50 },
  { id: 'shadcn', name: 'shadcn/ui', category: 'frontend', baseRadius: 48 },
  { id: 'zustand', name: 'Zustand', category: 'frontend', baseRadius: 44 },
  { id: 'query', name: 'TanStack Query', category: 'frontend', baseRadius: 52 },
  { id: 'hookform', name: 'React Hook Form', category: 'frontend', baseRadius: 50 },

  // Backend & APIs
  { id: 'node', name: 'Node.js', category: 'backend', baseRadius: 52 },
  { id: 'express', name: 'Express.js', category: 'backend', baseRadius: 48 },
  { id: 'fastapi', name: 'FastAPI', category: 'backend', baseRadius: 48 },
  { id: 'rest', name: 'REST APIs', category: 'backend', baseRadius: 48 },
  { id: 'mongo', name: 'MongoDB', category: 'backend', baseRadius: 48 },

  // AI / ML & Testing
  { id: 'ml', name: 'Machine Learning', category: 'ai_testing', baseRadius: 56 },
  { id: 'watson', name: 'IBM WatsonX', category: 'ai_testing', baseRadius: 54 },
  { id: 'vision', name: 'Computer Vision', category: 'ai_testing', baseRadius: 52 },
  { id: 'cypress', name: 'Cypress', category: 'ai_testing', baseRadius: 46 },
  { id: 'e2e', name: 'E2E Testing', category: 'ai_testing', baseRadius: 46 },
  { id: 'qa', name: 'QA Automation', category: 'ai_testing', baseRadius: 48 },

  // Tools & Platforms
  { id: 'git', name: 'Git & GitHub', category: 'tools', baseRadius: 50 },
  { id: 'figma', name: 'Figma', category: 'tools', baseRadius: 46 },
  { id: 'vscode', name: 'VS Code', category: 'tools', baseRadius: 48 },
  { id: 'vercel', name: 'Vercel', category: 'tools', baseRadius: 46 },
  { id: 'postman', name: 'Postman', category: 'tools', baseRadius: 46 },

  // Languages
  { id: 'eng', name: 'English', category: 'spoken_languages', baseRadius: 46 },
  { id: 'hin', name: 'Hindi', category: 'spoken_languages', baseRadius: 44 },
  { id: 'mal', name: 'Malayalam\n(Native)', category: 'spoken_languages', baseRadius: 54 },
  { id: 'san', name: 'Sanskrit', category: 'spoken_languages', baseRadius: 42 }
]

const CATEGORY_META: Record<string, { label: string; text: string; bg: string; border: string; glow: string }> = {
  languages: {
    label: 'Programming Languages',
    text: '#ffa05e', // Warm Orange
    bg: 'rgba(230, 92, 0, 0.07)',
    border: 'rgba(230, 92, 0, 0.3)',
    glow: 'rgba(230, 92, 0, 0.4)'
  },
  frontend: {
    label: 'Frontend Development',
    text: '#d38cff', // Soft Purple
    bg: 'rgba(196, 113, 237, 0.07)',
    border: 'rgba(196, 113, 237, 0.3)',
    glow: 'rgba(196, 113, 237, 0.4)'
  },
  backend: {
    label: 'Backend & APIs',
    text: '#5eff8b', // Neon Mint Green
    bg: 'rgba(56, 239, 125, 0.07)',
    border: 'rgba(56, 239, 125, 0.3)',
    glow: 'rgba(56, 239, 125, 0.4)'
  },
  ai_testing: {
    label: 'AI / ML & Testing',
    text: '#ff8a8d', // Crimson Pink/Red
    bg: 'rgba(246, 79, 89, 0.07)',
    border: 'rgba(246, 79, 89, 0.3)',
    glow: 'rgba(246, 79, 89, 0.4)'
  },
  tools: {
    label: 'Tools & Platforms',
    text: '#ff62d1', // Hot Pink
    bg: 'rgba(184, 0, 133, 0.07)',
    border: 'rgba(184, 0, 133, 0.3)',
    glow: 'rgba(184, 0, 133, 0.4)'
  },
  spoken_languages: {
    label: 'Languages',
    text: '#7dd3fc', // Sky Blue
    bg: 'rgba(56, 189, 248, 0.07)',
    border: 'rgba(56, 189, 248, 0.3)',
    glow: 'rgba(56, 189, 248, 0.4)'
  }
}

interface NodeState {
  id: string
  name: string
  category: string
  baseRadius: number
  x: number
  y: number
  vx: number
  vy: number
}

export default function Skills() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null)
  const [dimensions, setDimensions] = useState({ width: 800, height: 580 })
  const [scale, setScale] = useState(1)

  // Store node physics parameters in a Ref to run at 60fps without triggering React renders
  const nodesRef = useRef<NodeState[]>([])
  const draggedIdRef = useRef<string | null>(null)
  const pointerRef = useRef({ x: 0, y: 0 })
  const pointerInRef = useRef(false)

  // Track page size to scale the bubble sizes dynamically
  useEffect(() => {
    const handleResize = () => {
      if (!containerRef.current) return
      const rect = containerRef.current.getBoundingClientRect()
      setDimensions({
        width: rect.width,
        height: rect.height || 580
      })

      if (rect.width < 500) {
        setScale(0.55)
      } else if (rect.width < 800) {
        setScale(0.75)
      } else if (rect.width < 1200) {
        setScale(0.9)
      } else {
        setScale(1)
      }
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    
    // Initialize nodes
    const w = containerRef.current?.getBoundingClientRect().width || 800
    const h = 580
    nodesRef.current = SKILLS_DATA.map((skill) => ({
      ...skill,
      x: w / 2 + (Math.random() - 0.5) * 150,
      y: h / 2 + (Math.random() - 0.5) * 150,
      vx: (Math.random() - 0.5) * 2,
      vy: (Math.random() - 0.5) * 2
    }))

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Physics animation loop
  useEffect(() => {
    let animId: number
    const currentScale = scale

    const tick = () => {
      const nodes = nodesRef.current
      if (nodes.length === 0) {
        animId = requestAnimationFrame(tick)
        return
      }

      const cx = dimensions.width / 2
      const cy = dimensions.height / 2
      const gravity = 0.02
      const friction = 0.84

      // 1. Center attraction and mouse repulsion
      nodes.forEach((node) => {
        // Dragged node follows pointer
        if (draggedIdRef.current === node.id) {
          node.x = pointerRef.current.x
          node.y = pointerRef.current.y
          node.vx = 0
          node.vy = 0
          return
        }

        // Standard gravity pull to center
        node.vx += (cx - node.x) * gravity
        node.vy += (cy - node.y) * gravity

        // Mouse repelling force
        if (pointerInRef.current && draggedIdRef.current === null) {
          const dx = node.x - pointerRef.current.x
          const dy = node.y - pointerRef.current.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          const repelRadius = 150
          if (dist < repelRadius && dist > 0) {
            const force = (repelRadius - dist) * 0.06
            node.vx += (dx / dist) * force
            node.vy += (dy / dist) * force
          }
        }
      })

      // 2. Collision resolution (bubble overlapping check)
      const buffer = 5 // spacing between bubbles
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i]
        const rA = a.baseRadius * currentScale
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j]
          const rB = b.baseRadius * currentScale
          const dx = b.x - a.x
          const dy = b.y - a.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          const minDist = rA + rB + buffer

          if (dist < minDist) {
            const overlap = minDist - dist
            const nx = dx / (dist || 1)
            const ny = dy / (dist || 1)

            // Split the push force
            const pushX = nx * overlap * 0.45
            const pushY = ny * overlap * 0.45

            if (draggedIdRef.current !== a.id) {
              a.x -= pushX
              a.y -= pushY
              a.vx -= pushX * 0.5
              a.vy -= pushY * 0.5
            }
            if (draggedIdRef.current !== b.id) {
              b.x += pushX
              b.y += pushY
              b.vx += pushX * 0.5
              b.vy += pushY * 0.5
            }
          }
        }
      }

      // 3. Keep within container bounds (bounce off boundaries)
      nodes.forEach((node) => {
        if (draggedIdRef.current === node.id) return

        const r = node.baseRadius * currentScale
        // Left & Right bounds
        if (node.x - r < 10) {
          node.x = r + 10
          node.vx *= -0.5
        } else if (node.x + r > dimensions.width - 10) {
          node.x = dimensions.width - r - 10
          node.vx *= -0.5
        }
        // Top & Bottom bounds
        if (node.y - r < 10) {
          node.y = r + 10
          node.vy *= -0.5
        } else if (node.y + r > dimensions.height - 10) {
          node.y = dimensions.height - r - 10
          node.vy *= -0.5
        }

        // Apply friction and update position
        node.vx *= friction
        node.vy *= friction
        node.x += node.vx
        node.y += node.vy

        // Directly update the DOM element styling for 60fps rendering without React lifecycle lag
        const el = document.getElementById(`bubble-${node.id}`)
        if (el) {
          el.style.transform = `translate3d(${node.x - r}px, ${node.y - r}px, 0)`
          el.style.width = `${r * 2}px`
          el.style.height = `${r * 2}px`
        }
      })

      animId = requestAnimationFrame(tick)
    }

    animId = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(animId)
  }, [dimensions, scale])

  const handlePointerDown = (id: string, e: React.PointerEvent) => {
    e.preventDefault()
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    draggedIdRef.current = id
    pointerRef.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    }
    // Set pointer active
    const el = document.getElementById(`bubble-${id}`)
    if (el) el.style.cursor = 'grabbing'
  }

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const px = e.clientX - rect.left
    const py = e.clientY - rect.top

    pointerRef.current = { x: px, y: py }
    pointerInRef.current = px >= 0 && px <= rect.width && py >= 0 && py <= rect.height
  }

  const handlePointerUp = () => {
    if (draggedIdRef.current) {
      const el = document.getElementById(`bubble-${draggedIdRef.current}`)
      if (el) el.style.cursor = 'grab'
    }
    draggedIdRef.current = null
  }

  return (
    <section
      id="skills"
      className="relative w-full min-h-screen bg-[#0a0a0a] py-28 overflow-hidden flex flex-col justify-center"
    >
      {/* ── Decorative background text ── */}
      <div
        className="absolute top-12 left-1/2 -translate-x-1/2 text-center text-white/[0.02] z-0 whitespace-nowrap leading-none pointer-events-none select-none"
        style={{
          fontFamily: 'var(--font-bebas-neue)',
          fontSize: 'clamp(8rem, 20vw, 24rem)',
        }}
      >
        TOOLKIT
      </div>

      <div className="w-full max-w-6xl mx-auto px-6 z-10 relative flex flex-col items-center">
        {/* ── Header ── */}
        <div className="text-center mb-16">
          <p className="font-mono text-[0.7rem] md:text-[0.75rem] uppercase tracking-[0.3em] text-[#888]">
            My technical toolkit
          </p>
          <h2
            className="text-white text-5xl md:text-7xl font-bold uppercase tracking-wider mt-3 leading-none filter drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]"
            style={{ fontFamily: 'var(--font-bebas-neue)' }}
          >
            Skills
          </h2>
          <div className="h-[2px] bg-gradient-to-r from-[#c471ed] via-[#f64f59] to-[#38ef7d] mx-auto mt-6 w-[120px]" />
        </div>

        {/* ── Layout Grid ── */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-10 w-full items-stretch mt-4">
          
          {/* Category List Sidebar */}
          <div className="flex flex-col justify-center gap-3.5 lg:col-span-1 border-r border-white/5 pr-0 lg:pr-8">
            <span className="font-mono text-[0.62rem] uppercase tracking-[0.25em] text-[#555] mb-2 block">
              Categories
            </span>
            {Object.entries(CATEGORY_META).map(([key, meta]) => {
              const isHovered = hoveredCategory === key
              const isAnyHovered = hoveredCategory !== null

              return (
                <button
                  key={key}
                  onMouseEnter={() => setHoveredCategory(key)}
                  onMouseLeave={() => setHoveredCategory(null)}
                  className={`w-full text-left py-2.5 px-4 rounded-xl border font-sans text-sm tracking-wide transition-all duration-300 relative overflow-hidden outline-none ${
                    isHovered
                      ? 'border-white/20 bg-white/[0.04] translate-x-2'
                      : isAnyHovered
                        ? 'border-transparent opacity-35 bg-transparent'
                        : 'border-white/[0.04] bg-white/[0.01]'
                  }`}
                  style={{
                    color: isHovered ? meta.text : '#888'
                  }}
                >
                  {/* Subtle hover accent dot */}
                  {isHovered && (
                    <span 
                      className="absolute left-0 top-0 bottom-0 w-1.5"
                      style={{ backgroundColor: meta.text }}
                    />
                  )}
                  {meta.label}
                </button>
              )
            })}
          </div>

          {/* Interactive Physics Bubble Area */}
          <div 
            ref={containerRef}
            onPointerMove={handlePointerMove}
            onPointerLeave={() => {
              pointerInRef.current = false
              handlePointerUp()
            }}
            onPointerUp={handlePointerUp}
            className="lg:col-span-3 h-[580px] bg-black/30 border border-white/[0.05] rounded-3xl relative overflow-hidden select-none pointer-events-auto cursor-default touch-none"
            style={{
              boxShadow: 'inset 0 0 35px rgba(0,0,0,0.8)'
            }}
          >
            {/* Grid Pattern inside the bubble container */}
            <div className="absolute inset-0 bg-[radial-gradient(#ffffff02_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

            {/* Render bubbles */}
            {SKILLS_DATA.map((skill) => {
              const meta = CATEGORY_META[skill.category]
              const isCategoryMatch = hoveredCategory === skill.category
              const isAnyHovered = hoveredCategory !== null
              const r = skill.baseRadius * scale

              return (
                <div
                  key={skill.id}
                  id={`bubble-${skill.id}`}
                  onPointerDown={(e) => handlePointerDown(skill.id, e)}
                  className="absolute rounded-full flex flex-col items-center justify-center text-center font-sans font-medium uppercase transition-opacity transition-shadow duration-300 select-none cursor-grab active:cursor-grabbing backface-hidden"
                  style={{
                    left: 0,
                    top: 0,
                    width: `${r * 2}px`,
                    height: `${r * 2}px`,
                    background: meta.bg,
                    borderColor: isCategoryMatch 
                      ? meta.text 
                      : isAnyHovered 
                        ? 'rgba(255,255,255,0.03)' 
                        : meta.border,
                    borderWidth: '1px',
                    borderStyle: 'solid',
                    color: isCategoryMatch 
                      ? '#ffffff' 
                      : isAnyHovered 
                        ? 'rgba(255,255,255,0.15)' 
                        : meta.text,
                    boxShadow: isCategoryMatch
                      ? `0 0 25px ${meta.glow}, inset 0 0 12px ${meta.bg}`
                      : isAnyHovered
                        ? 'none'
                        : `0 0 12px rgba(0,0,0,0.4), inset 0 0 8px ${meta.bg}`,
                    opacity: isAnyHovered && !isCategoryMatch ? 0.28 : 1,
                    zIndex: isCategoryMatch ? 30 : 10,
                    willChange: 'transform, width, height'
                  }}
                >
                  <span 
                    className="pointer-events-none select-none select-none tracking-wide"
                    style={{
                      fontSize: r >= 50 ? '0.78rem' : r >= 42 ? '0.68rem' : '0.58rem',
                      lineHeight: '1.25',
                      padding: '0 8px'
                    }}
                  >
                    {skill.name.split('\n').map((line, idx) => (
                      <span key={idx} className="block last:font-normal last:text-[0.8em] last:opacity-75">
                        {line}
                      </span>
                    ))}
                  </span>
                </div>
              )
            })}
          </div>

        </div>
      </div>
    </section>
  )
}
