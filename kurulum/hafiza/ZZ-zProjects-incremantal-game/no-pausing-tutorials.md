---
name: no-pausing-tutorials
description: "User rejected tutorial cards that pause the game; guides must be non-blocking, learn-by-doing, anchored next to what they teach"
metadata:
  node_type: memory
  type: feedback
  originSessionId: 55919b05-745c-4c0f-bf26-501f67a90b1b
  modified: 2026-10-03T20:56:14.210Z
---

Tutorials / guides in the user's games must not stop the game. On 2026-10-03 the user asked for hints "we are sure the player reads, short and concise"; I built centred cards that froze the run until acknowledged, and the user rejected it the same day ("bu tarz bir tasarım istemiyorum … kullanıcı dostu"). Offered three non-blocking options, the user picked "learn by doing": a small hint next to the thing it is about (keeper, new enemy, HUD gauge) with key caps, ticked off and gone once the player actually does the action.

**Why:** a modal that halts play feels heavy-handed to them; "sure they read it" should come from the player doing the thing, not from blocking.

**How to apply:** for onboarding in this game (and likely the user's other games, my inference) default to contextual, non-blocking coach marks; never propose pause-to-read panels. For product-feel choices like this, show 2–3 options with a mockup before building — picking alone cost a full rebuild here. What worked best (2026-10-06): real in-game variants behind a dev switch, the same moments shot with each and put side by side; the user picked at once (camp signs S3, night look E3), then the losers were removed. Related: [[ui-and-base-preferences]], [[desktop-only-wasd-and-laser-direction]].
