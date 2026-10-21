import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import { cpSync, createReadStream, existsSync, statSync } from 'node:fs'
import { extname, join, resolve } from 'node:path'

// Photos live in ./photos (project root). They are served at /memories/* in dev and copied to dist/memories on build,
// so the site's URLs stay "memories/<file>" while the source folder is the tidy, separate `photos` folder.
const PHOTOS = resolve(__dirname, 'photos')
const photosPlugin = (): Plugin => ({
  name: 'photos-folder',
  configureServer(server) {
    server.middlewares.use((req, res, next) => {
      const m = req.url?.match(/^\/memories\/([^/?#]+\.(?:jpg|jpeg|png|webp))(?:\?.*)?$/i)
      if (!m) return next()
      const file = join(PHOTOS, decodeURIComponent(m[1]))
      if (!file.startsWith(PHOTOS) || !existsSync(file) || !statSync(file).isFile()) return next()
      res.setHeader('Content-Type', extname(file) === '.png' ? 'image/png' : extname(file) === '.webp' ? 'image/webp' : 'image/jpeg')
      createReadStream(file).pipe(res)
    })
  },
  closeBundle() {
    // only .jpg/.png/.webp go public; manifest.json is bundled into the JS and the README stays out of the build
    cpSync(PHOTOS, resolve(__dirname, 'dist/memories'), { recursive: true, filter: (src) => statSync(src).isDirectory() || /\.(jpe?g|png|webp)$/i.test(src) })
  },
})

// base './' makes the build work from any sub-path (e.g. https://user.github.io/repo-name/) as well as a domain root.
export default defineConfig({ base: './', plugins: [react(), photosPlugin()], build: { chunkSizeWarningLimit: 700 } })
