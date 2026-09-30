#!/usr/bin/env bash
set -euo pipefail
mkdir -p evidence
# Se captura antes de que android-emulator-runner detenga el emulador.
trap 'adb logcat -d > evidence/logcat.txt 2>&1 || true' EXIT
adb devices -l
if [ "${GITHUB_EVENT_NAME:-}" = "pull_request" ]; then
  npm run test:smoke
else
  npm test
fi
