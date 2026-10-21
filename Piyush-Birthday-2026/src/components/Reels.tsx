import { useEffect, useRef, useState } from 'react'
import { Volume2, VolumeX, ExternalLink, Play, Pause, Maximize } from 'lucide-react'
import { reels } from '../data/content'
import { url } from '../data/gallery'
import { audio } from '../hooks/audio'

type Item = (typeof reels.items)[number]

const fmt = (t: number) => (isFinite(t) ? `${Math.floor(t / 60)}:${String(Math.floor(t % 60)).padStart(2, '0')}` : '0:00')

// One reel with basic media controls (play/pause, seek, time, sound, full screen).
// It plays silently while on screen; turning its sound on pauses the birthday song, which resumes afterwards.
function Reel({ r, active, onSound }: { r: Item; active: boolean; onSound: (on: boolean) => void }) {
  const v = useRef<HTMLVideoElement>(null)
  const box = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  const [playing, setPlaying] = useState(false)
  const [userPaused, setUserPaused] = useState(false)
  const [t, setT] = useState(0)
  const [d, setD] = useState(0)
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.5 })
    io.observe(v.current!)
    return () => io.disconnect()
  }, [])
  useEffect(() => {
    const el = v.current!
    if (visible && !userPaused && !matchMedia('(prefers-reduced-motion: reduce)').matches) el.play().catch(() => {})
    else if (!visible) { el.pause(); if (active) onSound(false) }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible])
  useEffect(() => { v.current!.muted = !active; if (active) { setUserPaused(false); v.current!.play().catch(() => {}) } }, [active])
  const togglePlay = () => {
    const el = v.current!
    if (el.paused) { setUserPaused(false); el.play().catch(() => {}) } else { setUserPaused(true); el.pause(); if (active) onSound(false) }
  }
  const full = () => {
    const el = box.current as HTMLDivElement & { webkitRequestFullscreen?: () => void }
    const vid = v.current as HTMLVideoElement & { webkitEnterFullscreen?: () => void }
    if (document.fullscreenElement) document.exitFullscreen()
    else if (el.requestFullscreen) el.requestFullscreen()
    else if (vid.webkitEnterFullscreen) vid.webkitEnterFullscreen() // iPhone
  }
  return (
    <figure className={`reel ${playing ? "" : "is-paused"}`}>
      <div ref={box} className="reel-frame" style={{ aspectRatio: `${r.w} / ${r.h}` }}>
        <video ref={v} src={url(r.src)} poster={url(r.poster)} muted loop playsInline preload="metadata"
          aria-label={`${r.caption} — reel by @${r.handle}`} onClick={togglePlay}
          onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)}
          onTimeUpdate={(e) => setT(e.currentTarget.currentTime)} onLoadedMetadata={(e) => setD(e.currentTarget.duration)} />
        <div className="reel-bar" role="group" aria-label="Video controls">
          <button onClick={togglePlay} aria-label={playing ? 'Pause' : 'Play'}>{playing ? <Pause size={16} /> : <Play size={16} />}</button>
          <input type="range" min={0} max={d || 1} step={0.05} value={t} aria-label="Seek"
            style={{ ['--p' as string]: `${d ? (t / d) * 100 : 0}%` } as React.CSSProperties}
            onChange={(e) => { v.current!.currentTime = +e.target.value; setT(+e.target.value) }} />
          <span className="reel-time">{fmt(t)} / {fmt(d)}</span>
          <button onClick={() => onSound(!active)} aria-pressed={active} aria-label={active ? 'Mute this reel' : 'Turn on sound'}>{active ? <Volume2 size={16} /> : <VolumeX size={16} />}</button>
          <button onClick={full} aria-label="Full screen"><Maximize size={15} /></button>
        </div>
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
