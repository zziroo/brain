---
name: gamepad-later-keep-keeper-clean
description: "Işık Bekçisi (2026-10-07) — gamepad support is planned later, so no UI that depends on the mouse cursor; too much UI drawn on the keeper, reduce it"
metadata:
  node_type: memory
  type: project
  originSessionId: e5a9fa92-460a-4950-bf43-86c8b207bc4b
  modified: 2026-10-07T08:57:50.088Z
---

User feedback on 2026-10-07 while trying the glass-heat gauge:
- **Too much UI on the keeper.** At that point the keeper carried the flare's ring round the lantern, the dash's ring at the feet, and coach marks. Reduce it rather than add to it.
- **Gamepad support is planned later.** UI pinned to the mouse cursor (the heat arcs at the cursor, the dash ring that used to sit there) felt weak, and would not survive a gamepad. Prefer diegetic signs on the lantern or the world, and the HUD's skills corner, for anything stateful.

**Why:** the user felt the cursor gauge did not work and named gamepad as a future input. This loosens the earlier desktop-only stance in [[desktop-only-wasd-and-laser-direction]]: still a PC game, but not mouse-only forever.

**How to apply:** when designing a new indicator, do not put it on the cursor or add another ring on the keeper. Ask first: can the lantern, the beam or the world show it? Otherwise put the precise readout in the bottom-right skills corner.
