---
name: desktop-only-wasd-and-laser-direction
description: "Işık Bekçisi direction after the second playtest (2026-10-02) — desktop only, WASD movement, mouse aims the light, beam grows into a laser, story camp"
metadata:
  node_type: memory
  type: project
  originSessionId: 72fd0708-1f9e-4a55-aedc-df7bfd3fe2bc
  modified: 2026-10-02T18:05:33.382Z
---

Second round of hands-on feedback from the user and friends (2026-10-02), given as suggestions for Claude to weigh:

- **Desktop only.** Develop it as a PC game; no mobile UI, no portrait layout, the game need not open on phones at all.
- **Movement is WASD.** The keeper following the mouse cursor felt bad. The mouse is for the light: aiming and focusing.
- **The focus beam should become a laser** towards the late game, with environment and enemies designed around it; focusing should visibly cost more oil (the user could not tell whether it did).
- **Camp is liked.** More conversations, make the camp side read like a story.
- **Entering and leaving the camp is too abrupt**; wants softer transitions both ways.
- **The upgrade (sky) screen should be livelier**, with bought / buyable / unaffordable / locked states far more distinct.

**Why:** these come from actually playing the live build, so they outrank earlier assumptions (the cursor-follow movement and the touch layout were Claude's choices, see [[ui-and-base-preferences]]).

**How to apply:** do not spend effort on touch or mobile layout; do not reintroduce cursor-follow movement; treat the laser, its oil cost and laser-oriented enemies as the core of late-game design. Status of the implementation lives in the vault overview ([[isik-bekcisi-project]]).
