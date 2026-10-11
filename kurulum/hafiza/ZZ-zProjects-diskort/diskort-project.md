---
name: diskort-project
description: Diskort goals and decisions — Discord-like voice + screen share app for 10-20 people (Electron + LiveKit + Fastify)
metadata:
  node_type: memory
  type: project
  originSessionId: 6b202245-1c00-4ad6-9973-1b24d27631fd
---

Diskort (renamed from Diskurt on 2026-09-26; local folder `/Users/ziroo/ZZ/zProjects/diskort`, GitHub repo `zziroo/diskort`, public; auto-updates via its GitHub Releases): the user wants a Discord-quality voice + screen-share desktop app for a closed group of 10–20 people, eventually growing into a full Discord-like platform. Current state: vault `_overview.md`; long history and decisions live in the vault (`/Users/ziroo/ZZ/brain/10-Projects/diskort/`).

Decisions made with the user (2026-09-26):
- Hosting: rented VPS (Turkey-based users → Istanbul or Hetzner DE/FI). `infra/` has docker-compose (LiveKit + API + Caddy, host network). Current server: [[diskort-server]].
- Auth: invite code + username/password accounts; the first registered user becomes admin. The data model has a `guilds` table so multi-server can come later.
- Platforms: all, priority Windows → Linux → macOS; features may be missing on some platforms (system-audio screen share is Windows-only).

Order/priority: shared core `packages/client-core` (done) → Android (React Native/Expo, APK from our own download page, not Play) → in-app features (reactions, files, roles, DMs) written in client-core first. iOS via Ad Hoc OTA from our own site (see [[diskort-ios]]). Code signing: see the current decision in [[diskort-rules]].

**Why:** the user chose these in planning.
**How to apply:** the user tests everything directly on production ("canlı ortamdan") — deploy server first, then release the client; propose next steps one by one. Keep Windows-first; don't block features on Linux/macOS parity. Respond to the user in Turkish.

Related: [[diskort-dev-environment]], [[git-push-autonomy]]
