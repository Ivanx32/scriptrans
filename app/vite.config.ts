import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['vite.svg'],
      manifest: {
        name: 'Scriptrans',
        short_name: 'Scriptrans',
        start_url: '/',
        display: 'standalone',
        background_color: '#ffffff',
        icons: [{ src: '/vite.svg', sizes: '192x192', type: 'image/svg+xml' }]
      }
    })
  ]
});
