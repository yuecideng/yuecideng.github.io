#!/usr/bin/env bash
set -euo pipefail

PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

# MacTeX does not always add its binaries to non-interactive shells.
if ! command -v xelatex >/dev/null 2>&1 && [[ -x /Library/TeX/texbin/xelatex ]]; then
  export PATH="/Library/TeX/texbin:$PATH"
fi
if ! command -v xelatex >/dev/null 2>&1; then
  echo "XeLaTeX is required. Install TeX Live or MacTeX, then run this script again." >&2
  exit 1
fi

cd "$PROJECT_ROOT/resume"
mkdir -p build
# A second pass resolves PDF links and document metadata.
for pass in 1 2; do
  xelatex -no-shell-escape -interaction=nonstopmode -halt-on-error \
    -file-line-error -output-directory=build main.tex
done

cp build/main.pdf "$PROJECT_ROOT/files/cv.pdf"
echo "Built $PROJECT_ROOT/files/cv.pdf"
