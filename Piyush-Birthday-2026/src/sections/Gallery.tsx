import { useMemo, useState } from 'react'
import { motion } from 'motion/react'
import { inCategory, photos, usedCategories } from '../data/gallery'
import { Lightbox } from '../components/Lightbox'
import { PhotoFrame } from '../components/PhotoFrame'
import { PageHeader } from '../components/PageHeader'
import { sfx } from '../hooks/audio'

const PAGE = 24
// Justified rows (like a photo book): every photo keeps its exact proportions, rows line up edge to edge,
// so nobody is ever cropped out.
export function Gallery({ initialCat = 'All' }: { initialCat?: string }) {
  const [cat, setCat] = useState<string>(initialCat)
  const [shown, setShown] = useState(PAGE)
  const [open, setOpen] = useState<number | null>(null)
  const list = useMemo(() => (cat === 'All' ? photos : cat.startsWith('trip:') ? photos.filter((p) => p.trip === cat.slice(5)) : inCategory(cat)), [cat])
  const visible = list.slice(0, shown)
  const tabs = ['All', ...usedCategories, ...(cat.startsWith('trip:') ? [cat] : [])]
  const count = (c: string) => (c === 'All' ? photos.length : c.startsWith('trip:') ? photos.filter((p) => p.trip === c.slice(5)).length : inCategory(c).length)
  return (
    <section id="memories">
      <div className="wrap wide">
        <PageHeader n={3} eyebrow="Our memories" title="The" em="Gallery" sub={`${photos.length} photographs, ten years, one friendship.`} />
        {photos.length === 0 ? (
          <p className="empty">Approved photos will appear here.</p>
        ) : (
          <>
            <div className="chips" role="group" aria-label="Filter photos by category">
              {tabs.map((c) => (
                <button key={c} className="chip" aria-pressed={cat === c} onClick={() => { setCat(c); setShown(PAGE) }}>
                  {c.startsWith('trip:') ? c.slice(5) : c}<sup>{count(c)}</sup>
                </button>
              ))}
            </div>
            <div className="masonry">
              {visible.map((p, i) => (
                <motion.button key={p.id} className="tile" style={{ ['--ar' as string]: (p.w / p.h).toFixed(3) } as React.CSSProperties} initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-5%' }} transition={{ duration: 0.7, delay: (i % 4) * 0.05, ease: [0.22, 1, 0.36, 1] }}
                  onClick={() => { sfx('chime'); setOpen(i) }} aria-label={`Open photo${p.caption ? ': ' + p.caption : ''}`}>
                  <PhotoFrame photo={p} natural thumb />
                  <span className="gcap"><b>{p.caption}</b>{p.date && <small>{p.date}</small>}</span>
                </motion.button>
              ))}
            </div>
            {shown < list.length && (
              <div className="more"><button className="btn" onClick={() => setShown((n) => n + PAGE)}>Show more <span className="more-n">{list.length - shown} left</span></button></div>
            )}
          </>
        )}
      </div>
      <Lightbox list={list} index={open} onClose={() => setOpen(null)} onIndex={setOpen} />
    </section>
  )
}
