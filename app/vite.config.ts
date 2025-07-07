import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  base: '/scriptrans/',
  define: {
    __SW_VERSION__: JSON.stringify(Date.now().toString())
  },
  plugins: [
    react(),
    VitePWA({
      strategies: 'injectManifest',
      srcDir: 'src',
      filename: 'sw.ts',
      registerType: 'autoUpdate',
      includeAssets: ['icons/placeholder.svg', 'offline.html'],
      injectManifest: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,json}']
      },
      manifestFilename: 'manifest.json',
      manifest: {
        name: 'Scriptrans',
        short_name: 'Scriptrans',
        start_url: '/scriptrans/',
        scope: '/scriptrans/',
        display: 'standalone',
        theme_color: '#ffffff',
        icons: [
          {
            src: '/icons/placeholder.svg',
            sizes: 'any',
            type: 'image/svg+xml'
          }
        ]
      }
    })
  ]
});
