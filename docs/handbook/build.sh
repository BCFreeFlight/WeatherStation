#!/usr/bin/env bash
#
# Builds the printable field handbook PDF from handbook.template.html.
#
# The template contains a WIRING_IMG placeholder, which is replaced with a
# base64 data URI of docs/wiring_diagram.png so the rendered page is fully
# self-contained. Headless Chrome then prints it to PDF.
#
# Usage: docs/handbook/build.sh
#
set -euo pipefail

here="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
docs="$(dirname "$here")"

template="$here/handbook.template.html"
diagram="$docs/wiring_diagram.png"
output="$docs/WeatherStation-Field-Handbook.pdf"

for f in "$template" "$diagram"; do
  [[ -f "$f" ]] || { echo "missing: $f" >&2; exit 1; }
done

chrome=""
for candidate in \
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" \
  "$(command -v google-chrome || true)" \
  "$(command -v chromium || true)"; do
  [[ -n "$candidate" && -x "$candidate" ]] && { chrome="$candidate"; break; }
done
[[ -n "$chrome" ]] || { echo "Chrome or Chromium is required to render the PDF." >&2; exit 1; }

work="$(mktemp -d)"
trap 'rm -rf "$work"' EXIT

python3 - "$template" "$diagram" "$work/handbook.html" <<'PY'
import base64, sys
template, diagram, out = sys.argv[1:4]
data = base64.b64encode(open(diagram, 'rb').read()).decode()
html = open(template).read().replace('WIRING_IMG', 'data:image/png;base64,' + data)
open(out, 'w').write(html)
PY

"$chrome" --headless --disable-gpu --no-pdf-header-footer \
  --print-to-pdf="$output" "file://$work/handbook.html" >/dev/null 2>&1

echo "wrote $output"
