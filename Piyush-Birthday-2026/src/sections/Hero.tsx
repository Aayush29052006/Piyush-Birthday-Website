import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { ArrowRight } from 'lucide-react'
import { hero } from '../data/content'
import { heroPhoto } from '../data/gallery'
import { Letters } from '../components/Split'
import { Particles } from '../components/Particles'
import { PhotoFrame } from '../components/PhotoFrame'
import { MaskImage } from '../components/MaskImage'
import { Countdown } from './Countdown'

// Editorial split: type on the left, a framed photograph on the right (stacked on phones).
export function Hero({ onNext }: { onNext: () => void }) {
  const reduce = useReducedMotion()
  const { scrollY } = useScroll()
  const bgY = useTransform(scrollY, [0, 800], [0, reduce ? 0 : 60])
  const last = hero.headline.length - 1
  return (
    <header className="hero" id="top">
      <motion.div className="bgph" style={{ y: bgY }} aria-hidden="true"><PhotoFrame photo={heroPhoto} label="" thumb priority /></motion.div>
      <div className="glow" style={{ width: '55vmax', height: '55vmax', left: '-10%', top: '-25%' }} />
      {[18, 62].map((t, i) => <span key={i} className="streak" style={{ top: `${t}%`, animationDelay: `${i * 3.1}s` }} aria-hidden="true" />)}
      <Particles count={60} reactive />
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
          <figure className="portrait">
            <span className="frame-offset" aria-hidden="true" />
            <MaskImage photo={heroPhoto} priority />
            <figcaption>{hero.photoCaption}</figcaption>
          </figure>
        )}
      </div>
    </header>
  )
}
