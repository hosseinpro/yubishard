# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

YubiShard splits a wallet recovery phrase into Shamir shares, seals each one, and walks the user through storing and restoring them. `index.html` is the entire product: one hand-written file, no dependencies, no framework, no build step.

## Running it

Open `index.html` in a browser (`open index.html`). It works from `file://` — everything is inline and the page makes zero network requests. There is no package manager, test suite, or linter; verification is manual.

To drive it headlessly (useful for regression checks), append a script to a **copy** of the file that clicks through the flow and writes results into `document.title`, then:

```bash
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless=new --disable-gpu \
  --user-data-dir=/tmp/cp --virtual-time-budget=30000 --dump-dom "file:///abs/path/copy.html"
```

`--virtual-time-budget` fast-forwards the 900ms `setTimeout` fakes, so a full backup + restore completes in seconds. Do not add the harness to `index.html` itself.

## Structure

Four sections in one file: inline `<style>`, static markup for every screen, `<template>` elements for repeated rows, one inline `<script>`.

Every screen exists in the DOM at all times and is toggled with `hidden`. Navigation is two-axis — `state.view` (`'home' | 'backup' | 'restore'`) and `state.step` — resolved in `showPanels()`.

## Conventions that matter

**State is one flat object.** `setState(patch)` merges and calls `render()`. `render()` writes to the DOM rather than returning anything; it dispatches to one `renderX()` per panel.

**Style state lives in CSS, not JS.** Status colors are modifier classes (`.step.is-done`, `.row.is-active`, `.status.ok`, `.chip.is-on`, `.viz.is-needed`, `.hint.err`, `.words-out.is-hidden`). Do not compute color strings in JS and interpolate them into `style` attributes — that was the previous design and it is what made the file unreadable.

**`syncList(container, tplId, count, update)`** grows or shrinks a list to `count` by appending/removing tail nodes, then updates each child in place. Surviving nodes are never replaced. This is what lets a full re-render happen on every keystroke without destroying focus — do not swap it for an `innerHTML` rewrite.

**Inputs are uncontrolled.** `setVal()` writes to a field only when it is not `document.activeElement` and the value actually differs. Assigning `.value` to a focused input resets the caret, so any new field must go through `setVal()`. Programmatic fills (paste, demo, wipe, 12↔24 switch) are the deliberate exception.

**Events are delegated.** One `click`/`input`/`paste` listener on `document` dispatches through the `CLICKS` and `INPUTS` maps, keyed by `data-act`. Row index comes from `closest('[data-i]')`, which `syncList` stamps. To add a control: add `data-act="name"` in the markup and a handler in the matching map.

## Crypto layer

`splitBytes` / `combineShares` implement Shamir over GF(256), applied byte-wise. The secret is the 4-byte magic `YS1\0` followed by the UTF-8 phrase; recombination checks that magic to catch a wrong passphrase or an altered share. Wire format is `YS1.<threshold>.<base64 label>.<base64 ciphertext>` — the threshold is embedded so the restore flow can size itself from the first pasted share.

**The YubiKey step and the encryption are simulated.** `sealShare` XORs against an xorshift32 keystream seeded by a 32-bit FNV hash of label+passphrase; the "Touch your YubiKey…" state is a `setTimeout`; `splitBytes` draws coefficients from `Math.random()`. Shares offer no confidentiality, and two shares sealed with the same label and passphrase reuse the keystream. The footer says so on-screen. If you touch this layer, be explicit with the user about whether a change preserves the mock or starts replacing it with real crypto.

Two known gaps, both inherited and both intentional to preserve: the magic check only covers the first 4 bytes, so corruption later in a blob rebuilds a wrong phrase silently (there is no MAC); and a wrong passphrase during restore is only detected after the final share, because `openShare` cannot fail on its own.

The wire format is a compatibility surface — blobs from earlier builds still open. Changing `sealShare`, `openShare`, `fnv`, `stream`, or the magic breaks every share a user has already written down.

## file:// caveats already handled

- `navigator.clipboard` may be missing or reject on some `file://` origins; `copyText()` falls back to a hidden textarea plus `execCommand('copy')` and only reports "Copied" on success.
- `printSheet()` returns `false` when a popup blocker nulls `window.open`, and `tryPrint()` surfaces that in `#print-msg` instead of failing silently.
- `downloadEach` staggers saves by 220ms; browsers drop simultaneous downloads from a single gesture.
