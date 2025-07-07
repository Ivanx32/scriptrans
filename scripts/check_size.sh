#!/usr/bin/env bash
set -e
MAX=10000000
FILE="app/public/wasm/whisper.js"

if [ -f "$FILE" ]; then
  SIZE=$(gzip -c "$FILE" | wc -c)
  if [[ $SIZE -gt $MAX ]]; then
    echo "Error: $FILE (gzip) exceeds ${MAX} bytes" >&2
    exit 1
  fi
fi
