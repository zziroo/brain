---
name: agents-own-port-and-silent
description: "browser-testing agents must not kill the user's server on 5174 and must keep the game silent"
metadata:
  node_type: memory
  type: feedback
  originSessionId: 1249d80e-d2e5-4d53-9332-298bade5322e
  modified: 2026-10-07T19:01:01.854Z
---

Agents that test the game in the browser pane must serve on their own port, and must never kill a process holding 5174. The user runs `node serve.mjs` on 5174 themselves to play locally. Test pages must also be silent.

**Why:** on 2026-10-07 an agent killed the user's own 5174 server. The same day the user complained that the games agents opened kept making sound.

**How to apply:**
- Tell browser-testing agents to use a different port and to stop only their own servers: by PID or port, never `pkill -f serve.mjs` (it matched every `node serve.mjs`; an agent did it on 2026-10-07 evening and may have stopped 5174 and other agents' servers).
- Pages that import `tools/dev.js`, or are opened with `?mute`, are silent (`Sound.silent`, main `ebefda2`). On older branches, set `game.Sound.enabled = false` before play.

Related: [[isik-bekcisi-project]]
