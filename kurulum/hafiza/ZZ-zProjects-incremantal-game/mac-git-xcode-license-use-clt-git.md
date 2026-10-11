---
name: mac-git-xcode-license-use-clt-git
description: "On this Mac /usr/bin/git (and /usr/bin/python3) can fail with \"You have not agreed to the Xcode license\"; the CommandLineTools git works"
metadata:
  node_type: memory
  type: feedback
  originSessionId: 12ed6d57-685b-4a79-8ef1-c1bc0b830ffe
  modified: 2026-10-08T12:58:18.654Z
---

On 2026-10-08, mid-session, `/usr/bin/git` and `/usr/bin/python3` started failing with the Xcode license message
(`xcode-select -p` points at /Applications/Xcode.app). `/Library/Developer/CommandLineTools/usr/bin/git` works.

**Why:** the Xcode shims refuse until the license is accepted with `sudo xcodebuild -license`, which Claude cannot run.

**How to apply:** if git prints the license message, use `G=/Library/Developer/CommandLineTools/usr/bin/git` (and
`node` instead of python3 for scripts). Tell the user once that accepting the Xcode license fixes it for good.
