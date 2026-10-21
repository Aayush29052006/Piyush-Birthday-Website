import { useEffect, useState } from 'react'
import { Photo, url } from '../data/gallery'

// Renders an approved photo. Never crops people:
//  natural  -> the frame takes the photo's own proportions
//  fill     -> the frame keeps its CSS proportions and the photo sits inside it (contain) over a blurred copy of itself
// A failed load is retried (twice, with a cache-buster) before a placeholder shows, so a brief hiccup never sticks.
export function PhotoFrame({ photo, label = 'Photo', natural = false, fill = false, thumb = false, priority = false, className = '' }:
  { photo?: Photo; label?: string; natural?: boolean; fill?: boolean; thumb?: boolean; priority?: boolean; className?: string }) {
  const [on, setOn] = useState(priority) // priority (above-the-fold) images skip the fade so they paint at once
  const [tries, setTries] = useState(0)
  useEffect(() => { setOn(priority); setTries(0) }, [photo?.id, priority])
  const bad = tries > 2
  const showImg = photo && !bad
  const file = photo ? url(thumb && photo.thumb ? photo.thumb : photo.src) : ''
  const src = file + (tries ? `?r=${tries}` : '')
  return (
    <div className={`pf ${fill ? 'fill' : ''} ${className}`} style={natural && photo ? { aspectRatio: `${photo.w} / ${photo.h}` } : undefined}>
      {showImg && fill && <span className="pf-bg" style={{ backgroundImage: `url("${photo.thumb ? url(photo.thumb) : file}")` }} aria-hidden="true" />}
      {showImg ? (
        <img src={src} alt={photo.caption || 'A memory with Piyush'} width={photo.w} height={photo.h}
          loading={priority ? 'eager' : 'lazy'} decoding="async" className={on ? 'on' : ''} onLoad={() => setOn(true)}
          onError={() => window.setTimeout(() => setTries((t) => t + 1), 1200 * (tries + 1))} />
      ) : (
        <div className="ph" role="img" aria-label="Photo placeholder">{label}</div>
      )}
    </div>
  )
}
