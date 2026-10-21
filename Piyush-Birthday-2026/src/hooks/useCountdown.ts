import { useEffect, useState } from 'react'
import { BIRTHDAY_ISO } from '../data/content'

const IST_DAY_MS = 86_400_000
const target = Date.parse(BIRTHDAY_ISO)
export type Phase = 'before' | 'today' | 'after'

export function compute(now: number) {
  const diff = target - now
  if (diff > 0) {
    const s = Math.floor(diff / 1000)
    return { phase: 'before' as Phase, d: Math.floor(s / 86400), h: Math.floor((s % 86400) / 3600), m: Math.floor((s % 3600) / 60), s: s % 60 }
  }
  return { phase: (now < target + IST_DAY_MS ? 'today' : 'after') as Phase, d: 0, h: 0, m: 0, s: 0 }
}

// Ticks once per second, only while the tab is visible and the component mounted.
export function useCountdown() {
  const [v, setV] = useState(() => compute(Date.now()))
  useEffect(() => {
    let id = 0
    const tick = () => setV(compute(Date.now()))
    const start = () => { stop(); tick(); id = window.setInterval(tick, 1000) }
    const stop = () => { if (id) window.clearInterval(id); id = 0 }
    const vis = () => (document.hidden ? stop() : start())
    start(); document.addEventListener('visibilitychange', vis)
    return () => { stop(); document.removeEventListener('visibilitychange', vis) }
  }, [])
  return v
}
