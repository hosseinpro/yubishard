# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

YubiShard splits a crypto wallet recovery phrase into Shamir shares, encrypts each with a different YubiKey, and walks the user through storing and restoring them. It is a single-page app with no server, no dependencies to install, and no build step. `index.html` is the entire product.

## Running it

Open `index.html` in a browser (`open index.html` on macOS). It works from `file://` — React and the runtime are embedded in the file, nothing is fetched at load time. There is no test suite, linter, or package manager; verification is manual, by walking both flows in the browser.

## The critical fact about `index.html`

`index.html` is a **generated bundle**, not hand-written source. Its 384 lines are mostly a loader plus base64+gzip blobs. Editing the app means editing a JSON-escaped string on **line 382**, inside `<script type="__bundler/template">` — that one line holds the entire authored page (~700 lines of HTML + JS when unescaped).

Do not try to edit line 382 in place. Unpack it, edit the plain file, repack:

```bash
# unpack -> src.html
python3 -c "
import re,json
s=open('index.html').read()
m=re.search(r'(<script type=\"__bundler/template\">\s*)(\".*?\")(\s*</script>)', s, re.S)
open('src.html','w').write(json.loads(m.group(2)))"

# ... edit src.html ...

# repack src.html -> index.html
python3 -c "
import re,json
s=open('index.html').read(); src=open('src.html').read()
m=re.search(r'(<script type=\"__bundler/template\">\s*)(\".*?\")(\s*</script>)', s, re.S)
open('index.html','w').write(s[:m.start(2)] + json.dumps(src,ensure_ascii=False).replace('</','<\\\\u002F') + s[m.end(2):])"
```

`ensure_ascii=False` and the `</` → `</` escape both matter — without them the repack is not byte-identical to the original encoding, and an unescaped `</script>` inside the string would terminate the tag early. Round-tripping with no edits must produce an unchanged `index.html`; check that before trusting an edit.

The other two blobs in the file are the `dc-runtime` bundle and React 18 UMD, stored gzip+base64 in `<script type="__bundler/manifest">` and decoded to blob URLs at boot. Leave them alone. The runtime is generated from a `dc-runtime` project that is **not in this repo**, so it cannot be rebuilt here.

## Architecture of the app source

The unpacked source is a `dc-runtime` document: a `<x-dc>` template plus a `<script type="text/x-dc" data-dc-script>` holding one `class Component extends DCLogic`.

Template syntax is not JSX and not plain HTML:
- `{{ name }}` interpolates a value — usable in text and in attribute values, including inside inline `style` strings (colors and paddings are computed in JS and interpolated).
- `<sc-if value="{{ flag }}">` conditionally renders; `<sc-for list="{{ rows }}" as="r">` iterates, with `{{ r.field }}` inside.
- Event handlers are `sc-camel-on-click="{{ handler }}"` — the `sc-camel-` prefix maps to the camelCase React prop (`onClick`, `onChange`, `onPaste`).

`Component` holds all state in a single flat `state` object and exposes everything the template needs from one `renderVals()` method, which returns a flat bag of primitives, precomputed style strings, row arrays, and closures. There are no subcomponents. Adding UI means adding keys to that returned object and referencing them in the template — keep the two in sync, since a missing key renders as an empty placeholder rather than an error.

Navigation is a two-axis state machine: `state.view` is `'home' | 'backup' | 'restore'`, and `state.step` indexes the stage within a flow. The template gates each stage on a derived boolean (`bSeed`, `bSplit`, `bEnc`, `bVerify`, `bDone` for backup; `rCollect`, `rUnlock`, `rDone` for restore). The sidebar stepper is built from `backupSteps`/`restoreSteps` in `renderVals()`.

Progress through the per-share loops is implicit rather than stored: the active share index is `state.sealed.length` when encrypting and `state.rParts.length` when unlocking, so a row is "done" if its index is below that and "active" if equal. Both flows share `state.busy` for the fake YubiKey wait.

## Crypto layer

Top of the script, above the component:

- `EXP`/`LOG` tables and `mul`/`div` implement GF(256) arithmetic; `splitBytes(bytes, n, m)` and `combineShares(shares)` are Shamir's Secret Sharing over that field, applied byte-wise.
- The secret is the 4-byte magic `YS1\0` (`MAGIC`) followed by the UTF-8 phrase. Recombination checks the magic to detect a wrong passphrase or a corrupted share before trying to decode the phrase.
- Wire format is `YS1.<threshold>.<base64 label>.<base64 ciphertext>`, produced by `sealShare` and parsed by `openShare`. The threshold is embedded so the restore flow can read `m` from the first pasted share. Base64 padding is stripped from the label and re-added on parse.
- `fnv()` is FNV-1a, used both for the user-facing seed fingerprint and as the keystream seed.

**The YubiKey integration and the encryption are currently simulated.** There is no WebAuthn, no HMAC-SHA1 challenge–response, no AES-GCM and no Argon2id, despite what the footer claims. `sealShare` XORs against an xorshift32 keystream seeded by `fnv('yubishard|' + label + '|' + pass)`, and the "Touch your YubiKey…" state is a 900ms `setTimeout`. `splitBytes` also draws its polynomial coefficients from `Math.random()` rather than `crypto.getRandomValues`. Treat the current shares as offering no confidentiality — this is a working UX prototype of the flow, not a usable backup tool. When touching this layer, be explicit with the user about whether a change is meant to preserve the mock or begin replacing it with real crypto.
