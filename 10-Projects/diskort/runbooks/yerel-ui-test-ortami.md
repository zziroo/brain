---
type: resource
project: diskort
date: 2026-09-30
status: active
tags: [diskort, runbook, test]
source: memory diskort-workflow.md
---

# Yerel UI test ortamı: worktree sunucusu boş porta + geçici DATA_DIR, izole dev profili

- Worktree sunucusu boş bir portta, geçici `DATA_DIR` ile. Masaüstü dev: `VITE_DEFAULT_SERVER`, `DISKORT_PROFILE`, `DISKORT_DEBUG_PORT`, CDP. Yerel LiveKit `tools/livekit` içinde.
- İş bitince süreçleri ve `%APPDATA%\Diskort-dev-<ad>` klasörünü temizle. Production'da test yapma.
- Ajan dalı doğrulama sırası: inceleme ajanı -> sonnet skeptic (orta+) -> düzeltmeler -> `pnpm -r typecheck` + `pnpm -r test` -> `git merge --no-ff` -> push ([[diskort-orchestrator-mode]]).

## İlgili
- [[electron-cdp-testi]], [[yerel-installer-testi-userdata]]
