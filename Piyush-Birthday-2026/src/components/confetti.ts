// Self-cleaning confetti overlay. Capped particle count; a tiny shimmer for reduced motion.
const COLORS = ['#f1dcae', '#d9b878', '#ffffff', '#ff9ec7', '#8fd6ff', '#ffd36e']
export function fireConfetti(ms = 3500, n = 140) {
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches
  const cv = document.createElement('canvas')
  cv.setAttribute('aria-hidden', 'true')
  cv.style.cssText = 'position:fixed;inset:0;width:100%;height:100%;pointer-events:none;z-index:120'
  const dpr = Math.min(devicePixelRatio || 1, 2)
  const w = innerWidth, h = innerHeight
  cv.width = w * dpr
  cv.height = h * dpr
  document.body.appendChild(cv)
  const g = cv.getContext('2d')!
  g.scale(dpr, dpr)
  const count = reduce ? 20 : n
  const ps = Array.from({ length: count }, () => ({
    x: w / 2 + (Math.random() - 0.5) * w * 0.3, y: h * 0.6, vx: (Math.random() - 0.5) * 14, vy: -Math.random() * 16 - 6,
    r: Math.random() * 6 + 3, a: Math.random() * 6, va: (Math.random() - 0.5) * 0.3, c: COLORS[(Math.random() * COLORS.length) | 0],
  }))
  const t0 = performance.now()
  const step = (t: number) => {
    const k = t - t0
    g.clearRect(0, 0, w, h)
    for (const p of ps) {
      p.vy += 0.32; p.vx *= 0.992; p.x += p.vx; p.y += p.vy; p.a += p.va
      g.save()
      g.translate(p.x, p.y)
      g.rotate(p.a)
      g.globalAlpha = Math.max(0, 1 - k / ms)
      g.fillStyle = p.c
      g.fillRect(-p.r / 2, -p.r / 4, p.r, p.r / 2)
      g.restore()
    }
    if (k < ms) requestAnimationFrame(step)
    else cv.remove()
  }
  requestAnimationFrame(step)
}
