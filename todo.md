claude

move this message "Keys enrolled here are tied to localhost and can only be read back at this same address." as a red warning to the exisitng header. no need box for that.

in this code block use the label that user set for this key for name:
return navigator.credentials.create({
        publicKey: {
          challenge: challenge(),
          rp: { id: rpId(), name: 'YubiShard' },
          user: {
            id: crypto.getRandomValues(new Uint8Array(16)),
            name: 'YubiShard share-' + (record.i + 1) + '-of-' + record.n,
            displayName: record.label
          },
like: name: 'YubiShard: Home Safe (share-' + (record.i + 1) + '-of-' + record.n + ')'

write fingerprint in the largeBlob and check it in recover.

check that if the connected yubikey already has a loargeblob, does not write new one and show an error.

split index.html to a css, a html, and a js file.