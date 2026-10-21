// Optional audio engine. Never autoplays. Two sources:
//  1. public/audio/birthday-song.mp3 (or .ogg/.m4a) if you supply a licensed file
//  2. otherwise an ORIGINAL ambient instrumental synthesised live with the Web Audio API (no sample, no copyrighted tune)
import { useSyncExternalStore } from 'react'

type Status = 'idle' | 'loading' | 'playing' | 'paused' | 'error'
type State = { status: Status; volume: number; muted: boolean; sfx: boolean; source: 'file' | 'synth' | null }
let state: State = { status: 'idle', volume: 0.6, muted: false, sfx: true, source: null }
const subs = new Set<() => void>()
const set = (p: Partial<State>) => { state = { ...state, ...p }; subs.forEach((f) => f()) }

let ctx: AudioContext | null = null
let master: GainNode
let analyser: AnalyserNode
let el: HTMLAudioElement | null = null
let timer = 0
let nextBar = 0
let bar = 0
const base = import.meta.env.BASE_URL
const START_AT = 10 // seconds trimmed from the start of the song (original file untouched). Set to 0 to use the full track.

function init() {
  if (ctx) return ctx
  const AC = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
  ctx = new AC()
  master = ctx.createGain()
  analyser = ctx.createAnalyser()
  analyser.fftSize = 64
  master.connect(analyser)
  analyser.connect(ctx.destination)
  applyVol()
  return ctx
}
const applyVol = () => { if (master) master.gain.value = state.muted ? 0 : state.volume }

async function findFile(): Promise<string | null> {
  for (const ext of ['mp3', 'ogg', 'm4a']) {
    try {
      const u = `${base}audio/birthday-song.${ext}`
      const r = await fetch(u, { method: 'HEAD' })
      if (r.ok && (r.headers.get('content-type') || '').startsWith('audio')) return u
    } catch { /* offline or missing */ }
  }
  return null
}

// C - Am - F - G, 4 s per bar
const CHORDS = [[261.63, 329.63, 392], [220, 261.63, 329.63], [174.61, 220, 261.63], [196, 246.94, 293.66]]
const ARP = [0, 1, 2, 1, 2, 1, 2, 1]
function note(f: number, t: number, dur: number, type: OscillatorType, gain: number) {
  const c = ctx!
  const o = c.createOscillator(); const g = c.createGain()
  o.type = type; o.frequency.value = f
  g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(gain, t + Math.min(0.08, dur / 3))
  g.gain.exponentialRampToValueAtTime(0.0001, t + dur)
  o.connect(g); g.connect(master); o.start(t); o.stop(t + dur + 0.05)
}
function scheduleBar(t: number, i: number) {
  const ch = CHORDS[i % 4]
  ch.forEach((f) => note(f / 2, t, 4.2, 'triangle', 0.07))
  note(ch[0] / 4, t, 4, 'sine', 0.12)
  ARP.forEach((k, n) => note(ch[k] * 2, t + n * 0.5, 1.2, 'sine', 0.05))
  if (i % 4 === 3) note(ch[2] * 4, t + 3, 1, 'sine', 0.03)
}
function startSynth() {
  const c = init()
  nextBar = c.currentTime + 0.1
  const loop = () => {
    while (nextBar < c.currentTime + 1.5) { scheduleBar(nextBar, bar++); nextBar += 4 }
  }
  loop(); timer = window.setInterval(loop, 400)
}
const stopSynth = () => { window.clearInterval(timer); timer = 0 }

export const audio = {
  async play() {
    try {
      set({ status: 'loading' })
      const c = init(); await c.resume()
      if (state.source === null) {
        const f = await findFile()
        if (f) {
          el = new Audio(f); el.crossOrigin = 'anonymous'; el.preload = 'auto'
          const a = el
          a.addEventListener('loadedmetadata', () => { if (a.currentTime < START_AT) a.currentTime = START_AT })
          a.addEventListener('ended', () => { a.currentTime = START_AT; a.play().catch(() => set({ status: 'paused' })) })
          c.createMediaElementSource(el).connect(master)
          el.addEventListener('error', () => set({ status: 'error' }))
          set({ source: 'file' })
        } else set({ source: 'synth' })
      }
      if (state.source === 'file' && el) await el.play()
      else startSynth()
      set({ status: 'playing' })
    } catch { set({ status: 'error' }) }
  },
  pause() {
    el?.pause(); stopSynth(); ctx?.suspend(); set({ status: 'paused' })
  },
  toggle() { return state.status === 'playing' ? audio.pause() : audio.play() },
  isPlaying() { return state.status === 'playing' },
  setVolume(v: number) { set({ volume: v, muted: false }); applyVol() },
  toggleMute() { set({ muted: !state.muted }); applyVol() },
  toggleSfx() { set({ sfx: !state.sfx }) },
  level(): number {
    if (!analyser || state.status !== 'playing') return 0
    const d = new Uint8Array(analyser.frequencyBinCount); analyser.getByteFrequencyData(d)
    return d.reduce((a, b) => a + b, 0) / d.length / 255
  },
}

// Short, quiet interaction sounds. Own gain so they work even if music was never started.
export function sfx(kind: 'chime' | 'pop' | 'whoosh') {
  if (!state.sfx || state.muted) return
  try {
    const c = init(); if (c.state === 'suspended' && state.status !== 'playing') c.resume()
    const t = c.currentTime
    const out = c.createGain(); out.gain.value = 0.5; out.connect(c.destination)
    const o = c.createOscillator(); const g = c.createGain(); o.connect(g); g.connect(out)
    if (kind === 'chime') { o.type = 'sine'; o.frequency.setValueAtTime(880, t); o.frequency.setValueAtTime(1318, t + 0.12); g.gain.setValueAtTime(0.15, t); g.gain.exponentialRampToValueAtTime(0.0001, t + 0.9) }
    if (kind === 'pop') { o.type = 'triangle'; o.frequency.setValueAtTime(500, t); o.frequency.exponentialRampToValueAtTime(120, t + 0.12); g.gain.setValueAtTime(0.2, t); g.gain.exponentialRampToValueAtTime(0.0001, t + 0.15) }
    if (kind === 'whoosh') { o.type = 'sawtooth'; o.frequency.setValueAtTime(120, t); o.frequency.exponentialRampToValueAtTime(900, t + 0.5); g.gain.setValueAtTime(0.0001, t); g.gain.linearRampToValueAtTime(0.05, t + 0.25); g.gain.exponentialRampToValueAtTime(0.0001, t + 0.6) }
    o.start(t); o.stop(t + 1)
  } catch { /* sound is never essential */ }
}

export function useAudio() {
  return useSyncExternalStore((f) => { subs.add(f); return () => { subs.delete(f) } }, () => state)
}
