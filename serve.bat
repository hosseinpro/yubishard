@echo off
REM Serves this folder at http://localhost:8000/ and opens it in Chrome.
REM
REM YubiShard needs a real origin: WebAuthn derives its relying-party ID from
REM the page's hostname, and a file:// URL has none, so credentials cannot be
REM created or read from a double-clicked file. localhost is the exception.
cd /d "%~dp0"

REM Probe by running it: Windows 11 ships a WindowsApps stub that satisfies
REM "where python" but only prints a Microsoft Store message when invoked.
python -V >nul 2>nul
if errorlevel 1 (
  echo Python not found. Install Python 3 from python.org, then run this again.
  pause
  exit /b 1
)

set PORT=8000

start "" chrome "http://localhost:%PORT%/"
echo Serving %CD% at http://localhost:%PORT%/   (Ctrl+C to stop)

REM --bind localhost, not 127.0.0.1: Python 3.8+ resolves the name through
REM getaddrinfo and binds the matching address family. It also stays off the LAN.
python -m http.server %PORT% --bind localhost
pause
