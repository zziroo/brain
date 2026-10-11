---
name: kapis-project
description: "KAPIŞ browser hero-shooter — what it is, how the work is organised, where the contracts and backlog live"
metadata:
  node_type: memory
  type: project
  originSessionId: 976f43c6-b361-42f4-bc52-70c6850d2a0a
  modified: 2026-10-02T21:37:52.076Z
---

KAPIŞ (started 2026-10-02): browser hero-shooter for the user's friends. three.js + TS client, authoritative
Node `ws` server, shared deterministic sim, 6 heroes, FFA/TDM, bots, everything procedural (no assets).
Repo `/Users/ziroo/ZZ/zProjects/web-fps-game` (git, main). Contracts: `docs/DESIGN.md` (product + rules
for agents), `docs/ARCHITECTURE.md` (sim/hook/event model), `docs/CLIENT.md` (client seams), backlog
`docs/POLISH.md`.

**Why:** the user asked for "the best game you can make", left all decisions to Claude, wants heavy
subagent use to keep the coordinator context small.
**How to apply:** work in waves of parallel agents split by vertical slice/ownership table in CLIENT.md;
review gate before each commit (reviewer → sonnet skeptic → fix); test via the built single-port server
(`.claude/launch.json` "kapis", port 8080) and the debug hook
`?debug=1&autojoin=new&name=X&hero=volt&bots=6` (`window.__kapis`). Deployment/hosting is the user's
decision and is still open — tunnel needs `TRUST_PROXY=1`. See [[kapis-status]].
