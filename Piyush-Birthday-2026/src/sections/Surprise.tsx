import { useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { surprise } from '../data/content'
import { best } from '../data/gallery'
import { PhotoFrame } from '../components/PhotoFrame'
import { PageHeader } from '../components/PageHeader'
import { fireConfetti } from '../components/confetti'
import { sfx } from '../hooks/audio'

export function Surprise() {
  const reduce = useReducedMotion()
  const [open, setOpen] = useState(false)
  const go = () => { if (open) return; setOpen(true); sfx('whoosh'); window.setTimeout(() => { sfx('chime'); fireConfetti(3200, 120) }, 400) }
  return (
    <section className="sur" id="surprise">
      {open && <div className="burst" aria-hidden="true" />}
      <div className="wrap">
        <PageHeader n={9} eyebrow="A little mystery" title={open ? surprise.title : surprise.prompt} />
        <button className={`gift ${open ? 'open' : ''}`} onClick={go} aria-label={surprise.button} aria-expanded={open}>
          <svg viewBox="0 0 200 200" aria-hidden="true">
            <defs>
              <linearGradient id="box" x1="0" x2="1"><stop offset="0" stopColor="#14110d" /><stop offset=".5" stopColor="#2b241b" /><stop offset="1" stopColor="#100d0a" /></linearGradient>
              <linearGradient id="lid" x1="0" x2="1"><stop offset="0" stopColor="#1c1813" /><stop offset=".5" stopColor="#3a3024" /><stop offset="1" stopColor="#17130f" /></linearGradient>
              <linearGradient id="rib" x1="0" x2="1"><stop offset="0" stopColor="#a87b34" /><stop offset=".5" stopColor="#f3d99a" /><stop offset="1" stopColor="#a87b34" /></linearGradient>
              <linearGradient id="beam" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stopColor="#ffe6a8" stopOpacity=".85" /><stop offset="1" stopColor="#ffe6a8" stopOpacity="0" /></linearGradient>
            </defs>
            <ellipse cx="100" cy="186" rx="70" ry="8" fill="rgba(0,0,0,.5)" />
            {open && <motion.path d="M44 94 L156 94 L196 -40 L4 -40 Z" fill="url(#beam)" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.2 }} />}
            <rect x="38" y="92" width="124" height="92" rx="4" fill="url(#box)" stroke="#d4ac5c" strokeOpacity=".35" />
            <rect x="92" y="92" width="16" height="92" fill="url(#rib)" />
            <motion.g initial={false} animate={open && !reduce ? { y: -46, x: 18, rotate: 16 } : open ? { y: -30 } : { y: 0, x: 0, rotate: 0 }}
              transition={{ type: 'spring', stiffness: 120, damping: 12 }} style={{ transformOrigin: '160px 92px' }}>
              <rect x="30" y="70" width="140" height="26" rx="4" fill="url(#lid)" stroke="#d4ac5c" strokeOpacity=".4" />
              <rect x="92" y="70" width="16" height="26" fill="url(#rib)" />
              <path d="M100 70 C82 46 58 50 66 64 C72 74 92 72 100 70 Z" fill="none" stroke="url(#rib)" strokeWidth="7" strokeLinejoin="round" />
              <path d="M100 70 C118 46 142 50 134 64 C128 74 108 72 100 70 Z" fill="none" stroke="url(#rib)" strokeWidth="7" strokeLinejoin="round" />
              <circle cx="100" cy="70" r="6" fill="#f3d99a" />
            </motion.g>
          </svg>
        </button>
        {open ? (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8, duration: 1 }}>
            <p className="sur-msg">{surprise.message}</p>
            <div className="collage">{[0, 1, 2].map((i) => <PhotoFrame key={i} photo={best[i + 3] ?? best[i]} thumb natural />)}</div>
          </motion.div>
        ) : <p className="sur-hint">Tap the gift.</p>}
      </div>
    </section>
  )
}
