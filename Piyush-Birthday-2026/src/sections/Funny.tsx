import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Shuffle } from 'lucide-react'
import { funny } from '../data/content'
import { inCategory, photos } from '../data/gallery'
import { PhotoFrame } from '../components/PhotoFrame'
import { PageHeader } from '../components/PageHeader'
import { Reels } from '../components/Reels'
import { Reveal } from '../components/Split'
import { sfx } from '../hooks/audio'

// "Evidence room": one exhibit at a time on a polaroid, plus sealed case files that open on tap.
export function Funny() {
  const pool = inCategory('Funny Moments').length ? inCategory('Funny Moments') : photos
  const [i, setI] = useState(0)
  const [shown, setShown] = useState<Record<number, boolean>>({})
  const p = pool.length ? pool[i % pool.length] : undefined
  const shuffle = () => {
    sfx('pop')
    if (pool.length > 1) setI((cur) => { let n = cur; while (n === cur) n = Math.floor(Math.random() * pool.length); return n })
  }
  return (
    <section className="funny" id="funny">
      <div className="wrap">
        <PageHeader n={5} eyebrow="Evidence" title="Funny" em="Moments" sub={funny.sub} />
        <div className="stage">
          <AnimatePresence mode="wait">
            <motion.figure key={p?.id ?? 'ph'} className="exhibit" style={{ ['--ar' as string]: p ? p.w / p.h : 0.8 } as React.CSSProperties} initial={{ opacity: 0, rotate: 5, y: 20 }} animate={{ opacity: 1, rotate: -1.5, y: 0 }} exit={{ opacity: 0, rotate: -6, y: -10 }} transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}>
              <span className="stamp" aria-hidden="true">Exhibit {String((i % Math.max(1, pool.length)) + 1).padStart(2, '0')}</span>
              <PhotoFrame photo={p} natural={!!p} />
              <figcaption>{p?.caption || ''}</figcaption>
            </motion.figure>
          </AnimatePresence>
          <button className="btn" onClick={shuffle}><Shuffle size={16} /> Random memory</button>
          <p className="stage-n">{pool.length} exhibits on file</p>
        </div>
        <Reveal><h3 className="cases-h">You had to be there</h3></Reveal>
        <div className="jokes">
          {funny.insideJokes.map((j, k) => (
            <div className="joke" key={k}>
              <button className={shown[k] ? 'open' : ''} onClick={() => { sfx('pop'); setShown((s) => ({ ...s, [k]: !s[k] })) }} aria-expanded={!!shown[k]}>
                <span className="case-n">Case file {String(k + 1).padStart(2, '0')}</span>
                {shown[k] ? <span className="case-body">{j.joke}<small>{j.note}</small></span> : <span className="case-body sealed">Classified. Tap to open.</span>}
              </button>
            </div>
          ))}
        </div>
        <Reels />
      </div>
    </section>
  )
}
