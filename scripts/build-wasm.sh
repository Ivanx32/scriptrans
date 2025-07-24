#!/usr/bin/env bash
set -eux

SCRIPT_DIR=$(cd "$(dirname "$0")" && pwd)
PROJECT_ROOT=$(cd "$SCRIPT_DIR/.." && pwd)
# Use actively maintained repository
WHISPER_REPO="https://github.com/ggml-org/whisper.cpp"

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
  -DWHISPER_BUILD_TESTS=OFF \
  -DWHISPER_BUILD_EXAMPLES=ON \
  -DCMAKE_BUILD_TYPE=Release

# Build all targets. libmain.js/wasm will be placed in build/bin/
cmake --build build --config Release -j"$(nproc)"

# copy artifacts into static assets
mkdir -p "$PROJECT_ROOT/public/wasm"
# Rename libmain.js -> whisper-web.js (and single variant)
if [ -f build/bin/libmain.js ]; then
  cp build/bin/libmain.js "$PROJECT_ROOT/public/wasm/whisper-web.js"
  cp build/bin/libmain.js "$PROJECT_ROOT/public/wasm/whisper-web.single.js"
fi
if [ -f build/bin/libmain.wasm ]; then
  cp build/bin/libmain.wasm "$PROJECT_ROOT/public/wasm/whisper-web.wasm"
fi
if [ -d build/bin/whisper.wasm ]; then
  cp -r build/bin/whisper.wasm/* "$PROJECT_ROOT/public/wasm/"
fi

if [ ! -f "$PROJECT_ROOT/public/wasm/whisper-web.js" ]; then
  echo "::error::WASM artefact not found"; exit 1
fi

###########################################
#  Copy JS artifacts into the web app     #
###########################################

DEST="${GITHUB_WORKSPACE:-$PROJECT_ROOT}/public/wasm"
mkdir -p "$DEST"
if [ -f build/bin/libmain.js ]; then
  cp build/bin/libmain.js "$DEST/whisper-web.js"
  cp build/bin/libmain.js "$DEST/whisper-web.single.js"
fi
if [ -f build/bin/libmain.wasm ]; then
  cp build/bin/libmain.wasm "$DEST/whisper-web.wasm"
fi
if [ -d build/bin/whisper.wasm ]; then
  cp -r build/bin/whisper.wasm/* "$DEST/"
fi

# sanity log
echo "Copied WASM bundle:"
ls -lh "$DEST"

# Also copy into the app's public folder for local builds
APP_DEST="$PROJECT_ROOT/app/public/wasm"
mkdir -p "$APP_DEST"
if [ -f build/bin/libmain.js ]; then
  cp build/bin/libmain.js "$APP_DEST/whisper-web.js"
  cp build/bin/libmain.js "$APP_DEST/whisper-web.single.js"
fi
if [ -f build/bin/libmain.wasm ]; then
  cp build/bin/libmain.wasm "$APP_DEST/whisper-web.wasm"
fi
if [ -d build/bin/whisper.wasm ]; then
  cp -r build/bin/whisper.wasm/* "$APP_DEST/"
fi

# Copy license
LICENSE_DEST="$PROJECT_ROOT/third_party"
mkdir -p "$LICENSE_DEST"
cp LICENSE "$LICENSE_DEST/LICENSE-whisper-cpp"
