import { useCallback, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { ArrowLeft, ArrowRight, X } from 'lucide-react'
import { Opening } from './sections/Opening'
import { Hero } from './sections/Hero'
import { Story } from './sections/Story'
import { Gallery } from './sections/Gallery'
import { Timeline } from './sections/Timeline'
import { Funny } from './sections/Funny'
import { Scrapbook } from './sections/Scrapbook'
import { Letter } from './sections/Letter'
import { Cake } from './sections/Cake'
import { Surprise } from './sections/Surprise'
import { Finale } from './sections/Finale'
import { MusicPlayer } from './components/MusicPlayer'
import { fireConfetti } from './components/confetti'
import { sfx } from './hooks/audio'
import { easterEggs, pageQuotes } from './data/content'

const KONAMI = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a']
// One entry per page, in reading order.
const PAGES = [
  { id: 'welcome', title: 'Welcome' },
  { id: 'story', title: 'Our story' },
  { id: 'memories', title: 'Our memories' },
  { id: 'timeline', title: 'The timeline' },
  { id: 'funny', title: 'Funny moments' },
  { id: 'scrapbook', title: 'The scrapbook' },
  { id: 'letter', title: 'My letter' },
  { id: 'cake', title: 'The cake' },
  { id: 'surprise', title: 'The surprise' },
  { id: 'finale', title: 'The finale' },
]
const pad = (n: number) => String(n).padStart(2, '0')
const fromHash = () => Math.max(0, PAGES.findIndex((p) => '#/' + p.id === location.hash))

export default function App() {
  const reduce = useReducedMotion()
  const [entered, setEntered] = useState(false)
  const [round, setRound] = useState(0)
  const [page, setPage] = useState(fromHash)
  const [menu, setMenu] = useState(false)
  const [toast, setToast] = useState('')
  const [galleryCat, setGalleryCat] = useState('All')
  const clicks = useRef(0)
  const menuRef = useRef<HTMLDivElement>(null)
  const say = useCallback((m: string) => { setToast(m); window.setTimeout(() => setToast(''), 3500) }, [])

  const go = useCallback((i: number) => {
    const n = Math.min(PAGES.length - 1, Math.max(0, i))
    sfx('whoosh')
    history.pushState(null, '', '#/' + PAGES[n].id)
    setMenu(false)
    setPage(n)
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    const pop = () => { setPage(fromHash()); window.scrollTo(0, 0) }
    addEventListener('popstate', pop)
    return () => removeEventListener('popstate', pop)
  }, [])

  useEffect(() => {
    let i = 0
    const k = (e: KeyboardEvent) => {
      i = e.key === KONAMI[i] ? i + 1 : e.key === KONAMI[0] ? 1 : 0
      if (i === KONAMI.length) { i = 0; fireConfetti(3500, 140); say(easterEggs.konami) }
    }
    addEventListener('keydown', k)
    return () => removeEventListener('keydown', k)
  }, [say])

  // chapter menu: Escape closes, focus moves into it, page behind does not scroll
  useEffect(() => {
    if (!menu) return
    const prev = document.activeElement as HTMLElement | null
    document.body.classList.add('locked')
    menuRef.current?.querySelector<HTMLElement>('[aria-current="page"]')?.focus()
    const k = (e: KeyboardEvent) => { if (e.key === 'Escape') setMenu(false) }
    addEventListener('keydown', k)
    return () => { removeEventListener('keydown', k); document.body.classList.remove('locked'); prev?.focus() }
  }, [menu])

  const replay = () => { history.replaceState(null, '', '#/welcome'); setPage(0); setEntered(false); setRound((r) => r + 1); window.scrollTo(0, 0) }
  const id = PAGES[page].id
  const next = PAGES[page + 1]

  const content = (() => {
    switch (id) {
      case 'welcome': return <Hero onNext={() => go(1)} />
      case 'story': return <Story />
      case 'memories': return <Gallery key={galleryCat} initialCat={galleryCat} />
      case 'timeline': return <Timeline onOpenTrip={(t) => { setGalleryCat('trip:' + t); go(2) }} />
      case 'funny': return <Funny />
      case 'scrapbook': return <Scrapbook />
      case 'letter': return <Letter />
      case 'cake': return <Cake />
      case 'surprise': return <Surprise />
      default: return <Finale onReplay={replay} onBack={() => { setGalleryCat('All'); go(2) }} />
    }
  })()

  return (
    <>
      <div className="grain" aria-hidden="true" />
      <div className="vignette" aria-hidden="true" />
      <AnimatePresence>{!entered && <Opening key={round} onEnter={() => setEntered(true)} />}</AnimatePresence>

      <header className="topbar">
        <button className="mono" aria-label="Piyush" onClick={() => { if (++clicks.current >= 5) { clicks.current = 0; fireConfetti(2500, 90); say(easterEggs.logoClicks) } }}>P</button>
        <nav className="dots" aria-label="Pages">
          {PAGES.map((p, i) => (
            <button key={p.id} className={i === page ? 'on' : i < page ? 'done' : ''} onClick={() => i !== page && go(i)}
              aria-label={`${p.title}${i === page ? ' (current page)' : ''}`} aria-current={i === page ? 'page' : undefined} title={p.title}><i /></button>
          ))}
        </nav>
        <button className="chapters" onClick={() => setMenu(true)} aria-haspopup="dialog" aria-expanded={menu}>
          <span className="cnum">{pad(page + 1)}<small> / {pad(PAGES.length)}</small></span>
          <span className="clabel">Chapters</span>
        </button>
      </header>

      <AnimatePresence>
        {menu && (
          <motion.div ref={menuRef} className="menu" role="dialog" aria-modal="true" aria-label="All chapters"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.35 }}>
            <button className="menu-x" onClick={() => setMenu(false)} aria-label="Close chapters"><X size={22} /></button>
            <p className="eyebrow">A birthday film in ten chapters</p>
            <ol>
              {PAGES.map((p, i) => (
                <motion.li key={p.id} initial={reduce ? false : { opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.04 * i + 0.1, duration: 0.5 }}>
                  <button onClick={() => go(i)} aria-current={i === page ? 'page' : undefined}>
                    <span className="mi-n">{pad(i + 1)}</span><span className="mi-t">{p.title}</span>
                  </button>
                </motion.li>
              ))}
            </ol>
          </motion.div>
        )}
      </AnimatePresence>

      <MusicPlayer />
      <main aria-hidden={!entered}>
        <AnimatePresence mode="wait">
          <motion.div key={id + round} className="page" initial={reduce ? false : { opacity: 0 }} animate={{ opacity: 1 }}
            exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
            {/* gold curtain that lifts to reveal each new chapter */}
            {!reduce && <motion.div className="curtain" aria-hidden="true" initial={{ scaleY: 1 }} animate={{ scaleY: 0 }} transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1], delay: 0.05 }} />}
            {content}
            {pageQuotes[id] && (
              <figure className="quote">
                <span className="qmark" aria-hidden="true">“</span>
                <blockquote>{pageQuotes[id]}</blockquote>
              </figure>
            )}
            {next && (
              <nav className="pgnav" aria-label="Page navigation">
                {page > 0 ? <button className="pg-back" onClick={() => go(page - 1)}><ArrowLeft size={16} /> Back</button> : <span />}
                {id !== 'welcome' && (
                  <button className="pg-next" onClick={() => go(page + 1)}>
                    <span className="pg-k">Next chapter · {pad(page + 2)}</span>
                    <span className="pg-t">{next.title} <ArrowRight className="pg-arrow" size={28} strokeWidth={1.2} /></span>
                  </button>
                )}
              </nav>
            )}
          </motion.div>
        </AnimatePresence>
      </main>
      {toast && <div className="toast" role="status">{toast}</div>}
    </>
  )
}
