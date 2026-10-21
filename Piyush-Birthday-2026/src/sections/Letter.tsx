import { Fragment } from 'react'
import { letter } from '../data/content'
import { byId, inCategory, photos, together } from '../data/gallery'
import { MaskImage } from '../components/MaskImage'
import { PhotoFrame } from '../components/PhotoFrame'
import { PageHeader } from '../components/PageHeader'
import { Reveal } from '../components/Split'

// **bold** -> <strong>
const rich = (t: string) => t.split(/(\*\*[^*]+\*\*)/).map((part, i) =>
  part.startsWith('**') ? <strong key={i}>{part.slice(2, -2)}</strong> : <Fragment key={i}>{part}</Fragment>)

// The letter sits on ivory paper. Beside it, a column that stays in view while reading:
// a framed photo, three small memories, and a handwritten note.
export function Letter() {
  const main = byId('i73') ?? inCategory('Piyush')[0] ?? photos[photos.length - 1]
  const minis = ['i22', 'i61', 'i3'].map(byId).filter((p): p is NonNullable<typeof p> => !!p)
  const strip = minis.length === 3 ? minis : together.filter((p) => p.id !== main?.id).slice(0, 3)
  return (
    <section className="letter" id="letter">
      <div className="wrap">
        <PageHeader n={7} eyebrow="From me to you" title="A" em="letter" sub="Read it slowly." />
        <div className="lt">
          <aside className="lt-aside">
            <div className="lt-sticky">
              <div className="lt-photo">
                <span className="frame-offset" aria-hidden="true" />
                <MaskImage photo={main} label="Photo" />
              </div>
              <div className="lt-minis">
                {strip.map((p, i) => (
                  <div key={p.id} className="lt-mini" style={{ rotate: `${[-3, 2, -1.5][i]}deg` }}>
                    <PhotoFrame photo={p} thumb natural />
                  </div>
                ))}
              </div>
              <p className="lt-note">{letter.asideNote}</p>
              <dl className="lt-facts">
                <div><dt>Since</dt><dd>5th standard</dd></div>
                <div><dt>Friends for</dt><dd>10 years</dd></div>
                <div><dt>Status</dt><dd>Forever</dd></div>
              </dl>
            </div>
          </aside>
          <Reveal className="paper">
            <p className="salute">{letter.salute}</p>
            {letter.paragraphs.map((t, i) => <p key={i} className={i === 0 ? 'drop' : ''}>{rich(t)}</p>)}
            <div className="closing">{letter.closing.map((t, i) => <p key={i}>{rich(t)}</p>)}</div>
            <p className="sig"><span>{letter.signoff}</span>{letter.from}</p>
            <svg className="seal" viewBox="0 0 100 100" aria-hidden="true">
              <defs>
                <radialGradient id="wax" cx=".35" cy=".3" r=".8"><stop offset="0" stopColor="#e9cf8f" /><stop offset=".55" stopColor="#b98d3f" /><stop offset="1" stopColor="#7a5520" /></radialGradient>
              </defs>
              <path d="M50 4c8 0 10 6 17 8s14-1 18 6-1 12 1 19 9 10 6 18-11 8-14 14-1 14-8 18-12-1-20 1-11 9-18 6-6-11-12-15-14-1-17-9 3-12 1-19-9-10-5-18 12-6 17-11S42 4 50 4z" fill="url(#wax)" />
              <circle cx="50" cy="51" r="27" fill="none" stroke="#7a5520" strokeOpacity=".5" strokeWidth="1.5" />
              <text x="50" y="62" textAnchor="middle" fontFamily="Cormorant Garamond, serif" fontSize="34" fontStyle="italic" fill="#6b4818">A·P</text>
            </svg>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
