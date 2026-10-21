import { useEffect, useRef } from 'react'
import { audio } from '../hooks/audio'

// Floating gold dust. Pauses when off-screen or tab hidden; static when reduced-motion.
export function Particles({ count = 55, reactive = false }: { count?: number; reactive?: boolean }) {
  const ref = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const cv = ref.current!
    const g = cv.getContext('2d')!
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches
    let w = 0, h = 0, raf = 0, visible = true
    const dpr = Math.min(devicePixelRatio || 1, 2)
    const ps = Array.from({ length: count }, () => ({ x: Math.random(), y: Math.random(), r: Math.random() * 1.6 + 0.4, s: Math.random() * 0.00006 + 0.00002, a: Math.random() * 0.6 + 0.2, p: Math.random() * 6 }))
    const size = () => { w = cv.clientWidth; h = cv.clientHeight; cv.width = w * dpr; cv.height = h * dpr; g.setTransform(dpr, 0, 0, dpr, 0, 0) }
    const draw = (t: number) => {
      g.clearRect(0, 0, w, h)
      const boost = reactive ? 1 + audio.level() * 2.5 : 1
      for (const p of ps) {
        if (!reduce) { p.y -= p.s * 16 * boost; if (p.y < -0.02) { p.y = 1.02; p.x = Math.random() } }
        const tw = 0.5 + 0.5 * Math.sin(t * 0.001 + p.p)
        g.beginPath()
        g.fillStyle = `rgba(241,220,174,${p.a * tw})`
        g.arc(p.x * w + Math.sin(t * 0.0004 + p.p) * 14, p.y * h, p.r * boost, 0, 6.283)
        g.fill()
      }
    }
    const loop = (t: number) => { draw(t); raf = visible && !document.hidden && !reduce ? requestAnimationFrame(loop) : 0 }
    const kick = () => { if (!raf) raf = requestAnimationFrame(loop) }
    size(); draw(0); kick()
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; if (visible) kick() })
    io.observe(cv)
    const vis = () => { if (!document.hidden) kick() }
    addEventListener('resize', size)
    document.addEventListener('visibilitychange', vis)
    return () => { cancelAnimationFrame(raf); io.disconnect(); removeEventListener('resize', size); document.removeEventListener('visibilitychange', vis) }
  }, [count, reactive])
  return <canvas ref={ref} className="fx" aria-hidden="true" />
}
