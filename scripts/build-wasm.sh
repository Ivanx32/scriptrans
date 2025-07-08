#!/usr/bin/env bash
set -eux

SCRIPT_DIR=$(cd "$(dirname "$0")" && pwd)
PROJECT_ROOT=$(cd "$SCRIPT_DIR/.." && pwd)
WHISPER_REPO="https://github.com/ggerganov/whisper.cpp"

# Load Emscripten environment if available
if command -v emsdk_env.sh >/dev/null; then
  # shellcheck disable=SC1091
  source "$(command -v emsdk_env.sh)"
fi


git clone --depth 1 "$WHISPER_REPO"
cd whisper.cpp

# Build WebAssembly bundle
make wasm -j"$(nproc)" \
    WHISPER_WASM_SIMD=1 \
    WHISPER_WASM_SINGLE_FILE=1 \
    WHISPER_OPENMP=0

# Artifacts are placed in wasm/ by Make. Copy them where Vite expects.
DEST="${GITHUB_WORKSPACE:-$PROJECT_ROOT}/public/wasm"
mkdir -p "$DEST"
cp wasm/whisper.js "$DEST/whisper.js"

# Also copy into the app's public folder for local builds
APP_DEST="$PROJECT_ROOT/app/public/wasm"
mkdir -p "$APP_DEST"
cp wasm/whisper.js "$APP_DEST/whisper.js"

# Copy license
LICENSE_DEST="$PROJECT_ROOT/third_party"
mkdir -p "$LICENSE_DEST"
cp LICENSE "$LICENSE_DEST/LICENSE-whisper-cpp"
