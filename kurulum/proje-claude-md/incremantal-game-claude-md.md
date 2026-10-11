# Işık Bekçisi (Lightkeeper)

Run-based incremental game (the Shelldiver / Rock Bottom genre, not an idle game): the keeper lives at a camp,
walks out through its north gate with a lantern, oil is the run limiter, holding light on spirits captures them,
and sparks are spent on a constellation skill tree back at camp. Beacons close each of five zones; the last one
leads to the Heart of Night and the ending.
Vanilla JS ES modules + Canvas 2D. No build step, no dependencies, no asset files (art and sound are procedural).
Desktop only: keyboard + mouse, and a gamepad (Flow: Gamepad). No touch controls, no mobile layout; on a device with no fine pointer at all
(`any-pointer: fine` false) the title shows a note instead of the play button (`noMouse()` in `ui.js`).

## Run
- `node serve.mjs` → http://localhost:5174 (or `preview_start` name `isik-bekcisi`). ES modules need http, not file://.
- `?speed=N` fast-forwards a run (1–20).
- Console: `game.S` (save), `game.ST` (derived stats), `game.R` (current run), `game.Camp`, `game.scene()`,
  `game.give(sparks, dust)`, `game.launch(idx)`, `game.camp()`, `game.sky()`, `game.Sound.levels()` (the volume nodes),
  `game.UI.mark()` (the coach mark that is up).

