// Gold fireworks over the whole screen for a few seconds, then the canvas removes itself.
// Skipped entirely for visitors who prefer reduced motion.
const COLORS = ['#f6e3b8', '#d6b26e', '#ffffff', '#ffd27a', '#f0a96b']
export function fireFireworks(ms = 6500) {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return
  const cv = document.createElement('canvas')
  cv.setAttribute('aria-hidden', 'true')
  cv.style.cssText = 'position:fixed;inset:0;width:100%;height:100%;pointer-events:none;z-index:115;mix-blend-mode:screen'
  const dpr = Math.min(devicePixelRatio || 1, 2), w = innerWidth, h = innerHeight
  cv.width = w * dpr; cv.height = h * dpr
  document.body.appendChild(cv)
  const g = cv.getContext('2d')!; g.scale(dpr, dpr)
  type P = { x: number; y: number; vx: number; vy: number; life: number; max: number; c: string; r: number; trail: boolean }
  const parts: P[] = []
  const rockets: { x: number; y: number; vy: number; ty: number; c: string }[] = []
  const t0 = performance.now(); let last = t0, next = t0
  const burst = (x: number, y: number, c: string) => {
    const n = 70 + Math.random() * 40
    for (let i = 0; i < n; i++) {
      const a = (i / n) * Math.PI * 2, s = 2 + Math.random() * 4.5
      parts.push({ x, y, vx: Math.cos(a) * s, vy: Math.sin(a) * s, life: 0, max: 60 + Math.random() * 40, c: Math.random() < 0.2 ? '#fff' : c, r: 1.4 + Math.random() * 1.4, trail: false })
    }
  }
  const step = (t: number) => {
    const dt = Math.min(2, (t - last) / 16.7); last = t
    g.globalCompositeOperation = 'destination-out'; g.fillStyle = 'rgba(0,0,0,.22)'; g.fillRect(0, 0, w, h)
    g.globalCompositeOperation = 'lighter'
    if (t < t0 + ms - 1500 && t >= next) {
      rockets.push({ x: w * (0.15 + Math.random() * 0.7), y: h + 10, vy: -(9 + Math.random() * 4), ty: h * (0.15 + Math.random() * 0.3), c: COLORS[(Math.random() * COLORS.length) | 0] })
      next = t + 280 + Math.random() * 420
    }
    for (let i = rockets.length - 1; i >= 0; i--) {
      const r = rockets[i]; r.y += r.vy * dt; r.vy *= 0.985
      g.fillStyle = r.c; g.beginPath(); g.arc(r.x, r.y, 2, 0, 6.283); g.fill()
      if (r.y <= r.ty || r.vy > -2) { burst(r.x, r.y, r.c); rockets.splice(i, 1) }
    }
    for (let i = parts.length - 1; i >= 0; i--) {
      const p = parts[i]; p.life += dt; p.vy += 0.06 * dt; p.vx *= 0.985; p.vy *= 0.985; p.x += p.vx * dt; p.y += p.vy * dt
      const k = 1 - p.life / p.max
      if (k <= 0) { parts.splice(i, 1); continue }
      g.globalAlpha = k; g.fillStyle = p.c; g.beginPath(); g.arc(p.x, p.y, p.r * (0.6 + k * 0.6), 0, 6.283); g.fill()
    }
    g.globalAlpha = 1
    if (t - t0 < ms || parts.length) requestAnimationFrame(step); else cv.remove()
  }
  requestAnimationFrame(step)
}
