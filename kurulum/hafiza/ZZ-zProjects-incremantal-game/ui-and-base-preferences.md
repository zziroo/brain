---
name: ui-and-base-preferences
description: "The user's stated preferences for game UI and structure after playing Işık Bekçisi — distinct look per game, a base to walk around, info shown where the cursor is"
metadata:
  node_type: memory
  type: feedback
  originSessionId: 6d8df6c2-d2f6-41a4-acee-7bc01a447e7f
  modified: 2026-10-02T15:12:41.177Z
---

Three preferences the user gave after first playing [[isik-bekcisi-project]] (2026-10-02):

1. **Each game needs its own interface identity.** "Genel UI tarafı diğer oyunumuza çok benziyor. UI için çalışma yap." The two games built in this session shared emoji icons and gold pill buttons with a drop ledge; that sameness is what they objected to.
2. **Between runs there should be a place, not a menu.** They disliked the upgrade screen appearing straight after a run and asked for a base area with things (possibly NPCs) to interact with, where even the skill tree is opened by interacting with something.
3. **Information belongs where the eye already is.** A details panel pinned to the far right felt wrong while browsing the tree on PC; they want it to open at the hovered item.

4. **No waiting; more to do with the hands** (second round, same day). Filling a beacon by standing next to it felt long and empty; they suggested a second lantern mode aimed where you look, praised the flare's visuals and asked for more active, animated skills like Shelldiver's. They also notice when a limiter stops limiting (oil that never ran out late). They offered these as suggestions and left the decision to Claude ("sen karar ver"). Apply: gate progress with what the player is already doing, give the character a few active skills with strong visual feedback, and check that every limiter still bites late in the game.

**Why:** these came from actually playing, so they reflect taste rather than a guess; (1) and (3) will apply to any future game or UI for this user, (2) to any run-based game.

**How to apply:** when starting a new game for this user, design the UI language from that game's theme instead of reusing the previous one's components (own icons rather than emoji, own button/panel shapes, own type). Put contextual info in a tooltip/popover next to the hovered thing, with a docked fallback on touch. For run-based games, plan a walkable hub from the start. The decisions taken for this game are in the vault note `10-Projects/isik-bekcisi/decisions/2026-10-02-kamp-gezilebilir-us-ve-ayri-arayuz-kimligi.md`.
