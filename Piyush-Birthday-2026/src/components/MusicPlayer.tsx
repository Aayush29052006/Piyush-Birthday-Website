import { useEffect, useRef } from 'react'
import { Pause, Play, Volume2, VolumeX, Sparkles, Loader2 } from 'lucide-react'
import { audio, useAudio } from '../hooks/audio'

export function MusicPlayer() {
  const a = useAudio()
  const ref = useRef<HTMLDivElement>(null)
  const bars = useRef<HTMLElement[]>([])
  useEffect(() => {
    if (a.status !== 'playing' || matchMedia('(prefers-reduced-motion: reduce)').matches) {
      ref.current?.style.setProperty('--lvl', '0')
      return
    }
    let raf = 0, last = 0
    const f = (t: number) => {
      if (t - last > 60 && !document.hidden) {
        last = t
        const l = audio.level()
        ref.current?.style.setProperty('--lvl', String(l))
        bars.current.forEach((b, i) => { if (b) b.style.height = `${25 + l * 160 * (0.6 + 0.4 * Math.sin(t / 200 + i * 2))}%` })
      }
      raf = requestAnimationFrame(f)
    }
    raf = requestAnimationFrame(f)
    return () => cancelAnimationFrame(raf)
  }, [a.status])
  const label = a.status === 'playing' ? 'Pause music' : 'Play music'
  return (
    <div ref={ref} className={`dock ${a.status === 'playing' ? 'playing' : ''}`} role="group" aria-label="Music controls">
      <button onClick={() => audio.toggle()} aria-label={label} title={label}>
        {a.status === 'loading' ? <Loader2 size={20} /> : a.status === 'playing' ? <Pause size={18} /> : <Play size={18} />}
      </button>
      <div className="dock-meta" aria-hidden="true">
        <div className="bars">{[0, 1, 2, 3, 4].map((i) => <i key={i} ref={(el) => { if (el) bars.current[i] = el }} />)}</div>
        <span className="dock-t">{a.status === 'playing' ? 'Now playing' : 'Paused'}<b>Happy Birthday</b></span>
      </div>
      <input type="range" min="0" max="1" step="0.05" value={a.muted ? 0 : a.volume} onChange={(e) => audio.setVolume(+e.target.value)} aria-label="Volume" />
      <button onClick={() => audio.toggleMute()} aria-label={a.muted ? 'Unmute' : 'Mute'} aria-pressed={a.muted}>{a.muted ? <VolumeX size={20} /> : <Volume2 size={20} />}</button>
      <button onClick={() => audio.toggleSfx()} aria-label="Sound effects" aria-pressed={a.sfx} title={a.sfx ? 'Sound effects on' : 'Sound effects off'} style={{ opacity: a.sfx ? 1 : 0.4 }}><Sparkles size={18} /></button>
      <span className="sr" role="status">{a.status === 'error' ? 'Music could not be loaded.' : a.source === 'synth' && a.status === 'playing' ? 'Playing original instrumental.' : ''}</span>
    </div>
  )
}
