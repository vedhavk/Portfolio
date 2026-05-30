"use client"

import { useState } from 'react'

const CAL_URL = "https://cal.com/vedhavk"
const EMAIL_URL = "mailto:vedhavk2004@gmail.com"
const EMAIL_DISPLAY = "vedhavk2004@gmail.com"

export default function Contact() {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [status, setStatus] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('sending')

    const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_KEY

    // if (!accessKey) {
    //   console.warn("Web3Forms Access Key is missing. Please add NEXT_PUBLIC_WEB3FORMS_KEY to your .env.local file.")
    //   setTimeout(() => {
    //     setStatus('missing_key')
    //   }, 1000)
    //   return
    // }

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify({
          access_key: accessKey,
          name: formState.name,
          email: formState.email,
          subject: formState.subject,
          message: formState.message,
        })
      })

      const result = await response.json()
      if (result.success) {
        setStatus('success')
        setFormState({ name: '', email: '', subject: '', message: '' })
      } else {
        setStatus('error')
      }
    } catch (error) {
      console.error("Error submitting contact form:", error)
      setStatus('error')
    }
  }

  return (
    <section 
      id="contact" 
      className="relative w-full min-h-screen bg-[#0a0a0a] py-28 overflow-hidden flex flex-col justify-center border-t border-white/[0.03]"
    >
      {/* ── Decorative background text ── */}
      <div
        className="absolute top-10 left-1/2 -translate-x-1/2 text-center text-white/[0.01] z-0 whitespace-nowrap leading-none pointer-events-none select-none"
        style={{
          fontFamily: 'var(--font-bebas-neue)',
          fontSize: 'clamp(8rem, 20vw, 24rem)',
        }}
      >
        CONNECT
      </div>

      <div className="w-full max-w-6xl mx-auto px-6 z-10 relative">
        
        {/* ── Header ── */}
        <div className="text-center mb-16">
          <p className="font-mono text-[0.7rem] md:text-[0.75rem] uppercase tracking-[0.3em] text-[#888]">
            Let&apos;s work together
          </p>
          <h2
            className="text-white text-5xl md:text-7xl font-bold uppercase tracking-wider mt-3 leading-none filter drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]"
            style={{ fontFamily: 'var(--font-bebas-neue)' }}
          >
            Contact
          </h2>
          <p className="text-[#666] font-mono text-[0.75rem] md:text-[0.8rem] uppercase tracking-[0.15em] mt-3">
            Open to internships, freelance projects, and collaboration opportunities.
          </p>
          <div className="h-[2px] bg-gradient-to-r from-transparent via-[#b8860b] to-transparent mx-auto mt-6 w-[120px]" />
        </div>

        {/* ── Grid Layout ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mt-6">
          
          {/* ── Left Column: Interactive Orbital Social System ── */}
          <div className="w-full aspect-square max-w-[480px] sm:max-w-[500px] mx-auto flex items-center justify-center relative">
            
            {/* Center Profile Avatar with Glowing Halo */}
            <div className="relative w-36 h-36 rounded-full p-1 z-30">
              {/* Outer Glowing Halos */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#38ef7d]/35 via-[#c471ed]/20 to-white/30 filter blur-md animate-pulse scale-110 pointer-events-none" />
              <div className="absolute inset-0 rounded-full bg-white/5 border border-white/20 filter blur-[2px] pointer-events-none" />
              
              {/* Avatar Image */}
              <div 
                className="w-full h-full rounded-full bg-cover bg-center border border-white/30 relative overflow-hidden"
                style={{ backgroundImage: "url('/about_img.png')" }}
              />
            </div>

            {/* Orbit 1: Smallest (Radius = 100px) */}
            <div className="w-[200px] h-[200px] border border-white/[0.04] rounded-full absolute z-20 flex items-center justify-center pointer-events-none">
              {/* Decorative minor dot on orbit */}
              <div className="w-1.5 h-1.5 rounded-full bg-white/20 absolute top-12 right-6" />

              {/* Email Pill on Orbit 1 */}
              <a 
                href={EMAIL_URL}
                className="absolute top-0 left-[20%] -translate-y-1/2 bg-black/75 hover:bg-black border border-white/10 hover:border-[#38ef7d]/40 py-2 px-3.5 rounded-full flex flex-col items-center shadow-lg transition-all duration-300 pointer-events-auto select-none"
              >
                <span className="font-mono text-[0.55rem] text-[#888] tracking-widest leading-none mb-1">EMAIL</span>
                <span className="font-sans text-[0.68rem] text-white font-bold leading-none">{EMAIL_DISPLAY}</span>
              </a>
            </div>
            
            {/* Orbit 2: Medium (Radius = 160px) */}
            <div className="w-[320px] h-[320px] border border-white/[0.035] rounded-full absolute z-20 flex items-center justify-center pointer-events-none">
              {/* Decorative minor dot on orbit */}
              <div className="w-1 h-1 rounded-full bg-white/20 absolute bottom-12 left-10" />

              {/* GitHub Pill on Orbit 2 */}
              <a 
                href="https://github.com/vedhavk"
                target="_blank"
                rel="noreferrer"
                className="absolute top-0 right-[20%] -translate-y-1/2 bg-black/75 hover:bg-black border border-white/10 hover:border-[#00f2fe]/40 py-2 px-3.5 rounded-full flex flex-col items-center shadow-lg transition-all duration-300 pointer-events-auto select-none"
              >
                <span className="font-mono text-[0.55rem] text-[#888] tracking-widest leading-none mb-1">GITHUB</span>
                <span className="font-sans text-[0.68rem] text-white font-bold leading-none">github.com/vedhavk</span>
              </a>

              {/* Phone Pill on Orbit 2 */}
              <a 
                href="tel:+918848717045"
                className="absolute bottom-0 left-[20%] translate-y-1/2 bg-black/75 hover:bg-black border border-white/10 hover:border-[#ffa05e]/40 py-2 px-3.5 rounded-full flex flex-col items-center shadow-lg transition-all duration-300 pointer-events-auto select-none"
              >
                <span className="font-mono text-[0.55rem] text-[#888] tracking-widest leading-none mb-1">PHONE</span>
                <span className="font-sans text-[0.68rem] text-white font-bold leading-none">+91 8848717045</span>
              </a>
            </div>

            {/* Orbit 3: Largest (Radius = 220px) */}
            <div className="w-[440px] h-[440px] border border-white/[0.025] rounded-full absolute z-20 flex items-center justify-center pointer-events-none">
              {/* Decorative minor dot on orbit */}
              <div className="w-2.5 h-2.5 rounded-full bg-[#38ef7d]/20 absolute bottom-24 right-16 filter blur-[1px] animate-pulse" />

              {/* LinkedIn Pill on Orbit 3 */}
              <a 
                href="https://linkedin.com/in/vedhavk"
                target="_blank"
                rel="noreferrer"
                className="absolute top-[28%] left-0 -translate-x-1/2 bg-black/75 hover:bg-black border border-white/10 hover:border-[#d38cff]/40 py-2 px-3.5 rounded-full flex flex-col items-center shadow-lg transition-all duration-300 pointer-events-auto select-none"
              >
                <span className="font-mono text-[0.55rem] text-[#888] tracking-widest leading-none mb-1">LINKEDIN</span>
                <span className="font-sans text-[0.68rem] text-white font-bold leading-none">linkedin.com/in/vedhavk</span>
              </a>

              {/* Location Pill on Orbit 3 */}
              <a 
                href="https://maps.google.com/?q=Kozhikode,+Kerala,+India"
                target="_blank"
                rel="noreferrer"
                className="absolute bottom-[20%] right-0 translate-x-1/2 bg-black/75 hover:bg-black border border-white/10 hover:border-[#7dd3fc]/40 py-2 px-3.5 rounded-full flex flex-col items-center shadow-lg transition-all duration-300 pointer-events-auto select-none"
              >
                <span className="font-mono text-[0.55rem] text-[#888] tracking-widest leading-none mb-1">LOCATION</span>
                <span className="font-sans text-[0.68rem] text-white font-bold leading-none">Kozhikode, Kerala, India</span>
              </a>
            </div>

          </div>

          {/* ── Right Column: Cal.com Quick Link & Contact Form ── */}
          <div className="flex flex-col gap-6 w-full pr-0 lg:pr-6">
            
            {/* Header + Cal.com Quick CTA */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white/[0.01] border border-white/[0.04] p-5 rounded-2xl relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-black via-[#b8860b] to-[#ffd700] opacity-80" />
              <div>
                <h3 className="text-white text-md font-bold tracking-wide font-sans">
                  Want to schedule a virtual meet?
                </h3>
                <p className="text-[#666] text-[0.72rem] font-sans mt-0.5">
                  Pick a convenient slot directly on my calendar.
                </p>
              </div>
              <a 
                href={CAL_URL}
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-auto text-center py-2 px-4 rounded-full border border-[#b8860b]/40 hover:border-[#ffd700] bg-black text-[#b8860b] hover:text-[#ffd700] hover:shadow-[0_0_12px_rgba(184,134,11,0.2)] font-mono text-[0.68rem] uppercase tracking-wider transition-all duration-300"
              >
                Book on Cal.com
              </a>
            </div>

            {/* Glassmorphic Web3Forms Form */}
            <form 
              onSubmit={handleSubmit}
              className="w-full bg-white/[0.01] border border-white/[0.04] p-8 rounded-3xl flex flex-col gap-5 shadow-[0_15px_35px_rgba(0,0,0,0.5)] relative overflow-hidden"
              style={{
                boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.02)'
              }}
            >
              {/* Subtle gold accent line on the form border */}
              <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-black via-[#b8860b] to-[#ffd700] opacity-90" />

              {/* Name field */}
              <div className="flex flex-col gap-2">
                <label className="font-mono text-[0.65rem] text-white/40 uppercase tracking-[0.2em] font-semibold">
                  Your Name
                </label>
                <input 
                  type="text"
                  required
                  placeholder="John Doe"
                  value={formState.name}
                  onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                  className="w-full bg-white/[0.02] border border-white/5 rounded-xl py-3 px-4 text-white text-sm font-sans placeholder-white/20 focus:outline-none focus:border-[#b8860b]/60 focus:ring-1 focus:ring-[#b8860b]/20 transition-all"
                />
              </div>

              {/* Email field */}
              <div className="flex flex-col gap-2">
                <label className="font-mono text-[0.65rem] text-white/40 uppercase tracking-[0.2em] font-semibold">
                  Your Email
                </label>
                <input 
                  type="email"
                  required
                  placeholder="john@example.com"
                  value={formState.email}
                  onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                  className="w-full bg-white/[0.02] border border-white/5 rounded-xl py-3 px-4 text-white text-sm font-sans placeholder-white/20 focus:outline-none focus:border-[#b8860b]/60 focus:ring-1 focus:ring-[#b8860b]/20 transition-all"
                />
              </div>

              {/* Subject field */}
              <div className="flex flex-col gap-2">
                <label className="font-mono text-[0.65rem] text-white/40 uppercase tracking-[0.2em] font-semibold">
                  Subject
                </label>
                <input 
                  type="text"
                  required
                  placeholder="Internship opportunity / Collaboration"
                  value={formState.subject}
                  onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                  className="w-full bg-white/[0.02] border border-white/5 rounded-xl py-3 px-4 text-white text-sm font-sans placeholder-white/20 focus:outline-none focus:border-[#b8860b]/60 focus:ring-1 focus:ring-[#b8860b]/20 transition-all"
                />
              </div>

              {/* Message field */}
              <div className="flex flex-col gap-2">
                <label className="font-mono text-[0.65rem] text-white/40 uppercase tracking-[0.2em] font-semibold">
                  Message
                </label>
                <textarea 
                  required
                  rows={4}
                  placeholder="Tell me about the project or opportunity..."
                  value={formState.message}
                  onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                  className="w-full bg-white/[0.02] border border-white/5 rounded-xl py-3 px-4 text-white text-sm font-sans placeholder-white/20 focus:outline-none focus:border-[#b8860b]/60 focus:ring-1 focus:ring-[#b8860b]/20 resize-none transition-all"
                />
              </div>

              {/* Submit Button */}
              <button 
                type="submit"
                disabled={status === 'sending'}
                className="w-full py-3.5 rounded-full bg-black hover:bg-[#111] border border-[#b8860b]/60 hover:border-[#ffd700] text-[#b8860b] hover:text-[#ffd700] font-bold uppercase tracking-wider text-xs font-mono transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 relative overflow-hidden"
                style={{
                  boxShadow: '0 0 15px rgba(184, 134, 11, 0.15)'
                }}
              >
                {status === 'sending' ? 'Sending Message...' : 'Send Message'}
              </button>

              {/* Status Message */}
              {status === 'success' && (
                <p className="text-[#38ef7d] font-mono text-[0.7rem] uppercase tracking-wider text-center mt-2 animate-pulse">
                   Message sent successfully! I will reach out soon.
                </p>
              )}

              {status === 'error' && (
                <p className="text-[#f64f59] font-mono text-[0.7rem] uppercase tracking-wider text-center mt-2 animate-pulse">
                  Error sending message. Please try again.
                </p>
              )}

              {/* {status === 'missing_key' && (
                <div className="text-[#ffd700] font-mono text-[0.7rem] uppercase tracking-wider text-center mt-2 border border-[#b8860b]/40 bg-black/40 p-3.5 rounded-xl flex flex-col gap-2 pointer-events-auto">
                  <p>⚠️ Almost ready! To receive real emails:</p>
                  <p className="normal-case text-white/70 leading-normal text-[0.62rem]">
                    1. Go to <a href="https://web3forms.com" target="_blank" rel="noreferrer" className="underline text-[#ffd700] font-bold">web3forms.com</a> to get a free Access Key.
                    <br />
                    2. Add it to your local <code className="bg-white/10 px-1 py-0.5 rounded">.env.local</code> file as:
                    <br />
                    <code className="bg-white/10 px-1.5 py-0.5 rounded select-all block mt-1.5 font-bold text-white text-[0.68rem] tracking-normal">NEXT_PUBLIC_WEB3FORMS_KEY=your_key_here</code>
                  </p>
                </div>
              )} */}
            </form>
          </div>

        </div>

      </div>
    </section>
  )
}
