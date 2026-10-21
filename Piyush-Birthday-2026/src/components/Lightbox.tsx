import { useEffect, useRef } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import { Photo, url } from '../data/gallery'

export function Lightbox({ list, index, onClose, onIndex }: { list: Photo[]; index: number | null; onClose: () => void; onIndex: (i: number) => void }) {
  const open = index !== null
  const ref = useRef<HTMLDivElement>(null)
  const touch = useRef(0)
  const go = (d: number) => onIndex((index! + d + list.length) % list.length)
  useEffect(() => {
    if (!open) return
    const prev = document.activeElement as HTMLElement | null
    document.body.classList.add('locked')
    ref.current?.querySelector<HTMLElement>('.x')?.focus()
    const key = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      else if (e.key === 'ArrowRight') go(1)
      else if (e.key === 'ArrowLeft') go(-1)
      else if (e.key === 'Tab') {
        const f = ref.current!.querySelectorAll<HTMLElement>('button')
        const a = f[0], z = f[f.length - 1]
        if (e.shiftKey && document.activeElement === a) { e.preventDefault(); z.focus() }
        else if (!e.shiftKey && document.activeElement === z) { e.preventDefault(); a.focus() }
      }
    }
    addEventListener('keydown', key)
    return () => { removeEventListener('keydown', key); document.body.classList.remove('locked'); prev?.focus() }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, index])
  const p = open ? list[index!] : null
  return (
    <AnimatePresence>
      {p && (
        <motion.div ref={ref} className="lb" style={{ ["--bg" as string]: `url("${url(p.thumb ?? p.src)}")` } as React.CSSProperties} role="dialog" aria-modal="true" aria-label="Photo viewer" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          onTouchStart={(e) => { touch.current = e.touches[0].clientX }}
          onTouchEnd={(e) => { const d = e.changedTouches[0].clientX - touch.current; if (Math.abs(d) > 50) go(d < 0 ? 1 : -1) }}
          onClick={(e) => { if (e.target === e.currentTarget) onClose() }}>
          <button className="x" onClick={onClose} aria-label="Close"><X /></button>
          {list.length > 1 && <button className="nv p" onClick={() => go(-1)} aria-label="Previous photo"><ChevronLeft /></button>}
          <AnimatePresence mode="wait">
            <motion.div key={p.id} className="stage" style={{ ["--bg" as string]: `url("${url(p.thumb ?? p.src)}")` } as React.CSSProperties} initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.02 }} transition={{ duration: 0.35 }}>
              <img src={url(p.src)} alt={p.caption || 'A memory with Piyush'} width={p.w} height={p.h} />
            </motion.div>
          </AnimatePresence>
          {list.length > 1 && <button className="nv n" onClick={() => go(1)} aria-label="Next photo"><ChevronRight /></button>}
          <div className="cap" aria-live="polite">
            <span className="lb-count">{String(index! + 1).padStart(2, '0')} <i>/</i> {String(list.length).padStart(2, '0')}</span>
            <span className="lb-title">{p.caption}</span>
            {p.date && <span className="lb-date">{p.date}</span>}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
