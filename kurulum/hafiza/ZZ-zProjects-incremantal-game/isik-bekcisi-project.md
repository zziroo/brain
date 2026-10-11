---
name: isik-bekcisi-project
description: "Işık Bekçisi (Lightkeeper), the run-based incremental game in this folder — what the user approved, the quality bar, and where its current status lives"
metadata:
  node_type: memory
  type: project
  originSessionId: 6d8df6c2-d2f6-41a4-acee-7bc01a447e7f
  modified: 2026-10-02T21:10:46.912Z
---

This folder holds **Işık Bekçisi / Lightkeeper**: runs into a dark valley with a lantern (oil = run limiter, light captures spirits), a walkable camp between runs with residents to interact with, a constellation skill tree opened from the camp's telescope, five zones each with its own mechanic, beacons as zone gates, a boss and a dawn ending. The user approved the concept on 2026-10-02 after the Shelldiver / Rock Bottom analysis ([[run-based-incremental-wanted]]) and set the bar explicitly: "elinden gelenin en iyisini yap, en kaliteli şekilde tasarla" — full scope and polish over a quick prototype.

**Why it matters:** the previous attempt ([[bal-vadisi-concept]]) missed the genre; this one is the user's actual request. Design changes should keep the run → camp → run loop and avoid the complaints players have about the reference games (zones that repeat the same loop, no real finale, re-farming old zones, a tree that is hard to read). The user's first hands-on feedback reshaped it the same day ([[ui-and-base-preferences]]).

**How to apply:** current status and the next steps are in the vault, not here: read `/Users/ziroo/ZZ/brain/10-Projects/isik-bekcisi/_overview.md` ("Durum", "Sıradaki işler") first, then the repo's `CLAUDE.md` for how to run, test and tune. The game is published on the user's server (which commit is live is tracked in the vault overview, not here; see also [[desktop-only-wasd-and-laser-direction]]). The user playtests the live build themselves and with friends (2026-10-06: "canlıya al, ben kendim oynayacağım, oradan test ediyorum"), so a reviewed change they want to try usually means a deploy; they said they would report how it feels ("arkadaşlarımla deneyip hissettiklerimizi sana aktarırız"), so expect that feedback to drive the next round and ask for it if a new session starts without it. Local changes are not live until `deploy/deploy.sh` is run, and deploying is the user's call each time. Nobody but the user has judged feel, sound or human pacing; balance numbers come from the bot in `tools/sim.js`.
