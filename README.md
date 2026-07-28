# yubishard

Split your crypto wallet recovery phrase into shares, encrypt each with a different YubiKey, and store them apart.

## Running it

Download `index.html` and open it in a browser. That's the whole app — no install, no build step, no dependencies, and no network requests. It runs fine from `file://` on a machine that has never been online.

## Status

**Prototype.** The YubiKey step and the per-share encryption are simulated, so the shares it produces offer no real confidentiality. The Shamir splitting over GF(256) is real; the sealing around it is a placeholder. Don't use it for a backup you care about yet.

## Further reading

**SLIP-39 / Shamir backup**

- [SLIP39](https://trezor.io/slip39) — Trezor's explainer for the standard: why split a backup into shares, and how it compares to BIP-39.
- [Multi-share Backup on Trezor](https://trezor.io/guides/backups-recovery/advanced-wallets/multi-share-backup-on-trezor) — the same idea from the user's side: creating shares, choosing a threshold, and recovering from them.
- [SLIP-0039: Shamir's Secret-Sharing for Mnemonic Codes](https://github.com/satoshilabs/slips/blob/master/slip-0039.md) — the specification itself, covering the share format, checksum, passphrase, and encryption of the master secret.
- [python-shamir-mnemonic](https://github.com/trezor/python-shamir-mnemonic) — the reference implementation, including the `vectors.json` test vectors.

**YubiKey**

- [How the YubiKey Works](https://www.yubico.com/products/how-the-yubikey-works/) — what the device is and what the touch actually does.
- [Setup](https://www.yubico.com/setup/) — Yubico's getting-started walkthrough if you've never used one.

**Key derivation from a touch (WebAuthn PRF)**

A PRF — pseudo-random function — returns a value that looks random for any given input, but always returns the same value for the same input. That is what lets a hardware key stand in for a stored password: feed it a salt, get back a repeatable 32 bytes, and derive an encryption key from them without the root secret ever leaving the device.

- [Web Authentication extensions § prf](https://developer.mozilla.org/en-US/docs/Web/API/Web_Authentication_API/WebAuthn_extensions#prf) — MDN's short definition, framing the PRF as a random oracle and sketching the encryption use case.
- [Hardware-Backed Key Derivation with WebAuthn PRF and the YubiKey](https://developers.yubico.com/WebAuthn/Concepts/PRF_Extension/) — Yubico's explainer for what the extension buys you on real hardware.
- [A Developer's Guide to Deriving Keys with WebAuthn PRF and YubiKeys](https://developers.yubico.com/WebAuthn/Concepts/PRF_Extension/Developers_Guide_to_PRF.html) — the practical version: `navigator.credentials` calls, HKDF, key rotation, multi-device unlock.
- [CTAP2 HMAC Secret Deep Dive](https://developers.yubico.com/WebAuthn/Concepts/PRF_Extension/CTAP2_HMAC_Secret_Deep_Dive.html) — the `hmac-secret` layer underneath, including how the salt is domain-separated and a reference implementation in C against `libfido2`.
- [WebAuthn Level 3 § Pseudo-random function extension](https://www.w3.org/TR/webauthn-3/#prf-extension) — the normative definition.

## License

MIT
