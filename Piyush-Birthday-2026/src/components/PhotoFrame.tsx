import { useEffect, useRef, useState } from 'react'
import { Photo, url } from '../data/gallery'

// Renders an approved photo. Never crops people:
//  natural  -> the frame takes the photo's own proportions
//  fill     -> the frame keeps its CSS proportions and the photo sits inside it (contain) over a blurred copy of itself
// A failed load is retried (twice, with a cache-buster) before a placeholder shows, so a brief hiccup never sticks.
export function PhotoFrame({ photo, label = 'Photo', natural = false, fill = false, thumb = false, priority = false, className = '' }:
  { photo?: Photo; label?: string; natural?: boolean; fill?: boolean; thumb?: boolean; priority?: boolean; className?: string }) {
  const [on, setOn] = useState(priority) // priority (above-the-fold) images skip the fade so they paint at once
  const [tries, setTries] = useState(0)
  const img = useRef<HTMLImageElement>(null)
  // When the photo changes, reset, but never hide an image that has already loaded (cached images can finish
  // loading before this effect runs, which used to leave them invisible).
  useEffect(() => { const el = img.current; setOn(priority || !!(el && el.complete && el.naturalWidth > 0)); setTries(0) }, [photo?.id, priority])
  const bad = tries > 2
  const showImg = photo && !bad
  const file = photo ? url(thumb && photo.thumb ? photo.thumb : photo.src) : ''
  const src = file + (tries ? `?r=${tries}` : '')
  // full-size photos offer the smaller preview to small screens (the browser picks by width)
  const tw = photo ? Math.round(photo.w * Math.min(1, 960 / Math.max(photo.w, photo.h))) : 0
  const srcSet = photo && !thumb && photo.thumb && !tries && tw < photo.w ? `${url(photo.thumb)} ${tw}w, ${file} ${photo.w}w` : undefined
  return (
    <div className={`pf ${fill ? 'fill' : ''} ${className}`} style={natural && photo ? { aspectRatio: `${photo.w} / ${photo.h}` } : undefined}>
      {showImg && fill && <span className="pf-bg" style={{ backgroundImage: `url("${photo.thumb ? url(photo.thumb) : file}")` }} aria-hidden="true" />}
      {showImg ? (
        <img ref={img} src={src} srcSet={srcSet} sizes={srcSet ? '(max-width: 900px) 92vw, 45vw' : undefined} alt={photo.caption || 'A memory with Piyush'} width={photo.w} height={photo.h}
          loading={priority ? 'eager' : 'lazy'} decoding="async" className={on ? 'on' : ''} onLoad={() => setOn(true)}
          onError={() => window.setTimeout(() => setTries((t) => t + 1), 1200 * (tries + 1))} />
      ) : (
        <div className="ph" role="img" aria-label="Photo placeholder">{label}</div>
      )}
    </div>
  )
}
