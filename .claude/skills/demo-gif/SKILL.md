---
name: demo-gif
description: Re-record .github/demo.gif — the full 2-of-3 backup flow, from the home page to "Your backup is ready". Temporarily stubs the two WebAuthn ceremonies so no YubiKey is needed, then reverts. Use when the UI changed and the README hero is stale.
---

# Recording the demo GIF

`.github/demo.gif` is the README hero: one pass through a **2-of-3** backup, ending on the
verified done screen. Recording it needs the write and verify steps to succeed, which normally
needs the keys in hand — so the two ceremonies are stubbed for the recording and reverted
afterwards.

Record 2-of-3, not the 3-of-5 default. It is the split the home page diagram already explains,
and it keeps the GIF to three writes and two reads instead of five and three — the middle writes
are repetitive, and every extra frame costs size in a file that is already over a megabyte.

**Never commit the stub.** Check `git diff app.js` is empty before any commit that follows a
recording.

## 1. Stub the ceremonies

`app.js` must be clean first (`git status`), because the revert at the end is
`git checkout -- app.js`. Append this immediately *before* the `/* Environment checks */`
marker — a later function declaration overrides the earlier one, so the real functions above are
left untouched and the diff stays small:

```js
/* TEMPORARY demo stubs — override the two ceremonies above so the flow can be recorded
   without hardware. Not for release: revert with `git checkout -- app.js`. */

const demoBlobs = [];
let demoRead = 0;

async function writeShareToKey(record) {
  await settle(1300);
  demoBlobs.push(fromBlobRecord(toBlobRecord(record)));
  return true;
}

async function readShareFromKey() {
  await settle(1200);
  const rec = demoBlobs[demoRead++];
  if (!rec) throw new Error('No YubiShard share on this key.');
  return rec;
}
```

The round-trip through `toBlobRecord`/`fromBlobRecord` is load-bearing: the verify step compares
each record read back against what was written, so a looser stub fails verification. Everything
else stays real — the SLIP-39 split, the record format, and the `combineMnemonics` behind
"Verified — 2 keys rebuilt your seed" are genuine.

The `settle()` delays exist so the busy states ("Follow the prompts… / PIN and touch") are
visible in the recording. Do not remove them.

Then `node --check app.js`, serve with `python3 -m http.server 8000 --bind localhost`, and after
loading the page confirm the stub is the code actually running — a stale script looks identical
to a broken one:

```js
/demoBlobs/.test(writeShareToKey.toString())
```

## 2. Frame the window

The browser window is fullscreen at 1728×962 CSS px, which leaves the app — a 296px sidebar plus
an 860px stage — with ~570px of dead space on the right, and a footer pinned far below the
content. `resize_window` is silently ignored in that state, and exiting fullscreen with
`cmd+ctrl+f` does not help.

Instead, simulate a 1180px-wide window with CSS, injected *after* the last reload (a navigation
drops it):

```js
const s = document.createElement('style');
s.textContent = '.top,.foot{padding-left:calc((100vw - 1180px)/2 + 24px);'
  + 'padding-right:calc((100vw - 1180px)/2 + 24px)}'
  + '.flow,.home{max-width:1180px;margin-left:auto;margin-right:auto}';
document.head.append(s);
```

Pad `.top`/`.foot` rather than constraining them: their backgrounds must still span the full
width or they render as floating bars with white either side. This is only framing — it is what
the app looks like in a 1180px window — and it puts the header, footer, home and flow content
into one centred band that a symmetric crop can follow.

## 3. Walk the flow

**Start every take from a fresh page load.** `demoBlobs` and `demoRead` are module-level state,
and "Wipe this session" does not clear them — only a reload does. Re-recording without one feeds
the verify step records left over from the previous take, and the per-record check rejects them
with "not from this backup". So the order is always: reload, re-inject the framing CSS from step
2 (the reload drops it), then walk. Confirm with `demoBlobs.length === 0` before starting.

