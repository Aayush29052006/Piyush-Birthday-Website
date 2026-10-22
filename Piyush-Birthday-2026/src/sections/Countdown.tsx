import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { useCountdown } from '../hooks/useCountdown'
import { countdownCopy } from '../data/content'

const pad = (n: number) => String(n).padStart(2, '0')

// Each digit rolls up like a flip clock when it changes.
function Roll({ value }: { value: string }) {
  const reduce = useReducedMotion()
  return (
    <b className="roll" aria-hidden="true">
      {[...value].map((ch, i) => (
        <span className="roll-col" key={i}>
          <AnimatePresence initial={false} mode="popLayout">
            <motion.span key={ch} className="roll-ch" initial={reduce ? false : { y: '100%', opacity: 0 }} animate={{ y: '0%', opacity: 1 }}
              exit={reduce ? undefined : { y: '-100%', opacity: 0 }} transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}>{ch}</motion.span>
          </AnimatePresence>
        </span>
      ))}
    </b>
  )
}

export function Countdown() {
  const c = useCountdown()
  return (
    <div className="cd" aria-label="Birthday countdown">
      <p className="cd-label">{countdownCopy.label}</p>
      {c.phase === 'before' ? (
        <div className="grid" role="timer" aria-live="off">
          {([['d', 'Days'], ['h', 'Hours'], ['m', 'Minutes'], ['s', 'Seconds']] as const).map(([k, l]) => {
            const v = k === 'd' ? String(c[k]) : pad(c[k])
            return <div className="u" key={k}><Roll value={v} /><span className="sr">{v} </span><span>{l}</span></div>
          })}
        </div>
      ) : (
        <p className="msg">{c.phase === 'today' ? countdownCopy.today : countdownCopy.after}</p>
      )}
    </div>
  )
}
