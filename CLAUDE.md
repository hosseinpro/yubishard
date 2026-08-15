# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

YubiShard splits a wallet recovery phrase into SLIP-39 shares and stores each share on a separate
YubiKey using the WebAuthn largeBlob extension.

Three hand-written files, no dependencies, no framework, no build step:

| | |
|---|---|
| `index.html` | markup for every screen, plus the `<template>` rows |
| `styles.css` | all styling |
| `app.js` | wordlists, crypto, WebAuthn, state, render, actions, wiring — in that order |

`serve.command` and `serve.bat` only exist to put them behind an origin. They are plain `<link>` and
`<script src>` references — nothing bundles or transforms them, so what ships is what you edit.

## Running it

**`file://` does not work and cannot be made to work.** WebAuthn derives its relying-party ID from
the page's hostname, and a `file://` URL has none, so `navigator.credentials.create()` throws a
`SecurityError` before any extension is considered. Note this is *not* a secure-context problem —
`file://` is a secure context and `crypto.subtle` works there. It is the missing hostname.

```
./serve.command          # macOS
serve.bat                # Windows
python3 -m http.server 8000 --bind localhost    # by hand
```

**Confirm which build you are testing before concluding anything.** `http.server` sends
`Last-Modified`, so an edited `app.js` revalidates and a plain refresh picks it up — but automated
browser tooling in particular will happily hold an in-memory copy across a navigation. Mistaking a
stale script for a failed fix once cost several rounds: a correct diagnosis was abandoned and
replaced with a wrong one, because "the fix did not work" and "the fix did not load" look identical
from outside. Before deciding a change had no effect, check that a string you just wrote is present
in the running code — `/some new string/.test(someFunction.toString())` — or hard-reload with
Cmd/Ctrl+Shift+R.

Then open `http://localhost:8000/`. Use the hostname `localhost`, never `127.0.0.1` — a bare IP is
never a valid RP ID. The port is not part of the RP ID, so it can change freely.

Chrome only. macOS or Windows 11. YubiKey firmware 5.7+ in practice — see the firmware note under
WebAuthn largeBlob for why 5.5 is the wrong number to quote.

## Verification

There is no test suite in the repo; the checks are reproducible from the official vectors.

**Crypto layer** — the fastest loop is Node, which exposes the same WebCrypto API as the browser.
Concatenate the wordlists, the crypto core and a test file, then run it. All 45 vectors from
`trezor/python-shamir-mnemonic/vectors.json` must pass, along with RIPEMD-160, BIP-32 test vectors 1
and 2, and the BIP-39 English vectors. Node is a development convenience only — it is not a runtime
dependency, and the shipped tool never needs it.

**Cross-tool** — generate shares here and have Trezor's `shamir-mnemonic` Python package combine
them. This checks the encoder against an independent decoder, which the vectors alone do not.

**In the browser** — serve the page and drive it from the console or via Chrome MCP. Headless Chrome
with `--virtual-time-budget` is a poor fit: virtual time does not wait for real PBKDF2 and secp256k1
work, and the run hangs or dumps early. Serving on localhost and evaluating in the page is both
faster and closer to the real environment.

**Hardware** — writing to and reading from a real YubiKey, and restoring a generated 20-word set on
a Trezor, cannot be automated here.

## Structure

`app.js` is ordered: wordlists, crypto primitives, SLIP-39, BIP-39, WebAuthn, state, DOM helpers,
render, actions, wiring. It is loaded at the end of `<body>`, so the DOM and the `<template>`
elements it reads exist by the time it runs — there is no `DOMContentLoaded` guard and none is
needed.

Every screen exists in the DOM at all times and is toggled with `hidden`. Navigation is two-axis —
`state.view` (`'home' | 'backup' | 'restore'`) and `state.step` — resolved in `showPanels()`.

## Conventions that matter

**State is one flat object.** `setState(patch)` merges and calls `render()`. `render()` writes to the
DOM rather than returning anything; it dispatches to one `renderX()` per panel.

**Style state lives in CSS, not JS.** Status colors are modifier classes (`.step.is-done`,
`.row.is-active`, `.status.ok`, `.chip.is-on`, `.viz.is-needed`, `.hint.err`, `.words-out.is-hidden`,
`.env-note.is-blocked`). Do not compute color strings in JS and interpolate them into `style`
attributes — that was the previous design and it is what made the file unreadable.

**`syncList(container, tplId, count, update)`** grows or shrinks a list to `count` by appending or
removing tail nodes, then updates each child in place. Surviving nodes are never replaced. This is
what lets a full re-render happen on every keystroke without destroying focus — do not swap it for an
`innerHTML` rewrite.