Drive it with the Chrome MCP tools, `save_to_disk: true` on every screenshot. Batch the steps;
take the screenshot *after* the state has settled, and add a `wait` of 1s after any panel change
(panels fade in, and a frame caught mid-fade is washed out and unusable).

The order, one frame each unless noted:

1. Home page.
2. "Back up a seed" → "Fill with a throwaway test phrase". This also answers the passphrase
   question, so do not click "No" — the fingerprint `B8688DF1` appears and Continue enables.
3. Continue → the split screen, then set 2-of-3. Driving the two range inputs by mouse is
   fiddly; `setState({ n: 3, m: 2 })` from the console reaches the same state and re-renders.
4. "Split into 3 shares" → type a label for share 1.
5. Click write, then screenshot *immediately* to catch the spinner, and again after ~2s.
6. Repeat for shares 2 and 3. **Each completed row shifts the active row down by exactly 88px** —
   the label field and write button move with it. Use plausible labels ("Home safe", "Office
   drawer", "Bank vault"); they appear on the done screen.
7. "Verify the backup →" appears under the third row, in view — at 2-of-3 no scrolling is needed.
8. On "Prove it restores", click read twice, ~3s apart. **The read button moves down as each row
   is added**, so re-screenshot between clicks rather than assuming a position.
9. On the *second* read, screenshot immediately, before the stub's delay elapses, to catch the
   "Follow the prompts…" spinner above the already-read first row. This frame matters: the app
   jumps to the done screen the instant the last share is read — the state where both rows show
   "Read" is never rendered — so without it the GIF cuts from one key read straight to
   "Your backup is ready", and the second read reads as if it never happened.
10. The done screen. A screenshot taken in the *same batch* as the click that reveals it comes
    out washed out mid-fade however long the preceding `wait` is, and even a standalone one can
    land early — take them until one is fully opaque. Keep one washed-out frame and hold it for
    ~400ms just before the final one: it plays as the screen dissolving in.

Without the stub in place, never click "Write the share to this key": it opens Chrome's WebAuthn
dialog, which blocks every subsequent tool call until a human dismisses it.

## 4. Build the GIF

No `ffmpeg`, `gifsicle` or ImageMagick on this machine, and `~/Downloads` is unreadable (macOS
TCC), so the browser's own GIF export cannot be collected. Build it with Pillow in a throwaway
venv under the scratchpad:

```
python3 -m venv <scratch>/venv && <scratch>/venv/bin/pip install -q Pillow
```

Then assemble the saved frames: `Image.open(...).convert("RGB")`, `quantize(colors=160,
dither=Image.Dither.NONE)` — the UI is flat, so dithering only adds noise — and save with
`save_all=True`, a per-frame `duration` list, `loop=0`, `optimize=True`, `disposal=1`.

Two settings that were arrived at the hard way:

- **Do not downscale.** Native pixels are what make the fingerprint and the mono
  `Share 1 of 3 — on the key.` lines legible. Reducing the palette does not shrink the file,
  because the limit is JPEG noise in the flat areas, not colour count — trim frames instead.
- **Crop to the column set up in step 2, not to the raw frame.** With that CSS in place the
  content sits in a known centred band and a symmetric crop is safe; roughly `(235, 0, 1225,
  690)` of a 1459×812 capture. The bottom cut drops the footer, which is what removes the dead
  space between the content and the footer bar. Never crop the width *without* that CSS: the
  home screen centres its content while every flow screen is left-aligned, so trimming the right
  margin suits the flow screens and visibly shifts the home screen off-centre.

Hold each frame long enough to read it: ~2s for a new screen, ~1.5s for the writes, and ~3.8s on
the final "Your backup is ready". A 2-of-3 pass is 13 frames at 990×690, about 25 seconds and 1.0 MB.

## 5. Show it, then revert

Serve it and open `http://localhost:8000/.github/demo.gif` so it can actually be watched, and
wait for approval before reverting — once `app.js` is clean the flow cannot be re-recorded
without starting over.

On approval: `git checkout -- app.js`, confirm `git diff app.js` is empty, and stop the server.
