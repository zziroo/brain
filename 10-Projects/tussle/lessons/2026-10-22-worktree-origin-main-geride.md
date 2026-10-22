---
type: lesson
project: tussle
date: 2026-10-22
tags: [worktree, git, claude-code]
---
# Ders: EnterWorktree origin/main'den dallanıyor; yerel main ilerideyse iş eski tabanda başlıyor

Ses turunda worktree `origin/main` (7042573) tabanlı açıldı, yerel main 19 commit ilerideydi (arena dosyaları yok, Double Tap hâlâ var). Ajanlar yarım saat eski tabanda çalıştı; ara commit + `git merge main` ile toparlandı (engine.ts ve view-api.ts çakışmaları "ours", silinmiş double-tap meta'sı kaldırıldı).

Kural: worktree açar açmaz `git log --oneline -1 main` ile HEAD'i kıyasla; gerideyse ilk iş `git merge main`. Ya da `worktree.baseRef: head` ayarı.