**Inputs are uncontrolled.** `setVal()` writes to a field only when it is not `document.activeElement`
and the value actually differs. Assigning `.value` to a focused input resets the caret, so any new
field must go through `setVal()`. Programmatic fills (paste, demo, wipe, word-count switch) are the
deliberate exception.

**Events are delegated.** One `click`/`input`/`paste` listener on `document` dispatches through the
`CLICKS` and `INPUTS` maps, keyed by `data-act`. Row index comes from `closest('[data-i]')`, which
`syncList` stamps. To add a control: add `data-act="name"` in the markup and a handler in the
matching map.

**The crypto path is async, the render path is not.** WebCrypto returns promises, so results reach
the DOM through `setState` in a `.then()`, never by awaiting inside `render()`. `refreshSeed()` guards
against out-of-order results with a monotonic `seedToken` — an older keystroke's fingerprint must not
overwrite a newer one's.

**Two `.banner`-ish classes exist and they are different.** `.banner` is the pre-existing download
strip above the header; `.env-note` is the origin/environment notice. They were briefly the same
class and the styles collided.

## Crypto layer

This is a real SLIP-39 implementation, validated against all 45 official vectors and cross-checked
against Trezor's `shamir-mnemonic`.

- **WebCrypto does the hashing.** SHA-256, SHA-512, HMAC and PBKDF2 all come from `crypto.subtle`.
  Both supported origins are secure contexts, so it is always available.
- **RIPEMD-160 and secp256k1 are hand-written** because WebCrypto has neither. They exist only to
  compute the BIP-32 master fingerprint: `RIPEMD160(SHA256(compressed pubkey of m))[0..4]`.
  secp256k1 uses Jacobian coordinates so a scalar multiply costs one modular inverse, not 256.
- **GF(256)** is generated by 3 (`poly = (poly << 1) ^ poly`) and reduced by `0x11b`, matching
  SLIP-39. `interpolate()` evaluates at an arbitrary x because SLIP-39 needs x = 255 for the secret
  and x = 254 for the digest share.
- **Shares use extendable mode**, so the encryption salt is empty and no identifier has to travel
  alongside a share to decrypt it.
- **The emitted SLIP-39 passphrase is always empty.** That is what keeps shares restorable on a
  Trezor, which never asks for one. The passphrase field on the seed screen applies to the *input*,
  not the output.

### Gotchas that cost time

- The **extendable flag sits at shift 4 of the second word**, not shift 5. It selects the checksum's
  customization string (`shamir` vs `shamir_extendable`), so it must be read *before* the checksum
  can be verified. Getting this off by one makes roughly half the vectors fail with a checksum error.
- JS `%` keeps the sign of the dividend. Every `mod 255` in the GF(256) interpolation needs
  `((v % 255) + 255) % 255`.
- Padding in a decoded share is `(valueWords * 10) % 16`, and those bits must be zero. Several
  official vectors exist purely to catch an implementation that skips this check.

### The BIP-39 asymmetry

BIP-39 and SLIP-39 reach the BIP-32 seed by different routes, and this drives most of the UI copy:

- **20-word input** is a SLIP-39 mnemonic. Its master secret *is* the BIP-32 seed, so re-splitting is
  lossless and a Trezor restores the same wallet.
- **12/24-word input** is BIP-39. The shares carry the *entropy*; the seed is
  `PBKDF2-HMAC-SHA512(words, "mnemonic" + passphrase, 2048)`. Feeding those shares to a SLIP-39
  wallet yields a different wallet silently. The fingerprint display is the mitigation, and the
  restore path re-encodes entropy back to BIP-39 words using the `of` field in the blob record.

A BIP-39 passphrase does not affect the entropy, so it is not captured in the shares. It only changes
the fingerprint.

## WebAuthn largeBlob

- **RP ID is `location.hostname`.** A credential is permanently bound to it. A key enrolled at
  `localhost` is unreadable at `yubishard.com` and vice versa, and a wrong-origin key is
  indistinguishable from a blank one — hence the wording of the read error.
- **Writing is two ceremonies.** `create()` registers a discoverable credential with
  `largeBlob: { support: 'required' }`; the blob is then written by a follow-up `get()` with
  `largeBlob: { write: bytes }`, because WebAuthn only writes during an assertion. That is why the
  key asks for PIN and touch twice.
