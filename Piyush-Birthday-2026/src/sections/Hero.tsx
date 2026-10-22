import { motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from 'motion/react'
import { ArrowRight } from 'lucide-react'
import { hero } from '../data/content'
import { heroPhoto } from '../data/gallery'
import { Letters } from '../components/Split'
import { Particles } from '../components/Particles'
import { PhotoFrame } from '../components/PhotoFrame'
import { MaskImage } from '../components/MaskImage'
import { Countdown } from './Countdown'
import { Marquee } from '../components/Marquee'

// Editorial split: type on the left, a framed photograph on the right (stacked on phones).
export function Hero({ onNext }: { onNext: () => void }) {
  const reduce = useReducedMotion()
  const { scrollY } = useScroll()
  const bgY = useTransform(scrollY, [0, 800], [0, reduce ? 0 : 60])
  const last = hero.headline.length - 1
  // mouse depth: the photo drifts with the pointer, the giant "10" drifts the other way
  const mx = useSpring(useMotionValue(0), { stiffness: 60, damping: 18 })
  const my = useSpring(useMotionValue(0), { stiffness: 60, damping: 18 })
  const px = useTransform(mx, (v) => v * 18), py = useTransform(my, (v) => v * 14)
  const tx = useTransform(mx, (v) => v * -46), ty = useTransform(my, (v) => v * -30)
  const onMove = (e: React.PointerEvent) => {
    if (reduce || e.pointerType !== 'mouse') return
    mx.set(e.clientX / innerWidth - 0.5); my.set(e.clientY / innerHeight - 0.5)
  }
  return (
    <>
    <header className="hero" id="top" onPointerMove={onMove}>
      <motion.div className="bgph" style={{ y: bgY }} aria-hidden="true"><PhotoFrame photo={heroPhoto} label="" thumb priority /></motion.div>
      <div className="glow" style={{ width: '55vmax', height: '55vmax', left: '-10%', top: '-25%' }} />
      {[18, 62].map((t, i) => <span key={i} className="streak" style={{ top: `${t}%`, animationDelay: `${i * 3.1}s` }} aria-hidden="true" />)}
      <Particles count={60} reactive />
      <motion.span className="hero-ten" aria-hidden="true" style={{ x: tx, y: ty }}
        initial={reduce ? false : { scale: 1.15 }} animate={{ scale: 1 }} transition={{ duration: 2.2, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}>10</motion.span>
      <div className="hero-grid">
        <div className="hero-copy">
          <p className="eyebrow">{hero.eyebrow}</p>
          <h1 aria-label={hero.headline.join(' ')}>
            {hero.headline.map((w, i) => (
              <span className={`row ${i === last ? 'em' : ''}`} key={w}><Letters text={w} delay={0.3 + i * 0.45} step={0.06} /></span>
            ))}
          </h1>
          <p className="date"><span className="hair" aria-hidden="true" />{hero.dateLabel}</p>
          <p className="tag">{hero.tagline}</p>
          <Countdown />
          <button className="btn solid hero-cta" onClick={onNext}>{hero.invite} <ArrowRight size={16} /></button>
        </div>
        {heroPhoto && (
          <motion.figure className="portrait" style={{ x: px, y: py }}>
            <span className="frame-offset" aria-hidden="true" />
            <MaskImage photo={heroPhoto} priority />
            <figcaption>{hero.photoCaption}</figcaption>
          </motion.figure>
        )}
      </div>
    </header>
    <Marquee items={['Happy Birthday, Piyush', '31 October 2026', 'Ten years of friendship', '5th standard to engineering']} />
    </>
  )
}
