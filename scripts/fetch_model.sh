set -e
MODEL_URL="https://huggingface.co/ggerganov/whisper.cpp/resolve/main/ggml-tiny-ru.bin"
OUTPUT=ggml-tiny-ru.bin
curl -L -o "$OUTPUT" "$MODEL_URL"
