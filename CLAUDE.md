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

**Do not add comments to the code.** No block headers, no explanatory comments, no inline notes —
write code that reads without them. Anything that genuinely needs explaining belongs in this file or
in README.md, where it will still be found years from now by someone who is not reading the source.
This applies to new code and to code you are editing.

**State is one flat object.** `setState(patch)` merges and calls `render()`. `render()` writes to the
DOM rather than returning anything; it dispatches to one `renderX()` per panel.

**Style state lives in CSS, not JS.** Status colors are modifier classes (`.step.is-done`,
`.row.is-active`, `.status.ok`, `.chip.is-on`, `.viz.is-needed`, `.result.err`,
`.words-out.is-hidden`). Do not compute color strings in JS and interpolate them into `style`
attributes — that was the previous design and it is what made the file unreadable.

**A visual toggle that is also a state must carry ARIA.** `.is-on` is paint; a screen reader sees
nothing in it. The word-count and passphrase chips are toggle buttons, so `setOn()` sets
`aria-pressed` alongside the class and every chip ships with `aria-pressed="false"` in the markup.
Any new chip goes through `setOn()` — never `classList.toggle('is-on', …)` on its own.

**Three CSS rules deliberately cross section boundaries.** `styles.css` is otherwise organised by
screen, but these are one component appearing in two of them, and splitting them back apart is how
the duplication returns:

- `.step-dot, .row-dot` — the numbered circle in the stepper and the one on a share row. Only the
  size and the row's mono digits differ, so the `.is-done` / `.is-active` colouring is shared as
  well. Both live in the *flow shell* section; `.row-dot` carries only its size override.
- `.wordgrid, .words-out` — phrase entry and the restored phrase are the same 3-or-4 column grid,
  and so are their `.cols-4` variants. Only the entry one is boxed.
- `.viz` sets `color` so its `<span>` inherits it, which is what lets `.viz.is-needed` recolour the
  label without a second rule. `.viz i` paints from `background`, never `currentColor`.

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
strip above the header; `.env-warn` is the origin/environment notice. They were briefly the same
class and the styles collided.

## Markup

`index.html` carries no comments at all — not even section headers. The panels are in flow order and
each opens with its `<h2 class="title">`, which is the whole map. What used to sit in comments is
below.

**Every list is a real list.** `#stepper` is an `<ol>`; `.rows` and `.done-grid` are `<ul>`s; the
matching templates' root elements are `<li>`. `syncList()` clones `tpl.content.firstElementChild`, so
a template's root element type is load-bearing — changing a `<li>` back to a `<div>` silently
produces invalid list markup. The two word grids are *not* lists: `.word-n` already carries the
ordinal as content, so list semantics would announce every word twice.

**Two `<main>` elements, and that is valid.** `#home` and `#flow` are both `<main>`, which conforms
only because `showPanels()` guarantees exactly one of them is un-`hidden` at any time. That
invariant is the thing to preserve; do not "fix" it by wrapping them.

**Accessible names that markup alone cannot give.** A word cell's `<label>` would otherwise be named
just `"7"`, so `tpl-word` opens with an `.sr-only` `"Word"`. `.brand-mark` is `aria-hidden` so the
header button is named `"YubiShard"` and not `"YS YubiShard"`. `#viz` is `aria-hidden` entirely — it
is a picture of the sentence printed directly beneath it.

**`#env-banner` is deliberately not a live region.** `renderEnv()` reassigns its `innerHTML` on every
render, so an `aria-live` on it would re-announce the origin warning on every keystroke. The error
lines that *are* live (`#seed-err`, `#read-err`, `.f-err`, `#verify-msg`) all go through `setText()`,
which writes only on change.

**A button that can be busy is one shape.** `.btn` containing `.spinner[hidden]` + `.btn-label` —
the verify and collect buttons and the write-row button all use it. The two read buttons are driven
by `renderReadButton()`; the write button has its own text logic in `renderWrite()` but shares the
classes. A new busy-capable button should reuse this shape, not mint fresh ids for its spinner and
label.

**The `chrome://` address is text with a copy button, never a link.** Chrome blocks a page from
navigating to a `chrome://` URL, so a link there is dead on arrival. `.addr-inline` sits inline so it
reads as the end of the sentence above it.

**`#decrypt-pass-wrap` is shown only for 20-word input.** There the passphrase decrypts the mnemonic
being entered; for 12/24 words the passphrase question is a flag and nothing more. `#restored-pass`
is the other half of that: without the notice, a passphrase wallet restores to an empty balance and
looks like a failed recovery.

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
- **Never do a discoverable-credential read before a write. Three separate failures came from it.**
  A `get()` with an empty `allowCredentials` looks like the obvious way to ask "does this key
  already hold a share", and it fails three ways: chained into the same press it makes the write
  return `written: false`; split into its own press it still costs an extra ceremony; and on real
  hardware it raises a Chrome error and leaves the YubiKey unresponsive until it is physically
  re-inserted. The virtual authenticator hides the last one entirely. There is no cross-session
  duplicate check as a result.
- **`excludeCredentials` is the only duplicate check.** It covers reuse within one page load, which
  is the realistic mistake, and costs no extra ceremony. It cannot see across a reload. Chrome's
  DevTools virtual authenticator ignores it, so this can only be tested on hardware — where a
  refusal surfaces as `InvalidStateError` and the UI offers the settings address for deleting the
  credential.
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
- **The record's field names live in README.md** under "What is stored on each key", not in a
  comment here — it is user-facing documentation, and someone recovering a key years from now will
  have the README, not the source. `toBlobRecord()` and `fromBlobRecord()` are the only places those
  verbose names appear; the rest of the app uses short internal names. Keep the translation in one
  place.
- **One fingerprint, and the passphrase is only a flag.** `bip32-fingerprint` is always derived
  with an *empty* passphrase, so a restore can always recompute and check it — which is why there is
  no second fingerprint field. A wallet passphrase is recorded as `passphrase-protected: true` and
  nothing more: never asked for, never used in any derivation, never stored. Keeping it out is what
  makes it a second factor that stolen keys cannot defeat, and it is the one thing no quorum can
  recover. Consequence to keep in the copy: for a passphrase-protected wallet the stored fingerprint
  is *not* what the user's wallet will show.
- **Do not offer to "remove" a passphrase.** The only way is to split the 512-bit seed instead of
  the entropy. It works — 59-word shares, recovers without the passphrase — but Trezor's on-device
  recovery accepts 20/33 words only, restore can no longer return BIP-39 words, and the second
  factor is gone. Rejected deliberately.
- `navigator.clipboard` may be missing or reject on some origins; `copyText()` falls back to a hidden
  textarea plus `execCommand('copy')` and only reports "Copied" on success.
- `envReport()` gates the app: `file://`, a non-secure context, a bare IP hostname, and non-Chromium
  browsers each get a specific explanation rather than a raw `SecurityError` later.
- The download strip above the header is hidden when already on `localhost`.
