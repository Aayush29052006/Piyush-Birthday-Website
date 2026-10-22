import { useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { finale, letter } from '../data/content'
import { best } from '../data/gallery'
import { Letters } from '../components/Split'
import { Particles } from '../components/Particles'
import { PhotoFrame } from '../components/PhotoFrame'
import { fireConfetti } from '../components/confetti'
import { fireFireworks } from '../components/fireworks'
import { Marquee } from '../components/Marquee'
import { sfx } from '../hooks/audio'

const ROT = [-6, 3, -2, 5, -4]
// Sequence once ~half the section is visible: darken -> light spreads -> montage -> headline -> confetti -> message.
export function Finale({ onReplay, onBack }: { onReplay: () => void; onBack: () => void }) {
  const ref = useRef<HTMLElement>(null)
  const reduce = useReducedMotion()
  const [go, setGo] = useState(false)
  const [run, setRun] = useState(0)
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting && !go) { setGo(true); setRun((r) => r + 1) } }, { threshold: 0.5 })
    io.observe(ref.current!)
    return () => io.disconnect()
  }, [go])
  useEffect(() => {
    if (!go) return
    const a = window.setTimeout(() => { sfx('chime'); fireConfetti(5000, 160) }, reduce ? 0 : 2600)
    const b = window.setTimeout(() => fireFireworks(7000), reduce ? 0 : 1600)
    return () => { clearTimeout(a); clearTimeout(b) }
  }, [go, run, reduce])
  const slots = best.slice(0, 5) // only real, approved photos; no empty frames
  return (
    <>
    <section ref={ref} className={`finale ${go ? 'go' : ''}`} id="finale">
      <div className="light" aria-hidden="true" />
      <Particles count={50} reactive />
      {slots.length > 0 && <div className="montage" aria-hidden="true">
        {slots.map((p, i) => (
          <div key={i} className="pf-wrap" style={{ ['--r' as string]: `${ROT[i]}deg`, transitionDelay: `${0.4 + i * 0.25}s` } as React.CSSProperties}>
            <PhotoFrame photo={p} label="" thumb natural />
          </div>
        ))}
      </div>}
      <div className="in">
        {go && <h2 key={run}><Letters text={finale.headline} delay={1.8} step={0.07} /></h2>}
        {go && <motion.p key={'m' + run} className="msg" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: reduce ? 0 : 4.5, duration: 1.5 }}>{finale.message}</motion.p>}
        {go && (
          <motion.dl className="credits" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: reduce ? 0 : 5, duration: 1.5 }}>
            <div><dt>Starring</dt><dd>Piyush</dd></div>
            <div><dt>Written &amp; directed by</dt><dd>{letter.from}</dd></div>
            <div><dt>In the making</dt><dd>Ten years</dd></div>
          </motion.dl>
        )}
        <motion.div className="acts" initial={{ opacity: 0 }} animate={{ opacity: go ? 1 : 0 }} transition={{ delay: reduce ? 0 : 5.5, duration: 1 }}>
          <button className="btn solid" onClick={() => { setGo(false); onReplay() }}>{finale.replay}</button>
          <button className="btn ghost" onClick={onBack}>{finale.back}</button>
        </motion.div>
      </div>
    </section>
    <Marquee tone="outline" reverse items={['Happy Birthday, Piyush', 'Ten years down', 'Forever to go']} />
    </>
  )
}
