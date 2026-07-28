# yubishard

Split your crypto wallet recovery phrase into shares, encrypt each with a different YubiKey, and store them apart.

## Running it

Download `index.html` and open it in a browser. That's the whole app — no install, no build step, no dependencies, and no network requests. It runs fine from `file://` on a machine that has never been online.

## Status

**Prototype.** The YubiKey step and the per-share encryption are simulated, so the shares it produces offer no real confidentiality. The Shamir splitting over GF(256) is real; the sealing around it is a placeholder. Don't use it for a backup you care about yet.

## License

MIT
