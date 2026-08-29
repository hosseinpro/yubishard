/* Runs the crypto core of app.js against the official vectors — see README "Development" */

import { readFileSync } from 'node:fs';

if (!Uint8Array.prototype.toHex) {
  Uint8Array.prototype.toHex = function () {
    return Array.from(this, b => b.toString(16).padStart(2, '0')).join('');
  };
  Uint8Array.fromHex = hex =>
    Uint8Array.from(hex.match(/../g) ?? [], h => parseInt(h, 16));
}

const here = new URL('.', import.meta.url);
const src = readFileSync(new URL('../app.js', here), 'utf8');
const cut = src.indexOf('const RECORD_VERSION');
if (cut < 0) throw new Error('could not find the crypto-core boundary in app.js');

const core = new Function(src.slice(0, cut) + `
  return { ripemd160, bip32Fingerprint, generateShares, combineMnemonics,
           bip39ToEntropy, bip39FromEntropy, bip39Seed, utf8 };
`)();

const slip39Vectors = JSON.parse(readFileSync(new URL('vectors-slip39.json', here), 'utf8'));
const bip39Vectors = JSON.parse(readFileSync(new URL('vectors-bip39.json', here), 'utf8')).english;

let passed = 0, failed = 0;

function check(ok, name, detail = '') {
  if (ok) { passed++; return; }
  failed++;
  console.error(`FAIL  ${name}${detail ? ' — ' + detail : ''}`);
}

async function rejects(promise) {
  try { await promise; return false; } catch { return true; }
}

/* RIPEMD-160 — the vectors from the original Dobbertin/Bosselaers/Preneel paper */

const RMD_VECTORS = [
  ['', '9c1185a5c5e9fc54612808977ee8f548b2258d31'],
  ['a', '0bdc9d2d256b3ee9daae347be6f4dc835a467ffe'],
  ['abc', '8eb208f7e05d987a9b044a8e98c6b087f15a0bfc'],
  ['message digest', '5d0689ef49d2fae572b881b123a85ffa21595f36'],
  ['abcdefghijklmnopqrstuvwxyz', 'f71c27109c692c1b56bbdceb5b9d2865b3708dbc'],
  ['abcdbcdecdefdefgefghfghighijhijkijkljklmklmnlmnomnopnopq',
    '12a053384a9c0c88e405a06c27dcf49ada62eb2b'],
  ['ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',
    'b0e20b6e3116640286ed3a87a5713079b21f5189'],
  ['1234567890'.repeat(8), '9b752e45573d4b39f4dbd3323cab82bf63326bfb'],
  ['a'.repeat(1000000), '52783243c1697bdbe16d37f97f68f08325dc1528']
];

for (const [msg, hex] of RMD_VECTORS) {
  const got = core.ripemd160(core.utf8.encode(msg)).toHex();
  check(got === hex, `ripemd160("${msg.slice(0, 20)}${msg.length > 20 ? '…' : ''}")`, got);
}

/* BIP-32 — master fingerprints of test vectors 1 and 2 */

const BIP32_VECTORS = [
  ['000102030405060708090a0b0c0d0e0f', '3442193E'],
  ['fffcf9f6f3f0edeae7e4e1dedbd8d5d2cfccc9c6c3c0bdbab7b4b1aeaba8a5a2'
    + '9f9c999693908d8a8784817e7b7875726f6c696663605d5a5754514e4b484542', 'BD16BEE5']
];

for (const [seed, fp] of BIP32_VECTORS) {
  const got = await core.bip32Fingerprint(Uint8Array.fromHex(seed));
  check(got === fp, `bip32Fingerprint(${seed.slice(0, 8)}…)`, got);
}

/* BIP-39 — the English trezor/python-mnemonic vectors, passphrase "TREZOR" */

for (const [entropy, mnemonic, seed] of bip39Vectors) {
  const words = await core.bip39FromEntropy(Uint8Array.fromHex(entropy));
  check(words === mnemonic, `bip39FromEntropy(${entropy.slice(0, 8)}…)`, words);
  const back = await core.bip39ToEntropy(mnemonic);
  check(back.toHex() === entropy, `bip39ToEntropy(${entropy.slice(0, 8)}…)`, back.toHex());
  const s = await core.bip39Seed(mnemonic, 'TREZOR');
  check(s.toHex() === seed, `bip39Seed(${entropy.slice(0, 8)}…)`, s.toHex());
}

/* SLIP-39 — all official vectors, passphrase "TREZOR"; an empty secret means "must reject" */

for (const [description, mnemonics, secret] of slip39Vectors) {
  if (secret === '') {
    check(await rejects(core.combineMnemonics(mnemonics, 'TREZOR')),
      `slip39 rejects: ${description}`);
  } else {
    try {
      const got = await core.combineMnemonics(mnemonics, 'TREZOR');
      check(got.toHex() === secret, `slip39: ${description}`, got.toHex());
    } catch (e) {
      check(false, `slip39: ${description}`, e.message);
    }
  }
}

/* Round-trip — what the app actually does: split, then recover from a threshold subset */

for (const bytes of [16, 32]) {
  const secret = crypto.getRandomValues(new Uint8Array(bytes));
  const shares = await core.generateShares(secret, 3, 5, '');
  const got = await core.combineMnemonics([shares[4], shares[0], shares[2]], '');
  check(got.toHex() === secret.toHex(), `round-trip 3-of-5, ${bytes}-byte secret`);
  check(await rejects(core.combineMnemonics([shares[0], shares[1]], '')),
    `round-trip rejects below threshold, ${bytes}-byte secret`);
}

console.log(`${passed} passed, ${failed} failed `
  + `(${slip39Vectors.length} SLIP-39 vectors, ${bip39Vectors.length} BIP-39 vectors)`);
process.exit(failed ? 1 : 0);
