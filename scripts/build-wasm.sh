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

# Build core static library using emcmake
emcmake cmake -B build-em \
                 -DWHISPER_WASM_SINGLE_FILE=ON \
                 -DWHISPER_BUILD_TESTS=OFF \
                 -DWHISPER_BUILD_EXAMPLES=OFF \
                 .
cmake --build build-em -j"$(nproc)"

# Build JavaScript bindings
cd bindings/javascript
make singlefile

DEST="${GITHUB_WORKSPACE:-$PROJECT_ROOT}/public/wasm"
mkdir -p "$DEST"
cp whisper.js "$DEST/"

# Also copy into the app's public folder for local builds
APP_DEST="$PROJECT_ROOT/app/public/wasm"
mkdir -p "$APP_DEST"
cp whisper.js "$APP_DEST/"

# Copy license
LICENSE_DEST="$PROJECT_ROOT/third_party"
mkdir -p "$LICENSE_DEST"
cp ../../LICENSE "$LICENSE_DEST/LICENSE-whisper-cpp"
