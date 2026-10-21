import { motion, useReducedMotion } from 'motion/react'

// Letter-by-letter reveal. Screen readers get the whole string via aria-label; reduced motion shows it instantly.
export function Letters({ text, delay = 0, step = 0.045, className }: { text: string; delay?: number; step?: number; className?: string }) {
  const reduce = useReducedMotion()
  return (
    <span className={className}>
      <span className="sr">{text}</span>
      {text.split(' ').map((word, wi, words) => {
        const offset = words.slice(0, wi).join(' ').length + (wi ? 1 : 0)
        return (
          <span key={wi} style={{ display: 'inline-block', whiteSpace: 'nowrap' }} aria-hidden="true">
            {[...word].map((c, i) => (
              <motion.span key={i} className="ch" initial={reduce ? false : { opacity: 0, y: 14, filter: 'blur(6px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }} transition={{ delay: delay + (offset + i) * step, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}>{c}</motion.span>
            ))}
            {wi < words.length - 1 ? ' ' : ''}
          </span>
        )
      })}
    </span>
  )
}

export function Reveal({ children, delay = 0, className, y = 28 }: { children: React.ReactNode; delay?: number; className?: string; y?: number }) {
  const reduce = useReducedMotion()
  return (
    <motion.div className={className} initial={reduce ? false : { opacity: 0, y }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10% 0px' }} transition={{ delay, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}>{children}</motion.div>
  )
}
