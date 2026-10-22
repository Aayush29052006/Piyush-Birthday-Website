import { useEffect, useRef } from 'react'

// Desktop-only pointer layer: a gold cursor ring that grows over anything clickable (with a "View"/"Play" label),
// magnetic buttons that lean toward the pointer, and a gentle 3D tilt on photos.
// Off on touch screens and when the visitor prefers reduced motion.
const TILT = '.tile .pf, .pol .pf, .exhibit .pf, .portrait .mask, .chap-media .mask, .strip-i .pf, .collage .pf, .card3d'
const MAGNET = '.btn, .chapters, .mono, .pg-next, .dock > button:first-child'
const CLICKABLE = 'a, button, [role="button"], input[type="range"], video, .tile, .tcard'

export function Cursor() {
  const ring = useRef<HTMLDivElement>(null)
  const dot = useRef<HTMLDivElement>(null)
  const label = useRef<HTMLSpanElement>(null)
  useEffect(() => {
    const fine = matchMedia('(hover: hover) and (pointer: fine)').matches
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!fine || reduce) return
    document.documentElement.classList.add('has-cursor')
    let x = innerWidth / 2, y = innerHeight / 2, rx = x, ry = y, raf = 0
    let magnet: HTMLElement | null = null, tilt: HTMLElement | null = null
    const loop = () => {
      rx += (x - rx) * 0.18; ry += (y - ry) * 0.18
      if (ring.current) ring.current.style.transform = `translate3d(${rx}px, ${ry}px, 0)`
      if (dot.current) dot.current.style.transform = `translate3d(${x}px, ${y}px, 0)`
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)
    const move = (e: PointerEvent) => {
      x = e.clientX; y = e.clientY
      const t = e.target as Element
      const hot = t.closest?.(CLICKABLE)
      ring.current?.classList.toggle('hot', !!hot)
      const txt = t.closest?.('.tile, .tcard') ? 'View' : t.closest?.('video') ? 'Play' : ''
      if (label.current && label.current.textContent !== txt) label.current.textContent = txt
      ring.current?.classList.toggle('labelled', !!txt)
      // magnetic pull
      const m = t.closest?.(MAGNET) as HTMLElement | null
      if (magnet && magnet !== m) { magnet.style.translate = ''; magnet = null }
      if (m) {
        const r = m.getBoundingClientRect()
        m.style.translate = `${(x - r.left - r.width / 2) * 0.22}px ${(y - r.top - r.height / 2) * 0.32}px`
        magnet = m
      }
      // 3D tilt
      const tl = t.closest?.(TILT) as HTMLElement | null
      if (tilt && tilt !== tl) { tilt.style.setProperty('--rx', '0deg'); tilt.style.setProperty('--ry', '0deg'); tilt.classList.remove('tilting'); tilt = null }
      if (tl) {
        const r = tl.getBoundingClientRect()
        const px = (x - r.left) / r.width - 0.5, py = (y - r.top) / r.height - 0.5
        tl.style.setProperty('--rx', `${(-py * 8).toFixed(2)}deg`); tl.style.setProperty('--ry', `${(px * 10).toFixed(2)}deg`)
        tl.style.setProperty('--gx', `${((px + 0.5) * 100).toFixed(1)}%`); tl.style.setProperty('--gy', `${((py + 0.5) * 100).toFixed(1)}%`)
        tl.classList.add('tilting'); tilt = tl
      }
    }
    const down = () => ring.current?.classList.add('press')
    const up = () => ring.current?.classList.remove('press')
    const leave = () => ring.current?.classList.add('gone')
    const enter = () => ring.current?.classList.remove('gone')
    addEventListener('pointermove', move, { passive: true })
    addEventListener('pointerdown', down); addEventListener('pointerup', up)
    document.addEventListener('mouseleave', leave); document.addEventListener('mouseenter', enter)
    return () => {
      cancelAnimationFrame(raf); document.documentElement.classList.remove('has-cursor')
      removeEventListener('pointermove', move); removeEventListener('pointerdown', down); removeEventListener('pointerup', up)
      document.removeEventListener('mouseleave', leave); document.removeEventListener('mouseenter', enter)
    }
  }, [])
  return (
    <>
      <div ref={ring} className="cursor-ring" aria-hidden="true"><span ref={label} /></div>
      <div ref={dot} className="cursor-dot" aria-hidden="true" />
    </>
  )
}
