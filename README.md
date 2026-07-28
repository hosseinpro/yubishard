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

## License

MIT
