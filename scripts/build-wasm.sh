#!/usr/bin/env bash
set -eux

SCRIPT_DIR=$(cd "$(dirname "$0")" && pwd)
PROJECT_ROOT=$(cd "$SCRIPT_DIR/.." && pwd)
WHISPER_REPO="https://github.com/ggerganov/whisper.cpp"

# Load Emscripten environment
eval "$(emsdk_env.sh)"

git clone --depth 1 "$WHISPER_REPO"
cd whisper.cpp

# Build core static library
cmake -B build-em -DWHISPER_WASM_SINGLE_FILE=ON \
                 -DWHISPER_BUILD_TESTS=OFF \
                 -DWHISPER_BUILD_EXAMPLES=OFF
cmake --build build-em -j"$(nproc)"

# Build JavaScript bindings
cd bindings/javascript
make clean
make singlefile

DEST="${GITHUB_WORKSPACE:-$PROJECT_ROOT}/public/wasm"
mkdir -p "$DEST"
cp whisper.js "$DEST/"

# Copy license
LICENSE_DEST="$PROJECT_ROOT/third_party"
mkdir -p "$LICENSE_DEST"
cp ../../LICENSE "$LICENSE_DEST/LICENSE-whisper-cpp"
