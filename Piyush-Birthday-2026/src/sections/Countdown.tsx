import { useCountdown } from '../hooks/useCountdown'
import { countdownCopy } from '../data/content'

const pad = (n: number) => String(n).padStart(2, '0')
export function Countdown() {
  const c = useCountdown()
  return (
    <div className="cd" aria-label="Birthday countdown">
      <p className="cd-label">{countdownCopy.label}</p>
      {c.phase === 'before' ? (
        <div className="grid" role="timer" aria-live="off">
          {([['d', 'Days'], ['h', 'Hours'], ['m', 'Minutes'], ['s', 'Seconds']] as const).map(([k, l]) => (
            <div className="u" key={k}><b>{k === 'd' ? c[k] : pad(c[k])}</b><span>{l}</span></div>
          ))}
        </div>
      ) : (
        <p className="msg">{c.phase === 'today' ? countdownCopy.today : countdownCopy.after}</p>
      )}
    </div>
  )
}
