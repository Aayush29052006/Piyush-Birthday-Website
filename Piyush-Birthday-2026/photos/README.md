# photos

Every photo used by the website lives here, together with `manifest.json` (captions, categories, sizes).

- `iNN.jpg` / `iNN-t.jpg`: web copies (1800 px and 960 px preview) made from the photos supplied by the owner.
  Original files on the owner's drive are never modified.
- `manifest.json`: read by `src/data/gallery.ts`. Photos that are not listed here are not shown on the site.
- Served at `/memories/<file>` (dev) and copied to `dist/memories/` (build) by the plugin in `vite.config.ts`.

To add a photo: put it in this folder and add an entry to `manifest.json` (id, src `memories/<file>`, thumb, w, h, categories, caption).
