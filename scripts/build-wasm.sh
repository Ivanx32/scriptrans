set -e
SCRIPT_DIR=$(cd "$(dirname "$0")" && pwd)
PROJECT_ROOT=$(cd "$SCRIPT_DIR/.." && pwd)
WHISPER_REPO="https://github.com/ggerganov/whisper.cpp"
if [ ! -d whisper.cpp ]; then
  git clone --depth=1 $WHISPER_REPO
fi
mkdir -p whisper.cpp/build
cd whisper.cpp/build
cmake .. \
  -DWHISPER_WASM_SIMD=ON \
  -DWHISPER_WASM_THREADS=OFF \
  -DWHISPER_WASM_SINGLE_FILE=ON
make -j$(nproc)
mkdir -p "$PROJECT_ROOT/public/wasm"
cp whisper.wasm whisper.js "$PROJECT_ROOT/public/wasm/"
