---
name: diskort-rules
description: "Product rules and rejected ideas the user decided for Diskort (keep it simple, DM vs server, cosmetics, releases, registration)"
metadata:
  node_type: memory
  type: feedback
  originSessionId: a7b70327-6e05-4060-a15b-293ddac27162
  modified: 2026-10-01T23:28:49.871Z
---

- **Keep it simple:** rejected — voice channel status ("kanal durumu"), a separate member-list "Etkinlik" grouping. Don't propose again. Stream badge text is "YAYINDA" everywhere. Bottom-left voice/user panel: don't restyle (only the streaming row + cosmetics display allowed). Discord UI is only a reference; never copy code/assets/sounds. In the browser pane (user's Discord) only look, never click voice channels.
- **Etkinlik (game activity) — user reversed the old rejection on 2026-09-30 and asked for it:** desktop (Windows) detects the played game (launcher library folders + manual add/hide); sharing ON by default with a settings toggle; icon = the exe's own icon uploaded to our server; shown in member list subline, profile "Oynuyor" card, DM list/header, voice member hover card; mobile only displays. No rich presence, no Discord game list, no quick "Mesaj gönder" button in the member list; scanner runs only while logged in. Row sublines use state icons + one text. Later: Spotify-style `listening`.
- **DM vs server:** DMs never show server info (roles, role colours, kick/ban). Profile settings are account-level. DM call presence must never appear in guild contexts (use client-core `guildVoiceStateOf`/`voiceStateIn`).
- **DM calls + blocking (0.9.6, user decisions):** calls ring 30 s with popup + sound, missed-call record; mobile closed = normal push only (no CallKit/full-screen yet). Blocking only closes DMs/calls (1:1 DM read-only both ways, blocked person never told); NOT hiding guild messages, NOT auto-muting in guild voice. Admin panel shows DM calls as "Özel arama", nameless. Vault: `decisions/dm-sesli-arama-ve-calma.md`, `engelleme-dm-ve-arama.md`.
- **Releases:** don't cut client releases on your own; accumulate on main. Server-only fixes may be deployed. "sürüm çıkar" / "halledip çıkalım" = OK to release. Default is a patch bump; the user may name a bigger version for a notable feature (0.9.0 for Etkinlik). Release notes are read from GitHub unauthenticated on purpose: do NOT use `githubDispatchToken` for reads (the user's security-boundary decision).
- **macOS signing (2026-10-10):** user chose Apple Developer ID + notarization + auto-update (secrets MAC_CERT_P12_BASE64/MAC_CERT_PASSWORD, notarize with ASC_KEY_*). Never re-add an ad-hoc fallback release. Windows/SignPath decision below unchanged.
- **Code signing (SignPath):** not applying for now (decided 2026-09-30). **Why:** it needs two manual approvals on every release, and the user does not want per-build chores. **How to apply:** don't propose signing or anything else that adds manual steps to each release; if the topic returns, the application draft is in `docs/kod-imzalama.md` and the `/code-signing` page's "currently unsigned" note must be removed first.
- **Registration:** new accounts ONLY via account invites; guild invites only let existing accounts join.
- **Login:** server address hidden (5 taps on logo); non-default server shows "Test sunucusu".
- **Screen share:** fixed presets only; no runtime resolution/fps switching without real multi-user tests.
- **UI sounds:** one original set; no packs.
- **Settings:** shared taxonomy in `packages/client-core/src/settingsSections.ts`.
- **Cosmetics:** server-delivered pre-rendered packs since 0.9.2 (see [[diskort-cosmetics-plan]]); all free for everyone, no shop/granting; effect + `anim:<id>` decoration + nameplate; no real-time drawing fallback. Profile theme/banner remain. "Profil rengi" picker removed (0.9.2): avatar fallback colour = profile theme primary, else stored colour (server-side).
- **Server rail badge (0.9.2):** top-right of the server icon, dark badge for both: speaker if someone is in voice, screen icon if someone streams (user: no red).
- **Android minimum: API 26 (Android 8)** since 0.9.2; nobody uses Android 7.
- **RN 0.86 Android borders:** never put or toggle border props on a view with `experimental_backgroundImage`; a style that toggles `borderWidth` must have a base `borderWidth: 0` (removed borders become NaN → native crash / broken clipping).
- **Mobile video:** tap → animated fullscreen, mute bottom-left, no inline native controls.
- **Model choice is dynamic:** heavy agents "inherit" the main chat model (user switches main chat Opus/Sonnet to control cost); only narrow/skeptic agents pinned to `sonnet`. Don't rewrite the global CLAUDE.md model rule.

**Why:** user decisions from 2026-09-26…30 sessions. **How to apply:** check before proposing features or UI changes.

Related: [[diskort-baslangic]], [[diskort-workflow]]
