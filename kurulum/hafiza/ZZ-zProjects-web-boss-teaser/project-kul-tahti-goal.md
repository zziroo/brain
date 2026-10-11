---
name: project-kul-tahti-goal
description: "web-boss-teaser = \"Kül Tahtı\" 3D souls-like boss demo in the browser; user's goal is to see Claude's limits"
metadata:
  node_type: memory
  type: project
  originSessionId: 0b356782-61ec-45a2-829c-406260715e17
  modified: 2026-10-02T01:59:46.164Z
---

web-boss-teaser holds "Kül Tahtı": a no-build Three.js (r170, import map) souls-like boss-fight demo in an open fantasy valley; boss "Valdran, Kül Kralı". Started 2026-10-02.

**Why:** the user asked for it explicitly "to see the limits of what you can do", so polish and ambition matter more than minimal scope.

**How to apply:** favour impressive, cohesive results; ARCHITECTURE.md is the module contract (world/render, player, boss, fx+ui+audio built by parallel agents, coordinator owns src/main.js + src/core). Run with `python serve.py` (no-store; plain http.server serves stale modules). Published privately as https://claude.ai/artifact/4eeBeW1nWvxJ9imd6DjaDW (page source: repo artifact.html wrapper + `files` map of style.css and src/**; not yet verified to run inside the artifact viewer). Vault notes: 10-Projects/kul-tahti/.
