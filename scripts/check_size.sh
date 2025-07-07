#!/usr/bin/env bash
set -e
MAX=8000000
for f in $(git ls-files -z | xargs -0 stat -c '%n:%s'); do
  size=${f##*:}
  file=${f%:*}
  if [[ $size -gt $MAX ]]; then
    echo "Error: $file exceeds ${MAX} bytes" >&2
    exit 1
  fi
done
