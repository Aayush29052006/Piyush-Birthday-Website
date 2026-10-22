import { useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { byId } from '../data/gallery'
import { PhotoFrame } from './PhotoFrame'
import { sfx } from '../hooks/audio'

const IDS = ['f1', 'f2', 'f3', 'f4']
// Fanned-out "trading cards" that deal themselves from a stack when they scroll into view. Tap one to bring it forward.
export function BottleCards() {
  const reduce = useReducedMotion()
  const cards = IDS.map(byId).filter((p): p is NonNullable<typeof p> => !!p)
  const [front, setFront] = useState<number | null>(null)
  if (!cards.length) return null
  const n = cards.length
  const spread = typeof window !== 'undefined' && innerWidth < 760 ? 22 : 66 // % of a card width between cards
  return (
    <div className="bottles">
      <h3 className="cases-h">The Bottle Chronicles</h3>
      <p className="reels-sub">Exhibit B: holding water bottles like they are trophies.</p>
      <div className="fan">
        {cards.map((p, i) => {
          const k = i - (n - 1) / 2
          return (
            <motion.button key={p.id} className={`fan-card card3d ${front === i ? 'front' : ''}`} style={{ zIndex: front === i ? 20 : 10 - Math.abs(Math.round(k)) }}
              initial={reduce ? false : { x: 0, y: 60, rotate: 0, opacity: 0 }}
              whileInView={{ x: `${k * spread}%`, y: Math.abs(k) * 18, rotate: k * 7, opacity: 1 }}
              viewport={{ once: true, margin: '-15%' }}
              transition={{ type: 'spring', stiffness: 90, damping: 14, delay: i * 0.08 }}
              whileHover={reduce ? undefined : { y: -26, scale: 1.04, transition: { duration: 0.3 } }}
              onClick={() => { sfx('pop'); setFront(front === i ? null : i) }}
              aria-label={`${p.caption}${front === i ? ' (in front)' : ''}`}>
              <span className="fan-no">No. {String(i + 1).padStart(2, '0')}</span>
              <PhotoFrame photo={p} thumb natural />
              <span className="fan-cap">{p.caption}</span>
            </motion.button>
          )
        })}
      </div>
    </div>
  )
}
