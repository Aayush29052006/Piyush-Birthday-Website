import { useEffect, useRef, useState } from 'react'
import { Volume2, VolumeX, ExternalLink } from 'lucide-react'
import { reels } from '../data/content'
import { url } from '../data/gallery'
import { audio } from '../hooks/audio'

type Item = (typeof reels.items)[number]

// One reel: plays silently while on screen; tapping turns its sound on and pauses the birthday song,
// which resumes when the reel is muted again or scrolls away. Credited to its creator.
function Reel({ r, active, onSound }: { r: Item; active: boolean; onSound: (on: boolean) => void }) {
  const v = useRef<HTMLVideoElement>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.5 })
    io.observe(v.current!)
    return () => io.disconnect()
  }, [])
  useEffect(() => {
    const el = v.current!
    if (visible && !matchMedia('(prefers-reduced-motion: reduce)').matches) el.play().catch(() => {})
    else if (!visible) { el.pause(); if (active) onSound(false) }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible])
  useEffect(() => { v.current!.muted = !active; if (active) v.current!.play().catch(() => {}) }, [active])
  return (
    <figure className="reel">
      <div className="reel-frame" style={{ aspectRatio: `${r.w} / ${r.h}` }}>
        <video ref={v} src={url(r.src)} poster={url(r.poster)} muted loop playsInline preload="metadata"
          aria-label={`${r.caption} — reel by @${r.handle}`} />
        <button className="reel-sound" onClick={() => onSound(!active)} aria-pressed={active} aria-label={active ? 'Mute this reel' : 'Play this reel with sound'}>
          {active ? <Volume2 size={18} /> : <VolumeX size={18} />}<span>{active ? 'Sound on' : 'Tap for sound'}</span>
        </button>
      </div>
      <figcaption>
        <span className="reel-cap">{r.caption}</span>
        <a className="reel-credit" href={r.url} target="_blank" rel="noopener noreferrer">Reel by @{r.handle} <ExternalLink size={12} /></a>
      </figcaption>
    </figure>
  )
}

export function Reels() {
  const [active, setActive] = useState<number | null>(null)
  const resume = useRef(false)
  const setSound = (i: number, on: boolean) => {
    if (on) {
      if (active === null) resume.current = audio.isPlaying()
      audio.pause()
      setActive(i)
    } else if (active === i) {
      setActive(null)
      if (resume.current) audio.play()
      resume.current = false
    }
  }
  useEffect(() => () => { if (resume.current) audio.play() }, [])
  return (
    <div className="reels">
      <h3 className="cases-h">{reels.heading}</h3>
      <p className="reels-sub">{reels.sub}</p>
      <div className="reels-row">
        {reels.items.map((r, i) => <Reel key={r.src} r={r} active={active === i} onSound={(on) => setSound(i, on)} />)}
      </div>
      <p className="reels-note">These reels belong to their creators. Follow them via the links above.</p>
    </div>
  )
}
