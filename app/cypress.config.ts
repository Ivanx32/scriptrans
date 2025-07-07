import { defineConfig } from 'cypress';

const base = process.env.VITE_BASE_URL ?? '/scriptrans/';

export default defineConfig({
  e2e: {
    baseUrl: `http://localhost:4173${base}`,
    setupNodeEvents() {},
    supportFile: false
  },
  env: {
    BASE_URL: base
  }
});
