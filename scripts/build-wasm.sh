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

emcmake cmake -S . -B build-em \
  -DWHISPER_BUILD_EM=ON \
  -DWHISPER_WASM_SINGLE_FILE=ON \
  -DWHISPER_WASM_SIMD=ON \
  -DWHISPER_BUILD_TESTS=OFF \
  -DWHISPER_BUILD_EXAMPLES=OFF

cmake --build build-em --target whisper -j"$(nproc)"

###########################################
#  Copy JS artifacts into the web app     #
###########################################

DEST="${GITHUB_WORKSPACE:-$PROJECT_ROOT}/public/wasm"
mkdir -p "$DEST"
cp build-em/bin/whisper*.js   "$DEST"/
cp build-em/bin/whisper*.wasm "$DEST"/ 2>/dev/null || true

# sanity log
echo "Copied WASM bundle:"
ls -lh "$DEST"

# Also copy into the app's public folder for local builds
APP_DEST="$PROJECT_ROOT/app/public/wasm"
mkdir -p "$APP_DEST"
cp build-em/bin/whisper*.js   "$APP_DEST"/
cp build-em/bin/whisper*.wasm "$APP_DEST"/ 2>/dev/null || true

# Copy license
LICENSE_DEST="$PROJECT_ROOT/third_party"
mkdir -p "$LICENSE_DEST"
cp LICENSE "$LICENSE_DEST/LICENSE-whisper-cpp"