## Flow
`title → camp → run → summary → camp …`, plus `sky` (the skill tree, opened from the telescope) and `ending`.
- **Camp** is a place, not a menu: the keeper walks with WASD / the arrow keys and uses what is in reach with
  E / Space / Enter. A click on a station walks over and uses it; the cursor turns into a hand and a label shows
  over anything clickable. The mouse never moves the keeper otherwise. Telescope → sky. Gate → walking through it
  starts a run; Kandil next to it lists lit beacons to start from (a click on the lantern on his pole). Puhu's
  board (from beacon 1) → requests. Vırak's cauldron (from beacon 2) → a brew for the next run. Campfire →
  journal: the chronicle (the story so far, in the keeper's words) and the records.
- **The keeper's lantern** (`fener`, "Bekçi Feneri", the "0th upgrade"): a new game starts with no lantern and just
  its cost (3 sparks) in the purse. Kandil lights the lantern at the gate every evening, so without one he keeps the
  gate shut (`gateClosed()` in camp.js): the fence runs straight across the gateway, two bars are drawn there, the
  road's name over it is faint, no arrow. Only the keys walking into it get Kandil's `k_nolamp` in a bubble, once a
  push: again only after walking away from the gate and `NAG_AGAIN` (6 s), never over another resident's bubble
  (walking up to him at the shut gate counts as his push line). The first greeting is Ülker's `u_lantern` (to the
  telescope); both have a no-lantern line of small talk (`noNode: 'fener'`); `kandil.wick` ("every night I light your
  lantern") waits for the first run (`minRuns: 1`), like the journal's first page. Lit in the sky, the gate opens;
  back from the sky Kandil's `k_first` ("the gate is this way") is said, still before the first run. The keeper is
  drawn without the lantern, and without its pool of light (only a faint glow), until it is owned. Old saves (a run,
  a lit beacon, time on the road, or any star) get it free on load (`loadGame`, purse untouched); a save with none of
  these gets at least its cost in the purse. `depart()`, `travel()` and `journey()` in main.js refuse to set out with
  no lantern (`game.launch` from the console does not ask).
  A request that cannot be done from where runs start now is not offered, and is taken down at once (`ok()` of its
  type in quests.js, `reachable()`): crystals live in the cavern, husks and thorns before the last beacon, elders,
  golden and shy spirits likewise (nothing roams the arena approach), shades only until the Heart is beaten (it calls
  them), while moths come wherever the keeper is. One that still can be done goes after four runs with no
  progress, unless it adds up across runs and is half done.
- **Talking** is the second action at a station: F, or a click on the resident (body or head) rather than their
  station; the prompt shows both ("E Gökyüzüne bak ◇ F Konuş"), and where there is nothing to use (Kandil before
  the first beacon) E talks too. A resident with an unheard conversation has a speech-bubble sign over their head
  (cool, three dots, its tail pointing down at them), beside the station's own sign for what is waiting there (a warm
  diamond: a star, a request done, a brew, a new page; the gate's arrow hangs in the gateway). The shape says the kind
  before the colour does; each sits on an ink plate with the hairline double frame, bobs, and opens its outline out
  once every 2.2 s (neither with `prefers-reduced-motion`); the speaker's own is the same bubble in warm, its dots
  running while the line types itself (`drawSigns()` in campart.js). camp.js (`signs()`, `talkSignPos()`) says where
  each one's middle is, and a click within reach of a sign is on it before anything drawn behind it (`clickTarget()`:
  Kandil's bubble over his lantern), so the cursor and a click find a sign where it is drawn; the gate's arrow, in
  the gateway, is never a target. F plays the conversation in the **plate** at the foot of the screen (portrait,
  name, the line typing itself; E / Space / Enter / F / a click show the line whole, then go on; Esc closes it).
  Otherwise F gets a line of small talk in a bubble (it stays inside the window: wider, and moved down towards its
  speaker, when the speaker is near the top of a low one). Walking up to a resident makes them say something once per
  visit, unless they have something new (then the sign invites and they wait to be asked). Once the camp is live
  and the keeper on their feet (`campUp()`; the greetings count only while the camp is live), a resident remarks
  on the expedition just ended (a beacon, a record, a moth bite, the Heart…), then whatever is waiting (a request
  done, a star affordable, a brew ready); the very first visit is Ülker's call to the telescope (no lantern), then
  Kandil's "the gate is this way" (above). The story is in
  `story.js` (chapters = beacons lit, then the epilogue).
- The camp grows with progress: residents arrive, a lantern post is raised and a garland lamp is lit per beacon.
- **Between scenes** every change is something happening in the world, soft and quick (a player does ~45 runs):
  - Out of the gate from the camp: no cut. The run starts on the frame the keeper crosses the gate line, Kandil's
    lamp lights the lantern (a spark leaps over, the halo grows over `KINDLE`; it cannot be focused until lit, so a
    button held from before brings the beam up after), the camera glides to the run's framing, the HUD fades in,
    coach marks and the zone title wait in ui.js's queue until that has settled (`UI.holdHints`).
  - To a beacon (the gate when one is lit, or Kandil's list): a journey. The night closes round the keeper walking
    on, the place is named on the dark ("2. FENER'DEN"), the run opens round the lantern lit by the beacon's flame.
  - The run's end: out of oil the flame gutters out, the dark closes, music and ambience fall away and the last ember
    drifts home (south); the fifth beacon keeps its celebration; ended from the pause menu it is short. Beacons 1-4
    had their celebration in the run, which then ends the usual way; the summary is titled for a beacon lit on the
    run and lists it (`sum.lit`). The summary fades up and its numbers count in.
  - Back at camp (from the summary or the ending): the keeper wakes by the fire, the picture opening from its light
    while the camera eases back; the keeper gets up and only then (`campUp()`) is the camp live and do the
    residents speak.
  - Camp ↔ sky: a round iris (the telescope's eyepiece) closes on one and opens on the other. Title → camp: the
    title fades away over the camp and the keeper, sitting by the fire under it, gets up. Into the ending: the
    slow white fade.
  - With `prefers-reduced-motion` all of these are short plain fades, nothing glides, slides or counts.
- **Run controls / skills**: WASD / arrows walk; the lantern points at the mouse cursor (with no cursor on the page
  it turns with the walk). Holding the left mouse button (or F) focuses the lantern: the halo shrinks and a beam
  reaches towards the cursor and hits much harder (`BEAM`); its heat fills the lantern's glass, which shows it, and
  held until the glass is full the beam overheats and is locked a while (`HEAT`, below). Space: flare (a star).
  Shift / Q / right click: dash (a star), along the held keys, else towards the cursor. Bottom right shows the three
  with their keys and cooldowns (indicators, not buttons; the focus's plate is full while the glass is cold and drains
  as it heats, as the others are full when ready, refills towards a mark while the beam is locked and pulses once as it
  unlocks): the precise readout. Nothing depends on the mouse
  cursor being on the page (the gamepad, below), and nothing is drawn at it. The camp's gate posts are solid in a
  run too.
- **Gamepad** (slices 1 and 2: the whole game is playable with the pad alone; `input.js` `pollPad()`, called once a
  frame at the top of `frame()`): the first pad that reports
  the standard mapping (`mapping === 'standard'`; Xbox names, a PlayStation pad's are in the same places); one with any
  other mapping is ignored entirely (its buttons and axes sit in unknown places: a mapping table for those is for a later
  slice, so it is not guessed at); with none nothing changes, and one unplugged lets go of everything. `pollPad()`
  allocates nothing per frame (module-level button arrays swapped, scalar deadzone results). Run: the left stick walks (its direction at the keys' speed: the
  walk is a balance number, so a half-tilted stick does not creep), the right stick turns the lantern (its direction
  from the keeper, honoured only while the pad is the last device touched (`padUsed()`; a stick pushed anew takes it
  back, a mouse that has moved takes the aim even if a stick is still held); at rest the lantern turns with the walk, as
  with no cursor, and keeps its way while standing; with the mouse last used the cursor aims exactly as with no pad), RT
  held focuses (`beamHeld`; held above 0.35, let go below 0.25), RB flares, LB dashes (one line of `PAD_PRESS`, to drop
  with the dash), Start pauses; the face buttons do nothing in a run. Camp: the left stick walks (only it and the keys
  walk out of the gate), A uses (E), X talks (F), Start opens the settings. Conversation: A goes on, B closes (Esc).
  The title, the summary and the ending: A presses the selected button (below), else `goOn()` (shared with Space /
  Enter). B and Start close the settings (and the erase question over them), a
  panel, the sky (`goBack(how)`, shared with Esc / P; B ends a conversation, Start does not). Both sticks have a 0.22
  radial deadzone. Presses are edge-detected into `input.js`'s latches (A sets `use` and `ok`, X `talk`, RB `flare`, LB
  `dash`, B `back`, Start `menu`; the D-pad and the left stick on a menu `nav`, LB / RB also `page`); `ok` / `back` /
  `menu` / `nav` / `page` are taken every frame by `padPress()` in main.js (discarded while `busy`), so every
  existing guard holds for the pad. `releaseKeys()` holds the left stick off until it is back at centre and RT until let
  go (a stick held through the summary does not walk the keeper out), as the page losing focus or being hidden does.
  Any stick out of its deadzone or button held counts as someone at the controls (`idleSeconds()`). The last device
  touched (`padUsed()`: a pad press or a stick leaving its deadzone; a key, a click, the wheel, or the cursor moving more than 4 px in all from where it was when the pad
  took over gives it back: a slow mouse adds up) sets the glyphs: coach-mark caps (ui.js `PAD_CAP`: WASD → left stick, the mouse → right stick, left click /
  F-for-the-beam → RT, Space → RB, Shift / Q / right click → LB, E / Enter → A, F → X, Esc → B; a row's own text for the
  pad as key + `_pad` in i18n.js, the same button said once where caps stand together), the skill corner's labels, the
  camp's prompt (round A / X), the conversation plate's B / A and the title's line (`hintPad`); with the pad in hand the
  cursor is hidden over the camp and the run and the camp's hover marks nothing. Sound: a gamepad press is not a user
  activation, so a context made after the pad's A on the title stays suspended; main.js keeps a permanent capture-phase
  `pointerdown` / `keydown` listener that resumes it (`wakeAudio()` in audio.js; `initAudio()` is as it was) and, once
  per page load, when the pad is used past the title with the context still suspended, says `audioWake` in passing
  (`UI.hint`; never with `Sound.silent`, i.e. on a test page, nor with the sound off).
  **Menus with the pad** (slice 2). The D-pad, or the left stick pushed beyond 0.5 (well past the walking deadzone),
  moves a selection: the first move at once, then again after 0.35 s and every 0.12 s while held the same way (of eight;
  `menuNav()` in input.js, latched as `Input.nav` with the way in `navX` / `navY`). It means something only on a menu
  (`navScope()` in main.js: the settings plate, the erase question, a resident's panel, the sky, the title, the summary,
  the ending); in a run, at camp walking and in a conversation the D-pad does nothing (only the left stick and the keys
  walk, so the gate rule is unchanged). A menu opening or closing (or a change of scene holding the input) calls
  `navHold()`: a D-pad or stick held from before (walking up to a station and pressing A) moves nothing until let go.
  - The sky (sky.js `skyPadStart` / `skyPadNav` / `skyPadPress`): as it opens with the pad in hand the lantern (or the
    star the pad selected last, `padLast`) is selected, its details box beside it as for a hover (the pad's selection
    is `pinned`, so the hover does not take it; the mouse moving takes it back, `padSel` false). A push selects the
    nearest star that way on the screen: within 50° of the push (else 80°), scored by distance × (1 + 2 (1 − cos)); none,
    it stays. The selection wears the hover's dashed ring plus a small compass (a hairline circle, four ticks pointing in:
    `padMark()`). A lights it through `tryBuy()` as a click does, never blind: A with no pad selection (or the mouse's)
    only selects; a selection less than 0.25 s old (`PAD_SEEN`) waits; nothing in the sky's first 0.65 s (`quietUntil`).
    A star selected off the screen (or under the purse, the way back, the horizon) is glided into view (`followPad()`).
    The canvas cursor is hidden with the pad in hand.
  - The plates (ui.js, the block "the pad's selection on the plates": `navMove`, `navPress`, `navPage`, `padRing`): the
    game's own selection, not the browser's focus (Space / Enter would press a focused button). Its list is the menu's
    visible buttons and volume sliders in page order (a panel's close button last); a move goes to the nearest control
    wholly beyond the selected one's edge that way, a step off the line counting double (`navNext()`). It opens on a
    default (`navSerial` bumped as a menu opens): Resume / Close on the settings, Cancel on the erase question (erasing
    takes a move right and A; after Cancel the selection is back on the erase button), the run's start already chosen
    on Kandil's list, the first request done / brew on offer, the journal's open page, else the primary button. A panel
    drawn anew (claimed, drunk, page turned) keeps the selection's place in its list. On the settings left / right moves
    a volume by its step (heard at once through the slider's own `input`; saved by its `change` once left alone 0.45 s,
    or as the plate closes) and switches the sound and the language. In a panel up / down scroll its body while what is
    next that way is out of view (the journal's pages); a selection scrolled out of view goes to the nearest control in
    view, or is not drawn and A presses nothing. A presses the selected control with `.click()` (its own guards hold),
    not within 0.5 s of a panel opening (`panelAt`, the press that opened it doubled) and not on a slider. LB / RB turn
    the journal's page. It shows only while the pad is the last device touched: a cool hairline frame 6 px out with a
    small diamond at each side (`#padRing`, positioned every frame) and the control lit as its hover lights it
    (`.padFocus`); with the mouse last used nothing of it shows, and every mouse flow is as it was.
  - Pad wording: a star's description that names its keys has a `_pad` text (`d_parlama_pad`, `d_atilim_pad`), the
    details box's "click to light" is `st_click_pad`, and the sky's mark `h_sky_mouse` says `h_sky_mouse_pad` (stick to
    choose, A to light); the details box follows `padUsed()` as the other glyphs do.
  Still mouse-only: nothing a player needs. The sky's pan and zoom are the mouse's (the pad's view follows its
  selection). A device with no fine pointer still gets the title's note instead of the play button, pad or not.
- **Skill signs**: a skill cooling down shows only in the corner (the flare's and the dash's indicators fill a ring as
  they come back); nothing is drawn on the keeper meanwhile, so the keeper stays legible. Only the moment one is ready
  again shows on the keeper (`readySigns()` in render.js, over the dark and the glow): the flare's as a brief warm bloom
  at the lantern, the dash's as a small puff of dust at the feet (fx.js), each with its chime (a high one for the flare,
  a lower one for the dash); with `prefers-reduced-motion` a brief brighten only (the dash's on the ground there). A
  press too soon gives the muffled click and blinks that skill's indicator twice (`.skill.no`, from `skillNo` in
  ui.js; once with less motion; not for a press during a dash), every press anew (one while it still blinks starts the
  blink again); the beam's while locked does the same. Nothing for a
  skill not owned or while the lantern is being lit. `watchSkills()` in run.js makes the events (`skillReady`,
  `skillNo`), fx.js keeps when each skill came back (`FX.skill`, in run seconds: a pause freezes it), audio.js sounds
  them.
- **The beam** is shaped by stats (`beamHalf`, `beamReach`, `beamPower`, `beamWidth`, `beamCost`, `beamRamp` in
  `BASE_STATS`) that the Mercek line of stars (odak → huzme → isin → mizrak, off the flame spoke) changes: a wide
  torch cone early, a spotlight mid-game, a laser in the last zones. It is a cone never thinner than `beamWidth`.
  Odak and Hüzme narrow the cone; Işın and Yıldız Mızrağı make it no thinner (a hairline laser was hard to keep on a
  moving target): they straighten it into a band as wide as the spotlight is about 300 out, the middle of the screen
  (`beamWidth` 12 → 30 over Işın's five levels: ±30 world units plus the target's radius, about ±35 px on a
  1440×900 screen in the ruins), and give reach, power and piercing instead. The beam splits every prism in its way
  into rays and, with Işın or Mızrak, pierces it (`beamPierce`: 24 % of its strength goes on past a prism with Işın I,
  40 % with Işın V, all of it with the whole line; past the k-th, `beamPierce`^k; run.js `aimBeam()`: `R.beamLit`
  the prisms it splits, `R.beamCuts` where it passes through them, `inBeam()` / `beamThere()` the share left); without,
  it ends on the first. A prism a gnawer eats from swallows it, pierced or not, and so does the Heart. What a pierced
  beam falls on takes its share (`shineOn()`: `e.beamF`; never less than the halo where the halo reaches it), and so do
  Dağlama's burning (`e.searK`) and what it burns off a beacon's base, a waymark lamp or the dawn circle (`R.beaconBeam`,
  `R.wayBeam` and `beamOnCircle()` are that share, 0 off it). A beam pierced down to under `BEAM.hold` (0.2) of itself
  (past two prisms or more, short of the whole line) is faint light: it lights by its strength as the halo does (src
  `'halo'`: it holds the night, it does not finish it) and holds nothing (`e.beamed` false: no heat, Dağlama, daze,
  knocked-down pounce, slowing, balked call, nothing burned off a beacon, a lamp or the circle). What it is held
  on heats up and takes more (`RAMP`). `lensStage()` (0..1) is what drawing and sound follow: the late laser is drawn
  as wide as it hits (its sheath about `beamWidth` each side, a bright body, a white-hot core a few units across),
  intense by its light, not its thinness; past a prism it pierces it goes on as much fainter as it is weaker
  (render.js `beamShape()` / `beamSegs()`: the joins drawn where the run cuts, its `R.beamCuts` projected onto the line
  drawn; the pieces and cuts reused every frame). On the Heart it is drawn to the Heart's shell as drawn, where its
  impact is (`heartHit()` reads the beam's end). Perks: Dağlama (what the beam leaves
  keeps burning), Kırılma (captures split into rays). Focusing burns oil faster: `focusCost()` × the normal burn,
  lowered by Damıtık Yağ; never while oil is free.
  Focusing does not move the camera (`js/view.js`: the framing never depends on the focus), so what the player aimed
  at stays under the cursor; it used to lean along the beam, the world slid under the cursor and the aim drifted. The
  late laser reaches past the screen's edge either way (`ST.radius × ST.beamReach`, about 1340 in the cavern and 1490
  in the ruins against a view about 486 world units from its middle to its top: averaged over every direction 42-50 %
  of its reach is on screen on a 16:10 or 4:3 screen, 56-67 % with the old lean). Focused, the keeper steadies the
  lantern: the walk's sway and bob fade out of it over 0.15 s and come back over 0.3 s once let go (render.js
  `steadyLamp()`, drawKeeper's `steady`), and the beam is drawn from the lantern to where the run's beam ends, which
  the run reckons from the keeper's feet (`R.p`, which do not sway), so neither its source nor its tip wobbles.
  Drawing only.
- **The lantern's glass** (`HEAT` in `data.js`, `heatGlass()` in `run.js`): its heat is a resource, like a stamina
  wheel or a weapon's overheat (`R.heat`, in seconds of the beam held; full at `glassTop()`, the grace and the span:
  5.5 s at first, 8.5 with the whole Mercek line). Up, the beam heats it; for the first `ST.heatGrace` seconds (3, +3
  with the whole Mercek line: 0.1 / 0.15 / 0.2 / 0.25 a level, so the late laser can sweep a wave) nothing changes. The
  `HEAT.span` (2.5 s) past that is the red, the warning: the beam weakens towards `HEAT.min` (50 %) of its strength and
  sputters like a choking flame, a dip now and then (`glassDip`; `R.dip` 0..1: down to `HEAT.dip`, 38 %, of what it
  was, for 80-120 ms, `HEAT.dipT`; 0.7 dips a second at the start of the red rising to 2 at its end, `HEAT.dips`),
  none in its last second (`HEAT.quiet`) but two quick stutters as the flame dies, 0.55 and 0.3 s short of full
  (`HEAT.stutters`, `stutterT`), each once a climb to the top (`R.stuttered`: again only after the glass has cooled out
  of the red, so taps at the top do not stutter it on and on). Every darkening the glass makes is counted in one place,
  `R.dipAt` in `heatGlass()` (when the last three began): the dips, the stutters and the overheat (the beam going out).
  Whatever the presses do (taps, holds and releases near the top), no dip begins within half a second of the one before
  (but a stutter) and nothing darkens while three began in the last second: at most three in any second, and drawing
  adds no flashes of its own (the lock's halo is not one: below). Let
  go, the glass cools after `HEAT.wait` (0.25 s) at a steady rate, full to cold in `HEAT.cool` (1.2 s); pressed again,
  the beam goes on from the heat it has, so a tap leaves a little that drains away. Full while held, the glass
  overheats (`glassOut`, `R.out`, `R.outAt`): the beam goes out and is locked while the glass cools, more slowly (full
  down to `HEAT.unlock`, 40 %, of it in `HEAT.lock`, 4 s); there it unlocks (`glassReady`, `R.readyAt`) and cools on to
  cold if left. The lock's cost is the halo: from the overheat to the unlock it stays as small as when focused
  (`R.narrow`, eased as `R.focus` is and equal to it but while locked and opening again after: the halo is nearly always
  drawn in by the focus already when it overheats, so it hardly changes then (after a short let-go it may be part way
  open and eases in over about 0.2 s, steadily, no flash), and it opens again, eased, at the unlock, held or not), so
  the night is closer (`lightRadius()`, `R.reff`, `smothered()` and all that reads the halo's radius follow: what it
  holds and catches, the brood's distance, the bot); a rule in run.js, not drawing. A press while locked is too soon (`skillNo('beam')`: the skills' muffled click and two blinks of the
  corner); held through the unlocking, the beam waits for a new press (`R.again`), and pressed again right away it
  starts from the 40 %, so a holder overheats again the sooner. Locked or waiting, the lantern is as if let go but for
  the halo (walking at full speed, no focus oil; `up` in `updateRun()` is false, so `R.focus`, `focusOn` / `focusOff`,
  the beam and the oil all follow; the halo stays drawn in while locked, above, and is full while waiting) and nothing
  that needs the beam works. Oil, reach and width are unchanged by
  the heat. `glassK()` is the share let through (the weakening and the dip) and `beamK()` includes it, so everything
  the beam does by its strength follows (spirits, the night, shades, the Heart, prisms and their rays, the beacon's
  kindle, Dağlama, Kırılma); what is not about strength does not (a shy spirit freezing, a pounce knocked down, a moth
  or a sootling slowed, a gnawer dazzled), and what clings is burned with the whole beam however hot the glass
  whenever the beam is up (`beamWhole()`): the sootlings on the keeper's glass, and those on a beacon's base, both by
  the beam on the beacon and by the beam on them (with what they are held in it for, `RAMP`, as before the glass).
  Locked, nothing burns through the glass. It does not heat while the beam cannot be up (a dash, the lantern being lit,
  locked) nor in a beacon's `LIGHTING` or the afterglow: it cools then. `glassHot` as it gets into the red,
  `glassCool(over, held)` as it cools out of it, always in pairs (`R.hot` between; over: it overheated meanwhile,
  `R.over`; held: the button is held then, `R.held`).
  The beam itself carries the heat, where the eye is (render.js; `overheat()`, 0..1 into the red, `lockK()`, `R.dip`,
  `R.out` and the times are what drawing, the HUD and sound follow), and reads as weakening, never as stronger (a red-hot
  beam with ember flecks was tried and read as a beam hitting harder): under the grace it is clean; in the red it
  washes out into a feeble leak of light (`beamShape()`: `red`, eased, most of the way by the middle of the red, all of
  it at the top; `LEAK`): its colour gone, pale and dim, its glow and its opening in the darkness down to about two
  fifths, its line thinned to about a third and its cone drawn about half as wide (drawing only: what it reaches is the
  run's), and where it lands pale too. The red is only at the source: the lantern's glass, red-hot (`hotGlass()`), with a
  compact red glow and a wider one reaching outward only, both on the side away from the keeper (`redGlow()`: its
  middle 0.4 of its radius out; the wide one an ellipse that stops short of the keeper), so the keeper's face is kept
  clear (at the top of the red under a tenth of added red at their middle and head, about a ninth with the laser's
  flare), and the beam's first short stretch at its mouth, fading out. The
  thinning is the cue that is not colour. Every dip takes the whole beam down, its opening in the darkness and its glow,
  never to black (`dim`). The lantern shows it too, as a second sign, at the lantern and the keeper's
  face kept clear: under the grace nothing but a faint warming of the glass in its last half second; in the red the
  glass goes from orange to red-hot and glows wider (`glassTint()`, `hotGlass()`), thin steam wisps rise off it, sparse
  and more as it gets hotter, drifting outwards away from the face (`glassSteam()`), and in the last second before full
  the lantern trembles in the keeper's hand by a pixel or two (`glassJitter()`, `drawKeeper(..., jit)`: the sprite, not
  the camera). Overheating, the dying flame stutters twice, then the beam pulls back from its tip into the lantern over
  0.25 s (`beamNow()`, from the last beam drawn), a puff of steam and a few sparks rise at the lantern (fx.js) and a
  hiss sounds (audio.js); the halo, drawn in by the focus, stays so (the lock, above: the light does not choke or flash
  as it goes out); locked, the glass glows a dull red that fades as it cools towards unlocking (`glassDull()`);
  unlocked, the halo opens again and a small clean glint crosses the glass, a brief warm-white highlight, with the tink
  (`readySigns()`). With `prefers-reduced-motion` the beam pales, thins and dims, steadily, and that is all: no dips,
  stutters, steam, trembling or puff; the beam fades where it is in 0.15 s instead of pulling back, and the
  glint is a plain brighten (overheating and the lock's halo still happen: they are rules).
  The corner's focus indicator (#btnBeam) is the precise readout, and works the same without a mouse, in the flare's
  and the dash's grammar (full: usable): its plate is filled with what the glass can still take, 1 - heat / glassTop(),
  full when it is cold and draining from the top as it heats: one warm (ember) level, out of the red never part red (a
  full plate half red read as already in danger), with a faint line where the red begins (the glass's last
  `HEAT.span`); once the heat has got there, what is left of the level, all of it below the line, turns red
  (`#btnBeam.hot`). Two `background-image` layers set from ui.js: the line (`--w`) over the level (`--a` the red's top,
  `--b` the level; `--lvl-r` is the ember tint but with `.hot`); its sign reddens with the red (`--heat`: held towards the lit look, let go towards the idle one, so the
  cooling ends where idle begins; inside `@supports` for `color-mix`); locked, it is dimmed on a sooty ground, the
  level dull, refilling from the bottom as the glass cools, the line a pale mark where it unlocks (`1 - HEAT.unlock`,
  `#btnBeam.out`: no ring, the level and the mark read without motion); unlocked, it pulses once (`#btnBeam.ready`, a
  brief brighten with less motion); a press too soon blinks it twice (`.skill.no`), every press anew.
  The halo's rim reads it out where the eye is, at any zoom (render.js `heatRim()`; late in the game the glass is a
  dot, the laser's paling a thin line and the corner far away): nothing under the grace; in the red one continuous
  ember arc on the rim at the halo's radius (`R.reff`, narrowed with the focus and the lock), 330° (`RIM_SPAN`) as the
  red begins, draining from both ends towards its middle as the glass heads to full (wide: hold on; gone: it
  overheats), an ember glow at each draining end, thicker and redder as it heats; a slow swell added over it (never
  under it: no darkening), quicker in the last second; locked, a dull red arc refilling from its middle outwards as
  the glass cools towards unlocking; at the unlocking one soft brighten, with the glint. Its middle is the aim, eased
  the short way round (`rimAim`, so a flick does not whip it). Line widths are in screen pixels. With
  `prefers-reduced-motion` no swell, the brighten short and plain. No segments, ticks or pips: light on the light's
  rim, not a weapon's HUD. Centred on the aim, it meets the beam where it leaves the lantern (chosen in play over an
  arc behind the keeper).
  A high sizzle with crackles rises with the heat, clearly heard and still under the beam's hum, a soft choke at each
  dip, a hiss as it overheats, a tiny tink as it unlocks (audio.js, in the night beds). With `RAMP` it makes the
  rhythm: hold on a target 2-3 s, let go, re-aim.
- **Light that sets off more light** (stars; `knockOn()` and the section after `updateSear()` in `run.js`, the tables
  `POOL`, `REFRAIN`, `IGNITE`, `TRAIL`, `STARFALL`, `AKKOR` in `data.js`): every Flare leaves a pool of light that
  lights what is in it like the halo for 3 s (Işık Gölü, tier 0); every 10th spirit of a chain sets off a small
  Flare, as wide as the halo, at 40 % (Nakarat, tier 0); a spirit caught by sudden light (`IGNITERS`: a Flare, the
  dash, a chain zap, a crystal's or a husk's burst, split light) bursts in turn and gives a third of its light to what is near
  (Tutuşma, tier 1); the dash leaves embers that burn for 1.5 s (Kor İzi, tier 1) and ends in a half Flare (Kayan
  Yıldız, tier 2); what a chain zap strikes burns on and takes the light the zap got into it once more (Akkor,
  tier 3). They feed each other and the older stars through `capture()`, and each is bounded: scaled to what set it
  off, or the lantern's light for a set time; a Tutuşma burst sets off no other, Nakarat needs ten new spirits for
  each Flare, and every other link needs a new capture. All of it goes through `eachTarget()` / `hurt()`. A Flare a
  star sets off dazes for less (`doFlare(mult, stun, r, src)`) and hurts with `'starflare'` (a Flare to everything:
  `BURSTS`, `IGNITERS`, blasting clingers off, Puhu's Flare request; but knock-on light to the night's great ones,
  below; the keeper's own Flare is `'flare'`). Pools light what is in them once a frame however many
  overlap. Pools, embers and fireflies hurt with `'light'` (the halo's own light is `'halo'`), so a husk keeps out as
  much of them as of the halo (`SHELL.armor`), but the brood takes them in full (they only hold off the halo's own
  light, `SOOT.halo` in `updateBrood()`), and unlike the halo they finish the night (below): a dash through a swarm
  leaves it burning. A sootling burned is not caught: it sets off no Tutuşma burst and does not count for
  Nakarat; a Flare a star sets off blasts clingers off like the keeper's own. A beacon lit at the end of its siege
  burns the sootlings about it (not the great ones) and catches the spirits it called with `'beacon'`: a burn and a
  capture like a husk's flock's, not an igniter, not in `BURSTS`, not in `KNOCK_SRC`. The pools, embers and what Akkor set
  ablaze (event `ablaze`, `e.ablaze`) are the run's state (`R.pools`, `R.trail`, `R.ablaze`), drawn by
  `render.js`; the run's end clears them and the queue, and nothing of a run goes on in the frame the Heart's death
  ends it.
- **The halo holds the night; deliberate light finishes it** (`HALO` in `data.js`, `hurt()` in `run.js`): the open
  lantern's own light (src `'halo'`) wears what is of the night (`ofNight()`: the brood, moths, shades, thorns) down
  to `HALO.floor` (30 %) of its strength and never further. Everything else finishes it: the beam, every Flare (the
  stars' too), the dash, chain lightning, Tutuşma, pools, embers, Akkor, split light and prism rays, Dağlama, a
  crystal's or a husk's burst, the fireflies. Spirits the halo still takes in full (the Heart is not worn down at all:
  light cracks it, the halo's at `VIGIL.crackHalo` of its strength; the Last Vigil, below). Scorched (at the
  floor, `scorchOf()` 0..1 from 37.5 % down), one smoulders: its moonlit rim turns ember, a dull red glow sits on it,
  a sootling's ragged edge glows (`drawSoot(..., ember)`), it smokes more and sheds sparks (`smoulderOf()` in
  render.js; with `prefers-reduced-motion` steady, no sparks); a scorched sootling crawls slower still
  (`SOOT.scorch`). Held by the halo they still come on: sootlings crawl in, crouch and pounce, so a ring of them
  ignored means clings; a moth's dive through the halo, a shade on the keeper's heels, live through it.
- **Later zones want the beam**: shelled spirits (`SHELL`, swamp onwards: the halo barely scratches the husk; each
  guards a flock, below), prisms in the cavern and ruins (`PRISM`, placed in `world.js`, a flock around each), night
  thorns in the ruins (`THORN`: an oil-draining aura wider than any halo). The Heart opens after calling its shades
  (`BOSS.open`): a beam on it then cracks it, and fills the dawn circle, twice as fast (`BOSS.openK`; the Last Vigil, below). Each is introduced by a coach mark beside it, through
  `emit('meet', what, thing)`.
- **A husk's flock** (`makeShell()` / `breakHusk()` in `run.js`, `SHELL.flock`, `SHELL.burst`): every shelled spirit
  (also one in a prism's flock) comes with 4-6 spirits gathered round it under its husk (`w.ward`: the husk,
  `sh.flock`: they), pale and dim, hung from it on thin threads (render.js `drawThreads()`; they fray as it cracks,
  `sh.crack` 1..3: thinner, flickering, and from the second crack one after another parts). While the husk stands
  no light reaches them: `hurt()` ignores them and `eachTarget()` skips them, so neither the halo, the beam, a Flare,
  chain lightning nor the fireflies can pick them off. When the husk breaks, its light bursts out (`huskBreak`: a
  flash, a ring, the threads snapping, a chord): the whole flock is caught at once, each a capture (src `'husk'`:
  the chain, the pay, the beacon's flow, requests, Nakarat and chain lightning react as for any; it is not sudden
  light, so none of them bursts by Tutuşma), and a moment later whatever is within `SHELL.burst.r` takes
  `SHELL.burst.share` of the husk's light (src `'boom'`, like a crystal's burst: an igniter). A husk gone any other
  way leaves no spirit guarded (`guarded()` asks whether the husk is still there). Husks are about half as common as
  before (`SHELL_CHANCE`) and worth about one and a half times as much with their flock, more with what its captures
  set off, so the beam's oil is best spent there. The flock's size is the touchy number (Balance, below). Coach mark
  `h_shell` (break the husk, free its flock).
- **The brood** (karacık / sootling, `SOOT` in `data.js`, `updateBrood()` in `run.js`, `R.brood`): from the meadow
  on, bits of the night break off the dark just beyond the halo, mostly ahead and to the sides, and crawl in. None
  stir behind the night wall, south of the camp, in a lit beacon's light, before the first step, while the lantern
  is lit, in a beacon's `LIGHTING`, on the road to the Heart or at it (those about melt away when it wakes; only what the
  Heart's vigil lets loose comes there: its waves for the dawn circle and its threats for the keeper, `VIGIL.threats`,
  below). The
  halo holds them back and singes them slowly (`SOOT.halo`), but only down to `HALO.floor` (above: scorched, they
  crawl slower still); the beam melts them and all but stops them. One that gets close crouches (a tell) and
  pounces; the beam knocks it down. One that reaches the keeper clings: it weighs them down (`SOOT.drag` of their
  walk each, `R.drag`; not the dash), drinks oil (`SOOT.drink` × the zone's normal burn, in `R.burnK`: the wick gauge
  shows it like a thorn's) and dims the halo (`R.dim`), at most `SOOT.clingMax` counted, until the focused lantern
  burns it off its glass (with the beam up, what clings takes `SOOT.glass` of the beam's light, src `'beam'`; the
  open halo only singes it to the floor), a flare blasts it off or a dash shakes it off (`R.clung`). The chain is
  kept.
  It is felt at the lantern (render.js `gutterOf()`, `sootGlass()`): the flame gutters, more the more of them (its
  halo and glow catch and sink), soot darkens the glass, the light is weaker as well as smaller, and oil drips from
  the lantern while they drink; a hiss that sips in pulses, with now and then a gulp, grows with their number
  (audio.js `updateNight()`). With `prefers-reduced-motion` nothing gutters and nothing drips: the steady dimming is
  all. Coach mark
  `h_soot` says it in its third row (its second: the halo holds them but cannot finish them). Burned (`emit('burn', e, v, src)`, not `capture`), one goes
  up in a puff of soot and leaves a few low-value motes; the brood is darkness, not light: it feeds no beacon, adds
  nothing to the chain and passes on no light (no chain lightning, no Kırılma from it), but every light hurts it
  (it is in `eachTarget()`). The meadow teaches it: one alone every few seconds, the first of a run slowly from
  straight ahead (coach mark `h_soot`, ticked by melting one with the beam); deeper it comes faster, more often, in
  clumps, arcs and pincers, and from the swamp a karabasan (nightmare, `h_mare`, one of the night's great ones:
  below) splits into sootlings when burned.
  In the cavern and the ruins the night comes in waves to mow: broods of 6-9, mostly arcs across the way
  (`SOOT.arc`) for the laser to sweep (the bot sees about 7 on screen in the cavern and 11 in the ruins since the
  camera came in closer: 8 and 13 before, 20-30 at the peaks there; at most `SOOT.max` at once).
  Its numbers, never its toughness, grow with the lantern's power against the power a player brings into that zone
  (`broodGrow()`, `SOOT.at`: m), so a lantern that has outgrown its zone always has something to mow: m^`SOOT.growK`
  as often and m^`SOOT.growK` as many at once (m^0.8 in all; it was m^1 before the great ones took the rest of the
  growth, below). None is ever born inside the light (`broodSpot()`), and a karabasan's pieces tumble out of the burst
  that split it. Quiet Night halves and slows it. Shades and night thorns share its look (same rules as before): ink bodies with ragged,
  smoking edges, pale eyes drawn over the dark (`nightEyes()` in `sprites.js`), the same puff of soot (`smokePuff()`
  in `fx.js`); moths too, but with eyes of their own (below).
  The darkness may hide the world, never a threat (`nightUnder()` / `nightOver()` in render.js, over the darkness
  layer: the glows and the ink under the spirits and the smoke, the rims over them, the eyes on top): each shows
  by its eyes, a faint cold glow round them and a thin moonlit rim on its ink, and out in the dark its body is ink
  again over a faint cold aura, so shape, size and count read beyond the halo. All of it grows with nearness: far out
  mostly eyes, in full within 1.6 × the halo's radius, so the night still emerges but nothing reaches the keeper
  unseen; inside the halo the rim keeps the ink off the dark grounds (cavern, swamp). A sootling about to pounce
  flashes (its rim snaps bright, its glow flares). A moth, a butterfly that lost its own light and craves the
  keeper's, has its own: its eyes give the lantern's light back as a red ember, its wing-dust glints behind it along
  the way it came (speed and heading at a glance), and its wings catch the light as it closes in; before a dive its
  embers flare and its rim snaps bright, wings spread, and in the dive its wing-dust streaks out straight. When the camera
  draws back for a large halo the lines keep their width on screen and the eyes their size down to a zoom of about
  0.74 (`zk` in render.js; since the camera came in closer the zoom at 1440×900 is 1.72 with any halo up to about
  180 (the meadow, the forest), 1.13 in the cavern with a 275 halo and 0.93 in the ruins with 335, so `zk` only
  matters on a low window).
  Nothing lit (the beam, a pool of light) gets the ink. Thorns are drawn whole over the dark.
- **Moths** (pervane, `MOTH` and `MOTH_EVERY` in `data.js`, `updateMoths()` in `run.js`; forest onwards, none on a
  Quiet Night, no new ones once the Heart has woken but for those its vigil lets loose in Şafak, `VIGIL.threats`), like a real moth at a lamp: one flies in out of the dark ahead (never from beyond the night wall or out of a lit beacon's light: `mothSpot()`) to just
  beyond the open halo (focusing does not draw it in) and flutters round the light there, erratic (its pace comes
  and goes, now and then it turns back) but never closing in, for `MOTH.circle[zone]` seconds: the moment to burn it
  with the beam (held in it, it falters) or a Flare (a Flare or a dash dazes it: it hangs, then circles again). Then
  the tell (`MOTH.tell`, `emit('mothTell')`): it stops, faces the keeper and spreads its wings, its ember eyes flare,
  its rim snaps bright, a ring of its ember closes on it and a dry rattle rising to a whine sounds from its side.
  Then the dive (`mothDive`): a straight line at where the keeper stood (a tenth of a second of their walk ahead at
  most), with no steering, so a step aside or a dash dodges it; it takes about `MOTH.diveK` / the walking speed
  seconds (`MOTH.diveT`), so a faster keeper has the same time to react: the tell is what is read. Only a dive bites:
  `MOTH.oil` of the oil (`oilHit` with source `'moth'`, not during a dash, none taken in the afterglow), the chain
  broken, the moth gone. A miss (`mothMiss`) carries it on past; it slows, turns and circles again, and after
  `MOTH.misses` misses it leaves. None come, none begins a tell and no dive bites before the first step, while the
  lantern is being lit or in a beacon's `LIGHTING` (no oil burns then), and none begins its tell where the player
  cannot see it (`mothShown()`: the view as the camera frames it, on a 4:3 screen, from
  `js/view.js`, the same arithmetic render.js frames the screen with): it is held a moment more and goes round
  towards the side the camera shows (`m.hold`; the longest hold the bot saw before the camera came in closer was
  2-3 s, and one held 5 s leaves; with the closer camera a moth circling due south of the keeper is outside the 4:3
  view once the halo is about 140 or more (215 before), so more are held or sent round).
  Dazed in a dive, it stops short. `m.phase` / `m.pt` say where it is (`in`, `circle`, `tell`, `dive`, `out`,
  `leave`, `daze`), `m.ha` which way it faces; drawing, sound and the bot read them. Its wings are heard while it
  is near (a quiet flutter panned to its side, louder as it closes, a whirr in the dive). Coach mark `h_moth`.
- **The night's great ones** (elites; `ELITE`, `GREAT`, `DEATHHEAD`, `GNAWER`, `KONCOLOS` and `SOOT.mare*` in
  `data.js`; `updateElites()` and the sections after `burnOut()` in `run.js`; `e.elite`): one kind to each zone, each
  with a verb to read and answer: İri Karacık (great sootling, `great`, meadow), Kurukafa Pervanesi (death's-head moth,
  `deathhead`, forest), the karabasan (`mare`, swamp; it also comes now and then in the cavern and the ruins:
  `ELITE.kinds`), Işık Kemirgeni (light gnawer, `gnawer`, cavern), Karakoncolos (`koncolos`, ruins). The halo cannot
  hold one: its slow does not stop it (it keeps coming), and like all the night the halo wears it down only to
  `HALO.floor` (scorched there). It wants the beam, a Flare or the dash: the light other light sets off (chain
  lightning and Akkor, Tutuşma, bursts, split light, the fireflies, pools, embers, Dağlama's burning, the Flares stars
  set off (`'starflare'`: Nakarat's, Kayan Yıldız's, the Flare's echo):
  `ELITE.knockSrc`) reaches it only `ELITE.knock` of itself (`hurt()`; without that, chain lightning from spirits
  caught round about burned a Karakoncolos down in seconds). Finished, it pays well: `val` × a spirit's worth in many
  big motes, and a stardust with chance `dust` (each kind's table); `emit('eliteDown', e, v)` after the `burn` /
  `capture`. The brood's great ones (great, mare, gnawer, koncolos) live in `R.brood` (kind `'soot'`: burned, not
  caught, so no beacon, no chain); Kurukafa in `R.moths` (kind `'moth'`: caught like a moth, `S.caught.deathhead`).
  They come where the brood does (`mothAbout()`, south of the wall, never inside the light, none on the road to the
  Heart or at it but for what the Heart's vigil lets loose, `VIGIL.threats`) and not on the very first run; the first of a run after `ELITE.first` s, then one every
  `ELITE.every[zone]` s ÷ m^`ELITE.grow` (m: `broodGrow()`), so an outgrown zone resists with more great ones rather
  than only more sootlings (at m = 1.65, the end of a zone for the bot, 2.2× as often; capped at `ELITE.max` alive,
  `maxOf`: one Karakoncolos, two gnawers). `emit('elite', e)` as one comes: a low horn from its side, its ring of
  embers closing on it. Quiet Night: no Kurukafa (no moth comes), the brood's great ones half as often and slower.
  - İri Karacık: a sootling `GREAT.r` × as big, horned. It walks on through the halo unslowed (`GREAT.speed` × a
    sootling's crawl; the beam holds it to `beamSlow`), gathers itself from `GREAT.leap` (a meadow halo's edge) for
    `crouch` s and pounces; clinging it weighs as `weight` sootlings (drag, drink, dim) and the focused lantern takes
    `glass` × a sootling's time to burn it off.
  - Kurukafa: a moth `DEATHHEAD.r` across (drawn `mothK()` × as large, a skull on its back) on the moth's rules, but
    readable and slower about all of it, and it dives `dives` times in a row. It circles `DEATHHEAD.circle` s before
    its first tell (`again` between rounds: the time to burn it), tells longer than a moth (`tell`, `tell2` before the
    second dive), and its dives go at where the keeper is (no lead) and take `slow` / `slow2` × a moth's time; between
    them phase `'turn'` (`turn` s), then the second tell, aimed anew. A bite is a nip (`oil`, at least `oilMin`: less
    than a moth's) and does not spend it, but it has had its fill for that round (no second dive; `m.bit`); after
    `rounds` rounds it leaves (`m.dive`, `m.rounds`; `mothTellT()`). Along a dive it sheds dust (`shedDust()`,
    `R.clouds`, `cloud`): in it, and `cloud.hold` s after, the halo is dimmed by `cloud.dim` (`R.dusted`,
    `emit('dusted')`); drawn as a powdery haze on the ground (under the dark, where the light falls) with glints over
    the dark. It resists through its toughness and its double dive, not by taxing oil a human cannot avoid (Balance).
  - Karabasan: as before (it splits into `SOOT.split` sootlings, one more in the ruins), tougher (`SOOT.mareHp`),
    unslowed by the halo; no longer part of the brood's own broods.
  - Işık Kemirgeni: `s.x, s.y` is its middle. It goes for the nearest crystal or prism within `GNAWER.seek` of the
    keeper (out of the light, not behind them: `mealFor()`, `t.gnawer`) and settles on it (`s.on`; on a crystal's
    top, beside a prism's foot on the side it came from, `mealSpot()`): `gnawed(t)` (exported): a prism goes dark
    (the beam ends on it and does not split, a piercing one too: `aimBeam()`; a beam that ends on it falls on the gnawer, `shineOn()`), a
    crystal dims and loses its burst (`capture()`), until it is burned. It is `on` only while it sits there (within
    `SEAT` of its seat to settle, further than `UNSEAT` and it has let go): its meal in the light, it walks off to wait
    beyond the light's edge (a seated one only once the keeper is within 5 of the band's edge, a walking one waits
    from 25, so it does not sit down and get up again) and lets go. A halo within `shy` of it sends it off
    (`gnawerBolt`) to `clear` beyond the halo's edge, and back once the keeper has moved on; the beam freezes it
    (`daze`). It comes out of the dark beyond a meal in reach (`spawnGnawer()`); with none, a karabasan comes instead.
    The light it eats glows in its belly and runs into its mouth.
  - Karakoncolos: a tall horned shade, `s.x, s.y` its middle (sorted by its feet). It stalks the keeper to
    `KONCOLOS.keep` × the open halo's radius, edging round them; every `call` s it raises its arms (`tell` s,
    `koncolosTell`: its rim snaps bright as a pouncing sootling's), then a wave of `wave` sootlings breaks off the
    dark along them, an arc across the way (`callWave()`, `koncolosCall`); the beam, a Flare or a dash puts the call
    off (`koncolosBalk`) and the beam holds it back; none begins or completes where the night is not about (a beacon's
    `LIGHTING`, the road to the Heart: `heartRoad()`, where `broodSpot()` puts nothing of the brood either; at the Heart while its
    vigil is on the night is about, `heartNight()`: one it lets loose in Sabah calls there). Within `aura` × the halo's radius of it the halo darkens down to
    1 - `dim` (`R.gloom`, eased; ink threads reach from it to the lantern). `smothered()` (run.js) is what is left of
    the halo: `R.dim` × (1 - `R.gloom`) × (1 - the dust's); `lightRadius()` and the glow (render.js) use it.
  - Drawn in the night's look (sprites.js: `greatHorns()`, `drawGnawer()` / `gnawerPath()` / `gnawerEyes()`,
    `drawKoncolos()` / `koncolosPath()` / `koncolosEyes()`, reached through `sootBody()`, `sootPath()`, `drawSoot()`,
    `sootEyes()`; `raggedPath()`, `emberEdge()`, `beamEdge()`), scorched alike. Every great one wears the same mark
    over the dark (render.js `eliteRing()` / `eachEmber()`): a ring of 8 embers circling it (still with less motion),
    brighter as it nears; they go out as it is worn down (one held scorched at the floor keeps 3). A gnawed prism or
    crystal is drawn murky (`drawPrism(c, s, t, dark)`, `drawCrystal(c, w, t, dark)`) and lets out little light.
  - Coach marks `h_great`, `h_deathhead`, `h_mare`, `h_gnawer`, `h_koncolos` (what it does, then finishing it).
    Puhu's request `elite` (finish 3-6 of them across runs, a stardust; a Kurukafa caught counts; not offered once
    runs start beyond `FAR`); the `moth` request counts a Kurukafa. Small talk `s.kandil.great`, `s.puhu.deathhead`,
    `s.ulker.gnawer`, `s.kandil.koncolos` (and Vırak's `s.virak.mare`); journal names `w_great`, `w_deathhead`,
    `w_gnawer`, `w_koncolos`. `dev.elite(type)` calls one up near the keeper (run.js `eliteNow()`).
- **Shy spirits** (`SHY`, swamp onwards, `shyRun()` in `run.js`): the halo scares them, the beam dazzles them. A
  halo coming close sends one bolting clear of the light (it does not hover at the edge); running tires it, and a
  tired one rests where it is for a while (it sags, dims and puffs); held in the beam it freezes on the spot,
  startled, so focusing on it catches it. The golden spirit flees as before; the beam only slows it.
- **Coach marks** (learn by doing; the game never stops for them): everything taught once (`UI.hintOnce(key, valid,
  mark, thing)`; `MARKS` in `ui.js`, one row of text each in `i18n.js`) is a small plate beside what it is about:
  over the keeper, next to a thing in the world (the moth, shy spirit, crystal, shade, shelled spirit, prism, thorn,
  sootling, one of the night's great ones, waymark lamp, beacon or Heart that `meet()` in `run.js` announced), next
  to a part of the HUD (the wick, the beacon's bar), at the camp's gate or telescope, at a star that can be lit (a new game's first: the lantern). Rows
  of key caps with a few words in capitals, or one short sentence; a stem points at the thing, and the plate follows
  it every frame, keeps off the HUD, the zone title, the band and the keeper, and waits at the edge (a chevron) while
  the thing is off screen. It stays on its side while it can (`SIDE_HOLD`): it changes at the screen's edge or over
  the HUD, and over the keeper only after a moment, so things crowding round do not flip it from side to side. One
  at a time; no input is taken, nothing is dimmed (`pointer-events: none`).
  - A row with a test (an event of the run or the sky, a list of such events of which any ticks it, or a poll of
    `R` / `Camp`) is ticked, warm, once the player does it while the mark shows; all ticked, the mark is learned
    (`S.seen[mark]`, saved at once), stays 1.2 s and fades. The camp's has two steps (walk with the keys, a click on a
    station that walks the keeper over does not count; then at the gate, done by walking out: `UI.learned`). With no
    lantern the gate is shut, so `h_camp_scope` comes instead (walk, then `[E]` at the telescope, ticked by the
    `campUse` event; using the telescope at all before having the lantern learns it by hand). Once the lantern is lit
    (also on the way back from the sky) `h_camp_keys` comes, or only its gate step (`h_camp_gate`, learned under the
    key `h_camp_keys`) when walking with the keys was already ticked at camp (`S.seen.c_walk`; `campMark()` in
    main.js).
  - The hot glass (`h_heat`, over the keeper, the focus's indicator breathing): offered on `glassHot` (main.js) while
    the glass is still in the red, and not overheated, at its turn (`R.hot && !R.out`), ticked by `glassCool` let go
    and not overheated (`over` and `held` false): letting go in the red, before it overheats, until the glass cools out
    of it. An overheat never ticks it.
  - The way north (`h_road`, at the next beacon, waiting at the top edge while it is off the screen): offered by
    main.js `roadCheck()` on the first three runs to a keeper who has walked 8 s and gained under 300 units of depth
    (see The way north), ticked by going north (a poll).
  - An info mark (the wick, the light flowing to the beacon, focus burning oil) has nothing to do: what it points
    at breathes, and after 6.5 s it counts as seen.
  - Not answered within 15 s of its last tick, or its thing gone, an action mark fades unseen and is offered again
    at the next occasion (not within 20 s; `meet()` announces again every few seconds); gone unanswered 3 times
    (`S.seen['shows_' + mark]`) it counts as seen anyway. A run ending or a change of scene takes it away the same way.
  - Hidden, its clocks waiting, under the settings, a panel, a conversation and a change of scene (`marksOk()` in
    `main.js`); queued while a run is still setting out; `valid` is asked again at its turn. Never for the headless bot.
- **Said in passing** (`UI.hint(key, secs, icon, urgent)`): a framed band in the upper middle (at the very top in
  the sky): the Heart's ring warning (`bossSafe`, urgent: warm, large, pulsing), new stars, Ülker's reminder, a beacon's siege capped for the first time (`siegeCapHint`). Its
  time stands still under the settings or a conversation, which hide it.
- **Settings** (the run's pause plate and the camp's settings are one plate): sound on / off (`S.muted`), four
  volumes (`S.vol`: master, music, effects with the beam's hum, ambience = the fire and wind beds; 0..1, squared
  into gain; music at 0 is music off, `S.music`), language. Heard while dragging, saved on release.
- **Beacons**: the light of every spirit caught beyond the last lit beacon flows to the next one by itself, up to
  `BEACON_REMOTE` of `BEACON_ENERGY` (`flowTo()` in run.js; light shone on it before then goes to the same share and
  no further, and so does the light of the spirits it calls). The beacon calls spirits out of the dark around it
  (`SURGE`, `callSpirits()`; each feeds it `SURGE.feed` × its light when caught): while the keeper's light is on it
  before it is ready (`SURGE.early`; off, it calls nothing until its siege; and only `SURGE.earlyCalls` (2) times a
  run, `R.surgeEarly`: the back half of a run is the zone's, not spent waiting at the beacon) and throughout its siege. Full to that
  share it is *ready* (`beaconReady`): its glow breathes, calling from afar, and the HUD's bar says so. The flow is
  small (`BEACON_ENERGY` [980, 19050, 186500, 1.875e6, 1.595e7], a twentieth of what it was): a beacon is ready within
  a run or three of reaching its zone, and what sets a zone's length is the lantern's power against the siege's
  ceiling (below), not a quota of light to farm (the designer found that once a tier's tree was full the runs were
  dead: sparks piling up, nothing to buy, only the flow's bar filling).
  - **Fener Nöbeti, the beacon's siege** (`SIEGE` in data.js; `updateSiege()` and the functions round it in run.js;
    `R.siege`: `{ i, t, waveT, clingers, k, away, cap, capped }`, `R.siegeN` / `R.siegeBroke` on this run, `R.siegeGreat`: the
    beacons whose great one has come on this run): the last
    `1 - BEACON_REMOTE` is a short fight at the beacon, not a button held. The keeper stepping within `siegeRing()`
    (`SIEGE.ring` × the halo's radius, at least `ringMin`) of the ready beacon begins it (`siegeStart`). The beacon
    kindles with the keeper's light on it (the beam fastest, `kule` still speeds it) and with every spirit it calls
    and they catch, both × `SIEGE.kindle[zone]` (tuned so that the bot holds each for about `SIEGE.hold` = 12 / 13 /
    15 / 16 / 18 s; scaled down with the small flow: [0.1475, 0.3155, 0.588, 1.193, 1.8815]).
    **The beacon resists a weak light** (the ceiling): the siege's share can be kindled only up to `cap = min(1,
    (ST.power / SIEGE.ref[i]) ^ SIEGE.steep)` of itself, i.e. `S.charge[i] <= BEACON_ENERGY[i] × (BEACON_REMOTE + (1 -
    BEACON_REMOTE) × cap)` (`siegeCap(i, power)` / `siegeCeil(i, power)` in state.js, `siegeCap` re-exported from
    run.js: pure reads of `ST.power`; `chargeBeacon()` kindles no further, and never takes back what a stronger lantern
    got to). `SIEGE.ref` [30.5, 93, 215, 666, 2117] is about the power a keeper had as each beacon lit before the
    ceiling (30.5 and 93 are the whole Fitil of tiers 0 and 0-1: power comes from the Fitil stars alone, so in the first
    two zones a beacon lights only with its tiers' Fitil all bought, or with the Kor brew), so the Heart is reached as
    strong as before; `SIEGE.steep` 2. `ST.power` includes the brew drunk for the run (`recalc()`), so a brew can lift
    the ceiling for that run: intended. `R.siege.cap` is the ceiling (0..1, recomputed every frame of the siege); once
    the charge is at it short of 1 the siege is capped (`R.siege.capped`, `emit('siegeCap', i, cap)`, again only after 2 s
    (`R.siege.capAt`, the run clock)): the kindle stops, there is no drain while capped (what the keeper reached under the
    ceiling is kept, and so is a brew's surplus above it, as `chargeBeacon()` never lowers), `beaconFeed` motes stop, the beacon calls no more spirits (those it called stay
    and still pay), the waves still come while the keeper stays in the ring, leaving breaks it as ever, and the charge
    is kept in `S.charge` (the next, stronger, attempt goes on from there). The great one comes at `SIEGE.great` of the
    whole siege share (`siegeProg(i) >= SIEGE.great`, not scaled by the ceiling: with a cap below `SIEGE.great` it never
    comes). It lights only at cap 1 with the charge full, as before.
    For the UI: `siegeProg(i)` is how far the siege's share has got (0..1), `siegeCap(i)` (or `R.siege.cap` in a
    siege) where the ceiling stands on it, outside a siege too. The night pushes back: every `SIEGE.wave.every[zone]` s (÷ the brood's growth, `broodGrow()`
    ^`SOOT.growK`, like the brood: numbers, never toughness) an arc of `SIEGE.wave.count[zone]` sootlings breaks off
    the dark (`siegeWave()` → `arcWave()`, shared with the Karakoncolos' `callWave()`), and they crawl for the beacon,
    not the keeper (`s.siege`; they do not pounce; the normal brood keeps to the keeper). One that reaches its base
    climbs onto it (`s.onBeacon`, `clingBeacon()`, `beaconCling`): each takes `SIEGE.stall` off the kindle (the
    lantern's light and the spirits' alike, `siegeK()`), and with more than `SIEGE.stallMax` on it the charge drains
    `SIEGE.drain` of the siege's share a second, never below the flow's share (`S.charge[i] >= BEACON_ENERGY[i] ×
    BEACON_REMOTE` always; `R.siege.k`: 1 clear, 0 stalled, -1 draining). The beam on the beacon burns them off as the
    focused lantern burns what clings to its glass (`SOOT.glass` of the beam, src `'beam'`); the beam on one melts it
    as ever; a Flare or a dash blasts them off (`dropOff()`); the beacon's own light, like the halo, only holds them
    at `HALO.floor`. Burned off its base one emits `beaconClear`. At `SIEGE.great` of the way the zone's great one
    comes, once a beacon a run however often the siege is broken and begun again (`siegeGreat()` → `eliteNow()`: İri Karacık, Kurukafa, karabasan, karabasan, Karakoncolos; `ELITE.max`
    and `maxOf` kept, a great sootling instead of a Kurukafa on a Quiet Night, none on the very first run).
    Lit, `chargeBeacon()`'s completion runs as ever (banked dust, the wall, `LIGHTING`, `R.lit`, `saveGame`,
    `beaconLit`) and `endSiege()` first: every sootling within `SIEGE.burst` of the beacon is burned (src
    `'beacon'`, the great ones stand) and every spirit it called and still alive is caught at once (each a capture,
    src `'beacon'`, like a husk's flock: the chain, the pay, Nakarat and chain lightning react, no Tutuşma);
    `siegeEnd(i, secs)`. Broken (`breakSiege()`, `siegeBreak(i, why, secs)`: the keeper beyond `SIEGE.leave` × the
    ring for `SIEGE.grace` s, or the run's end): the called spirits are let go (caught like any other after), what
    climbed the beacon falls off, the sootlings it drew turn on the keeper, and the charge stays where it got to in
    `S.charge[i]` (saved at the run's end as ever); the next step into the ring starts it again from there. Nothing
    of a siege outlives `startRun()`. Seen: the beacon's glow and flame sink and gutter with the sootlings on it
    (render.js `siegeLoad()` / `beaconGutter()`, steady with `prefers-reduced-motion`), soot on its base
    (`drawBeaconBase()`), a warm arc of the kindle round the flow's cool one (it turns red while draining) and a flame
    catching on the beacon, taller the further it is. The ceiling reads as "not yet", never as failure: past it the
    kindle's arc is a faint cool ghost with a pale tick at the ceiling, the flame grows only to it and, capped, holds
    there breathing under a thin cool haze and a hairline ghost of the full flame (render.js `ceilingHaze()`; steady
    with less motion). The HUD's bar (ui.js `hud()`, `#prog.beacon`): its first half the flow (cool, `#progFill`), its
    second the siege (warm, `#progKin`; red while draining, `.back`), a tick between; once the beacon is ready the
    ceiling is a hairline mark on the siege's half with the stretch beyond it dimmed and hatched (`#progCeil`, at
    `50 + 50 × siegeCap(i)` %, so a brew or a new star just moves it), labelled `beaconSiege`, and `beaconCapped` ("The
    flame wants a stronger light", cool) while capped; as it caps the filled tip glows once (`capflash`, a plain
    brighten with less motion). The first `siegeCap` ever is said in passing (`siegeCapHint`, pointing at the Fitil
    stars; `S.seen.siegeCapHint`, main.js). Heard: three drum
    beats and a low call as it begins, a low drum under the music while it is on (audio.js `updateNight()`, on the
    music's bus: nothing with the music off; quicker and harder with more on the beacon), a knock as one climbs on,
    a soft low two-note figure rising a step and left unresolved as it caps (effects bus; once a capping, not again
    within 2 s), a swell under the beacon's chord as it lights. Coach mark `h_siege` (a new key: a save that learned the old
    `h_beacon`, "focus on the beacon", is still taught the siege; its rows' texts stay under `h_beacon` /
    `h_beacon_2` / `h_beacon_3` in i18n.js: step into the ready beacon's light, a poll of `R.siege`; `[mouseL]` burn what climbs the
    beacon, ticked by a `beaconClear` that is not the beacon's own burst, or a siege sootling melted with the beam;
    said: a stronger light kindles it further),
    offered while the next beacon is ready and near, or under siege (`beaconCalls()` in main.js). At camp Kandil's
    small talk `s.kandil.proud` (chapters 0-4, after the first run: the old flames are proud, a weak light only warms
    them), and a run whose siege capped gets Ülker's reaction `r.siegeCap` once (event `siegeCapped`, collected by
    talk.js from `siegeCap`; after `beaconLit` in `REACTION_ORDER`; `S.seen.st_siegeCap`). `dev.readyBeacon()` fills the next beacon to the flow's share for a look.
    Records (`S.stat`, saved; 0 = not yet, and a save from before them has none): `treeFullRun[i]`, the first run begun
    with every star of tiers <= i (the root aside, dust stars and the dash's included) at its max, set by `buyNode()`
    as the last of them is bought while beacon i is still dark (`treeFull(t)` in state.js), and `litRun[i]`, the run
    beacon i lit in (`S.runs + 1` in `chargeBeacon()`: `endRun()` counts the run as it ends); the runs played with the
    tree full before the light are `litRun[i] - treeFullRun[i] + 1` where both are set. The journal's records page has
    a row for each beacon where both are set (`j_tree` / `j_treeV`: "Beacon N: tree full on run X · lit on run Y"). Saves of version 4 keep the
    share of each beacon they had filled (`S.v` 5; a dark beacon then no more of its siege's share than the ceiling at
    the save's power, after `recalc()`).
  - Lighting beacons 1-4 does **not** end
  the run: the reward is banked and saved at once, the banner plays, the night wall moves (`R.wallY`) and the
  keeper walks on into the next zone with the oil that is left (no refill); the flow, the bar, `SURGE` and the
  coach mark move on to the next beacon. For `LIGHTING` (1.8 s, run.js) after a beacon lights no oil burns and
  coach marks wait; nothing else stops. If it wakes a new tier of stars, that is said in passing (`newStars`).
  The fifth beacon ends the run (`endRun('beacon')`) once its `LIGHTING` is over, as before, so the eve of the
  Heart (the chapter-5 talks, `r.beacon.4`) is told at camp before the first fight; the pause menu cannot cut that
  moment short (`runIsClosing()`). Several beacons can be lit on one run (`R.lit`, and `lit` in the `runEnd`
  summary: the summary, talk.js's reaction and the bot read it).
- **Son Nöbet, the Last Vigil: the Heart of Night** (slices 1-3 of its redesign: the core, redone after the
  designer's first play as "dawn on the Heart"; the zones' threats let loose stage by stage, after the second; the
  five zones spread over the three stages, the arena's prisms and crystals, a beat at each stage and the beam breaking
  the Heart's wall, after the third ("I liked its balance more"):
  `VIGIL` and `BOSS` in data.js; run.js `startBoss()` / `updateBoss()` and the functions after it: `crackHeart()`,
  `spillHeart()`, `startVigil()`, `updateVigil()`, `feedDawn()`, `kindleDawn()`, `nextPart()`, `vigilWave()`,
  `vigilSpot()`, the threats' `heartGrow()`, `heartSpot()`, `heartWay()`, `threatClock()`, `threatEvery()`,
  `openWave()`, `vigilThreats()`, `letLoose()`, `heartHusk()`, `heartThorn()`, and `circleCross()`, `beamOnCircle()`,
  `endVigil()`; `R.vigil`; world.js `arenaSpots()`). The Heart is no longer
  worn down by the keeper's power: it is broken by the **dawn circle** (Şafak Çemberi), three arcs on the ground round
  it, `VIGIL.r` (215) from its middle: just outside its oil-drinking aura (`BOSS.aura`, 185), so what clings to the
  circle is burned off from outside the drain. One target, the Heart; the keeper moves freely round the arena. (Slice
  1's first cut had a Dawn Beacon at the arena's mouth instead: the designer liked the fight but felt tied to it, and
  it was unclear whether to hold the beam on the Heart or on the beacon.) The Heart wakes as before (all five beacons
  lit, the keeper within `ARENA.r - 50` of it, not in the fifth beacon's moment) and the vigil begins with it
  (`vigilStart`); it lasts the whole attempt (no ring to leave, nothing to break it but the run's end).
  - **Three parts** (Tan, Şafak, Sabah: first light, dawn, morning), filled one after another, each `light` ×
    `stages[s]` of light (`R.vigil`: `{ stage, light, t, waveT, clingers, k, beam, ray, rayAt, cross, crossN, start,
    threat, clingT, backT, eliteN, eliteDown, got }`;
    `vigilProg()`: 0..1 over the three, each a third). Part k runs from `dawnArc(k)` over a third of the circle
    (`DAWN_PART`), clockwise as seen; the first faces the arena's mouth (south), its middle `dawnMid(0)`. The light
    past a part goes on into the next. Each part filled blazes and opens a **dawn crack** on the Heart, towards that
    part (`dawnCrack(k, b)`), and its blaze burns what clings to it (src `'beacon'`; `nextPart()`: the sootlings still
    crawling for it go on round to a seat on the next part, and the next stage's threats are let loose): the Heart's hp,
    now what is left of its night, drops to 1 - parts / 3 (`R.boss.max` is 1), so its phases follow (`b.phase` = the stage: faster rings, more shades, the stagger and the shards flung out,
    `bossPhase`); the third breaks it through the old `killBoss()` (the first dawn's records, `S.won`, the ending),
    which also burns every sootling of the waves and every sootling the Heart let loose (`endVigil()`, src `'beacon'`,
    `vigilEnd`; its great ones melt back into the night, `broodFade`).
  - **What fills it**: every spirit caught in the arena while it is on, wherever it was caught, and every moth or
    Kurukafa caught there (catches too): its light (hp) × `feed` × `ST.beaconRate` flows into it (`feedDawn(e, src)`
    from `capture()`; a husk and its flock, src `'husk'`, pour `husk` (3) × their light: a big fill; `dawnFeed(e, x, y, loud)`, x / y where the
    part filling has got to: the motes drift there, `loud` at most every `FEED_FX` (0.1) s for the chime); and the beam
    on the Heart itself, × `kindle` (0.35: `R.vigil.beam`, from `updateBoss()`, × `BOSS.openK` while it is open, `kule`
    still speeds it), so beaming the Heart is never wasted; catching what it spills is the bigger yield (the bots get
    about 70 % of the circle's light from the spirits caught, ~12 % from husks and their flocks, ~3 % from moths, ~13 %
    from the beam: Balance; `got`: `spirits`, `husk`, `threats`, `lamp`). All less what clings to it (`stall` a
    sootling). What the brood leaves when burned (the great ones included) is no catch: it pays, it fills nothing.
    The halo on the Heart fills nothing.
  - **Cracking the Heart.** Light on the Heart does not wear it down but cracks it (`hurt()` sends it to
    `crackHeart()`): the beam (× `BOSS.openK` while it is open after calling its shades), and any other light that
    reaches it (Flares, the stars' knock-on light, Dağlama, the fireflies; the halo only `crackHalo` of its strength;
    chain lightning still passes it by). Every `crack` × a spirit's hp there spills `spill` [3, 5] spirits out of it
    (`spillHeart()`, `heartSpill`; `w.spilled`, `w.flung`: flung `out` a second and slowing like the shards, kept
    inside the arena), `small` of them small ones, at most `spillMax` alive (past that it only cracks, one spill held
    back). They are caught in the halo as any spirit, pay as any, feed Çiy Damlası, the chain and the stars, and their
    light flows into the circle. No new verb: beam the Heart (best while it is open), catch what spills, keep the
    circle clear.
  - **The night pushes back on the part filling** (only that part: the designer found cleaning a whole circle tiring,
    and walking round it): every `wave.every[stage]` s (7 / 6.5 / 6; ÷ the brood's growth at the ruins' end
    ^`SOOT.growK`; Quiet Night halves it) an arc of `wave.count[stage]` sootlings (3-5 / 4-5 / 4-6; × that growth)
    breaks off the arena's dark `wave.from` beyond the circle, mostly round the part filling (within 1.5 parts' width of
    its middle), else wherever the arena is dark, further out (to just beyond its ring of columns) where the keeper's
    light reaches past that (`vigilSpot()`: beyond `r + 40`, within `ARENA.r + 70`, out of the light). Each crawls round
    the outside of the circle to a seat of its own along the part filling (`s.dawn`, `s.dawnA`: spread along it in the
    order they come round, so they do not cross; `seatAlong()`; `siteOf()` gives `CIRCLE`, `siegeAim()` a step of
    `AROUND` round the outside at a time, then in) and climbs on there (`clingSite()`, `s.onBeacon`, `s.ba` its angle
    round the Heart, the nearest free seat `seat` apart outwards along the part filling either way, never on another
    part; every seat of it taken, it does not climb and turns on the keeper (`s.dawn` off, `s.heart` kept); `beaconCling`;
    counted in `R.vigil.clingers`): each takes `stall` (0.15) off what flows in, more than `stallMax` (3)
    and the part filling runs back `drain` (0.01) of itself a second (`R.vigil.k` -1; never below its start). So the
    keeper defends one third and need not walk round: from about its middle the beam reaches all of it past the Heart.
    The beam burns off what clings where it crosses the circle (`circleCross()`, from updateBrood: `R.vigil.cross[0 ..
    crossN - 1]`, two [x, y, w] kept and reused, where the beam's line meets the circle up to the beam's tip, `w` the
    larger of `burn` (34) and the beam's half-width there; `beamOnCircle(s)`; `SOOT.glass` of the beam, the whole beam
    on one it is held on). A Flare or a dash blasts off what is in its reach (`dropOff()`, thrown outwards from the
    circle); burned off it one emits `beaconClear`. The waves are one pressure among several, smaller and rarer than in
    slice 1 (5-7 / 6-8 / 7-10 every 5 / 4.4 / 3.8 s, stall 0.25, drain 0.015): what clings is no longer the main one.
  - **What the Heart lets loose** (`VIGIL.threats`, one table a stage: `[every, n]` for each kind: every `every` s ×
    rand(0.8, 1.2) (`threatEvery()`), and `n` of it in the stage's opening wave; `vigilThreats()` / `letLoose()` from
    updateVigil, while the night is about, `mothAbout()`): the five zones' threats spread over the three stages in
    order (the designer chose three parts over five), out of the arena's dark and for the keeper, as they come in the
    zones (not for the circle). Tan, the meadow's and the forest's: an İri Karacık every 16 s, an arc of `arc` (4-6)
    sootlings at the keeper every 8 s (`arcWave()`), a moth every 4 s (none come at the Heart otherwise,
    `updateMoths()`), a Kurukafa every 20 s. Şafak, the swamp's and the cavern's: a karabasan every 14 s, a shelled
    spirit with its flock every 10 s (`heartHusk()`: `makeShell()` out in the arena beyond the circle, in the dark if
    anywhere is, else as far from the keeper as there is room, `w.heartHusk`; at most `huskMax` (3) of them unbroken at
    once, else tried again a second later; `heartHusk` event) and a Işık Kemirgeni every 16 s (`spawnGnawer()`, for
    the arena's prisms and crystals, below; none in reach: a karabasan instead). Sabah, the ruins': a Karakoncolos every
    22 s (its calls bring waves at the keeper: its night is about there while the vigil is on, `heartNight()`) and a
    night thorn every 12 s (`heartThorn()`: out of the arena's floor `VIGIL.r + 110` or more from the Heart, never on the
    circle, out of the keeper's light if anywhere is, 220 apart; `th.heart`; at most `thornMax` (2) of the Heart's
    standing; the ruins' own thorns by the arena's mouth do not count; `heartThorn` event; its aura, 380, reaches over
    the circle, so the laser burns it from where the keeper stands; burned when the Heart breaks); the ruins' shades are
    the Heart's own (more of them in its last phase). Each stage opens with a wave (`openWave()`, after its hush: below):
    `n` of each kind at once (Tan: a great sootling, an arc, two moths; Şafak: a karabasan, a husk, a gnawer; Sabah: a
    Karakoncolos, two thorns), each marked `e.wave`, announced together (`heartWave` (stage, came)); a kind with no room
    then tries again a second later, one with none in the wave starts its clock a part of the way in. As a part fills,
    the last stage's great ones still about melt back into the night (`broodFade`), so the next stage's come as a wave of
    their own. Like the zones, it grows with the lantern's power, never tougher (`heartGrow()`: m = 1 + `VIGIL.grow`
    (1.2) × log2(ST.power / `VIGIL.at` (2100)), 1 .. `growMax` (2)): the great ones m^`ELITE.grow` as often, the arcs,
    moths and thorns m^`SOOT.growK` as often and the arcs m^`SOOT.growK` as big; husks (which pay) as they are. `at` is
    about the power of a keeper lighting the fifth beacon (the bots: 2118, four levels of Fitil 5's five), so one who
    comes in just strong enough meets m = 1 and a full tree (2647) m ≈ 1.39: its great ones 1.7× as often (the Heart's
    keepers are all strong and their lanterns differ little, hence the steeper slope than the zones' `SOOT.grow`). The
    vigil's waves on the circle keep the ruins' growth (`broodGrow()`), as before. The night's great ones keep
    `ELITE.max` and `maxOf` (a full count is tried again a second later), come with `emit('elite', e)` (`R.eliteN`,
    `R.vigil.eliteN`; finished: `R.vigil.eliteDown`), pay as in the zones and are met with their own coach marks (the
    thorns' and prisms' too, through `meet()`). Quiet Night as elsewhere: no moth or Kurukafa (a great sootling
    instead), the brood's great ones, the arcs and the thorns half as often, the arcs half as big. Where:
    `broodSpot()` at the Heart is `heartSpot()` (in the arena or just beyond its columns, `ARENA.r + 90`, outside the
    circle by 30, out of a lit beacon's light and out of the keeper's), and the way is `heartWay(D)` (mostly from the
    outer dark, away from the Heart, else wherever it is dark; none: nothing comes this time); `spawnGreat()` and
    `mothSpot()` use it there. What the Heart lets loose is marked `s.heart` (made while `R.boss`) and does not melt
    away as the Heart's own night does (`updateBrood()`). The rest of the Heart's own is as it was: its rings (oil and
    the chain), its shades and the moment it opens after calling them, its oil-drinking aura (`BOSS.aura`), its basic
    spirits now and then (they feed the circle too), the shards flung at each phase.
  - **The arena's prisms and crystals** (world.js `arenaSpots()`, from their own seeded sequence, so nothing else in
    the valley moved): three prisms 375-410 from the Heart, one where each two parts of the circle meet (on round from
    either side of the mouth, and the north: out of the way in and of the ring a keeper walks round the circle), in the
    arena's chunks' `prismSpots` with `arena: true` (solid like any other, made by `spawnChunk()` with no flock: the
    Heart's spirits are the ones its cracks spill; never on the North Road: they lie beyond its end); and three places
    420-470 out, one off each part's middle, where crystals come up as Şafak begins (`nextPart()`, `heartCrystal` event;
    one already standing there is left). A prism's rays that cross the Heart crack it as any light does (src `'ray'`)
    and fill the circle as the beam on it does (`crackHeart()`: `kindle` of their light, less what clings, while no
    part runs back): beamed from beyond it towards the Heart, a prism splits the beam into the Heart and the spirits
    round it. A crystal caught feeds the circle (four spirits' light); its burst (230 across) lights the spirits round it but does
    not reach the Heart from where the crystals stand. A pierced beam goes on through an arena prism into the Heart with
    its share (`beamPierce`), the prism's rays cracking it besides (src `'ray'`, once a frame however many cross it):
    split light, not the beam counted twice. They are the gnawer's meals (`mealFor()`: at the Heart nothing is "behind"
    the keeper, and only what stands within `ARENA.r` of the Heart: not the ruins' prisms beyond its columns): one on a prism darkens it (the beam ends on
    it, unsplit, and falls on the gnawer), one on a crystal takes its burst, until it is burned, as in the cavern.
  - **A stage's beat** (the vigil's start and each part filled; `vigilStage` (stage, hush)): the part filled blazes (its
    shaft and crack, as before) and burns what clings to it; for `VIGIL.hush` (2.4 s; `hush0`, 1.6, as the Heart wakes)
    nothing is let loose and no wave comes (`v.hush`, `v.opening`; the threats' clocks wait, `threatClock()`), the
    Heart's attacks stagger (`b.stagger`), and the music and the night's bed dip (audio.js `hush()`, back as it ends,
    timed by the run's own clock `R.t` so a pause holds it and `?speed` hurries it, unless the lantern went out
    meanwhile) under a sting (a deep boom swelling into a rising chord; the first stage a
    lower call); main.js puts the stage's name and its zones in the banner (`UI.banner(..., 'stage')`, `#banner.stage`:
    higher, clear of the Heart, shown 3.6 s and animated over the same; "ŞAFAK" over "Bataklık ve Kristal Mağara",
    `upper()`, `dawnZones0..2`; it waits while a zone's title is up, the arena's as the keeper comes in, and a zone's
    title waits while it is up: ui.js `bnWait`, `titleUp()`, `stageUp()`; with less motion both fade only, no letter-spacing
    motion, `ztCalm`); a warm wash
    (fx.js). Then the opening wave: a dark ring closing in from the arena's edge to the circle and a ring of ink
    closing on each thing as it comes, a low horn and a dark rush (the great ones in it sound no horns of their own). The
    game itself goes on throughout: the spirits, the beam, the oil. One small, short shake for a part filled (fx.js
    `dawnCrack`; `bossPhase` none of its own, the rings none; the Heart waking 5, breaking 8; none of these with less
    motion).
  - **The beam on the Heart reads as breaking a wall** (render.js `heartHit()`, `heartCracks()`, `heartFlare()`, `HH`;
    drawing and sound only): where the beam lands on the shell (the run's beam ends there, `aimBeam()`) a bright flare
    with short spikes flat along the shell, chips of the shell (dark shards, some warm-edged) flung back off it and
    falling, and crack lines growing from that point inwards as the beam is held (faster as the Heart heats under it,
    `b.heat`, and while it is open), with a star of short fractures along the shell where it lands and branches as
    they grow; each kept where it is on the Heart by its angle (at most 8; a fresh one where the beam lands elsewhere),
    its light fading and the line healing over `CRACK_FADE` (6) s once the beam leaves it, closed at a phase. When a
    crack spills spirits with the beam on it (`heartSpill`) the Heart jolts away from the beam (its sprite, a few
    pixels, not the camera), the crack snaps longer and flares, and a spray of chips flies. Stronger, whiter and bigger
    while the Heart is open. Heard (audio.js, in the night beds): a low stone-on-stone grinding over a sub rumble that
    rises with the hold, harder and higher while open, with cracks ticking in it, more as it heats; a crunch, a heavy
    thump and a glint as a crack spills (both only while the beam ends on the Heart, `R.beamStop`, as the picture does:
    not for a beam grazing it). With less motion no chips and no jolt, the flare steady, no spikes; the
    cracks still grow.
  - **Every attempt starts from nothing**: the way an attempt got to is not kept (`VIGIL.keep` 0; a share in 0..1
    carries that much of the best way reached into the next attempt, `S.dawn`, saved; a won save is 0, also on load).
  - **Losing pays well** (`VIGIL.pay`): the attempt pays `pay.max` × a late run's sparks in all if it breaks the Heart
    (`b.bounty`, from `S.stat.refGain`, at least `payFloor`), paid out as motes off the middle of the part filling as
    the vigil goes on (`payShare()`: `pay.min` of the whole over the first `pay.ramp` of the way, the rest evenly over
    all of it; the rest at once when the Heart breaks), on top of what its spirits pay. The Heart's runs leave
    `S.stat.refGain` and `refCaps` as they are (`endRun()`): what they bring in is not an ordinary run's, and the pay is
    sized by it.
  - Seen (render.js `dawnHoles()`, `dawnGlow()`, `dawnBlaze()`, `dawnCracks()`; widths in screen pixels): before the
    Heart wakes a faint cold trace of the circle (once all five beacons are lit); under the vigil a part to come is a
    cool line, the part filling a cool line with a warm one running along it to where it has got (a bead of light
    there, a little brighter for a moment as light flows in: fx.js `FX.dawn`), red while it runs back, breathing slowly
    while it fills (steady with less motion); a part filled blazes warm-white and its light opens the dark along it.
    The lines are laid over the light, not added to it (the red stays red in the halo), only their glow is added. The
    line breaks where a sootling sits on it (their ink and eyes read on it), and a warm glint shows where the beam
    crosses it. A part just filled: a shaft of warm-white light from the Heart's new crack out to its middle, opening a
    lane in the dark, for `ray` s (`blazeK()`); the cracks (one a part filled, a jagged warm-white line from the core
    towards its part with two short branches, flickering a little but with less motion) split it open as it breaks.
    Once the Heart is broken, and on every run after, the whole circle burns on round the empty place. fx.js: a warm
    ring from the Heart out to the circle as it wakes, a dark ring closing on each wave's middle, a pale ring as the
    Heart spills, a warm burst along a part filled with a ring on it and on the Heart, a short opening in the dark and a
    small shake. A caught spirit's light leaves it as a warm mote drifting to where the part filling has got (`FX.flow`,
    `dawn: true`; with less motion none drift: the part's bead brightens instead). The HUD's bar (ui.js,
    `#prog.vigil`): the vigil's way with a tick at each third, labelled `vigil` ("Şafak Çemberi: {0}" / "Dawn Circle:
    {0}") with the part's name (`dawn0`..`dawn2`), red while it runs back. talk.js's `heartFail` reaction takes the
    vigil's way (`heartProg()`). Its sounds: the feed's chime (audio.js `dawnFeed`, the beacon's), the beat and the
    wave (above), the beam grinding on the shell (above); no coach mark or story text of its own (slice 4); the Heart's
    own are as they were.
    Known stale until slice 4: the `heartFail` reactions in story.js (`r.heart.low1` speaks of stepping into the
    beams before the rings and not crowding the Heart, `r.heart.high1` of its light leaking out; `r.heart.mid1`, keeping
    the light on the Heart, fits again): their thresholds (a third, two thirds) now fall on the circle's parts, their
    words still the old fight's. No story text names the Dawn Beacon.
  - Slices to come (not before the designer has played this one): coach marks, story text, the rest of the sound and
    the final balance (after the laser's progression is merged: it moves the Heart). Names (Şafak Çemberi / Dawn Circle; Tan, Şafak,
    Sabah) are placeholders the designer may change.
    `dev.heart()` puts the keeper just inside the arena by its mouth in a run with all five lit (after `fresh(5)` and
    `game.launch(4)`); `dev.step()` reports the vigil.
- **The way north** (all of it drawing and talk: no rule, spawn or number changed; the bot is unaffected). A new
  player could not tell that forward is north, so the world points there:
  - **The North Road** (Kuzey Yolu, `ROAD` / `roadX()` in world.js, `drawRoad()` in render.js): the old keepers' road
    from the camp gate up the valley's middle, through each beacon's middle (x = 0), to the arena's south edge; straight
    out of the gate, wandering up to about 130 off the middle between the beacons. Its bed, two ruts and worn flagstones
    (`ch.road`, from their own seeded sequence, worked out when first drawn and not an enumerable field of the chunk;
    sparse in the meadow and the swamp, nearly whole in the ruins, none under a solid), all faint, drawn in the lit world,
    so it is seen where the light falls and the dark hides it beyond: a line leading on into the dark. Its bed starts
    `ROAD.half` north of the gate (out of the camp). Nothing stands back from it (not in `reserved()`): it bends round
    every solid in its way instead (trees, boulders, walls, columns, prisms: `bends()` in world.js, worked out once from
    the valley the first time the road is asked for; a flat-topped bump per solid, a group shares a side, faded out
    within 80 of a pin), so no solid stands within `ROAD.half` + its radius of the middle line (15 did before), and it is
    exactly 0 at the gate, each beacon and the arena. `roadX(depth)` is the road's middle at a depth: what is to stand on
    it (the waymark lamps) takes its x from there; `roadSolids()` lists what it bends round.
  - **The beacon's call** (fx.js, render.js `beaconCall()` / `flowMotes()`): the light of a spirit caught that flows to the
    next beacon (run.js `capture()` emits `flow` (e, i) when `flowTo()` took any; not for the beacon's own spirits, a full
    flow or a siege) leaves it as a soft cool mote drifting off north towards the beacon, faster and faster (`FX.flow`,
    at most 30), and the next beacon shows as a faint cool glow at the top edge of the darkness in its direction, stronger
    as the flow fills (`S.charge` against the flow's share) and swelling a little, eased, after each flow (`FX.call`); gone
    as the beacon comes into view. With `prefers-reduced-motion` no motes: the glow swells more instead.
  - **Darker sides** (render.js `sideMist()` / `sideDark()`): over the valley's outer `SIDE` (150) units the dark is
    thicker (up to `SIDE_DARK` more, over the light too) and a cold mist lies on the lit ground. The night's own still
    read there (nightUnder / nightOver are over the dark).
  - **The fallback mark** `h_road` (main.js `roadCheck()`, `ROAD_LOST`): on the first three runs (`S.runs < 3`), once the
    keeper has walked 8 s (`R.p.moving`, after the first step and the lantern lit) and is still under 300 units north of
    where the run began, a mark at the next beacon (`roadAt()` in ui.js, however far: off the screen it waits at the top
    edge, its stem pointing north): "Follow the North Road to the beacon", ticked by going 300 further north than where
    it opened or coming within 500 of the beacon (`wentNorth`). One mark at a time: on a new game's first run (40 s of
    oil, the walking, beam, oil, sootling and waymark marks first) it rarely gets its turn, so it is offered on three.
  - **Kandil** at the gate: his small talk `s.kandil.road` ("Follow the North Road; the beacons stand on it.", pri 1, so
    it is what he says) from the lantern until his first talk `kandil.wick` is heard, whose last line now says it again.
- **Yol Fenerleri, the waymark lamps** (`WAYMARK` in data.js; world.js `waymarks()`; run.js `updateWaymarks()` and the
  functions after it; render.js `drawWaymark()` / `wayHoles()` / `wayGlow()` / `wayCall()`): the old keepers' road lamps,
  one beside the North Road in each zone (`WAYMARK.at`: depths 900, 2900, 5250, 8150, 10350, about midway between the
  zone's start and its beacon; `WAYMARK.off` (36) to `side[i]` of `roadX()`, where the valley left room: no solid near,
  no prism in the way of a beam from the south, away from the beacon's ring; nothing in the world was moved for them).
  A small cousin of the beacons (the same grey stone as a plinth, an iron post, a glass lantern at its head, `WAY_HEAD`
  40 up), solid (`WAYMARK.r`), dark at first: a sooty glass and a cold glint, a faint grey of moonlight round it.
  - **Relit once, for good** (`S.waymarks[i]` = 1, saved at once; old saves load with none lit), by a small siege on the
    beacon's machinery but apart from it (`R.siege`, `S.charge`, the HUD's bar and the bot's siege stay the beacon's):
    the keeper standing within `wayRing()` (`ringMin`, 88: a deliberate step up to the lamp, not walking past it on the
    road) of a dark lamp for `stand` (0.4) s begins it (`R.wayStand`; `R.waysiege`: `{ i, t, waveT, callT, clingers, k, away }`; `waySiege`), staying beyond `leave` × that for `grace` s
    breaks it (`wayBreak(i, why, secs)`; what it was kindled to stays for the rest of the run in `R.wayProg[i]`, 0..1,
    the next step into the ring goes on from there). It kindles with the keeper's light on it (`waySpots()`: its post up
    to the glass, shone on like the beacon; the beam fastest, `kule` still speeds it) towards `light[i]`, and every
    spirit it calls (`callWay()`, `call`: `wayDrawn` = i, they settle by it) and the keeper catches brings `feed` of the
    whole (`wayFeed`). The night pushes back: every `wave.every[zone]` s an arc of `wave.count[zone]` sootlings (× the
    brood's growth; a lone one at a time in the meadow, so that a new player's first run is not ambushed) for the lamp (`wayWave()` → `arcWave()`, `s.way`: they crawl for it, not the keeper, and climb its
    base, `s.onWay`, `wayCling`); each on it takes `stall` off the kindle, more than `stallMax` and it runs back `drain`
    a second (`R.waysiege.k` -1). The beam on the lamp burns them off (`R.wayBeam`, `SOOT.glass`), the beam on one melts
    it, a Flare or a dash blasts them off (`dropOff()`), the lamp's own light only holds them; burned off its base one
    emits `wayClear`. No great one comes for a lamp. The sootlings share the beacon's code through `siteOf(s)` (the
    beacon's base or the lamp's), `baseSpot()` and `clingSite()`. Lit (`lightWay()`): every sootling within `burst` is
    burned (src `'way'`, the great ones stand), every spirit it called is caught (src `'way'`, a capture like the
    beacon's: no Tutuşma), no oil burns or is drunk (thorns, clinging sootlings, moth bites: as in a beacon's `LIGHTING`) for `moment` s (`R.wayLight`), `wayLit(i, secs)`, and it pours oil at once.
    Tuned so that a decent player of the zone's power holds it for about `hold` (8) s (the bot: 6-10 s).
  - **Its oil**: a lit lamp keeps `refill` (25 %) of the lantern's oil for each run (`R.wayLeft[i]`, from `ST.oilMax` at
    the run's start); the first pass within `pass` of it on a run (`R.wayIn`: the lamp the keeper is at; a lamp behind
    where the run started, `R.startDepth`, does not pour: only relighting it by its siege does) pours all of
    it in (`wayPour()`, `R.pourI`: the lamp pouring), over `pour` s (`R.pour`, `R.pourRate`), over the brim if need be:
    what the lantern has no room for becomes an **overfill**, a reserve above its max (`R.oil` > `R.oilMax`, up to
    `oilTop()` = the max × (1 + `over`, 25 %); `overfill()` is how much), burned first and at the usual rate until the
    oil is back at the max. Only what does not fit under `oilTop()` (an overfill left from another lamp) is lost. Once a
    run, no going back to top up. Nothing else fills the lantern past its max: Çiy Damlası and the shards stop at it (and
    leave an overfill as it is), the Heart's last moment only raises the oil to 30 %. Never sparks. (It used to pour only
    what fitted under the max: with the renewed spirits keeping Çiy Damlası pouring, the lantern was mostly full as the
    keeper passed, and a lamp gave ~1 % of the sloppy bot's oil and ~4 % of the main bot's: its moment had gone.) It is
    the run's middle beat: spend the oil relighting the lamp or push on to the beacon; lit, a quarter of a lantern more on
    every run that passes it. Not a start point.
    Seen: lit, a warm pool of light round its head (seen from afar down the road), lower once its oil for the run is
    given, flaring while it pours, warm drops running from its glass to the keeper's lantern and the oil it gave over
    the keeper (fx.js; paler and larger when some of it goes over the brim), the wick swelling warm (`#wickBox.pour`);
    as it goes over the brim (`wayBrim`, once a pour) a warm-white ring at the keeper's lantern with a few bright drops
    welling out of it, two little bell notes, and the overfill on the wick flaring once (`#wickBox.brim`). On the wick
    the overfill runs on past the full mark (its right end) at the wick's scale (25 % of its length at most), thicker,
    paler and brighter than the wick and slowly breathing (`#wick .over`, `#oilOver`; still with less motion), with a
    hairline brim standing at the full mark; the ember, the burn stretch and the rate stand at its tip, and the number
    under it turns pale gold (`#wickBox.over`, ui.js `hud()`). Off the screen to the north within `WAY_CALL` (1100) a
    lit lamp that still keeps oil shows as a faint warm glow at the top edge (`wayCall()`, as the beacon's cool call).
    Under siege: a warm arc of the kindle round its base (red while it runs back), the flame catching in its glass,
    soot on its plinth, guttering with what climbs it. Heard (audio.js): two soft beats and a low call as it begins, a
    dark rush for a wave, a knock as one climbs it, a short warm chord as it lights, a run of soft glugs as it pours.
  - Coach mark `h_waymark` (main.js through `meet('waymark', lamp)`, when a dark lamp is within the halo + 300): step up
    to it (a poll of `R.waysiege`), `[mouseL]` kindle it (ticked by `wayLit`), and what a lit one is for (said). Small
    talk `s.kandil.way` (chapters 0-2, after the first run) and `s.ulker.way` (chapters 1-3); the journal's records
    page has a row of lamps lit. `dev.waymark(i, ahead, lit)` puts the keeper `ahead` south of lamp i in a run;
    `fresh(n)` lights the lamps of the zones behind.
- **Spirits renewed over a run** (`RENEW` in data.js, run.js `updateRenew()`, `thinned()`, `slotSpirit()`): a zone's
  stock is not all there is. As the stock round the keeper wears thin, one of the zone's spawn slots is filled now and
  then out of the dark just beyond the halo (`gap` beyond its edge), mostly ahead and to the sides (`nightWay()` with
  `spread`, as the brood comes; `darkAt()`: never in the light, a lit beacon's included, south of the night wall), never
  within 230 of a lit waymark lamp, nor on the road to the Heart or at it, nor before the first step, while the lantern
  is being lit or in a beacon's moment. The rate: `thinned()` (0..1: of the free spirits the chunks within `near` of the
  keeper's depth were stocked with on this run, `R.stock` from `spawnChunk()`, `w.stock`, the share no longer there; a
  renewed one, `w.renew`, stands in for one; a husk's flock and what a beacon, a lamp or the Heart called do not count)
  × `k[zone]` of a chunk's slots (`BASE_COUNT` × the density stars) a minute, from nothing at `first` s into the run to
  all of it `ramp` s later. Each is filled as the chunk's are (`slotSpirit()`, shared with `spawnChunk()`: golden, elder,
  a cluster of small ones, a husk with its flock, shy, plain, at their usual chances). So nothing comes while the stock
  stands, and once a zone is mown (the ruins within the first quarter of a run) the back half of the run is still worth
  playing; the ruins renew faster (`k` 10 against 7), being mown soonest (`R.renewN`: how many on this run; the sim's
  stages table shows the renewed share of the catches).
- **Oil** burns faster the deeper the zone (`ZONE_BURN`), so it limits a run at every stage of the game; faster
  still while focused, and night thorns and clinging sootlings drink it. `R.burnK` (the rate against the zone's
  normal) drives the wick gauge's flare and the "×1.8" above it. None burns or is drunk before the keeper's first
  step, nor while the lantern is being lit at the start of a run (`KINDLE`), nor for `LIGHTING` after a beacon is
  lit, nor in the afterglow; none burns for a waymark lamp's `moment` either. `ZONE_BURN` is [1, 1.1, 1.65, 2.1,
  3.3]: gently in the first two zones, so the oil stars (`OIL_PER` in data.js, a level each) outgrow it and the runs
  lengthen as the keeper grows (see Balance), faster from the swamp on, where the renewed spirits keep Çiy Damlası
  pouring in up to its cap (the lantern's oil again) and the burn holds the runs near 100 / 130 / 135 s (it was
  [1, 1.1, 1.05, 1.5, 2.9] before the siege's ceiling, whose cheaper beacons made the late runs catch more). The arena (index 5, the Heart's fight) is set apart (3.2: the Heart's attempts come from
  the Last Vigil, not from a fast burn, which the designer rejected; the burn only sets how long an attempt lasts,
  about 120 s for the sloppy bot since slice 2 of the vigil, 2.5 before: ~195 s). The lit waymark lamps refill it
  once a run each, past the max if it is full (the overfill, above).
- **Time played** (what real players report, see Testing → Balance): `S.playTime` is the time on the road (it grows
  only inside `updateRun`, so `?speed=N` runs it N times ahead of the other); `S.totalTime` is the time at the game,
  camp included. `frame()` in `main.js` adds the frame's (clamped) time to it in every scene but the title (camp, run,
  sky, summary, ending; panels, conversations, the settings plate and changes of scene count too), while the page is
  visible and `idleSeconds()` (`input.js`: seconds since the last key, pointer or wheel event, a key's auto-repeat
  included; 0 while a key or a mouse button is held, which it tracks itself, apart from `Input.keys`) is under
  `IDLE_AFTER` (60 s): someone who walks away stops being counted until they touch something. It is saved with the
  rest of `S` by the usual saves (a run's end, a purchase, a beacon, every 15 s while the page is visible, the page
  hidden or closed), and `pagehide` saves too, but only with no run under way. The other saves are not guarded: they
  take a run under way as it stands (the beacon's partial charge, the catches), as they always did.
  A save from before the field starts it at 0, so for that player the total understates the time really played (a
  total below the road time gives it away).
  `S.stat.winRuns` / `winRoad` / `winTotal` are the first dawn, set once by `killBoss()` (while `!S.won`): the run it
  was won in (`S.runs + 1`: `endRun` counts that run only after the Heart's death animation), and the road time and
  the total time at the moment the Heart breaks; 0 = not won yet. The journal's records page shows the total time
  and, once the Heart has broken, a row for the first dawn (runs · total time); the ending screen shows runs,
  spirits, road time and total time, the first dawn's when set.

## Layout
- `js/data.js` — every balance number: zones, beacons and their sieges (`SURGE`, `SIEGE`), the waymark lamps (`WAYMARK`), camp geometry (`CAMP`,
  `STATIONS`, `CAMP_FILLS`), wisp scaling, the beam (`BEAM`, `RAMP`, the lantern's glass `HEAT`, `SPLIT`, `SEAR`), the halo's floor (`HALO`), `SHELL` (and its flock) / `PRISM` /
  `THORN`, the knock-on stars (`POOL`,
  `REFRAIN`, `IGNITE`, `TRAIL`, `STARFALL`, `AKKOR`), the brood (`SOOT`), the moth (`MOTH`, `MOTH_EVERY`), the
  night's great ones (`ELITE`, `GREAT`, `DEATHHEAD`, `GNAWER`, `KONCOLOS`), the shy spirit (`SHY`), upgrade `NODES`,
  `TIER_SCALE`, `BREWS`, `BOSS` and the Last Vigil (`VIGIL`)
- `js/state.js` — save `S`, derived stats `ST` via `recalc()` (stars, then the active brew), purchase rules, storage
- `js/world.js` — static world, generated per 400-unit chunk from a fixed seed. World y = -depth; camp at the origin.
  Things added later (prisms, thorns) draw from their own seeded sequence so older things stay where they were; the North
  Road (`ROAD`, `roadX(depth)`: its middle's x, the helper for anything placed along it; its stones in `ch.road`); the
  waymark lamps beside it (`waymarks()`); the Heart's arena's prisms and crystals (`arenaSpots()`)
- `js/run.js` — the whole run simulation (player, the beam, wisps, moths, shades, thorns, the brood and the night's
  great ones, prisms, fireflies, beacons and their sieges, the waymark lamps, the Heart and its Last Vigil). No DOM, no drawing; everything observable goes out through `emit()` so fx / audio / ui /
  quests / talk can react and the bot can run headless
- `js/camp.js` — camp logic: walking, the fence and gate, what is in reach, errands after a click, what a click
  lands on (`spotsOf`: a station or its resident), signs, barks and the greetings as the camp comes up
- `js/quests.js` — Puhu's requests (tracked from run events) and Vırak's brews. Logic only
- `js/story.js` — the story told at camp: conversations (`TALKS`), small talk, reactions to an expedition, the
  chronicle, and pure helpers (`nextTalk`, `smallTalk`, `reaction`, `chronicle`…). Its header is the story bible
  and the contract for the wiring. Data only: no DOM, no state
- `js/talk.js` — the story wired in (logic only): the conversation on the plate (`Talk`, the typewriter, presses,
  the heard rule), small talk, the events of a run collected for the reaction, the chronicle's unread pages.
  Saved in `S.story` (`heard`, `read`, `lastProgress`)
- `js/fx.js`, `js/audio.js` — cosmetic reactions to events; audio.js also has the place's bed of sound (the camp's
  fire, the night's wind: `ambience()`), the music turning as a run sets out and falling away when the oil runs
  out, and the player's volumes: gain nodes of their own after the buses (`syncVolume()`), so the buses' envelopes
  are left alone
- `js/view.js` — the run's camera as plain arithmetic (zoom, the view's half-height, the look-ahead, where it looks;
  nothing of it depends on the focus: focusing does not move the camera): render.js frames the screen with it, run.js
  asks it what the player sees (a moth's tell), the bot plans with it (`onScreen()` in sim.js). Change the framing
  there, not in render.js, or they drift apart
- `js/render.js`, `js/sprites.js`, `js/campart.js` — drawing. `draw(dt, mode)` with mode `run | camp | idle`; passes:
  lit world → darkness layer with a hole per light → additive glow → things that must read in the dark → overlay.
  `V.view` is what is shown: the camera, or a `glide()` between it and another framing (between scenes);
  `screenToWorld` goes through it. The block at the end of render.js draws the lantern being lit and going out.
- `js/sky.js` — the skill tree as stars on its own canvas; `Sky.sel` / `Sky.selPos` drive the details box. At its
  heart, where every spoke starts, the keeper's lantern (`ROOT_ID` = `fener` in data.js, `root: true`, the one star
  with no parent, a size larger, in a hairline compass; it changes no stat). Unlit, the first star of every spoke is
  shown locked; lighting it sends light down the spokes and they wake.
- `js/icons.js` — the icon set: one 24×24 path per icon, used on canvas (`drawIcon`) and in the DOM (`svgIcon`)
- `js/ui.js` — DOM: HUD, overlays, residents' panels, the conversation plate, coach marks (their queue, tests and
  placement), the band for what is said in passing, the settings plate with its volume sliders, the star details
  box, and between scenes the veil (a canvas over everything), the journey's card, the HUD and summary arriving;
  `js/input.js`; `js/i18n.js`
- `js/main.js` — boot, scene flow (`transit()`: the changes of scene), frame loop

## Conventions
- Game rules live in `run.js` / `camp.js` / `quests.js` / `state.js` / `data.js`. Rendering and UI read state; the
  only state the UI changes is what the player does through it (buy a star, claim a request, drink a brew).
- New upgrade: add a node to `NODES` in `data.js` (its `fx` mutates the stats object, `icon` names an entry in
  `icons.js`) and `n_`/`d_`/`s_` strings in both languages. A tier-N node becomes visible once N beacons are lit.
- Interface language ("night atlas"): serif, spaced small caps, hairline double-frame plates (`.plate`), notched
  buttons (`.btn`), own line icons. Warm colour is reserved for light (wick, sparks, the primary action); chrome is
  cool. No emoji, no pill buttons with drop ledges — that is the look of the other game on the same site.
- One-shot presses are latched in `input.js` (`flare`, `dash`, `use`, `talk`, `tap` — `tap` is a left click on the
  game, `talk` is F); every scene branch in `frame()` must take or discard all five, or a press made in one scene
  fires in the next. F is also held for the beam in a run (`beamHeld`), so a run discards `talk` every frame.
  The pad's own (`ok`, `back`, `menu`, and a menu's `nav` and `page`) are taken at the top of every frame by `padPress()`.
  A key that goes to an `<input>` (a focused volume slider: the arrow keys move it) is not the game's: `input.js`
  neither holds nor latches it; `UI.closePause()` takes the focus off the slider.
- New coach mark: an entry in `MARKS` in `ui.js` (what it points at: `at` / `el` / `things`; `rows`: a text key
  and a test) and its rows in both languages (`[X]` in a text is a key cap, `[mouse]` / `[mouseL]` / `[mouseR]` the
  mouse, `[padRT]` and the like a pad button; a row starting with a cap is set in capitals, any other is a sentence: at
  most ~8 words). Every cap needs a pad button in `PAD_CAP` (or the row a `_pad` text, where a cap means something
  else on the pad: F, the beam's in a run, X at camp). The test reads
  the game: an event on the bus, or a poll of `R` / `Camp`; what is missing is added to `run.js` as an `emit()` or a
  field of `R` (`meet(what, thing)`, `R.beaconBeam`), never the other way round: a mark changes nothing in the game
  but `S.seen`. The keys in `S.seen` are saved: never rename one. What a mark says must be true to the rules above.
- Story text lives in `story.js`, `tr` and `en` side by side in each line (the one exception to i18n.js). Ids of
  conversations, remarks and chronicle pages are saved: never rename one. Names of stars, brews and things of the
  world in it must match `i18n.js`, and what it says they do must match the game (`tools/story-check.mjs` checks
  the names it uses). Heard rule (`talk.js`): a conversation is heard once
  its last line has been shown whole, or when closed with Esc after its first line was shown whole; closed while
  the first line is still typing it stays on offer.
- Changes of scene go through `transit()` in `main.js` (the white fade into the ending keeps the older `swap()`):
  steps at set times, run from the frame loop or a timer, whichever comes first, so a hidden tab (no frames) or an
  exception in a frame cannot leave the game stuck; the last step always opens the screen and frees the input.
  While a transition holds the input (`busy`), Escape / P / Space / Enter and the buttons do nothing and the veil
  takes the clicks; the switch itself happens while the screen is covered. What only looks (glides, the lantern,
  the veil, the HUD fading) lives in `render.js` / `ui.js` and is advanced by the frame's dt or read from the
  transition's clock; the one rule that came with it (`KINDLE`: no oil burns while the lantern is being lit) is in
  `run.js` / `data.js`. The quiet periods still cover the first moment after each change: `Camp.quiet` and
  `Camp.keyQuiet` (set by `haltCamp()` on every covered frame, so they run from `campUp()`: E / F / a click
  pressed while the camp comes up use and start nothing), the panel's and the sky's own. No conversation can be
  open when one starts (each way into a change of scene needs the camp live), and `enterCamp()` closes any.
- Camp rules that exist because of bugs found in review (keep them when touching `camp.js`):
  - Walking through the gate starts a run and cannot be undone, so only the keys walk the keeper out. The cursor is
    never followed, and a click on the gateway or on bare ground does nothing (`clickTarget()` checks the gateway
    before the stations: Kandil stands beside it). F never walks. `haltCamp()` runs on every frame the camp is
    covered (panel, settings, a conversation, fade) and stops the keeper and drops the errand.
  - A conversation covers the camp like a panel: the press that ends it uses nothing, a key held through it has
    to be pressed again (`readOn()` / `endTalk()` in `main.js` reset the latches and release the keys), the tail of
    a double click is ignored as the camp comes back (`Camp.quiet`), and so are E and F for a moment
    (`Camp.keyQuiet`, set with it by `haltCamp()`): mashing E or F to read on would otherwise open the telescope or
    the next conversation the instant one ends. The plate itself ignores presses for a moment after it opens and
    after a press shows a line whole (`Talk.quiet`), so a double click does not skip a line unread. Only Esc ends
    a conversation early (P, the run's pause key, does nothing there).
  - A key held while the camp comes up (W through the end of a run and the summary) must not walk the keeper out:
    the camp coming up (`campComesUp()`), the keeper being up (`campUp()`) and closing a panel or the settings
    call `releaseKeys()`, and the auto-repeat of a key the page does not know as held is not a press, so the key
    has to be pressed again. A walking key pressed fresh while the keeper gets up (the camp in view) gets them up
    at once and walks. Not in `resetInput()` or `haltCamp()`: a key held while walking out must carry on into the
    run (`haltCamp()` also runs while a journey's veil closes).
    The browser's context menu is blocked on the whole page, because a key released while it is open goes unseen.
  - Errands (a click on a station) do not walk in straight lines: `steer()` goes around solids, walking with the
    keys cancels them, and one that makes no progress is dropped. The camp is stepped at about 1/60 s whatever the
    frame rate, because the steering overshoots with longer steps. Two solids placed close together, or one near
    the fence, create corners: run `dev.campSweep()` after any change to `STATIONS`, `CAMP` or the steering.
  - The narrow V between two solids that stand almost together (the telescope and Ülker, the cauldron and Vırak),
    and the one between Kandil, the east gate post and the fence, is filled by an invisible solid (`CAMP_FILLS`):
    a key held into such a dent walked the keeper in and they had to turn back. The keeper's way round the camp has
    no corner sharper than 100° to walk into (`dev.campCorners()`, also a line of `campSweep()`): when solids are
    added or moved, add or move a fill rather than leave a V.
  - The shut gate (no lantern yet) is the fence carried straight across the gateway, not a round solid: a circle
    there makes a ~44° V with each gate post. A straight line meets the posts at about 116°.
  - Clicks are ignored for a moment after the camp comes up (`Camp.quiet`): the second click of a double click on
    the button that brought it up would otherwise land on whatever is under it. The same goes the other way for a
    resident's panel (`panelAt` in `ui.js`): a double click on a station in reach would close the panel it opened,
    or press the button under the cursor ("Go" starts a run).
- Strings: every key in both `tr` and `en`; upper-case with `upper()` (Turkish i/İ), never `toUpperCase()`.
- The game is hosted under a strict CSP (`default-src 'self'`): no inline scripts, no `style=""` attributes in HTML
  (setting `el.style` from JS is fine), no CDNs or web fonts.

## Testing
- Syntax: on this machine `node --check file.js` does not catch syntax errors in these ES-module files (a stray
  merge marker passes); `node --input-type=module --check < file.js` does. Check every changed file that way.
- A page under test is silent: importing `tools/dev.js`, `?mute` in the address or an automated browser sets
  `Sound.silent` (the master volume node at 0; `S.vol` untouched, nothing saved). `game.Sound.silence(false)` to hear it.
- The preview pane gives no animation frames while hidden. `tools/dev.js`:
  - `fresh(beacons, extraTier, won, story)` / `setup(...)` build a save a player would have at that point; story:
    `'past'` (default: the conversations of earlier chapters heard, this chapter's new), `'all'` or `'none'`.
    They own the keeper's lantern (`h_camp_scope` is learned too). `newGame()` is a brand-new save instead (no lantern,
    its cost in the purse, nothing learned or heard, nothing saved): call it on the title screen and play, for the
    real first visit. Every coach mark is marked learned in `fresh()`; to look at one: `delete game.S.seen.h_shell` (and
    `shows_h_shell`), then meet the thing in a run, or `game.UI.hintOnce('h_shell')` with one near. `game.UI.mark()`
    says which mark is up, its rows' ticks and its side. A transform on `body` (the screenshot trick below) shifts
    what `getBoundingClientRect` reports for the HUD: take it off again before stepping on.
    `step`, `walkTo`, `camp`, `campStep` drive the simulation directly. Fast, but they bypass `input.js` and the
    frame loop. `step` draws 20 frames each call: to look at a moment, step `run.updateRun` (and `updateFx`) yourself
    and draw once or twice (each draw spawns its own particles). `elite(type)` calls up one of the night's great ones.
    `waymark(i, ahead, lit)` puts the keeper `ahead` units south of waymark lamp i in a run (`lit`: set it lit or dark
    first); `fresh(n)` has the lamps of the zones behind lit.
    With the pane hidden the run is paused (`visibilitychange`), and every pane screenshot pauses it again; to look
    without frames at all: `manualFrames()`, then step the run and `draw(1/60, 'run')` from render.js, and copy
    `game.V.cv` out (`toBlob`).
  - `timerFrames()` puts the real frame loop on timers (take one screenshot afterwards to hand over); then the
    `ev` helpers dispatch real mouse / key events (`mouse`, `down`, `up`, `click`, `leave`, `keyDown`, `keyUp`,
    `key`, `hold`). Use this whenever `input.js`, `main.js` or `camp.js` change. The sky listens on its own canvas
    (`#sky`): dispatch its pointer events there (`ev.mouse` goes to the window).
  - `pad` stubs a gamepad (there is no real one to test with): `pad.plug()` puts a fake standard pad behind
    `navigator.getGamepads()`, `pad.set({ lx, ly, rx, ry, RT: 0..1, A: true, UP: true, ... })` holds sticks and buttons
    (UP / DOWN / LEFT / RIGHT the D-pad) until set again, `await pad.tap('A')` presses and lets go, `pad.unplug()` takes
    it away. The frame loop polls it, so drive it with `timerFrames()`. `game.UI.mark()` and the `#coachRows` markup show
    which glyphs a mark has. On a menu `document.querySelector('.padFocus')` is the plate's selection (with the pad last
    used) and `game.Sky.sel` the sky's; walk to a station with the stick (`pad.set({ lx, ly })` towards
    `interactables()` from camp.js until `game.Camp.near` is it), then `pad.tap('A')`. A slice-2 pass: the sky (open,
    move, A twice past 0.25 s buys, B), Kandil's list (A on a beacon's Go journeys there), a request claimed, a brew
    drunk, the journal's pages (RB / LB) and its scrolling (DOWN on a long chronicle), the settings (a volume with
    LEFT / RIGHT, held repeats; the sound and the language; Resume; End the run), the erase question opening on Cancel,
    and with the mouse moved no `.padFocus` and no `#padRing`.
  - `manualFrames()` instead stops the clock: `performance.now()` stands still and the frame loop runs only on
    `clock.step(sec)`, so a change of scene can be looked at moment by moment (screenshots between steps; a
    screenshot may time out once, retry). `game.busy()` / `game.transit()` say whether one is holding the input
    and how far it is. Synthetic `ev.click` goes to the canvas directly, past the veil that takes real clicks.
    With no frames at all (the hidden pane, no helper) the steps of a change of scene still run on their timers.
  - `campSweep(dt, step)` (from the title screen, after `fresh(n)`) runs the camp logic from a grid of start
    points (some inside the gateway): leaving by the keys, a click on every station and on every resident (talk),
    clicks on the ground and the gateway moving nobody, F from anywhere moving nobody and doing nothing but talk, E
    and F right after a cover doing nothing, no cursor position moving anybody (through `readMove` /
    `readCursor`), the hover marking what a click on each part of a station or resident does (with every sign up,
    each sign out to its edges and corners) and nothing over the gateway, a key held through camp-up not walking (nor the pad's left stick, until centred again), no corner sharper than 100° to walk into;
    and with the lantern taken away for a moment, the keys into the shut gate starting nothing from anywhere, Kandil
    speaking, and no sharp corner at the shut gate either. Every line of its result should read "ok"; try 0, 2 and 5
    beacons (after `newGame()` the line about leaving by the keys fails, as it should).
  - The frame loop only switches to timers after one real frame, and screenshots fail, while the pane is hidden.
  - Screenshots there may show only the top-left 1/devicePixelRatio of the page; for a full view scale the body:
    `document.body.style.transformOrigin = '0 0'; document.body.style.transform = 'scale(' + 1 / devicePixelRatio + ')'`.
  - The pane's screenshots are scaled down and its zoom does nothing: to look closely at something small (the
    lantern's glass), draw a crop of `game.V.cv` onto a throwaway canvas, enlarged, and take its `toDataURL()`.
- Story: `node tools/story-check.mjs` plays the story headless: every conversation reached exactly once from the
  first visit to the epilogue, Ülker's thread in order for a player who rushed ahead, the heard rule, small talk
  for everyone in every chapter, the chronicle, each kind of reaction from a synthetic run, old and broken saves,
  the first visit before the lantern (and saves from before it), and that the stars, brews and things of the world
  the story names are named as in the game. Run it after any change to `story.js` or `talk.js`.
- Balance: `node tools/sim-node.mjs 5` plays the whole game five times with a bot and prints the run each beacon
  fell in (`... nocamp` skips requests and brews, `... camp` keeps them; the third argument goes to `playthrough()`,
  so the camp word must be there: `node tools/sim-node.mjs 10 camp '{"seed":1}'`; a JSON in its place is silently
  taken as the camp word and ignored. Other tables
  `'{"energy":[...],"tier":[...],"boss":{"open":...},"vigil":{...},"moth":{"oil":...},"mothEvery":[...],"soot":{...},"halo":{...},
  "shell":{...},"shellChance":[...],"heat":{...},"grace":3}'`, `"bot":"sloppy"` (or an object of bot knobs over the
  main bot's), `"hold":true` over either and `"watch":true`, below, and `"seed":1`: `Math.random` seeded, playthrough i with seed·1000 + i, to compare two
  versions run for run; two sets of 20 seeded playthroughs of one version can still differ by two runs, so compare
  over two seed sets, 1 and 3). Each playthrough's line ends with the moths' bites and their share of all
  the oil spent, and the clings and the clinging brood's share; each logged run shows the bites and the oil they
  took (`mb= mo=`). The same bot runs in the page: `(await import('./tools/sim.js')).playthrough()`. (History, from before the beacon's ceiling: the current baseline is the last paragraph of this section, "The beacon resists a weak light".) Current (seed
  sets 1 and 3, 20 playthroughs each, with the night's great ones): ~37 runs / ~42 min with camp chores (beacons at
  about runs 5, 11, 18, 25, 33; the Heart in about 4 attempts), ~43 / ~49 without (seed 1, 10 playthroughs: 5, 12,
  20, 28, 37; the Heart in about 6): requests and brews are worth about two or three attempts at the Heart. The
  sloppy bot: ~41 runs / ~45 min (5, 12, 21, 29, 37). That is an interim state, pending a global rebalance now that
  the great ones are in; the costs (`TIER_SCALE`) and the Heart (`BOSS`) were deliberately left as they were.
  After the camera came in closer (view.js: the keeper about 6 % of the screen in the meadow; the bot sees the
  narrower view through `camHalf` / `camAhead`), on the same seeds before → after, 20 playthroughs per seed set
  (the "before" is a rerun of the unchanged code on the day, 36.1 / 36.5, under the ~37.3 / 37.2 quoted above:
  that much is run-to-run noise): main bot seed 1 36.1 → 37.4
  runs, seed 3 36.5 → 36.3 (beacons unchanged at about 5.4, 11.3, 18.2, 25.4, 32.8 both before and after: the
  half run is the Heart's attempts, within the noise between seed sets); the sloppy bot seed 1 40.3 → 41.5
  (beacons 5.3, 12.2, 20.6, 28.6, 37.0 → 5.4, 12.4, 21.2, 29.2, 37.4: about half a run later from the swamp on,
  where it plans with fewer targets). Not retuned for it.
  The halo holding the night and the husk's flock (above) were tuned for the sloppy bot: before them it took ~44 runs
  (seed sets 1 and 3: 42.9 and 44.8), after ~42 (42.0, 41.7), the main bot ~39 → ~37. The floor itself adds half a
  run to a run (a careless player, one that never turns the beam on the night, loses 5 % of the meadow's oil and 8 %
  of the forest's to the brood, against 1 % and 6 % when the halo burned it; later the knock-on stars and the
  fireflies finish what the halo holds), taking away any one of the bot's new habits (below) moved it by under half
  a run, and a higher floor or denser broods hardly at all (the night costs the bot little oil); the flock is what
  shortens the game:
  each of its spirits is a capture (the chain, chain lightning, Nakarat, Çiy Damlası's oil), so 5-8 of them took
  about three runs off the sloppy bot's game and 4-6 about two, whatever the husk's own worth, its burst or how often
  it comes (those moved under half a run).
  The moth was tuned for a human-like player, the sloppy bot, not to keep the main bot's length: the old moth homed
  in and could not be dodged, and neither bot fought it, so it took ~12-13 % of their oil and broke ~93-111 chains a
  game (~22 % of the oil in the forest, ~9-10 bites a minute), which is what the designer found too strong. Now (its
  strength, worth and bite as before; a 0.4 s tell) the sloppy bot loses ~8 % of its oil to moths (~12-13 % in the
  forest, ~5 bites a minute; ~60 bites a game) and its game is ~43 runs / ~48 min (46 / 50 before); the main bot,
  which burns most moths as they circle and steps aside from most dives, ~2 % (11 bites). The moth's numbers move the
  sloppy bot's game a lot and the main bot's little (a moth it handles is worth catching): the tell's length most of
  all (0.35 s: ~20 % of the sloppy bot's forest oil; 0.45 s: ~10 %).
  The knock-on stars had cut about five runs (~38 / ~41 min, the Heart in 1-2), mostly in zones 3-4 and at the
  Heart: more captures, so more Çiy Damlası oil and longer fights. Weakening the stars themselves moved little, so
  the tiers they buy into were raised instead (`TIER_SCALE` for tiers 2-4: 1300 / 31000 / 700000 → 2000 / 46000 /
  1000000) and the Heart pays more per attempt (`BOSS.bounty` 12M → 18M, so a keeper without requests is not stuck
  there; hp 2.5M → 2.55M). The Heart is touchy: 6 % more hp is about 1.5 attempts more.
  The bot focuses on husks, shy spirits, tough lone spirits, prisms
  with a flock behind them and thorns ahead (`laserPlan()`); each logged run shows the share of time it spent
  focused (`foc=`). Moths it handles like a decent player too (`mothWatch()`): it burns one circling the light with
  the beam a moment after it has seen it (aiming where it was a tenth of a second ago: the hand lags behind a moving
  target), flares when two circle within reach, and steps aside from a dive: it sees four tells in five, 0.3 s in,
  and lets the beam go while it steps (focused walking is slow). The sloppy bot sees two in three, 0.42 s in, keeps
  the beam on (so it rarely gets clear), swings to fewer of them and lags more.
  The brood it handles like a decent player (`broodWatch()`, `BOTS.main`): the halo only holds them, so it melts the
  sootlings closing in after a moment's reaction, those out in the dark in front of the lantern and those in the
  light all round (`attendIn`; with the lantern busy, only one about to pounce), focuses a moment after one clings to
  burn it off the glass (`glass`), and flares when two cling or a crowd or swarm is near (a scorched one counts
  double: a ring held at the halo); a shade on its heels it holds in the beam, and flares when one is about to reach
  it (`shadeWatch()`); it ignores a husk's guarded flock and goes out of its way for a husk with one. Each logged run
  shows the brood burned, the clings and the oil they drank (`soot= cl= dr=`). `"bot":"sloppy"` (`BOTS.sloppy`) is a
  decent but imperfect human instead: it notices them later, looks round less widely (in the light too), focuses
  later to burn off what clings, never sees one in five, aims up to 14 units off, does not leave what it is busy
  with, and flares late and only for bigger crowds (~42 runs). `"watch":true` prints the brood zone by zone (on
  screen, the share of the oil it drank, clings, what the moths took and what the shades drained, `R.sapped`) and
  what became of the moths (tells, dives, misses, and in which phase they were caught). The main bot loses under
  0.1 % of its oil to the brood and ~2 % to moths; the sloppy one about 1-1.5 % to the brood in the forest and the
  swamp and under 1 % later (4-7 clings a minute), ~10-13 % to moths from the forest on, and 0.5 % to shades in the
  ruins (2 % when it left them to the halo), where flares, chain lightning, Tutuşma and the fireflies burn the brood
  before or just after it clings. The brood makes the bot's game about a run shorter (melting them means beaming,
  which catches spirits too, and Puhu's soot request pays).
  The night's great ones (above) were tuned to resist without making the game longer (seed sets 1 and 3, 20 each,
  against the same seeds before them): the main bot ~37.3 → ~37.2 runs, the sloppy one ~41.9 → ~41.0 (~44.9 → ~43.0
  without camp, seed 1, 10 playthroughs); the meadow takes about a third of a run more, the cavern about half a run
  less (it lost the brood's karabasans and gained gnawers that pay), the rest within noise (the Heart's attempts vary
  by 1.6 from seed to seed). The bot meets about 0.85 a run in the meadow, 1.35 in the forest, 1.8 in the swamp, 2.9
  in the cavern and 2.3 in the ruins (main: ~93, 68, 75, 85 and 93 % finished; sloppy: ~94, 59, 66, 75 and 80 %).
  The Kurukafa was tuned for the sloppy bot, as the moth was: moths and Kurukafa together take ~15 % of its oil in
  the forest (moths alone ~12.5 % before; the Kurukafa's own share ~1.5-1.8 %, from about 60 nips a game), the main
  bot's ~3.3 % (~2 %); elsewhere what the night takes is as before. Its first cut (a 0.5 s tell, 8 % bites that let it
  dive again, the moth's circling) took ~19 % of the sloppy bot's forest oil: bite size alone barely moved that, the
  longer circling (it is burned before it dives) and a bite ending its round did. What touched the length most: the
  great ones' worth (at 2-3 times these `val`s they took two runs off the sloppy bot: a great sootling was a third of
  the meadow's income), `ELITE.knock` (chain lightning finished them for free), and the Kurukafa's tell and dive (a
  0.36 s tell and a led 0.3 s dive bit the bots on most second dives; the bot also keeps to the side it chose for one
  of its dives).
  The bot handles them like a decent player (`eliteWatch()`): it walks towards one it sees (they pay well), to
  within the beam's reach, and beams it a moment after noticing it (the main bot leaves what it is busy with for it,
  the sloppy one does not); a gnawer on a prism it wants is burned so; Karakoncolos' waves it flares as any crowd;
  the Kurukafa's dives it dodges as a moth's, each tell seen or not anew, and the main bot steps round its dust
  (`dustAside()`, never during a dodge). `"watch":true` adds, zone by zone, how many great ones came a run and the
  share finished, and of each kind (sim-node.mjs).
  The beacon's siege (above) was tuned to keep the game's length (seed sets 1 and 3, 20 each, against the same
  seeds before it; the siege's own numbers only, `SIEGE`): the main bot ~36.1 / ~36.5 → ~37.1 / ~37.0 runs (~41 min),
  the sloppy one ~40.3 → ~41.5 (seed 1; ~43 without camp, as before); `SIEGE.kindle` sets the hold (the bot holds each
  beacon for about 12 / 12 / 16 / 16 / 18 s, the sloppy one 12 / 15 / 18 / 19 / 21, breaks and resumptions added;
  before, the last fifth of beacons 3-5 took it 40-110 s at the old rate, often more than one run). The beacons now
  fall earlier (about runs 6, 12, 17, 23, 30 against 5, 11, 18, 25, 33; the sloppy bot 6, 13, 20, 26, 33 against 5,
  12, 21, 29, 37) and the Heart takes more attempts (~7-8 against ~3.5): the bot reaches it a few runs sooner, with
  less behind it. Denser or quicker waves move neither bot (they melt the arcs; well under one
  sootling a game climbs a beacon), so the waves are set for a human hand, not the bot. The bot holds a siege as a
  decent player (`botInput()`): it goes to the beacon when it has the oil to get there and stay, keeps in the ring,
  beams the beacon when nothing clings and spirits have not gathered, beams it (which burns off what climbs it) when
  they have, melts the sootlings crawling for it as any (`broodWatch()`, the lantern not counted busy in a siege),
  flares on crowds and beams the great one (`eliteWatch()`); each logged run shows the sieges begun and broken
  (`sg=`), and `"siege":{...}` in the third argument overrides `SIEGE` for a trial.
  The lantern's glass (`HEAT`, above) was first tuned against a player who never lets go of the beam: `"hold":true`
  over either bot (`BOT.hold`; `'{"bot":"sloppy","hold":true}'`) holds it whenever the bot is not holding it for a
  reason, aimed where the bot aims, the Heart's fight too, and once its glass has unlocked after an overheat sees
  after `react` that the beam has not come back, lets go for a tenth of a second and presses again (`holdOn()`).
  Before the glass that cost nothing (seed sets 7, 8 and 9, 8 playthroughs each): the main bot 37.3 runs / 41.7 min,
  holding 36.7 / 38.1; the sloppy one 41.6 / 46.0, holding 41.1 / 41.8. A glass that only weakened (to 50 %, held for
  ever) cost a holder ~11 runs (the main bot 37.8 / 42.6, holding 48.3 / 51.6; the sloppy one 43.2 / 48.1, holding
  54.4 / 57.0), but the owner could not feel it; a beam that went out and came back cool by itself, or hot, or on a
  new press with the glass cool, cost a holder ~2, ~7-9 and ~3 runs. Now, with the glass as a resource (on the same
  seeds): the main bot 38.0 / 42.9 (beacons about runs 6, 12, 17.5, 23.5, 30.5; the Heart in about 7 attempts), the
  sloppy one 43.5 / 48.6 (6, 13, 20, 27, 34; the Heart in about 9), neither ever overheating (`overheated 0` on each
  playthrough's line); holding, the main bot 41.8 / 46.3 and the sloppy one 47.7 / 51.9 (about 140 overheats a game):
  ~4 runs. Then (before the lock drew the halo in, below: history) the lock barely moved that: `HEAT.lock` 1-4 s and
  `HEAT.unlock` 0.4-0.8 all left the sloppy holder at 46.3-47.9, a longer lock even helping it (locked, the lantern was
  as if let go: the halo full, walking at full speed, no focus oil, a rest it did not choose); `HEAT.min` 0.3 took it to
  48.8 (and the sloppy bot +0.5). A holder paid for the red it spent its time in, not for the lock. The sieges hold
  about as long as before.
  Since the lock draws the halo in (the halo as small as when focused from the overheat to the unlock, above; and the
  stutters once a climb), on the same seeds: the main bot 38.0 / 42.8 and the sloppy one 43.1 / 48.0 (43.4 / 48.4 on
  the code before, rerun on the day: the non-holders never overheat, so the lock cannot touch them; the sloppy bot's
  0.3 is the stutters no longer firing twice per pass near the top, which shifts the random draws, i.e. noise); holding,
  the main bot 41.8 / 46.3 → 42.0 / 46.5 and the sloppy one 47.7 / 51.9 → 48.1 / 51.5 (about 135-140 overheats a
  game each, as before): +0.2 and +0.4 runs, little, because the lock was 2 s. Now a longer lock costs a holder (it no
  longer rests it): `HEAT.lock` 3 took the holders to 42.4 / 48.5, 4 to 44.6 / 50.0; `HEAT.unlock` 0.3 left them at
  42.1 / 47.2. The designer wanted holding discouraged, so `HEAT.lock` is now 4 (was 2): on the same seeds the main bot
  38.0 / 42.8 and the sloppy one 43.1 / 48.0, unchanged (they never overheat); holding, the main bot 44.6 / 50.7 and
  the sloppy one 50.0 / 55.0 (about 125-130 overheats a game each): +2.8 and +2.3 runs over the 2 s lock without the
  shrink (41.8 / 47.7), about 6.6 and 6.9 runs over the non-holders.
  The bots let go of a hot glass (`glassRest()`): the main bot as soon as it gets into the red, focusing again once 60 %
  of the heat has gone (waiting for all of it made no difference), but not while the Heart is open (`open`: letting
  go there cost it about an attempt at the Heart) unless the glass is about to overheat (`nearTop()`: 0.3 s short of
  full, whatever it holds on for); the sloppy one 1.5 s into the red (`hot`, short of full), focusing again once half
  to all of the heat has gone (`cool`, drawn each time). Neither rests from what the beam does whatever the glass
  (`anyway` in `botInput()`: burning off what clings to the glass, knocking down a pounce; short of full). Each logged
  run shows how often the glass got into the red and overheated (`hot= out=`), each playthrough's line the totals;
  `"heat":{...}` and `"grace":N` try other numbers. What moved the good bots' cost was the grace late in the game, at
  the Heart's long holds: with +2 s from the Mercek line the Heart took the main bot half an attempt more (1.5 without
  camp), with +3 s (now) about as before. The sloppy bot's cost (~0.3 runs now against 0ac3876's 43.2) barely moves
  with the base grace.
  The late lens no longer thins (Işın and Yıldız Mızrağı: a band of `beamWidth` 30 instead of a cone thinning to a
  23-wide line, and piercing prisms, The beam above): on its own it shortened the game about a run (seed sets 1 and 3,
  20 each: the main bot 38.6 / 38.2 → 37.1 / 37.8 runs, mostly the fifth beacon half a run sooner and half an attempt
  less at the Heart), so the two stars give less power (focus a level: Işın 0.1 → 0.08, Mızrak 0.2 → 0.16). Now, on
  the same seeds, the main bot 38.8 / 38.8 runs (86.2 / 86.7 min, against 85.4 / 85.3), the sloppy one 48.5 / 49.1
  (96.9 / 99.1 min, against 96.9 / 98.1); the fifth beacon falls about 0.3 runs sooner and the Heart takes about 0.4
  attempts more (main 2.8 → 3.1-3.4, sloppy 4.8-5.3 → 5.2-6.3: Mızrak's power is felt there, where `VIGIL` is the
  knob). Mızrak's focus moves the Heart for the sloppy bot most (0.12: 7 attempts), Işın's the ruins. The bot needed
  no new rule: it already stands so that a prism's flock is behind the prism, where the pierced beam goes on into it.
  More overrides in the third argument, put back after each playthrough (sim.js `overrides()`): `"vigil":{...}` (over
  `VIGIL`), `"zoneBurnArena":k`, `"zoneBurn":[...]`
  (`ZONE_BURN`), `"stats":{...}` (over `BASE_STATS`), `"oilPer":k` (× the oil each `yag*` star gives; or a list, one
  for each star), `"surge":{...}` (over `SURGE`), `"renew":{...}` (over `RENEW`), `"energyK"`, `"tierK"`, `"kindleK"`
  (× `BEACON_ENERGY`, `TIER_SCALE`, `SIEGE.kindle`: a number or a list), `"siegeRef":[...]` and `"steep":n` (the
  siege's ceiling). `"zones":true` prints a table by zone (sim.js `ZI`, playthrough() returns `zones`): runs, dead runs
  (every spark star of the open tiers the bot buys at its max as the run starts), idle (nothing bought after it), flat
  (its power up under 3 % after it: power is the Fitil stars'), runs from the zone's first to its beacon ready and from
  ready to lit, runs with a siege, sieges begun / capped (with every `siegeCap`) / broken (left, end), the seconds under
  siege, the bank as it lit (× a run's gain, × what the next tier costs), the share spent at once, what the open tiers
  still wanted, and the power as the zone began / got ready / lit against `SIEGE.ref`. `"stages":true` prints a table after
  the playthroughs by stage (beacons lit as a run starts; `Heart`: all five): runs a game, the mean run (s), sparks and
  catches a run, the share of catches in each quarter of a run, and the share of them that were renewed (playthrough() returns `stages` and `road`, the seconds on the road, always). With `"bot":"sloppy"` the last line is a
  human estimate fitted to one real finish (the designer's first: 49 runs, 76.4 min in all, 32.4 min on the road):
  runs × 1.13, road × 1.21, total = (1.13 × runs × 54 s + 1.21 × road s) / 60 (seed 1, 10 playthroughs: ~48 runs,
  ~76 min, ~32 min on the road). One finish: a rough guide, to be refitted as more real finishes come in.
  **The run-length curve and the waymark lamps** (history; the current baseline is the next paragraph). The designer's
  first finish was 49 runs and 76 min, only 32 on the road (~40 s a run): too much camp, runs too short. Target: about
  2-2.5 h for a human's first finish by lengthening the runs as the keeper grows and giving them a middle (the lamps),
  not by costs alone. Changed (a67e9cb → now): `ZONE_BURN` [1, 1.35, 1.9, 2.5, 3.2] → [1, 1.05, 1.05, 1.15, 1.2] and
  the arena 4.5; `BASE_STATS.oilMax` 14 → 27; the oil stars (`OIL_PER`) 3/4/5/6/7 → 5/8/10/16/22 a level; `TIER_SCALE`
  [1, 22, 2000, 46000, 1e6] → [1, 60, 5000, 88000, 1.8e6]; `BEACON_ENERGY` [1200, 22000, 7e5, 7e6, 5e7] → [7000,
  1e5, 1.3e6, 1e7, 8e7] (saves of version 2 keep the share they had filled, `S.v` 3), `SIEGE.kindle` rescaled with it
  (holds as before); `SURGE.earlyCalls` 2; the waymark lamps. Started from a design trial ("Trial B": burn [1, 1.05,
  1.15, 1.25, 1.35], oil 31, the oil stars ×1.7, tiers [1, 45, 7000, 150000, 2.6e6], beacons [3200, 6e4, 2e6, 1.8e7,
  1.1e8]: main bot ~38 runs / 57 min on the road, sloppy ~50 / 61 with 11-13 runs in each of the cavern and the ruins,
  the beacons' sieges 25-50 s); from there the lamps' oil (~10 % of the main bot's oil, ~5 % of the sloppy one's) let
  the base oil come down, the dearer swamp-to-ruins beacons came down (their flow, not the stars, set how many runs a
  zone took) and the cheaper tiers 2-4 with them, the late oil stars and a gentler late burn lengthened the late runs,
  and the arena's burn sets the Heart's attempts (2.5: about 1 attempt of ~115 s; 4.5: 6-8 of ~83 s). Çiy Damlası was
  left at +100 %: capped at +50 % (`"refill":0.1`) the sloppy bot's game did not change at all and the main bot's by
  0.2 runs (it does not reach the cap in long runs: not a runaway lever).
  Now (seed sets 1 and 3, 20 playthroughs each, with camp; before → after): the main bot 37.5 / 38.0 runs, 23.9 / 24.3
  min on the road → 36.2 / 36.4 runs, 59.6 / 59.8 min on the road (~77 min in all); the sloppy one 43.5 / 43.0, 27.4 /
  26.8 → 46.3 / 46.6 runs, 58.7 / 59.1 min on the road; the human estimate (sloppy) ~77 → ~118-119 min in all, ~71 on
  the road, ~52 runs. By stage (`"stages":true`; runs a game / mean run s, seed 1):
  main before b0 6.2/19, b1 5.7/25, b2 5.5/33, b3 5.8/41, b4 7.2/43, Heart 7.2/62; after 5.6/48, 4.5/72, 5.8/107,
  6.6/116, 7.8/142, Heart 5.8/83. Sloppy before 6.0/20, 6.5/24, 7.3/31, 6.6/39, 7.6/40, Heart 9.6/61; after 5.8/40,
  6.2/52, 8.6/70, 8.6/85, 9.2/106, Heart 8.0/83. The catches are more front-loaded than before in the late zones
  (the share of a run's catches in each quarter, sloppy: swamp 36/34/15/14 → 66/19/9/6, cavern 51/27/11/11 → 70/14/9/7,
  ruins 65/18/8/8 → 76/12/8/5): the spirits of a zone are not renewed within a run, so a longer run's back half is the
  lamp, the beacon, the night and its great ones, and the walk; more for that back half to do is still open. Each lamp is held
  about 9 / 9 / 7 / 8 / 9 s by either bot, lit on the first run that reaches it (runs 1, 7, 13, 21, 31 for the sloppy
  bot). Still short of the aims for the sloppy bot by a little: ~59 min on the road (aim 60-75), the human estimate
  ~118 (aim 120-135), 9.0-9.2 runs in the ruins (aim at most 9); and the Heart takes 6-8 attempts (as many as before
  the lamps, but now it is about a tenth of the road time).
  **Spirits renewed, retuned** (history: the current baseline is the overfill's, below). The back half of a late run was
  empty (the sloppy bot mows the ruins within the first quarter of a run), so spirits are renewed as the stock round
  the keeper thins (`RENEW`, above); the lamps' sieges begin only on a deliberate step (`ringMin` 88, `stand` 0.4 s);
  each lamp pours once a run; the arena burns at 2.5. A constant trickle (`k` 0.33-5 a minute, from 8 s) either did
  nothing for the back half or flooded every quarter alike (k 5: renewed ~half the catches, the game 20 runs): the
  zone's stock is all caught in the first quarter in the ruins, so for each later quarter to bring ~15 % the renewed
  spirits have to be about as many as the stock there, and they must not come while it stands. Hence the rate follows
  `thinned()` and ramps in from 20 s to 50 s (a shorter ramp cost four runs and helped the ruins not at all; a power of
  the thinness made it worse), with the ruins at `k` 10. More catches made Çiy Damlası reach its cap (+100 % of the
  lantern) in the late zones, so the ruins' runs doubled: their burn rose instead of capping it (capped at +25-50 % the
  runs still ran long). Changed (5e0729a → now): `RENEW` (k [7, 7, 7, 7, 10], near 500, first 20, ramp 30);
  `BEACON_ENERGY` [7000, 1e5, 1.3e6, 1e7, 8e7] → [17500, 340000, 3.33e6, 3.35e7, 2.85e8], `SIEGE.kindle` [1.05, 2.07,
  4.64, 7.05, 11.35] → [2.63, 5.63, 10.5, 21.3, 33.6] (the holds near `SIEGE.hold`, shorter late than before); `TIER_SCALE[1]` 60 → 69; `ZONE_BURN` [1, 1.05, 1.05, 1.15, 1.2] → [1, 1.1, 1.05, 1.5, 2.9] (the
  arena 4.5 → 2.5 at 2471ee0); `OIL_PER` [5, 8, 10, 16, 22] → [5, 8, 10, 16, 14]; `WAYMARK.light` [260, 730, 4800,
  12600, 52000] → [260, 800, 9100, 26500, 166000] (the keeper comes to the late lamps stronger).
  Now (seed sets 1 and 3, 20 playthroughs each, with camp; 5e0729a → now): the main bot 36.2 / 36.4 → 36.9 / 36.4
  runs (the 5th beacon at run ~35.5), 59.6 / 59.8 → 56.4 / 56.2 min on the road (~74 min in all); the sloppy one 46.3 /
  46.6 → 45.5 / 45.9 runs (the 5th beacon at ~44.7), 58.7 / 59.1 → 59.7 / 60.2 min on the road (~82 min); the human
  estimate (sloppy) ~118-119 → ~118.5-119.5 min in all, ~72.5 on the road, ~52 runs. The Heart: one attempt of ~60 s
  for either bot (6-8 attempts of ~83 s before; the keeper now comes to it stronger). By stage (runs a game / mean run
  s, seed 1): main 8.3/42, 6.8/75, 6.4/95, 7.3/113, 7.2/144, Heart 1.0/60; sloppy 9.0/41, 8.8/61, 9.1/78, 8.7/97,
  9.0/119, Heart 1.0/61 (seed 3: 9.1, 8.8, 9.3, 8.7, 9.2 runs). Catches by quarter of a run (sloppy; renewed share):
  swamp 54/15/16/16 (29 %), cavern 50/16/17/17 (37 %), ruins 51/15/17/16 (46 %); main 51/16/17/17, 49/16/18/18,
  46/18/18/18 (35 / 41 / 54 %). Lamps held ~9 / 9 / 7 / 7.5 / 6.5-7 s by either bot, lit in runs 1, 10, 18, 27.5, 36
  (sloppy); beacons' sieges held about 13 / 12 / 15.5 / 15 / 17.5 s (sloppy), 12.7 / 10.7 / 14 / 13.3 / 15 (main).
  The lamps now give ~1 % of the sloppy bot's oil and ~4 % of the main bot's (5 and 10 % before): with Çiy Damlası
  topping it up from the renewed catches, the lantern is mostly full when the keeper passes a lamp. Against the aims:
  the human estimate is a hair under 120, the ruins' runs ~119 s (aim 95-115), and the zones sit at 8.7-9.3 sloppy
  runs (aim at most 9): the aims meet at the edge (five zones at 9 runs and the Heart in one make 46 runs, and the
  human estimate needs about that), so trimming one zone below 9 moves the runs into the next or drops the estimate
  under 120 (with the swamp's, the cavern's and the ruins' beacons at 3.4e6, 3.55e7 and 3e8: 46.1 / 46.3 runs, ~121
  min, but 9.2-9.3 runs in the swamp and the ruins).
  **The lamps' overfill, retuned** (history: the current baseline is the Last Vigil's, below). A lamp now pours its whole quarter of a lantern over the
  brim (the overfill, above): the lamps went from ~1 % (sloppy) / ~4 % (main) of the oil to ~13.5 % / ~17-18 %, and,
  untuned, the games got shorter in runs (main 36.7 → 32.6 / 31.8, sloppy 45.0 → 41.1 / 40.0, seed sets 1 and 3; road
  time about the same, ~58 / ~61 min; the human estimate ~114-116 min). The bot goes to a lit lamp that keeps oil
  whenever the lantern has room for `wayLack` of it with the overfill counted (`wayPlan()`: `oilTop() - R.oil`), so in
  practice on the first pass of every run. Tried on seed 1, 10 playthroughs each: the beacons' light ×1.25 (with
  `SIEGE.kindle`) gave main 36.1 runs but 67.7 min on the road and sloppy zones at 9.4-9.6 runs; ×1.4 more so; the
  costs of tiers 1-4 ×1.3 hit the sloppy bot hardest (47.7 runs, 10.8 in the cavern); the oil trimmed by an eighth
  (base 24, the oil stars ×0.88) gave the run counts back but the human estimate 117; by a sixth, 9.5 sloppy runs in the
  cavern and the ruins. Kept: the oil trimmed by about a twelfth and the beacons' light raised by 12 %. Changed
  (bfacf23 → now): `WAYMARK.over` 0.25 (new); `BASE_STATS.oilMax` 27 → 25; `OIL_PER` [5, 8, 10, 16, 14] → [4.6, 7.4,
  9.2, 14.7, 12.9]; `BEACON_ENERGY` [17500, 340000, 3.33e6, 3.35e7, 2.85e8] → [19600, 381000, 3.73e6, 3.75e7, 3.19e8]
  (saves of version 3 keep the share they had filled, `S.v` 4) and `SIEGE.kindle` ×1.12 with it ([2.95, 6.31, 11.76,
  23.86, 37.63]); the Heart untouched. After the merge of main (the camera no longer leaning with the focus) and before
  the overfill, seed 1, 10 playthroughs: main 36.7 → 36.7 runs (56.6 min on the road both), sloppy 44.8 → 45.0: the
  camera's change is within the noise on this branch.
  Now (seed sets 1 and 3, 20 playthroughs each, with camp): the main bot 36.5 / 36.2 runs (the 5th beacon at run
  ~35.4), 62.1 / 61.3 min on the road (~79.5 min in all); the sloppy one 44.5 / 44.3 runs (the 5th beacon at ~43.4),
  64.4 / 64.3 min on the road (~86 min); the human estimate (sloppy) ~123 min in all, ~78 on the road, ~50 runs. The
  Heart: one attempt of ~55-60 s. By stage (runs a game / mean run s, seed 1): main 8.2/46, 5.9/93, 6.8/100, 6.8/127,
  7.9/151, Heart 1.0/53; sloppy 9.1/45, 8.2/69, 8.8/86, 8.2/108, 9.3/128, Heart 1.0/60 (seed 3: 9.1, 8.0, 8.6, 8.4,
  9.3 runs). The lamps give ~17 % of the main bot's oil and ~13.5 % of the sloppy one's; held ~9 / 9 / 7 / 7 / 6.5 s,
  lit in runs 1, 9.5, 17.5, 27, 34.5 (sloppy). The ruins' runs are still long for the sloppy bot (~128 s) and its last
  zone takes 9.3 runs (aim at most ~9).
  A lit lamp behind where the run began no longer pours (and the bot no longer backtracks to one: `wayPlan()`), and the
  bot's oil spent counts the pour (the lamps' share was a little overstated before). Same seeds, 10 playthroughs each,
  before → after: main bot seed 1 36.6 / 80.0 min → 37.0 / 78.7 (62.2 → 60.7 on the road), seed 3 35.7 / 78.2 → 36.5 /
  78.8 (the 5th beacon at run 35.6 → 36.0 and 34.7 → 35.5; the Heart still one attempt); sloppy seed 1 44.3 → 44.3,
  seed 3 44.6 → 45.1; the lamps' share of the oil 17.3 / 17.2 % → 15.6 / 15.3 % (main), 13.3 / 13.5 → 13.4 / 13.2 %
  (sloppy): under a run's difference, so nothing retuned.
  **Son Nöbet, the Last Vigil** (history: the baseline before the beacon's ceiling, below; slices 1 and 2, `VIGIL`). Before it the Heart
  fell in one short attempt (a stat check: ~55 s, about 2 % of the game). The bot plays the vigil as a decent player
  (sim.js `bossInput()`): it keeps outside the dawn circle (never in the Heart's aura: under 0.5 % of its time there),
  by the middle of the part filling unless called away: it goes after the bunches of spilled spirits, walks to within
  the beam's reach of a husk the Heart let loose, moves round to a ring's gap (the main bot letting the beam go,
  `drop`), steps aside from a moth's or a Kurukafa's dive (`mothWatch()`, as in the zones; the main bot steps round a
  Kurukafa's dust), and walks back to what clings where its beam cannot reach (the main bot for any one, the sloppy one
  only once VIGIL.stallMax + `round` (1) are on, read when it plays so an override counts). What clings it notices
  `glass` s after the first climbed. Its lantern, first to last: a sootling (or a great sootling) about to pounce, a
  shade on its heels, one of the night's great ones (`eliteWatch()`), one clinging on the circle it reaches, a moth
  circling, a sootling closing in on the keeper (`broodWatch()`), a sootling of the waves within 140 of the circle
  (noticed and seen as the brood), the husk it went for, the Heart while it is open (`open`: the main bot only), what
  clings to its glass, the open lantern while spilled spirits are about it, else the Heart; a Flare as in the zones
  (crowds, swarms, moths circling, a shade about to reach it) or for two clinging on the circle within its reach.
  Each playthrough's line shows each attempt (the way it got, its seconds, what it paid against a late run's sparks)
  and the minutes and share of the game the Heart took; the summary lines the attempts a game, the first attempt's way
  and all attempts', the pay lost and won, the spirits spilled an attempt, the shares of the circle's light (spirits
  caught, husks and their flocks, moths, the beam on the Heart), how much of an attempt something clung on it and a
  part ran back, and what the Heart let loose an attempt (its great ones by kind, came / finished; husks let loose and
  broken, which counts a husk of the ruins by the arena's mouth broken during the fight too; moths caught) (`r.heart`,
  `r.heartMin`, `r.elites.heart` from playthrough(); the great ones the Heart let loose are not in the zones' counts).
  `"vigil":{...}` overrides `VIGIL` (its `wave` and `pay` merged), `"zoneBurnArena":k` the arena's burn.
  What it showed (as with the Dawn Beacon before it): the bots' trees are all but full when they reach the Heart, so
  an attempt's way is the bot's skill and luck against `light`, and the attempts a game are very steep in it (seed sets
  1 and 3, 8 playthroughs each unless said; `light` 1.0 / 1.1 / 1.2 / 1.3 / 1.4e7: main 1.2 / 1.5 / 1.5 / 1.6 / 2.0
  attempts, sloppy 2.2 / 2.6 / 3.5 / 3.9 / 9.0; at 20 each, 1.3e7: sloppy 5.6 / 4.2, 1.35e7: 6.8 / 7.5). Circled, the
  Heart is quicker for both than at the Dawn Beacon (no walking between the spills and a beacon at the mouth; the beam
  on the Heart fills too), so `light` went 1.0e7 → 1.3e7 for the sloppy bot at about 5 (the designer's choice); the main
  bot at about 2, as before. The circle's light comes ~84 % from spirits (the main bot) and ~82 % (the sloppy one), the
  rest from the beam on the Heart (`kindle` 0.35). What clings is the skill gap: something clings on the circle ~12 %
  of the main bot's attempt and runs a part back ~7 % of it; the sloppy bot's ~26 % and ~17 %.
  Now (seed sets 1 and 3, 20 playthroughs each, with camp; the Dawn Beacon's numbers → the circle's): the main bot
  38.4 / 37.3 → 37.8 / 37.3 runs, 85.4 / 83.4 → 84.7 / 84.7 min (66.3 / 66.5 on the road); the Heart in 2.5 / 1.9 →
  1.9 / 1.9 attempts of ~210 s (the first getting ~80 % of the way), ~7.4 min, 8.7 % of the game. The sloppy one
  48.5 / 48.4 → 49.1 / 47.6 runs, 99.8 / 99.5 → 105.9 / 99.8 min (81.9 / 76.5 on the road); the Heart in 5.0 / 5.0 →
  5.6 / 4.2 attempts of ~195 s (the first ~55 %), 21.2 / 15.1 min, 20.0 / 15.2 % of the game; the human estimate ~141 →
  ~149 / ~141 min in all (~56 / ~54 runs, ~99 / ~93 on the road). An attempt pays ~2.0 (main) / ~2.2 (sloppy) late
  runs' sparks lost, ~2.6-2.8 won. Seed set 1 against 3 differs by 1.4 sloppy attempts: the noise at the Heart.
  Slice 2 (the threats, the waves on the part filling, shorter attempts), after the designer's second play ("none of
  the great ones come here, it feels like cleaning things clinging to a surface, walking round was tiring, maybe the
  length"): the attempt is set by the arena's burn, `ZONE_BURN[5]` 2.5 → 3.2 (2.5: ~150 s for the sloppy bot, 3.6:
  ~108 s; at 3.2 ~120 s), and then the attempts a game by `light` (1.3e7 → 1.2e7; at 3.2 the sloppy bot took 7.1 at
  1.3e7, 4.9 at 1.2e7, 3.5 at 1.1e7: as steep as before). Now (seed sets 1 and 3, 20 playthroughs each, with camp;
  slice 1 → slice 2): the main bot 37.8 / 37.3 → 38.6 / 38.0 runs, 84.7 / 84.7 → 85.1 / 84.7 min; the Heart in 1.9 /
  1.9 → 2.8 / 2.6 attempts of ~210 → ~141 s, ~7.4 → ~7.6 min, 8.7 → 9.2 / 8.7 % of the game. The sloppy one 49.1 /
  47.6 → 48.0 / 49.0 runs, 105.9 / 99.8 → 95.3 / 98.5 min; the Heart in 5.6 / 4.2 → 4.3 / 5.5 attempts of ~195 → ~119 s
  (the first ~60 %), 21.2 / 15.1 → 10.4 / 13.8 min, 20.0 / 15.2 → 10.9 / 14.0 % of the game; the human estimate ~149 /
  ~141 → ~136 / ~140 min (~54 / ~55 runs). An attempt pays ~1.95 late runs' sparks lost, ~2.4 (main) / ~2.5 (sloppy)
  won (`pay` unchanged: the shorter attempt brings in fewer spirits, the threats' pay makes up for it). The circle's
  light: ~71 % the spirits caught, ~13 % husks and their flocks (the main bot breaks ~3 an attempt, the sloppy one ~2:
  Sabah is reached late), ~3 % moths, ~13 % the beam on the Heart. Something clings on it only ~4 % of an attempt (26 %
  of the sloppy bot's before) and no part ran back: the waves come where the bot stands and it melts them on the way.
  The Heart lets loose ~10.6 great ones an attempt for the main bot (great 4.7, Kurukafa 3.3, Karakoncolos 1.2,
  karabasan 1.5), ~8.8 for the sloppy one (4.1, 2.8, 0.85, 1.0), both finishing ~96 %, and ~12-16 moths are caught.
  Slice 3 (the five zones over the three stages, the arena's prisms and crystals, the thorns, the stage's beat and
  opening wave, `heartGrow()`), after the designer's third play ("I liked its balance more"; a full build "got through
  a bit easily"): the bot burns a thorn the Heart grew from where its beam reaches it (walking within reach first:
  `go thorn`, `burn thorn`, after the great ones and before what clings), walks towards a gnawer sitting on one of the
  arena's prisms or crystals when its beam does not reach it (`go gnawer`; `eliteWatch()` burns it), and catches the
  crystals as any spirit. Husks came a stage earlier (Şafak) and were then a third of the circle's light, so they come
  half as thick in the opening wave and a little rarer (`[10, 1]`), and `light` went 1.2e7 → 1.15e7 (on the sloppy bot,
  from the saves at the Heart's door, below: 1.1e7 4.2 attempts, 1.15e7 5.3, 1.2e7 6.2: as steep as ever). The arena's
  burn is as it was (3.2: the designer's to decide). Now (seed sets 1 and 3, 20 playthroughs each, with camp; slice 2 →
  slice 3): the main bot 38.6 / 38.2 → 39.7 / 38.0 runs, 85.4 / 85.3 → 88.2 / 84.5 min; the Heart in 2.8 / 2.8 → 3.9 /
  2.5 attempts of ~143 → ~140 s, 9.5 / 9.4 → 12.4 / 8.5 % of the game (seed set 1's 3.9 is the noise at the Heart: the
  full trees meet m ≈ 1.39 from their second attempt on). The sloppy one 48.5 / 48.8 → 49.0 / 49.1 runs, 96.9 / 98.1 →
  97.7 / 98.4 min; the Heart in 4.8 / 5.3 → 5.3 / 5.6 attempts of ~122 → ~116 s (the first ~70 %, ~61 % before), 12.3 /
  13.7 → 13.1 / 13.9 % of the game; the human estimate ~138 / ~140 → ~139 / ~140 min (~55 runs). The circle's light:
  ~64 % the spirits caught, ~23 % husks and their flocks, ~3 % moths, ~9 % the beam on the Heart (and the prisms'
  rays). The Heart lets loose about twice the great ones: ~22 an attempt for the main bot (great 6.4, Kurukafa 4.6,
  karabasan 4.4, gnawer 3.9, Karakoncolos 2.8; ~92 % finished), ~18 for the sloppy one (5.4, 3.7, 3.9, 3.5, 2.1; ~91 %),
  with ~4 husks, ~3.3-4.3 thorns (~90 % burned) and ~12-17 moths caught. To try the Heart's numbers quickly,
  playthrough() takes `saveAt5: true` (it returns the save as the keeper first comes to the Heart, with the runs,
  minutes and road time so far) and `from` (a save to play on from): saved once per seed and bot, the Heart alone
  plays out in about a tenth of the time, and its attempts agree with the whole playthroughs' (slice 2's code: 2.6 /
  2.7 and 5.55 / 4.75 against 2.8 / 2.8 and 4.8 / 5.3).
  With the late lens (The beam: a band that pierces prisms) merged in, and the review's fixes (a pierced beam's share
  on what clings, faint light under `BEAM.hold`; the bot keeping out of a thorn's aura where its beam reaches, and its
  thorn count no longer taking those the Heart's breaking burns), `light` stays 1.15e7: on seed sets 1 and 3, 20
  playthroughs each, with camp, the main bot 37.9 / 37.3 runs, 84.3 / 82.5 min; the Heart in 2.9 / 2.1 attempts of
  ~138 s, 9.6 / 7.3 % of the game (the first ~85 % of the way). The sloppy one 48.8 / 47.5 runs, 97.5 / 94.7 min; the
  Heart in 5.6 / 4.5 attempts of ~115 s (the first ~70 %), 13.6 / 11.6 % of the game; the human estimate ~139 / ~135
  min (~55 / ~54 runs). The circle's light: ~62 / ~64 % the spirits caught, ~27 / ~23 % husks and their flocks, ~3 %
  moths, ~8 / ~10 % the beam on the Heart and the prisms' rays (main / sloppy). Let loose an attempt: ~21.5 great ones
  for the main bot (~92 % finished), ~19 for the sloppy one (~90 %), ~4 husks, ~4 thorns (~85 % burned by the main
  bot, ~3.2 and ~85 % the sloppy one), ~13-17 moths caught. As steep and as noisy as ever: 1.12e7 gave main 2.4 / 2.3
  and sloppy 3.8 / 5.5, 1.18e7 main 3.5 / 3.2 and sloppy 5.1 / 5.3; on seed sets 5 and 7, 1.15e7 gave main 3.1 / 3.1
  and sloppy 6.2 / 6.0, 1.18e7 main 3.6 / 4.4 and sloppy 8.1 / 6.0. 1.15e7 sits nearest the designer's aim (the sloppy
  bot about 5 attempts of about 2 minutes, the main bot about 3) over the four seed sets (main ~2.8, sloppy ~5.6).
  **The beacon resists a weak light** (the current baseline). Before it a zone's runs were set by the beacon's light
  quota: with the tier's tree full the bot played dead runs (main: 2.8 in the meadow, 1.1 in the forest; sloppy 3.1 /
  1.4) and the siege was a 13 s last step once a zone. Now the flow is a twentieth (`BEACON_ENERGY` [980, 19050, 186500,
  1.875e6, 1.595e7], `SIEGE.kindle` × 0.05 with it so a siege's fill takes as long), the siege has its ceiling
  (`SIEGE.ref` [30.5, 93, 215, 666, 2117]: the bots' power as each beacon lit before, put just under the Fitil step it
  lit at, since power moves in steps of 1.25 (31 and 2118, a hair over 30.52 and 2117.6, would have needed a whole Fitil
  level more or the Kor brew); `steep` 2), so a zone's count is `TIER_SCALE`'s (the Fitil stars' price). The bot (sim.js
  `roadInput()`) goes to a ready beacon it never tried, or once its power has grown since its siege last capped
  (`BOTCAP`, set by `siegeCap`) and never returns to a siege that has capped on this run (`capThis`), leaves a capped
  siege straight south, and else keeps its ring clear (its goal pushed out of `siegeRing()` × 1.3 and a way past it
  taken round the ring's `keep` circle, on the goal's side; a dodge or a husk by the ring still walks it in now and
  then, ~1 a game). The ceiling alone (`TIER_SCALE` [1.6, 90, 8000, 140800, 1.8e6]) lengthened the runs from the swamp
  on (main 100 → 143 s in the swamp, 132 → 168 in the cavern: ~480 catches a run against ~300, so more of Çiy Damlası's
  oil), so the oil was retuned with it (the provisional state → now): `BASE_STATS.oilMax` 25 → 40 (a new game's first
  run about 40 s of oil), `OIL_PER` [4.6, 7.4, 9.2, 14.7, 12.9] → [6, 7.4, 9.2, 14.7, 8.5] (the first star raised with
  the base, the fifth lowered by as much: the full tree's lantern is 269 s as before, so the Heart's attempts keep their
  oil; the meadow with tier 0 full 70 s of oil: 40 + 5 × 6), `ZONE_BURN` [1, 1.1, 1.05, 1.5, 2.9, 3.2] → [1, 1.1, 1.65, 2.1, 3.3,
  3.2] (the arena untouched), `TIER_SCALE` → [2.1, 110, 5800, 97000, 1.8e6]. Seed sets 1 / 3, 10 playthroughs each,
  with camp (provisional → now): the main bot 37.9 / 37.0 → 37.3 / 36.9 runs, 92.7 / 91.1 → 82.6 / 81.0 min (74.2 /
  73.0 → 64.4 / 63.0 on the road); zones 7.2 / 6.8 / 6.7 / 7.8 / 5.9 and 7.3 / 6.7 / 6.6 / 7.9 / 5.7 → 7.0 / 6.8 / 7.6 /
  6.9 / 5.8 and 7.4 / 6.4 / 7.1 / 7.3 / 5.6; the mean run (s, by stage, seed 1) 43 / 72 / 143 / 168 / 152 → 59 / 80 /
  102 / 132 / 135 (the Heart 137); dead runs 0 / 0.2-0.4 in the first two zones → 0 / 0.2-0.5, none later; the Heart
  in 3.5 / 2.8 → 3.2 / 3.1 attempts of ~137 s. The sloppy one 46.2 / 45.2 → 48.2 / 46.1 runs, 101.5 / 100.7 → 98.2 /
  93.8 min (78.9 / 78.6 → 74.6 / 71.3 on the road); zones 7.4 / 9.4 / 8.3 / 9.7 / 6.3 and 7.5 / 9.3 / 8.2 / 9.6 / 6.1 →
  7.6 / 9.8 / 9.5 / 8.6 / 6.6 and 7.2 / 9.3 / 8.9 / 8.8 / 6.1; the mean run 42 / 61 / 119 / 145 / 141 → 57 / 67 / 88 /
  115 / 129 (the Heart 115); dead runs 0 / 0-0.1; the Heart in 5.1 / 4.5 → 6.1 / 5.8 attempts of ~113 s (about one more,
  at the edge of its noise: the shorter ruins runs bring the sloppy bot to it with a little less of the tree); the human
  estimate ~142 / ~141 → ~139 / ~133 min (~52-54 runs). Sieges: ~5 begun a beacon (4.7-6.3; ~4 of them capped), held
  ~37-62 s in all a beacon, ~8-11 s each; power at the light 31 / 93 / 223 / 652-680 / 2033-2118 against `ref`. The
  lamps give ~14 % of the main bot's oil and ~12.4 % of the sloppy one's (12.3-12.8 and 11.3-11.6 before). After the review's fixes to the bot (no return to a siege that capped on this run; the
  way round a ring tangent to it) and to the rules (no drain while capped, the great one at `SIEGE.great` of the whole
  share), seed 1, 10 playthroughs, with camp: the main bot 38.3 runs, 85.6 min (66.9 on the road; zones 7.2 / 6.9 / 7.4 /
  7.6 / 5.7, mean run 60 / 80 / 101 / 133 / 137 s, the Heart in 3.5 attempts of 140 s), the sloppy one 47.8 runs, 97.5 min
  (74.2 on the road; zones 7.6 / 9.8 / 9.0 / 8.5 / 6.5, mean run 58 / 67 / 91 / 114 / 130 s, the Heart in 6.4 attempts of
  111 s); sieges 4.7-6.4 begun a beacon, 3.7-5.3 of them capped: within the noise of the numbers above, nothing retuned.
  Not met: the
  ruins take 5.6-5.8 main and 6.1-6.6 sloppy runs (aims 6-8 / 7-9), and with `TIER_SCALE[4]` and `ref[4]` fixed only a
  shorter ruins run adds runs there (the ruins' count against its mean run, main: 5.0 at 149 s, 5.8 at 135, 5.9 at 129,
  6.7 at 115), against the aim of ~150 s; the sloppy bot's forest and swamp sit at 9.3-9.8 and 8.9-9.5 (aim at most 9)
  while the main bot's are 6.4-6.8 and 7.1-7.6: the bots' gap there is wider than the two ranges allow, and the forest's
  price set any higher brings the main bot's dead runs back. Tried: Çiy Damlası's cap halved (`"refill":0.1`, +50 % of
  the lantern; seed 1, main): the cavern's and ruins' runs 132 → 122 and 135 → 115 s, 6.7 ruins runs, 40.5 in all, but
  the Heart 3.2 → 4.3 attempts (its long attempts lean on the refill), so it was not kept; the swamp did not move (its
  catches stay under the cap). `TIER_SCALE` moves the zones it prices about one for one with a little spill into the
  next: [2.1, 100, 5000, 85000] with the swamp at 1.65, the cavern at 2.0 and the ruins at 3.0 gave the main bot 34.0
  runs (7.0 / 6.3 / 6.2 / 6.7 / 5.0) and the sloppy one 43.6; [2.1, 110, 6000, 105000] with 1.8 / 2.2 / 3.4 the main
  bot 39.9 (7.0 / 7.0 / 7.8 / 8.6 / 5.9, runs of 93 / 120 / 129 s from the swamp).
  The bot buys the keeper's lantern before its first run, as a player must. It never dashes, so it does not buy the
  stars that only change the dash (`DASH_ONLY` in `sim.js`).
  It only plans with what is on screen (`onScreen()`: view.js's `camHalf` and `camAhead` on a 16:10 screen, focused
  or not; a change to the framing in view.js changes what the bot sees, so it needs a new baseline: taking the focus
  lean out moved the main bot from 38.2 / 38.0 to 38.6 / 38.6 runs and the sloppy one from 43.3 / 43.3 to 43.5 /
  43.0, seed sets 1 and 3, 10 playthroughs each, within the noise), and steps
  aside when it has been stuck against solids for
  2 s (`unstick()`), but its aim is perfect and it never misjudges a thorn's ring, so the late-game numbers
  flatter a human player.
  The bot's clock adds, per run, the run itself, 22 s at camp, a fixed 4 s, and the changes of scene (`SCENE` in
  sim.js, from main.js): the summary after 1.5 s (0.9 after the last beacon), waking at camp 1.1 s, and the
  journey from a lit beacon 0.9 s: about 3.4 s a run (they were not counted before: ~46 / ~53 min). The run
  counts do not depend on the clock. Playthroughs differ from one another by a run or two (random draws): to
  compare two versions run for run, seed `Math.random` and play the same seeds on both.
  Real players report the journal's first-dawn row (runs, total time) and the road time (the ending screen shows
  both), to set against the bot: their runs against its runs, and their total time against its minutes (the road
  time plus its camp and scene assumptions above); the road time shows how much of a gap is the road and how much
  the rest (panels, the sky, talk, standing about). A total below the road time means a save older than the field
  (see Time played), or `?speed`.
  Upgrade costs and power grow exponentially, so beacon energy barely moves the length of the game (more of it
  only makes the bot farm longer and come to the Heart stronger); with the ceiling each tier's price (`TIER_SCALE`)
  sets its own zone's run count about one for one (tier 3 or 4 alone mostly moves the Heart), and the ceiling stops the
  bot rushing a beacon under-powered: a beacon waits for the power `SIEGE.ref` names.
- Deploy: `deploy/deploy.sh` (read its header). Deploying is the user's call.
