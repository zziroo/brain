---
name: run-based-incremental-wanted
description: "What the user means by \"incremental game\" — run-based loop like Shelldiver / Rock Bottom, not idle; plus research state for the new game"
metadata:
  node_type: memory
  type: feedback
  originSessionId: 6d8df6c2-d2f6-41a4-acee-7bc01a447e7f
  modified: 2026-10-02T10:28:48.424Z
---

When the user says "incremental" they mean a **run-based incremental**: you actively play for a limited time or a level, come back, spend what you earned on upgrades, and go out again. Their reference games are **Shelldiver** and **Rock Bottom**. An idle/Cookie-Clicker style game is not what they want.

**Why:** the first build in this project (see [[bal-vadisi-concept]]) was an idle game and the user corrected it on 2026-10-02: "senin yaptığın biraz idle oyun mu oldu? ben ... belli bir süre ya da bölüm oyun oynadığın, geri gelip o geliştirmelerini yapıp tekrar gittiğin bir oyun istiyordum."

**How to apply:** any game for this user labelled "incremental" should be built around short active runs + a permanent upgrade tree + depth/biome escalation, with a finite arc of a few hours. The analysis of the two reference games (and the player complaints to design around) is in the vault note `10-Projects/bal-vadisi/lessons/2026-10-02-idle-degil-kosu-tabanli-incremental-istendi.md`; the game that came out of it is [[isik-bekcisi-project]]. The user generally delegates theme/design decisions, but confirm the core loop in one sentence before building — that single check would have avoided the first miss.
