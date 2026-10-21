import { useState } from 'react'
import { motion } from 'motion/react'
import { cake } from '../data/content'
import { PageHeader } from '../components/PageHeader'
import { Particles } from '../components/Particles'
import { fireConfetti } from '../components/confetti'
import { sfx } from '../hooks/audio'

const CANDLES = [146, 173, 200, 227, 254]
// gold ganache drip along the top edge of a tier: x from a to b at height y
const drip = (a: number, b: number, y: number, depth: number) => {
  let d = `M${a} ${y - 6} Q${a} ${y} ${a + 4} ${y}`
  const n = Math.round((b - a) / 22)
  for (let i = 0; i < n; i++) {
    const x = a + 4 + (i * (b - a - 8)) / n, w = (b - a - 8) / n, h = depth * (0.45 + ((i * 37) % 10) / 14)
    d += ` L${x + w * 0.25} ${y} Q${x + w * 0.25} ${y + h} ${x + w * 0.5} ${y + h} Q${x + w * 0.75} ${y + h} ${x + w * 0.75} ${y} L${x + w} ${y}`
  }
  return d + ` Q${b} ${y} ${b} ${y - 6} Z`
}

export function Cake() {
  const [out, setOut] = useState(false)
  const blow = () => { if (out) return; setOut(true); sfx('pop'); window.setTimeout(() => { sfx('chime'); fireConfetti(3000, 110) }, 500) }
  return (
    <section className="cake" id="cake">
      <Particles count={25} />
      <div className="wrap">
        <PageHeader n={8} eyebrow="Make a wish" title="The" em="Cake" />
        <p className="wish">{out ? 'Wish made.' : cake.prompt}</p>
        <div className={`cake-stage ${out ? 'out' : ''}`}>
          <span className="cake-halo" aria-hidden="true" />
          <svg className={out ? 'out' : ''} viewBox="0 0 400 400" role="img" aria-label={out ? 'A birthday cake with all candles blown out' : 'A birthday cake with five flickering candles'}>
            <defs>
              <linearGradient id="choc" x1="0" x2="1"><stop offset="0" stopColor="#2a160d" /><stop offset=".35" stopColor="#5b3420" /><stop offset=".6" stopColor="#4a2a19" /><stop offset="1" stopColor="#1f100a" /></linearGradient>
              <linearGradient id="cream" x1="0" x2="1"><stop offset="0" stopColor="#cdbb98" /><stop offset=".35" stopColor="#f6eedc" /><stop offset=".65" stopColor="#efe3c8" /><stop offset="1" stopColor="#bba985" /></linearGradient>
              <linearGradient id="ganache" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#f3d99a" /><stop offset=".5" stopColor="#d4ac5c" /><stop offset="1" stopColor="#a87b34" /></linearGradient>
              <linearGradient id="plate" x1="0" x2="1"><stop offset="0" stopColor="#6d5a3a" /><stop offset=".5" stopColor="#e8d3a2" /><stop offset="1" stopColor="#6d5a3a" /></linearGradient>
              <linearGradient id="wax" x1="0" x2="1"><stop offset="0" stopColor="#d8c7a4" /><stop offset=".5" stopColor="#fbf4e4" /><stop offset="1" stopColor="#cdbb95" /></linearGradient>
              <radialGradient id="fl" cx=".5" cy=".72" r=".62"><stop offset="0" stopColor="#fffbe6" /><stop offset=".35" stopColor="#ffd77a" /><stop offset=".75" stopColor="#ff9a2e" /><stop offset="1" stopColor="#ff6a00" stopOpacity="0" /></radialGradient>
              <radialGradient id="glowc" cx=".5" cy=".5" r=".5"><stop offset="0" stopColor="#ffd98a" stopOpacity=".55" /><stop offset="1" stopColor="#ffd98a" stopOpacity="0" /></radialGradient>
            </defs>
            {/* plate */}
            <ellipse cx="200" cy="352" rx="168" ry="20" fill="rgba(0,0,0,.55)" />
            <ellipse cx="200" cy="342" rx="160" ry="18" fill="url(#plate)" />
            <ellipse cx="200" cy="338" rx="150" ry="14" fill="#1a1410" />
            {/* bottom tier: chocolate */}
            <path d="M68 250 L68 326 Q68 340 200 340 Q332 340 332 326 L332 250 Z" fill="url(#choc)" />
            <ellipse cx="200" cy="250" rx="132" ry="16" fill="#6a3e26" />
            <path d={drip(68, 332, 252, 26)} fill="url(#ganache)" />
            {Array.from({ length: 13 }, (_, i) => <circle key={i} cx={84 + i * 19.3} cy={330} r="4" fill="#f1dcae" opacity=".9" />)}
            {/* top tier: ivory */}
            <path d="M108 178 L108 244 Q108 256 200 256 Q292 256 292 244 L292 178 Z" fill="url(#cream)" />
            <ellipse cx="200" cy="178" rx="92" ry="12" fill="#fbf5e8" />
            <path d={drip(108, 292, 180, 18)} fill="url(#ganache)" />
            <path d="M118 222 Q155 236 200 222 Q245 208 282 222" fill="none" stroke="#d4ac5c" strokeWidth="2" opacity=".8" />
            {Array.from({ length: 7 }, (_, i) => <circle key={i} cx={128 + i * 24} cy={222 + Math.sin(i) * 4} r="2.6" fill="#b98d3f" />)}
            {/* candles */}
            {CANDLES.map((x, i) => (
              <g key={x}>
                <rect x={x - 4} y="122" width="8" height="58" rx="2" fill="url(#wax)" />
                {[0, 1, 2, 3, 4].map((k) => <path key={k} d={`M${x - 4} ${132 + k * 11} L${x + 4} ${126 + k * 11}`} stroke="#d4ac5c" strokeWidth="2.2" />)}
                <line x1={x} y1="122" x2={x} y2="114" stroke="#2b2118" strokeWidth="1.6" />
                <circle className="flame-glow" cx={x} cy="102" r="22" fill="url(#glowc)" />
                <g className="flame" style={{ animationDelay: `${i * 0.13}s` }}>
                  <path d={`M${x} 82 C${x + 7} 94 ${x + 8} 104 ${x} 114 C${x - 8} 104 ${x - 7} 94 ${x} 82 Z`} fill="url(#fl)" />
                  <path d={`M${x} 98 C${x + 3} 103 ${x + 3} 108 ${x} 112 C${x - 3} 108 ${x - 3} 103 ${x} 98 Z`} fill="#fffef5" opacity=".9" />
                </g>
                <path className="smoke" d={`M${x} 112 q-7 -14 0 -26 q7 -12 0 -26`} stroke="rgba(230,224,214,.55)" strokeWidth="2.5" fill="none" strokeLinecap="round" />
              </g>
            ))}
          </svg>
        </div>
        {!out ? <button className="btn solid" onClick={blow}>{cake.button}</button> : (
          <motion.p className="rev" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.2, delay: 0.7 }}>{cake.reveal}</motion.p>
        )}
        {out && <div><button className="btn" style={{ marginTop: '1.5rem' }} onClick={() => setOut(false)}>Light them again</button></div>}
      </div>
    </section>
  )
}
