// Photos come ONLY from public/memories/manifest.json (written after you approve images).
import manifest from '../../photos/manifest.json'

export type Photo = {
  id: string; src: string; thumb?: string; w: number; h: number
  categories: string[]; caption?: string; date?: string; trip?: string; featured?: boolean; low?: boolean
}
export type Trip = { title: string; date: string; count: number; first: string }
export const CATEGORIES = [
  'Our Best Memories', 'Piyush', 'Us Together', 'College Days', 'Friends',
  'Funny Moments', 'Adventures', 'Celebrations', 'Random Memories',
] as const

// low-priority photos stay in the gallery but sort after everything else (stable sort keeps the old-to-new order)
const lowLast = (l: Photo[]) => [...l].sort((a, b) => Number(!!a.low) - Number(!!b.low))
export const photos: Photo[] = lowLast((manifest as { photos: Photo[] }).photos)
export const trips: Trip[] = (manifest as { trips?: Trip[] }).trips ?? []
export const ofTrip = (t: string) => photos.filter((p) => p.trip === t)
export const byId = (id: string) => photos.find((p) => p.id === id)
export const inCategory = (c: string) => photos.filter((p) => p.categories.includes(c))
export const usedCategories = CATEGORIES.filter((c) => inCategory(c).length > 0)
export const heroPhoto = photos.find((p) => p.featured) ?? photos[0]
const base = import.meta.env.BASE_URL
export const url = (s: string) => (s.startsWith('http') ? s : base + s.replace(/^\//, ''))

// Curated picks used by the montage, surprise and scrapbook
export const best = inCategory('Our Best Memories')
export const together = inCategory('Us Together')
export const spread = (list: Photo[], n: number) => (list.length <= n ? list : Array.from({ length: n }, (_, i) => list[Math.floor((i * list.length) / n)]))
