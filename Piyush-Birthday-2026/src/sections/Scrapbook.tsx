import { motion } from 'motion/react'
import { scrapbook } from '../data/content'
import { byId, photos, spread, together } from '../data/gallery'
import { PhotoFrame } from '../components/PhotoFrame'
import { PageHeader } from '../components/PageHeader'

// Photos you asked to be pinned on this page, always shown first.
const PINNED = ['i73', 'i2']
const ROT = [-4, 3, -2, 5, -5, 2]

// Polaroids of equal width; each photo keeps its own proportions (no cropping).
export function Scrapbook() {
  const pinned = PINNED.map(byId).filter((p): p is NonNullable<typeof p> => !!p)
  const rest = spread((together.length ? together : photos).filter((p) => !PINNED.includes(p.id)), 6 - pinned.length)
  const slots = [...pinned, ...rest]
  return (
    <section className="scrap" id="scrapbook">
      <div className="wrap">
        <PageHeader n={6} eyebrow="Handmade" title="The" em="Scrapbook" sub={scrapbook.sub} />
        <div className="board">
          {slots.map((p, i) => (
            <motion.figure key={p.id} className="pol" style={{ rotate: ROT[i % 6] }} initial={{ opacity: 0, y: 60, rotate: ROT[i % 6] + 10 }}
              whileInView={{ opacity: 1, y: 0, rotate: ROT[i % 6] }} viewport={{ once: true, margin: '-8%' }} transition={{ duration: 0.9, delay: (i % 3) * 0.1, ease: [0.22, 1, 0.36, 1] }}>
              <span className={`tape t${i % 3}`} aria-hidden="true" />
              <PhotoFrame photo={p} natural thumb />
              <figcaption><span>{p.caption}</span>{p.date && <small>{p.date}</small>}</figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  )
}
