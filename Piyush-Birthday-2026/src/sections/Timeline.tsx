import { ArrowUpRight } from 'lucide-react'
import { timelineIntro, tripNotes } from '../data/content'
import { ofTrip, trips } from '../data/gallery'
import { PhotoFrame } from '../components/PhotoFrame'
import { PageHeader } from '../components/PageHeader'
import { Reveal } from '../components/Split'

// A ledger of trips, oldest to newest: date on the left, a three-photo strip and the story on the right.
export function Timeline({ onOpenTrip }: { onOpenTrip: (trip: string) => void }) {
  const list = trips.filter((t) => t.title !== 'More memories')
  return (
    <section id="timeline">
      <div className="wrap">
        <PageHeader n={4} eyebrow="Chapters in time" title="The" em="Timeline" sub={`${list.length} trips and days out, oldest to newest.`} />
        <ol className="tl">
          <li className="ti first">
            <Reveal className="ti-row">
              <div className="ti-when"><span className="ti-year">2016</span><time>{timelineIntro.label}</time></div>
              <div className="ti-body">
                <h3>{timelineIntro.title}</h3>
                <p>{timelineIntro.caption}</p>
              </div>
            </Reveal>
          </li>
          {list.map((t, k) => {
            const shots = ofTrip(t.title).slice(0, 3)
            const year = (t.date.match(/20\d\d/) ?? [''])[0]
            const rest = t.date.replace(year, '').trim()
            return (
              <li className="ti" key={t.title}>
                <Reveal className="ti-row" y={30}>
                  <div className="ti-when">
                    <span className={`ti-year ${year ? '' : 'word'}`}>{year || 'Earlier'}</span>
                    {rest && <time>{rest}</time>}
                    <span className="ti-idx">{String(k + 1).padStart(2, '0')}</span>
                  </div>
                  <div className="ti-body">
                    <button className="tcard" onClick={() => onOpenTrip(t.title)} aria-label={`See ${t.count} photographs from ${t.title}`}>
                      <span className={`strip n${shots.length}`} style={{ maxWidth: `calc(${shots.reduce((a, p) => a + p.w / p.h, 0).toFixed(3)} * var(--strip-h) + ${(shots.length - 1) * 8}px)` }}>
                        {shots.map((p) => <span key={p.id} className="strip-i" style={{ ['--ar' as string]: (p.w / p.h).toFixed(3) } as React.CSSProperties}><PhotoFrame photo={p} natural thumb /></span>)}
                      </span>
                    </button>
                    <h3>{t.title}</h3>
                    <p>{tripNotes[t.title] ?? `${t.count} photograph${t.count > 1 ? 's' : ''} from this day.`}</p>
                    <button className="ti-link" onClick={() => onOpenTrip(t.title)}>View {t.count} photo{t.count > 1 ? 's' : ''} <ArrowUpRight size={15} /></button>
                  </div>
                </Reveal>
              </li>
            )
          })}
        </ol>
      </div>
    </section>
  )
}
