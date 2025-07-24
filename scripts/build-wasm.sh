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

###########################################
# Configure and build the whisper target  #
###########################################

emcmake cmake -S . -B build \
  -DWHISPER_WASM_SINGLE_FILE=ON \
  -DWHISPER_BUILD_WASM=ON \
  -DWHISPER_BUILD_TESTS=OFF \
  -DWHISPER_BUILD_EXAMPLES=OFF \
  -DCMAKE_BUILD_TYPE=Release

cmake --build build --target whisper -j"$(nproc)"

# copy artifacts into static assets
mkdir -p "$PROJECT_ROOT/public/wasm"
if [ -f build/bin/whisper.wasm/main.js ]; then
  cp build/bin/whisper.wasm/main.js "$PROJECT_ROOT/public/wasm/whisper-web.js"
  cp build/bin/whisper.wasm/main.wasm "$PROJECT_ROOT/public/wasm/whisper-web.wasm" 2>/dev/null || true
else
  cp build/main.js "$PROJECT_ROOT/public/wasm/whisper-web.js"
  cp build/main.wasm "$PROJECT_ROOT/public/wasm/whisper-web.wasm" 2>/dev/null || true
fi

if ! ls "$PROJECT_ROOT/public/wasm/whisper-web."* 1>/dev/null 2>&1; then
  echo "::error::WASM artefact not found"; exit 1
fi

###########################################
#  Copy JS artifacts into the web app     #
###########################################

DEST="${GITHUB_WORKSPACE:-$PROJECT_ROOT}/public/wasm"
mkdir -p "$DEST"
cp "$PROJECT_ROOT/public/wasm/whisper-web.js" "$DEST/"
cp "$PROJECT_ROOT/public/wasm/whisper-web.wasm" "$DEST/" 2>/dev/null || true

# sanity log
echo "Copied WASM bundle:"
ls -lh "$DEST"

# Also copy into the app's public folder for local builds
APP_DEST="$PROJECT_ROOT/app/public/wasm"
mkdir -p "$APP_DEST"
cp "$PROJECT_ROOT/public/wasm/whisper-web.js" "$APP_DEST/"
cp "$PROJECT_ROOT/public/wasm/whisper-web.wasm" "$APP_DEST/" 2>/dev/null || true

# Copy license
LICENSE_DEST="$PROJECT_ROOT/third_party"
mkdir -p "$LICENSE_DEST"
cp LICENSE "$LICENSE_DEST/LICENSE-whisper-cpp"
