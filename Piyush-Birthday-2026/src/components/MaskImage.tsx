import { useEffect, useRef, useState } from 'react'
import { Photo } from '../data/gallery'
import { PhotoFrame } from './PhotoFrame'

// Cinematic mask reveal when scrolled into view (shown immediately if IntersectionObserver is unavailable).
export function MaskImage({ photo, label, className = '', priority = false }: { photo?: Photo; label?: string; className?: string; priority?: boolean }) {
  const ref = useRef<HTMLDivElement>(null)
  const [on, setOn] = useState(false)
  useEffect(() => {
    if (!('IntersectionObserver' in window)) { setOn(true); return }
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setOn(true); io.disconnect() } }, { threshold: 0.15 })
    io.observe(ref.current!)
    return () => io.disconnect()
  }, [])
  // The observer watches the unclipped wrapper: IntersectionObserver ignores fully clip-path'd elements.
  return <div ref={ref} className={className}><div className={`mask ${on ? 'in' : ''}`}><PhotoFrame photo={photo} label={label} natural priority={priority} /></div></div>
}
