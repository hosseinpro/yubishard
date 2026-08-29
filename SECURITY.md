# Security policy

YubiShard handles wallet recovery phrases. If you find a way to make it leak, weaken or
mis-restore one, please report it privately before anyone else learns how.

## Reporting a vulnerability

**Preferred:** [Report a vulnerability](https://github.com/hosseinpro/yubishard/security/advisories/new)
through GitHub — it stays private between you and the maintainer.

**Or by email:** hossein@yubishard.com with `[yubishard security]` in the subject.

Please do not open a public issue for anything exploitable.

Include what you can: the affected code, steps or a proof of concept, and what an attacker
gains. You should hear back within a week. There is no bounty program — fixes are credited in
the release notes unless you prefer otherwise.

## Scope

The interesting surface, roughly in order:

- **The crypto layer** — SLIP-39 share generation and combination, the Shamir arithmetic,
  randomness use, the BIP-39/BIP-32 paths. Anything that makes fewer-than-threshold shares
  reveal more than nothing.
- **Seed handling in the page** — any way the entered phrase or derived secrets leave the tab:
  network requests, storage, clipboard beyond the explicit copy actions, or script injection.
- **The WebAuthn/largeBlob path** — writing a record the restore path misreads, or cross-origin
  credential confusion beyond what RP ID binding already enforces.

Known and documented, so not findings on their own:

- Shares sit in the large blob protected by the key's PIN, and the blob crosses USB in the
  clear during a read — Yubico documents this; the PIN is the boundary (see README, "Things
  you have to know").
- Possession of a threshold of keys plus their PINs *is* the wallet. That is the design.
- Vulnerabilities in Chrome, the YubiKey firmware, or the OS belong upstream.

## Supported versions

Only the latest release and `main`. There is no backporting — the fix ships as a new version
and the footer link tells users what they are running.
