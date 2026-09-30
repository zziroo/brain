---
name: diskurt-project
description: Diskort goals and decisions — Discord-like voice + screen share app for 10-20 people (Electron + LiveKit + Fastify)
metadata:
  node_type: memory
  type: project
  originSessionId: 6b202245-1c00-4ad6-9973-1b24d27631fd
  modified: 2026-09-26T13:47:22.551Z
---

Diskort (renamed from Diskurt on 2026-09-26; local folder still `C:\dev\diskurt`, GitHub repo `yusufholat/diskort`, private): user wants a Discord-quality voice + screen-share desktop app for a closed group of 10–20 people, eventually growing into a full Discord-like platform (text channels, roles, DMs later).

Decisions made with the user (2026-09-26):
- Hosting: rented VPS (Turkey-based users → Istanbul or Hetzner DE/FI). infra/ has docker-compose (LiveKit + API + Caddy, host network).
- Auth: invite code + username/password accounts; first registered user (bootstrap invite printed in API log) becomes admin.
- Platforms: all, priority Windows → Linux → macOS; features may be missing on some platforms (system-audio screen share is Windows-only for now).

**Why:** user explicitly chose these in planning; the data model already has a `guilds` table so multi-server can come later.
**How to apply:** keep Windows-first; don't block features on Linux/macOS parity. Respond to the user in Turkish.

Related: [[diskurt-dev-environment]]
