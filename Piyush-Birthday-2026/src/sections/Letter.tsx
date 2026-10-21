import { letter } from '../data/content'
import { inCategory, photos } from '../data/gallery'
import { MaskImage } from '../components/MaskImage'
import { PageHeader } from '../components/PageHeader'
import { Reveal } from '../components/Split'

// The letter is set on a sheet of ivory paper, with a drop cap and a gold wax seal.
export function Letter() {
  const p = inCategory('Piyush')[0] ?? photos[photos.length - 1]
  const [salute, ...body] = letter.paragraphs
  const signoffLine = body[body.length - 1]
  const middle = body.slice(0, -1)
  return (
    <section className="letter" id="letter">
      <div className="wrap">
        <PageHeader n={7} eyebrow="From me to you" title="A" em="letter" sub="Read it slowly." />
        <div className="lt">
          <div className="lt-photo">
            <span className="frame-offset" aria-hidden="true" />
            <MaskImage photo={p} label="Photo" />
          </div>
          <Reveal className="paper">
            <p className="salute">{salute}</p>
            {middle.map((t, i) => <p key={i} className={i === 0 ? 'drop' : ''}>{t}</p>)}
            <p className="closing">{signoffLine}</p>
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
