import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'

// GitHub Pages proje sayfası olarak yayınlandığı için (https://<kullanici>.github.io/<repo-adi>/)
// build sırasında base path bu alt yola göre ayarlanıyor; lokal geliştirmede kök ('/') kalıyor.
// Repo adını farklı seçtiysen burayı da güncelle.
const GH_PAGES_BASE = '/delimanda-kasa/'

// https://vite.dev/config/
export default defineConfig(({ command }) => ({
  base: command === 'build' ? GH_PAGES_BASE : '/',
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg', 'apple-touch-icon.png'],
      manifest: {
        name: 'Delimanda Kasa',
        short_name: 'Kasa',
        description: 'Delimanda festival kasa uygulaması',
        start_url: '.',
        scope: '.',
        display: 'standalone',
        background_color: '#F7F7F7',
        theme_color: '#F7F7F7',
        orientation: 'landscape',
        icons: [
          { src: 'pwa-192.png', sizes: '192x192', type: 'image/png' },
          { src: 'pwa-512.png', sizes: '512x512', type: 'image/png' },
          { src: 'pwa-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
        ],
      },
      workbox: {
        // jpg/jpeg/webp dahil: ürün fotoğrafları (public/images/products/*.jpg)
        // eklendiğinde offline önbelleğe otomatik girsin diye.
        globPatterns: ['**/*.{js,css,html,svg,png,jpg,jpeg,webp,ico}'],
      },
    }),
  ],
}))
