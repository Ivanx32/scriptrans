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

The generated `whisper-web.js` (and the fallback `whisper-web.single.js`) will be placed in `app/public/wasm/` as well as `public/wasm/`. You can then start the dev server:

```bash
cd app
npm install
npm run dev
```

If you skip the build step above, the repository ships small placeholder modules so the app still builds, but Whisper will not run until you generate the real WASM binaries.

## Что еще нужно сделать вручную и как автоматизировать

1. **Собрать реальные WASM‑бандлы Whisper.**
   - Выполните `./scripts/bootstrap.sh`, чтобы установить Emscripten и вспомогательные зависимости (один раз на машину).
   - Запустите `./scripts/build-wasm.sh`, чтобы получить `app/public/wasm/whisper-web.js` и `app/public/wasm/whisper-web.single.js`.
   - Пока эти скрипты не выполнены, приложение собирается с заглушками и не сможет выполнять расшифровку речи.

2. **Проконтролировать наличие артефактов в билде.**
   - Убедитесь, что собранные `whisper-web*.js` попадают в папку `public/wasm/` (скрипт копирует их автоматически).
   - Если используете CI, убедитесь, что артефакты сохраняются между шагами (например, через кэш или `actions/upload-artifact`).

### Как избегать ручных шагов

- **Автоматическая сборка в CI/CD.** Добавьте в пайплайн шаги:
  1. `./scripts/bootstrap.sh` (кэшируйте `~/.emscripten_cache` и `emsdk` для ускорения).
  2. `./scripts/build-wasm.sh`.
  3. Обычную сборку приложения (`npm install`, `npm run build`).
- **Публикация артефактов.**
  - Для GitHub Actions можно после сборки загрузить содержимое `app/public/wasm/` как артефакт или включать его в итоговый бандл, чтобы деплой получал готовые файлы.
  - Для GitHub Pages — оставьте файлы в `app/public/wasm/`, Vite положит их в `dist/wasm/` и они попадут в публикацию.
- **Локальная автоматизация.** Добавьте в `package.json` скрипт вроде `"build:with-wasm": "./scripts/bootstrap.sh && ./scripts/build-wasm.sh && npm run build"`, чтобы запускать одну команду вместо трех.

Если настроить эти шаги в автоматической сборке и деплое, ручное вмешательство больше не понадобится: CI соберет WASM, положит их в артефакты и задеплоит вместе с приложением.
