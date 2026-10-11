---
name: git-push-autonomy
description: User lets Claude commit and push to main in the Diskort repo whenever it judges appropriate
metadata:
  node_type: memory
  type: feedback
  originSessionId: f0d5fe07-075d-4c23-9fa5-991660c48027
  modified: 2026-09-26T14:53:46.716Z
---

For Diskort (`zziroo/diskort`), the user said Claude may commit and push to `main` on its own judgment (2026-09-26) — no need to ask before each push.

**Why:** user wants the GitHub repo kept in sync while work continues, without being prompted each time.
**How to apply:** after a coherent, verified change (typecheck + tests passing), commit with a Turkish message and push to `main`. Still never force-push or rewrite pushed history without asking.

Related: [[diskort-project]]