- **A stale virtual authenticator will send you chasing ghosts.** Chrome's DevTools authenticator
  accumulates a credential per attempt, and once it holds several for one origin the read-back
  returns the wrong one — which looks exactly like a failed write, and led to a two-press UI and a
  `written: false` theory that were both wrong. Clear all credentials before drawing any conclusion
  about the write path.
- **A read and a write cannot share one user press.** A discoverable-credential `get()` leaves
  Chrome holding a PIN token without the large-blob-write permission, so anything chained behind it
  in that press gets `written: false` — confirmed on both a cluttered and a clean authenticator. A
  new press gets a fresh token. Hence the flow: press one is `existingShareOnKey()`, press two is
  `create()` + `writeBlob()`. Those last two must stay together; that pairing is the one known to
  work. `state.checkedFor` carries the result between presses.
- **A page cannot delete a credential, and cannot open Chrome's settings either.** WebAuthn has no
  delete; that needs `chrome://settings/securityKeys`. And Chrome blocks web
  content from navigating to `chrome://` at all — `window.open` returns null, an anchor click and a
  `location.href` assignment are both silently ignored, all three verified. So the UI can only offer
  the address to copy. Overwriting the blob instead was tried and rejected: it destroys the share
  but leaves the credential occupying a resident slot, which is a half-measure.
- **The credential id comes from the assertion.** `existingShareOnKey()` returns `assertion.rawId`
  alongside the record. Nothing needs it right now, but it is the only way to obtain one.
- **`excludeCredentials` is a backstop, not the check.** It only knows credentials made since the
  page loaded, and Chrome's DevTools virtual authenticator ignores it outright — which is why
  duplicate writes appeared to be allowed there even though the code was correct.
- **Reuse `pendingCred` on retry, never call `create()` again.** Each registration burns a resident
  slot (25 before firmware 5.7, 100 after), and once a key holds several credentials for one origin
  Chrome shows an account picker on every read, which breaks the restore flow.
- **Always check `getClientExtensionResults().largeBlob.supported`** after create. A key without
  largeBlob otherwise looks like it worked.
- **`written` is not trustworthy on its own.** Chrome's DevTools virtual authenticator stores the
  blob and still reports `written: false`. Taking the flag at face value made a working write look
  broken. So a `written !== true` result is not fatal on its own — `confirmBlob()` reads the blob
  back off that credential and compares it byte for byte, and only a failed comparison is an error.
  The extra ceremony only happens on the path that would have failed anyway.
- **Firmware: quote 5.7+, not 5.5+.** The extension did arrive in 5.5, but 5.5.x and 5.6.x shipped
  only on the Bio Series — the mainline 5 Series (5 NFC, 5C NFC, 5 Nano) went 5.4.3 straight to 5.7,
  which reached retail 2024-05-21. So for the keys anyone actually buys for this, 5.7 is the floor
  and "5.5+" sends people to Amazon for stock that cannot work. Blob capacity is 1024 bytes on
  5.5.x/5.6.x and 4096 on 5.7+; the 900-byte record fits either. Firmware is fixed at manufacture
  and cannot be upgraded, so a key below the floor is only ever replaced.
- **`ykman fido info` does not list extensions.** It prints AAGUID, PIN retries and minimum PIN
  length, nothing more — it cannot confirm largeBlob. Use `ykman info` for the firmware version, or
  read `Ctap2(dev).info.extensions` via python-fido2 for the extension itself.
- **The PIN is not optional and cannot be set from the page.** largeBlob needs a discoverable
  credential, YubiKey will not expose those without a PIN, and Chrome escalates credProtect to
  `userVerificationRequired` anyway. Chrome prompts the user to create one if the key has none.
- **The record** is JSON: `{ v, share, of, rp, n, m, i, label, fp, created }`. `of` and `fp` are what
  let a restore render the right encoding and show the fingerprint that was recorded at backup.
  Budget is ~960 bytes; the code caps at 900.

Known accepted risk, decided deliberately: Yubico states largeBlob "is not meant to be used to store
sensitive data" because the per-credential blob key crosses the wire in the clear. `hmac-secret`/PRF
would avoid that but was rejected in favour of keeping the share on the key itself. Do not quietly
switch this without raising it.

## Origin caveats already handled

- `navigator.clipboard` may be missing or reject on some origins; `copyText()` falls back to a hidden
  textarea plus `execCommand('copy')` and only reports "Copied" on success.
- `envReport()` gates the app: `file://`, a non-secure context, a bare IP hostname, and non-Chromium
  browsers each get a specific explanation rather than a raw `SecurityError` later.
- The download strip above the header is hidden when already on `localhost`.
