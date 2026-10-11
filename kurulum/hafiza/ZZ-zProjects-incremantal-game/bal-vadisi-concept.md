---
name: bal-vadisi-concept
description: "Bal Vadisi (first game built in this folder) — where it lives now, where it is published, why it was set aside"
metadata:
  node_type: memory
  type: project
  originSessionId: 6d8df6c2-d2f6-41a4-acee-7bc01a447e7f
  modified: 2026-10-02T09:41:37.233Z
---

**Bal Vadisi / Honey Valley** is a 2D bee-and-meadow idle game (vanilla JS + canvas, no build) built here on 2026-10-02, then moved out to `/Users/ziroo/ZZ/zProjects/bal-vadisi` the same day at the user's request ("keep it somewhere separate"). It is live at https://diskort.ziroo.net/games/bal-vadisi (hub page: `/games`), published with `bash deploy/deploy.sh` from that folder onto the Diskort VPS as static files.

**Why set aside:** it came out as an idle game; the user wanted a run-based incremental instead — see [[run-based-incremental-wanted]]. The user did not reject Bal Vadisi, just asked to keep it and build something new.

**How to apply:** this folder (`incremantal-game`) is now empty and reserved for the new run-based game. Don't put Bal Vadisi work here. Its git repo is committed (local only, no remote); for the git identity to use in new repos see [[git-identity-per-repo]]. New games for the same hub go under `/games/<name>/` via the same deploy approach (same-origin-only CSP, no CDNs; details in the vault note `10-Projects/bal-vadisi/decisions/2026-10-02-oyunlar-diskort-alan-adinda-games-altinda.md`).
