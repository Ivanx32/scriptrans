set -euo pipefail

SCRIPT_DIR=$(cd "$(dirname "$0")" && pwd)
PROJECT_ROOT=$(cd "$SCRIPT_DIR/.." && pwd)
WHISPER_REPO="https://github.com/ggerganov/whisper.cpp"

# Ensure Emscripten is active
if [ -f "$HOME/emsdk/emsdk_env.sh" ]; then
  # shellcheck disable=SC1090
  source "$HOME/emsdk/emsdk_env.sh"
fi

if [ ! -d whisper.cpp ]; then
  git clone --depth=1 "$WHISPER_REPO"
fi

mkdir -p whisper.cpp/build
cd whisper.cpp/build

emcmake cmake .. \
  -DWHISPER_WASM=ON \
  -DWHISPER_WASM_SIMD=ON \
  -DWHISPER_WASM_THREADS=OFF \
  -DWHISPER_WASM_SINGLE_FILE=ON \
  -DWHISPER_BUILD_TESTS=OFF \
  -DWHISPER_BUILD_EXAMPLES=OFF

emmake make -j"$(nproc)"

DEST="${GITHUB_WORKSPACE:-$PROJECT_ROOT}/public/wasm"
mkdir -p "$DEST"
cp whisper.wasm whisper.js "$DEST/"

# Copy license
LICENSE_DEST="$PROJECT_ROOT/third_party"
mkdir -p "$LICENSE_DEST"
cp ../LICENSE "$LICENSE_DEST/LICENSE-whisper-cpp"
