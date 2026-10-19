#!/usr/bin/env bash
set -euo pipefail
PIDS="$(lsof -ti tcp:6012 || true)"
if [ -z "$PIDS" ]; then
  echo "eLarium n'est pas lancé sur le port 6012."
  exit 0
fi
kill $PIDS
echo "Serveur eLarium arrêté (port 6012)."
