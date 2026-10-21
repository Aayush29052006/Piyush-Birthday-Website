# Piyush-Birthday-2026

Vite + React + TypeScript + Motion. Static site, no backend.

## Run
    npm install
    npm run dev        # http://localhost:5173
    npm run build      # typecheck + production build into dist/

## Edit content
- Text, letter, quotes, story chapters, timeline notes: `src/data/content.ts`
- Photos and captions: `photos/` and `photos/manifest.json`
- Birthday song: `public/audio/birthday-song.mp3` (starts at 0:10, see `src/hooks/audio.ts`)

## Deployment
GitHub Pages, via the workflow at the repository root (`.github/workflows/pages.yml`).
