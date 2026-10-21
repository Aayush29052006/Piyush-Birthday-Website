import { Reveal } from './Split'

const ROMAN = ['', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X']

// One editorial header used by every chapter: roman numeral, eyebrow, title with an italic accent, optional subtitle.
export function PageHeader({ n, eyebrow, title, em, sub, align = 'center' }:
  { n: number; eyebrow: string; title: string; em?: string; sub?: string; align?: 'center' | 'left' }) {
  return (
    <Reveal className={`chead ${align}`}>
      <span className="chead-num" aria-hidden="true">Chapter {ROMAN[n]}</span>
      <p className="eyebrow">{eyebrow}</p>
      <h2>{title}{em && <> <em>{em}</em></>}</h2>
      {sub && <p className="chead-sub">{sub}</p>}
      <span className="chead-rule" aria-hidden="true" />
    </Reveal>
  )
}
