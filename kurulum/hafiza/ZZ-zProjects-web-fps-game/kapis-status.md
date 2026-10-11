---
name: kapis-status
description: Where KAPIŞ stands (deployed 2026-10-03) and what comes next
metadata:
  node_type: memory
  type: project
  originSessionId: 84c43e89-faa3-4dd9-8ac2-67e05bc30bbf
  modified: 2026-10-05T02:28:20.558Z
---

As of 2026-10-03 night: **live at https://kapis.ziroo.net** (VPS container `kapis` on 127.0.0.1:8085 behind the
ziroo-edge Caddy; site file `/opt/ziroo-sites/hosts/kapis.caddy`). Deploy = `bash deploy/deploy.sh` from the repo
root (ships HEAD via git archive, builds the image on the VPS, reloads edge, checks /healthz). Commits up to
`a6eaba2` (deployed 2026-10-03); 521 tests green. All 6 heroes, arena, UI, bots, hardening, server-global PIN-protected balance panel (Esc → Denge; PIN in `/opt/kapis/.env`, data in `/opt/kapis/data`), client-only kill cam replay (killer's POV, 3.4 s, Space skips, setting to disable; respawn raised 3 s → 4 s for it).

Done 2026-10-05 (committed up to `5a5ca20`, pushed, **deployed 2026-10-05**, healthz ok): **world themes** — 7 themes (neon, medieval, halloween, japan, lava, snow, desert), world-only, same arena; random each match (shuffle bag) or host-picked, countdown intro card + rail flyover, results "Sıradaki arena" reel, per-theme music + ambience, live landing showcase. Contract for theme authors: `docs/THEMES.md`; workbench `gallery.html?theme=<id>`. 623 tests green. User's order: **new map layouts next** (themes are map-agnostic; THEMES budgets assume ≤ ~100 m maps, far plane 400 m), then the user tests with friends. Open ideas: view readiness signal so the showcase never shows a dark gap on a non-prefetched pick; checkTheme warning above 80k triangles.

Next: Opera WASD issue (Chrome fine); friends' play test feedback → `docs/POLISH.md` polish pass (point-blank white blob, explosion/smoke look,
Şahin barrage self-damage, local body in death cam); nobody has listened to the audio yet (`/audio-demo.html`).

**Why:** the user chose a shared server over a tunnel so everyone gets the same ping; Caddy was split into the
`ziroo-edge` project in a parallel session (vault: diskort decision 2026-10-03-caddy-ziroo-edge-projesine-ayrildi).
**How to apply:** verify live state before asserting it; never run Diskort's own `caddy` service on the VPS.
