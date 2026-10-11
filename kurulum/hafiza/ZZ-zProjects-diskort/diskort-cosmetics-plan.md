---
name: diskort-cosmetics-plan
description: "Profile cosmetics as server-delivered pre-rendered packs (since 0.9.2): user decisions, how to make and publish a set, known risks"
metadata:
  node_type: memory
  type: project
  originSessionId: 54dc3a33-8a43-4d66-8774-07b1dfa4d58f
---

**Since v0.9.2 (2026-09-30) cosmetics are server-delivered pre-rendered packs; no client draws them in real time.** A free "store": every published set is available to everyone; no shop, no ownership, no admin granting.

**User decisions**
- New themes ship without a client release: design + render with the tool, publish to the server.
- Seamless loops, standard 6 s at 30 fps ("30 is very good, stay here"); no visible restart or one-frame pops.
- Card canvas 300×450 css (600×900 px), top-anchored, fades out over the last 20%, no avatar hole. Deco 264×264, plate 446×80.
- Looks may change freely; quality bar stays high ("havalı"), abstract, never copy Discord.
- No fallback to real-time drawing; Android minimum API 26; card video plays on Android 10+ (API 29), below that the poster.
- Like Discord, cosmetics play only when pointed at (desktop: hover/focus and opened profile; mobile: lists always still, opened profile plays).
- Wanted next: a fire ("ateş") version of buz (user liked buz most). Mobile follow-up: decode off the UI thread, higher-resolution mobile assets, tested via OTA.

**Make and publish a set:** render with `scripts/cosmetic-render/` (`node scripts/cosmetic-render/render.mjs --set <id>|all [--check] [--pack]`, per-set config in `sets/<id>.mjs`), then publish the bundle with `cosmetics-cli publish` on the server (also `list`, `remove`, `platforms <id> <desktop,android,ios|none>` as a per-platform kill switch, `order`, `prune`). Full steps: vault `runbooks\kozmetik-yayinlama.md`; repo docs `docs/kozmetik-paketleri.md`. AVIF colour must be full range (limited range renders washed out).

**Known risks (untested on devices after 0.9.2):** mobile playback overall, Android card video (patched Skia), iOS card video, memory with many rows. If broken: `cosmetics-cli platforms <id> desktop` or the OTA setting `STACKED_VIDEO_PLATFORMS`. Server `cosmeticCompat.ts` strips non-built-in ids for clients without the `cosmetic_packs` feature (0.9.1 desktop crashes on unknown nameplate ids).

Related: [[diskort-rules]], [[diskort-baslangic]]
