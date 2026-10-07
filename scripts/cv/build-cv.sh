#!/usr/bin/env sh
# scripts/cv/cv.html dosyasını public/cv/Melih-Dikmen-CV.pdf olarak basar (headless Chrome).
set -e
cd "$(dirname "$0")/../.."
CHROME="${CHROME:-/Applications/Google Chrome.app/Contents/MacOS/Google Chrome}"
"$CHROME" --headless=new --disable-gpu --no-pdf-header-footer --virtual-time-budget=6000 \
  --print-to-pdf="$PWD/public/cv/Melih-Dikmen-CV.pdf" "file://$PWD/scripts/cv/cv.html" 2>/dev/null
echo "✓ public/cv/Melih-Dikmen-CV.pdf"
