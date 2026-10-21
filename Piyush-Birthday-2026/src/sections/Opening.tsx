import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { intro } from '../data/content'
import { Letters } from '../components/Split'
import { Particles } from '../components/Particles'
import { audio, sfx } from '../hooks/audio'

// Timeline (ms): 0 black -> 800 glow -> 1500 line 1 -> 5200 line 2 -> 8200 title -> 9200 button
export function Opening({ onEnter }: { onEnter: () => void }) {
  const reduce = useReducedMotion()
  const [stage, setStage] = useState(reduce ? 5 : 0) // reduced motion: show everything at once, including the button
  const [leaving, setLeaving] = useState(false)
  useEffect(() => {
    if (reduce) { setStage(5); return }
    const ts = [800, 1500, 5200, 8200, 9200].map((t, i) => window.setTimeout(() => setStage(i + 1), t))
    return () => ts.forEach(clearTimeout)
  }, [reduce])
  useEffect(() => { document.body.classList.add('locked'); return () => document.body.classList.remove('locked') }, [])
  const enter = () => { if (leaving) return; audio.play(); sfx('whoosh'); setLeaving(true); window.setTimeout(onEnter, reduce ? 0 : 1400) }
  return (
    <motion.div className="opening" role="dialog" aria-label="Introduction" exit={{ opacity: 0 }} transition={{ duration: 1 }}>
      <motion.div className="glow" style={{ width: '70vmin', height: '70vmin', left: '50%', top: '50%', marginLeft: '-35vmin', marginTop: '-35vmin' }}
        initial={{ opacity: 0, scale: 0.4 }} animate={{ opacity: stage >= 1 ? (leaving ? 1 : 0.7) : 0, scale: leaving ? 5 : stage >= 1 ? 1 : 0.4 }} transition={{ duration: leaving ? 1.4 : 3, ease: 'easeOut' }} />
      <Particles count={40} />
      <button className="skip" onClick={() => enter()}>Skip</button>
      <motion.div animate={{ opacity: leaving ? 0 : 1 }} transition={{ duration: 0.8 }} style={{ position: 'relative', zIndex: 2 }}>
        {stage >= 2 && <p className="l1"><Letters text={intro.line1} step={0.04} /></p>}
        {stage >= 3 && <h1 className="l2"><Letters text={intro.line2} step={0.06} /></h1>}
        {stage >= 4 && <motion.p className="eyebrow ttl" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.5 }}>{intro.title}</motion.p>}
        <AnimatePresence>
          {stage >= 5 && (
            <motion.div style={{ marginTop: '2.4rem' }} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
              <button className="btn" onClick={() => enter()} autoFocus>{intro.button}</button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  )
}
