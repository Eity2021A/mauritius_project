#!/usr/bin/env bash
# Pre-warm Supabase Image Transformations by requesting each image at 3 sizes.
# Each unique (filename × size) counts as one transform if not already cached.
#
# Usage: bash scripts/warm-images.sh
#
# Output: warm-results.log with per-request status codes

BASE="https://wpktirmzveoovxjqbqpq.supabase.co/storage/v1/render/image/public/images"
SIZES=(400 800 1200)
LOG="warm-results.log"
OK=0
FAIL=0
TOTAL=0

> "$LOG"

while IFS= read -r filename; do
  [[ -z "$filename" ]] && continue
  for w in "${SIZES[@]}"; do
    url="${BASE}/${filename}?width=${w}&quality=75&format=origin"
    status=$(curl -s -o /dev/null -w "%{http_code}" --max-time 15 "$url")
    TOTAL=$((TOTAL + 1))
    if [[ "$status" == "200" ]]; then
      OK=$((OK + 1))
      echo "OK  $status  ${w}px  $filename" >> "$LOG"
    else
      FAIL=$((FAIL + 1))
      echo "FAIL $status  ${w}px  $filename" >> "$LOG"
      echo "FAIL $status  ${w}px  $filename"
    fi
  done
done < scripts/all-images.txt

echo ""
echo "===== SUMMARY ====="
echo "Total requests: $TOTAL"
echo "Success (200):  $OK"
echo "Failed:         $FAIL"
echo "Details in:     $LOG"
