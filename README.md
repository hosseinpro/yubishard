# yubishard

Split a wallet recovery phrase into standard **SLIP-39** shares and store each one on a different
YubiKey. Any threshold of the keys rebuilds the phrase; fewer reveal nothing at all.

## Requirements

- **Google Chrome** on macOS or Windows 11 (Firefox will never work — see below)
- **Python 3** — only to serve the page locally
- **YubiKeys with firmware 5.7 or newer**, one per share. Check with `ykman info`. See
  [YubiKey firmware](#yubikey-firmware) — most keys already in circulation are too old, and no key
  can be upgraded. To try the tool before buying any, see
  [Trying it without a YubiKey](#trying-it-without-a-yubikey).

## Running it

You cannot open `index.html` directly. A security key identifies a site by its hostname, and a
`file://` URL has none — so WebAuthn refuses before anything else happens. The page must be served.

```
# macOS
./serve.command

# Windows
serve.bat
```

Either one serves this folder at `http://localhost:8000/` and opens Chrome. To do it by hand:

```
python3 -m http.server 8000 --bind localhost
```

After updating YubiShard, hard-reload once (**Cmd/Ctrl+Shift+R**) so the browser picks up the new
`app.js` rather than a cached copy.

**Open `http://localhost`, never `http://127.0.0.1`.** A bare IP address can never identify a site
to a security key, and the call fails with a `SecurityError`.

There is also a hosted copy at <https://yubishard.com/>. It works, but read the origin note below
before enrolling keys there.

## How it works

1. Enter a **12- or 24-word BIP-39** phrase, or a **20-word SLIP-39** share (this is what a Trezor
   single-share backup is).
2. Choose a threshold — 3 of 5, say.
3. Write each share onto its own YubiKey. Chrome asks for the key's PIN and a touch twice: once to
   create the credential, once to store the share. A brand-new key has no PIN, so Chrome will ask
   you to set one — after that, unplug and reinsert the key before writing.
4. Verify by unplugging each key, plugging it back in, and reading the share off it. The flow will
   not finish until enough keys round-trip.

The shares are ordinary SLIP-39 mnemonics — Trezor, Electrum, Sparrow, Rabby and BlueWallet all
read them.

## Things you have to know

**The 20-word path is lossless. The 12/24-word path is not a conversion.**
A 20-word SLIP-39 input is re-split into the same master secret, so a Trezor restores the identical
wallet. A BIP-39 phrase is different: the shares carry its *entropy*, and BIP-39 and SLIP-39 derive
the wallet seed incompatibly. Typing those shares into a Trezor's Shamir recovery gives a valid,
empty, **different** wallet with no error. Restore through YubiShard, which re-encodes the entropy
back into your phrase. The BIP-32 fingerprint shown at every stage is what makes this visible.

**A BIP-39 passphrase is not stored in the shares.** It changes which wallet the phrase opens, and
so the fingerprint, but it is not part of the entropy. You must remember it separately.

**Shares are stored in plain form on the key.** They are encrypted at rest under a per-credential
key, but that key crosses the USB wire in the clear during a read. Yubico is explicit that largeBlob
"is not meant to be used to store sensitive data." The PIN is what stands between a stolen key and
its share.

**Record the PIN.** Eight wrong attempts locks the key's FIDO application, and recovering it means a
reset that destroys the share. A PIN forgotten across every key in the quorum cannot be recovered by
any means. `0000` is accepted if you would rather not manage one — but then possession of enough
keys is possession of the wallet.

**A YubiKey cannot be cloned.** Every key is enrolled independently, so your only redundancy is
enrolling more keys than the threshold.

**Nothing stops you writing two shares to the same key.** YubiShard refuses a key it has already
written to during the current session, but it cannot tell whether a key was used in an earlier one —
checking requires a query that leaves the key unresponsive until it is unplugged and reinserted, so
it is not done. Use a fresh key for each share and keep track yourself. `ykman fido credentials
list` shows what a key already holds.

Two shares on one key quietly weakens the scheme: a 3-of-5 where one key carries two shares is
really a 2-of-4, because that key counts twice. A key holding two shares also makes Chrome show a
credential picker every time it is read.

**Credentials are bound to the address you enrolled at.** A key enrolled at `localhost` cannot be
read at `yubishard.com`, or the other way round, and the tool cannot tell a wrong-origin key from a
blank one. Enrolling at `yubishard.com` means that if the domain ever lapses, those shares can never
be read again — there is no workaround, since a certificate error is not a secure context. Enrolling
at `localhost` binds to a name nobody can take away, and any static web server will do. Prefer it.

**Nothing is written to paper or disk.** No print, no download, no export. If you lose more keys
than the scheme tolerates, the backup is gone.

## Browser support

largeBlob is a WebAuthn Level 3 extension. Chrome implements it on macOS, Linux, ChromeOS and
Windows 11 — **not Windows 10**, which lacks it in `webauthn.dll`. Mozilla has stated Firefox does
not intend to implement it.

## YubiKey firmware

**Firmware is fixed when the key is manufactured and can never be updated.** There is no tool and no
Yubico service that does it — a key that could accept new firmware would be a key whose secrets
could be extracted by malicious firmware. A key below the requirement is replaced, not upgraded.

**Buy firmware 5.7 or newer.** largeBlob first appeared in firmware 5.5, but 5.5.x and 5.6.x shipped
only on the Bio Series. The mainline 5 Series — 5 NFC, 5C NFC, 5 Nano and the rest — went from 5.4.3
straight to 5.7, which reached retail on 2024-05-21. So although "5.5+" is what the extension itself
requires, 5.7 is the number to shop for.

| Firmware | largeBlob | Notes |
|---|---|---|
| YubiKey 4 and earlier | no | No FIDO2 at all, only U2F. Not a settings problem. |
| 5.0 – 5.4.3 | no | FIDO2 and `hmac-secret`, but largeBlob does not exist yet. |
| 5.5.x, 5.6.x | yes, 1024 B | Bio Series only. Never shipped on a mainline 5 Series key. |
| 5.7+ | yes, 4096 B | What to buy. Retail since May 2024. |

The stored record is capped at 900 bytes, so it fits in either capacity.

**Checking a key you already own:**

```
ykman info
```

Read the `Firmware version` line. Note that `ykman fido info` does *not* help here — it prints the
AAGUID, PIN retries and minimum PIN length, and says nothing about extensions. To test for the
extension itself rather than inferring it from the version:

```
pipx install fido2
python3 -c "
from fido2.hid import CtapHidDevice
from fido2.ctap2 import Ctap2
for d in CtapHidDevice.list_devices():
    i = Ctap2(d).info
    print(i.versions, sorted(i.extensions))
"
```

A usable key reports `FIDO_2_1` and lists `largeBlobKey`.

**Where to buy.** Prefer [Yubico's own store](https://www.yubico.com/store/) over a marketplace.
No listing anywhere states a firmware version, and channel stock sits in warehouses for years, so a
reseller may still be shipping 5.4.3; buying direct gets current manufacture. Amazon also commingles
inventory across sellers, which is a risk worth avoiding for a device that will hold part of a
recovery phrase. If you buy elsewhere, verify the key at
[yubico.com/genuine](https://www.yubico.com/genuine/) and run `ykman info` on arrival.

Buy more keys than your threshold — a 2-of-2 means either loss destroys the backup.

On 5.7, NFC is disabled until the key is first plugged into a USB port. This surprises people who
tap a new key against a phone; it is not a fault.

## Trying it without a YubiKey

Chrome can emulate an authenticator that supports largeBlob, so the whole flow runs with no hardware
at all. This is for development and for seeing what the tool does — **never for a real backup**, as
the emulated key vanishes the moment you close DevTools.

Software passkey providers are not an option here. 1Password, iCloud Keychain and Google Password
Manager implement `prf` at best; none implement `largeBlob`, which assumes a device with a blob area
rather than a synced credential store. The alternative to hardware is emulation, not another
provider.

With the page served at `http://localhost:8000/`:

1. Open DevTools, then ⋮ → **More tools** → **WebAuthn**.
2. Tick **Enable virtual authenticator environment**.
3. Add an authenticator with protocol **ctap2**, transport **usb**, and tick **Supports resident
   keys**, **Supports large blob** and **Supports user verification**.
4. Tick **User verified** on the authenticator once it is listed.

largeBlob requires resident keys and CTAP 2.1, so the large-blob checkbox stays greyed out until
resident keys is ticked. That is the intended gating, not a fault.

Registration and reads now resolve at once, with no PIN and no touch, and the panel lists each
credential as it is created. Adding a second authenticator *without* large blob ticked is a good way
to exercise the unsupported-key error path, which is awkward to test with real hardware.

What emulation does not cover:

- The two PIN-and-touch ceremonies, which is most of what the flow feels like in practice.
- The size ceiling. The record is capped at 900 bytes against a real budget of about 1 KB, and an
  emulated authenticator will not push back on an oversized one.
- Reseating the key. The verification step asks for a physical unplug and replug; emulated, you are
  only re-reading.

## What is stored on each key

One JSON record per key, written to its FIDO2 large blob. The field names are deliberately verbose
and self-describing, because this is what someone reads years from now with `python-fido2` and no
access to this code:

```json
{
  "version": 1,
  "format": "bip39-128",
  "domain": "localhost",
  "quorum-share": "kitchen dream academic acid buyer fiscal mixed national fiscal benefit scatter fortune listen punish transfer romantic agree security timber sweater",
  "quorum-size": 3,
  "quorum-threshold": 2,
  "quorum-index": 0,
  "quorum-label": "Home safe",
  "bip32-fingerprint": "B8688DF1",
  "passphrase-protected": false,
  "created": "2026-08-21"
}
```

| Field | Meaning |
|---|---|
| `version` | Format version of this record. |
| `format` | `bip39-128`, `bip39-256` or `slip39-128` — where the secret came from. Without this a restore cannot know whether to re-encode the bytes as BIP-39 words or leave them as SLIP-39, and the bytes alone do not say. |
| `domain` | The relying-party ID the credential is bound to. A key enrolled at one address cannot be read at another. |
| `quorum-share` | This key's SLIP-39 mnemonic — 20 words for a 128-bit secret, 33 for 256-bit. Any SLIP-39 tool accepts it. |
| `quorum-size` | Total keys in the backup. |
| `quorum-threshold` | How many are needed to restore. |
| `quorum-index` | Which share this is, counting from zero. |
| `quorum-label` | The name you gave this key. |
| `bip32-fingerprint` | The wallet these words open on their own. |
| `passphrase-protected` | `true` if you said the wallet needs a passphrase. |
| `created` | ISO date. Informational only. |

About 380 bytes for a 128-bit backup and 490 for 256-bit, against a budget of roughly 960.

**The passphrase itself is never asked for, never used in any derivation, and never stored — only
the flag is.** That is what keeps it a second factor: someone holding enough keys still cannot open
a passphrase-protected wallet. It also means `bip32-fingerprint` is always derived with an *empty*
passphrase, so a restore can always recompute and check it — which is why there is only one
fingerprint field. The corollary: if you use a passphrase, the fingerprint stored here will **not**
match what your wallet shows.

## Where the randomness comes from

Every random byte in YubiShard comes from one source: the browser's `crypto.getRandomValues`, the
OS-backed CSPRNG. There is no `Math.random`, no fallback generator, and no seeding — and the
environment check refuses to run anywhere the API could be missing.

What actually rides on it: the random Shamir shares. SLIP-39's guarantee — fewer keys than the
threshold reveal *nothing* — holds exactly as long as those bytes are uniform, and here they are
the only line of defense: shares are deliberately encrypted with an empty passphrase (so a Trezor
can restore them without a prompt), which means the encryption layer contributes no secrecy of its
own.

The other uses need uniqueness, not secrecy: the 15-bit SLIP-39 identifier that stops shares from
different backups combining (a collision is caught by the digest check, harmlessly), the WebAuthn
user handle that keeps one key's credentials distinct, and the challenge each ceremony requires.

YubiShard never generates a wallet — the seed is always the one you type in. Randomness is drawn
fresh on every split, so running the same backup twice produces unrelated shares that do not mix.

## If this tool disappears

The share sits in a FIDO2 large blob on the key. `python-fido2` can read it given the key's PIN,
independently of this code. To do that you need the relying-party ID you enrolled at (`localhost`,
or the domain), so record that along with the threshold, the fingerprint and the PIN.

## Development

Three hand-written files — `index.html`, `styles.css` and `app.js` — with no dependencies and no
build step. Nothing bundles or transforms them, so what ships is what you edit. See
`CLAUDE.md` for the internals and how to run the SLIP-39 test vectors.

All hashing — SHA-256, SHA-512, HMAC, PBKDF2 — comes from the browser's own `crypto.subtle`. Four
primitives are implemented by hand because Chrome has no native for them:

| Section | ~Lines | Why it can't be a Chrome native |
|---|---|---|
| RIPEMD-160 | 75 | WebCrypto only ships SHA-family hashes |
| secp256k1 | 70 | WebCrypto has P-256, not Bitcoin's K-256; does base-point multiply only |
| GF(256) + interpolate | 35 | The Shamir field math; no native |
| RS1024 | 30 | SLIP-39's bespoke checksum |

The first two exist only to compute the BIP-32 fingerprint. The last two are the product.

## Further reading

**SLIP-39 / Shamir backup**

- [SLIP39](https://trezor.io/slip39) — Trezor's explainer: why split a backup into shares, and how it compares to BIP-39.
- [Multi-share Backup on Trezor](https://trezor.io/guides/backups-recovery/advanced-wallets/multi-share-backup-on-trezor) — the same idea from the user's side.
- [SLIP-0039: Shamir's Secret-Sharing for Mnemonic Codes](https://github.com/satoshilabs/slips/blob/master/slip-0039.md) — the specification: share format, RS1024 checksum, and encryption of the master secret.
- [python-shamir-mnemonic](https://github.com/trezor/python-shamir-mnemonic) — the reference implementation, including the `vectors.json` test vectors this project is checked against.

**Storing data on a YubiKey (WebAuthn largeBlob)**

- [Web Authentication extensions § largeBlob](https://developer.mozilla.org/en-US/docs/Web/API/Web_Authentication_API/WebAuthn_extensions#largeblob) — MDN's description of the extension and its inputs and outputs.
- [WebAuthn: Emulate authenticators](https://developer.chrome.com/docs/devtools/webauthn) — the DevTools panel used above, and [the CDP WebAuthn domain](https://chromedevtools.github.io/devtools-protocol/tot/WebAuthn/) behind it.
- [FIDO2 large blobs](https://docs.yubico.com/yesdk/users-manual/application-fido2/large-blobs.html) — Yubico on the storage model and its ~1 KB budget.
- [fido-largeblob-demos](https://github.com/YubicoLabs/fido-largeblob-demos) — Yubico's working examples.
- [FIDO Specifics](https://docs.yubico.com/hardware/yubikey/yk-tech-manual/yk5-apps-fido.html) — the per-firmware extension table, and the source of the largeBlob version and capacity figures.
- [WebAuthn Level 3 § Large blob storage extension](https://www.w3.org/TR/webauthn-3/#sctn-large-blob-extension) — the normative definition.

**YubiKey**

- [How the YubiKey Works](https://www.yubico.com/products/how-the-yubikey-works/) — what the device is and what the touch actually does.
- [Setup](https://www.yubico.com/setup/) — Yubico's getting-started walkthrough.
- [YubiKey 5 firmware overview](https://docs.yubico.com/hardware/yubikey/yk-tech-manual/yk5-firmware-overview.html) — which firmware versions shipped on which products.
- [Firmware 5.7 now available](https://www.yubico.com/blog/now-available-for-purchase-yubikey-5-series-and-security-key-series-with-new-5-7-firmware/) — the May 2024 retail announcement, and Yubico confirming firmware cannot be retrofitted.

## License

MIT
