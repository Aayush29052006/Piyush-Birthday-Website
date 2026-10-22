import { chapters } from '../data/content'
import { byId, inCategory } from '../data/gallery'
import { MaskImage } from '../components/MaskImage'
import { PageHeader } from '../components/PageHeader'
import { Reveal } from '../components/Split'
import { Parallax } from '../components/Parallax'

const ROMAN = ['I', 'II', 'III', 'IV', 'V']

export function Story() {
  const pool = inCategory('Us Together')
  return (
    <section id="story">
      <div className="wrap">
        <PageHeader n={2} eyebrow="Our friendship" title="The" em="Story" sub="Ten years, told in three short chapters." />
        {chapters.map((c, i) => (
          <article className="chap" key={c.title}>
            <Parallax className="chap-media" amount={50}>
              <span className="frame-offset" aria-hidden="true" />
              {c.photoId === 'none' ? (
                <div className="qcard" aria-hidden="true"><b>{c.big}</b><span>years</span><em>5th standard to engineering</em></div>
              ) : (
                <MaskImage photo={byId(c.photoId) ?? pool[i]} label="Photo" />
              )}
            </Parallax>
            <Reveal className="chap-copy">
              <div className="num" aria-hidden="true">{ROMAN[i]}</div>
              <p className="eyebrow">{c.title}</p>
              <h3>{c.heading}</h3>
              <p>{c.text}</p>
            </Reveal>
          </article>
        ))}
      </div>
    </section>
  )
}
