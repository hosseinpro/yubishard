#!/bin/sh
# Serves this folder at http://localhost:8000/ and opens it in Chrome.
#
# YubiShard needs a real origin: WebAuthn derives its relying-party ID from the
# page's hostname, and a file:// URL has none, so credentials cannot be created
# or read from a double-clicked file. localhost is the exception the spec grants.
cd "$(dirname "$0")" || exit 1
PORT=8000

command -v python3 >/dev/null 2>&1 || {
  echo "python3 not found. Install Python 3 from python.org, then run this again."
  read -r _; exit 1
}
[ -d "/Applications/Google Chrome.app" ] || \
  echo "Warning: Chrome not found. The YubiKey step only works in Chrome."

# Give the server a moment to bind before the browser asks for the page.
{ sleep 1; open -a "Google Chrome" "http://localhost:$PORT/" 2>/dev/null; } &

echo "Serving $(pwd) at http://localhost:$PORT/   (Ctrl+C to stop)"

# --bind localhost, not 127.0.0.1: Python 3.8+ resolves the name through
# getaddrinfo and binds the matching address family, so this still works when
# localhost resolves to ::1 first. It also stays off the LAN.
exec python3 -m http.server "$PORT" --bind localhost
