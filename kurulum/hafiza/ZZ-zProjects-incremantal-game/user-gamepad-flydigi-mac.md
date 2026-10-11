---
name: user-gamepad-flydigi-mac
description: "The user's pad is a Flydigi Vader 5 Pro on a Mac; browsers see it only over Bluetooth (as an Xbox Wireless Controller, standard mapping)"
metadata:
  node_type: memory
  type: user
  originSessionId: a15a1fc5-272a-4a26-840f-0c23ec070f39
  modified: 2026-10-07T22:00:14.838Z
---

The user tests gamepad support with a Flydigi Vader 5 Pro on macOS (2026-10-08). Over the 2.4G dongle / cable macOS does not register it as a game controller: Steam sees it (own driver), Flydigi's site reaches it via WebHID, but the Gamepad API (every browser, every tester site) returns nothing. Paired over Bluetooth it shows as `Xbox Wireless Controller (STANDARD GAMEPAD)`, mapping `standard`, Xbox button positions, and the game reads it.

**How to apply:** if pad input "does not work" for them, check the connection mode first (Bluetooth), not the code. Related: [[gamepad-later-keep-keeper-clean]].
