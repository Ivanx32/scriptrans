import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  base: '/scriptrans/',
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['icons/placeholder.svg'],
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
