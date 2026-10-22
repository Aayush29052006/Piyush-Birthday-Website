import { motion, useReducedMotion, useScroll, useSpring, useTransform, useVelocity } from 'motion/react'

// An endless band of big type. It leans (skews) with scroll speed, like film running through a projector.
export function Marquee({ items, reverse = false, tone = 'gold' }: { items: string[]; reverse?: boolean; tone?: 'gold' | 'outline' }) {
  const reduce = useReducedMotion()
  const { scrollY } = useScroll()
  const vel = useSpring(useVelocity(scrollY), { stiffness: 120, damping: 30 })
  const skew = useTransform(vel, [-2500, 0, 2500], reduce ? [0, 0, 0] : [8, 0, -8])
  const row = [...items, ...items]
  return (
    <div className={`marquee ${tone}`} aria-hidden="true">
      <motion.div className={`marquee-track ${reverse ? 'rev' : ''}`} style={{ skewX: skew }}>
        {[0, 1].map((k) => (
          <span className="marquee-run" key={k}>
            {row.map((t, i) => <span key={i} className="marquee-item">{t}<i className="marquee-star">✦</i></span>)}
          </span>
        ))}
      </motion.div>
    </div>
  )
}
