---
type: lesson
project: diskort
date: 2026-09-30
status: active
tags: [diskort, git, worktree, windows]
source: memory orchestrator-mode.md, diskort-workflow.md
---

# Windows'ta worktree `git worktree remove` ile silinemez (Filename too long)

Klasör `cmd /c "rmdir /s /q \\?\<gerçek yol>"` ile silinir (yolda `$değişken` olmamalı, araç bloklar; "in use" derse bir kez tekrar dene), ardından `git worktree prune` + `git branch -d`. Birleştirilmiş dallar GitHub'dan da silinir (`git push origin --delete <dal>`): Yusuf 2026-09-30'da onayladı (o gün 30 eski birleştirilmiş dal temizlendi). Birleştirilmemiş dal sormadan silinmez.

## İlgili
- [[diskort-orchestrator-mode]]
