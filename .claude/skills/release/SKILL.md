---
name: release
description: Release a new YubiShard version — bump the footer version in index.html, commit, tag, and push to GitHub. Use when asked to release, cut, or publish a version.
---

# Releasing a YubiShard version

There is no build step and no package manifest. The version lives in exactly one place: the
footer of `index.html`, as a link whose text is the version and whose href points at the
matching GitHub tag. A release is that edit plus a pushed tag.

## Inputs

The version, in `vX.Y.Z` form. If the user gave a version, use it. If they said "patch",
"minor", or "major" (or gave nothing), read the current version with `git tag --list 'v*'
--sort=-v:refname | head -1` and bump accordingly — default to a patch bump. Never re-release
an existing tag.

## Steps

1. **Preflight.** Confirm the working tree is clean (`git status`) and `main` is in sync with
   `origin/main`. Uncommitted work does not silently ride along in a release — stop and ask if
   the tree is dirty.

2. **Bump the footer.** In `index.html`, the footer's left span holds the version link:

   ```html
   <span><a href="https://github.com/hosseinpro/yubishard/releases/tag/vX.Y.Z" target="_blank"
       rel="noopener">vX.Y.Z</a></span>
   ```

   Update **both** the link text and the tag name at the end of the href to the new version.
   They must match — a mismatched pair points users at the wrong tag.

3. **Commit, tag, push.** Tag the commit that contains the bump, so the tagged tree shows its
   own version:

   ```
   git add index.html
   git commit -m "release vX.Y.Z"
   git tag vX.Y.Z
   git push origin main vX.Y.Z
   ```

4. **GitHub release (optional).** Only if the user asked for release notes or a "proper
   release": `gh release create vX.Y.Z --generate-notes`. A bare tag is the default — the
   footer link resolves either way.

## Report

State the new version, the commit hash, and confirm the tag is on GitHub.
