---
name: camera-ui-scale-and-soot-economy-pending
description: "Two design threads parked on 2026-10-06 until the parallel halo-mechanics rework lands — the keeper reads too small (camera + thin UI) and a \"collect darkness, refine it at camp\" loop"
metadata:
  node_type: memory
  type: project
  originSessionId: 518e8d45-ee0f-4055-aa83-84b9bcaabe33
  modified: 2026-10-06T12:08:47.263Z
---

On 2026-10-06 the user raised two things and then said to plan both **after** a parallel session that is changing the halo mechanics finishes ("bi iş paralelde çalışıyor, genel hale mekaniklerini değiştirecek, ondan sonra planlayalım").

1. **The keeper feels too small / seen from too far.** Measured at 1440×900: `runZoom` in `js/view.js` always fits ≥760 world units into the screen height, so the keeper (~31 units) is ~37 px = ~4 % of screen height; in Shelldiver's Steam shots the turtle is ~8 %. The UI compounds it: 11 px spaced small caps, hairline lines, cool dim colours, HUD spread to the corners, while Shelldiver's HUD is thick, bright and clustered round a portrait. Proposed: ~1.3–1.4× closer camera in early zones (keep the beam-lean when focused) and a heavier UI (≥13–14 px, thicker lines, a bigger oil gauge with a number) without losing the "night atlas" identity. Next step agreed in spirit: show current / 1.3× / 1.5× and a UI before/after as real screenshots, user picks (see [[no-pausing-tutorials]] — show options before building feel changes).

2. **Collect darkness and refine it at camp.** User's idea; I agreed it fixes a real weakness (the brood is a tax that drops a few low motes; everything flows into one tree, dust is not a separate loop). Draft: burned darkness leaves **"is"** (soot); a camp station refines it; spend on A) camp buildings with visible effects (my preference, Shelldiver-village-like), B) ink → drawing the night atlas for bonuses, or C) buying Vırak's brews with it instead of waiting 2 runs. Avoid making it just another currency for the same tree; no carry-capacity limiter (oil stays the single run limiter). User has not chosen A/B/C yet.

**Update 2026-10-06 (later the same day, halo rework merged):** the user chose for the camera the *split* approach (floors ÷1.45, halo-driven terms ÷1.15–1.2, keeper sprite ×1.2, heavier HUD; uniform ×1.5 rejected from screenshots: it eats the dark beyond the halo in the cavern/ruins). The beacon's in-person finish ("hold the beam 12 s") was judged a chore; the user chose **C, a siege ("Fener Nöbeti")**: flow still fills 80 %, stepping into the ready beacon starts a 12–18 s defence (sootling waves, the zone's great one halfway, clingers on the beacon stall it, never below 80 %), ending in a burst that catches the called spirits. Soot economy: **"şimdilik bekle"** — not chosen yet, revisit after these land; the user said both small choices (siege length, drums) are mine.

**Done 2026-10-06 (evening):** camera split + keeper ×1.2 + heavier HUD are on main (`a352450`); the siege is on main (`8b10c02`, merge `5fbddc1`, review fixes `74dc1f7`). Deployed the same evening on the user's "yayınla" (live = `74dc1f7`, pushed to GitHub too). Still open: the soot economy (user: wait), the Heart now ~7–8 bot attempts (user informed, no answer yet), and the user's play feedback on the new camera and the siege. Details in the vault: `10-Projects/isik-bekcisi/decisions/2026-10-06-kamera-yakin-bekci-buyuk-arayuz-kalin.md`, `...-fener-nobeti-son-beste-bir-kusatma.md`.

**Why:** both touch camera framing, halo radius scaling and the brood — exactly what the parallel halo rework changes, so numbers measured now will shift.

**How to apply:** when the halo work is merged, re-measure the keeper's on-screen size before proposing zoom values, then produce the screenshot options; ask the user to pick A/B/C for the soot economy before writing a design note. Check the vault `_overview.md` for what the halo rework actually changed. Related: [[isik-bekcisi-project]], [[ui-and-base-preferences]].
