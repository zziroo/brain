---
name: no-limit-throttling
description: "Don't shrink or postpone agent work because of usage limits; resume stopped agents after the reset"
metadata:
  node_type: memory
  type: feedback
  originSessionId: 9d3b0acc-99bc-4ad1-9453-20336b6daaae
  modified: 2026-10-05T02:31:53.235Z
---

Don't restrict or postpone work (wave size, launching agents) because of the 5-hour/weekly usage limits. Still check `get_usage` and mention it briefly.

**Why:** the user said on 2026-10-05 "limitler yüzünden bir şeyleri kısıtlamana gerek yok" when I planned to delay a theme wave until the weekly reset.
**How to apply:** launch the planned wave; if a limit stops agents (429), resume the same agents with SendMessage after the reset instead of starting new ones. See [[kapis-project]].
