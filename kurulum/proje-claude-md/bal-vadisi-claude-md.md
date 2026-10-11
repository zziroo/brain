# Bal Vadisi (Honey Valley)

2D incremental/idle game: bees fly from a hive to flowers in a meadow, bring nectar back, honey buys upgrades.
Vanilla JS + Canvas 2D, no build step, no dependencies. All art is procedural (drawn into offscreen canvases), all sound is WebAudio synth.

## Run
- `node serve.mjs` → http://localhost:5173 (or `preview_start` name `bal-vadisi`). Opening `index.html` directly also works.
- `?speed=N` fast-forwards the simulation (1–50).
- Console: `game.give(n)`, `game.S` (save state), `game.D` (derived stats), `game.W` (world).

## Publish
- Live at https://games.ziroo.net/bal-vadisi/. The games list (https://games.ziroo.net/) lives in the ziroo-edge repo
  (`www/games/`, published with `bash deploy-www.sh games` there); `deploy/deploy.sh` here only publishes `bal-vadisi/`.
  The old https://diskort.ziroo.net/games... addresses redirect there (301, ziroo-edge repo).
- `bash deploy/deploy.sh` copies the static files onto the VPS (`/opt/ziroo-www/games`); read the header comment
  first (CSP: no inline scripts/styles, no CDNs).
- Deploying is the user's call — don't run it without being asked.

## Layout
Classic scripts sharing globals, loaded in this order (see `index.html`):
- `js/util.js` — math helpers, `fmt()` number formatting
- `js/i18n.js` — `STR` (tr/en) and `T(key, ...args)`; every user-facing string lives here
- `js/data.js` — balance tables: `FLOWERS`, `UPGRADES`, `PERKS`, `ACHS`, constants
- `js/state.js` — save state `S`, derived stats `D` via `recalc()`, save/load, `bulk()` cost helper
- `js/audio.js` — `Sfx`
- `js/sprites.js` — procedural sprites (`SPR`)
- `js/world.js` — simulation `W`: flowers, bee state machine, golden flower, particles
- `js/render.js` — camera/view `V` and all canvas drawing
- `js/ui.js` — DOM panel (`UI`): upgrade cards, queen (prestige) tab, achievements, toasts, modal
- `js/main.js` — purchases, prestige, offline progress, main loop, input

## Conventions
- After changing anything that affects stats call `recalc()` then `syncWorld()`.
- New text → add to both `tr` and `en` in `i18n.js`.
- Balance changes: load `tools/balance-sim.js` in the page and run `simulate({...})` to see milestone timings
  (targets: tulip ~1 min, first prestige worthwhile at ~20–30 min, later species need prestige).
- The preview pane throttles `requestAnimationFrame` when hidden; drive the sim manually
  (`updateWorld(dt)` in a loop, then `draw(0.016)`) when testing there.
