# Scriptrans

This project is a basic React + TypeScript application built with Vite. It includes placeholder pages for Upload, Progress and Editor, and registers a service worker for offline support using `vite-plugin-pwa`.

## Development

```bash
cd app
npm install
npm run dev
```

## Build

```bash
npm run build
```

To serve the app from a subfolder, pass the desired base path to Vite:

```bash
vite build --base=/your-folder/
```

The router reads `import.meta.env.BASE_URL`, so navigation works automatically.

The service worker will cache the application shell so that when you go offline the basic UI remains available.

Auto deploy: push → master

Manual deploy: Actions → Run workflow

## PWA: Add to Home Screen

To test the app as a Progressive Web App on iOS:

1. Open `https://ivanx32.github.io/scriptrans` in Safari.
2. Use **Share → Add to Home Screen**.
3. Launch the installed app from the Home Screen.

The app should start without a 404 error and all routes will work offline.

## Build & Run locally

To rebuild the Whisper WASM bundle you need Emscripten. After cloning the repo run:

```bash
./scripts/bootstrap.sh       # one-time setup
./scripts/build-wasm.sh
```

The generated `whisper.js` will be placed in `app/public/wasm/`. You can then start the dev server:

```bash
cd app
npm install
npm run dev
```
