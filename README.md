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

The service worker will cache the application shell so that when you go offline the basic UI remains available.

Auto deploy: push → master

Manual deploy: Actions → Run workflow
