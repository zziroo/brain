---
type: lesson
project: tussle
date: 2026-10-21
status: active
tags: [tussle, git, yan-oturum]
source: "oturum 2026-10-21 akşam (rol sadeleştirme commit'i)"
---

# Ders: aynı klasörde yan oturum çalışırken `git add <dizin>` onun yarım dosyalarını da commit'e katar

- Rol commit'inde `git add -A src ...` + yalnız `src/shared/arena` geri alındı; yan oturumun `src/client/arena/*` ve `arena-screen.ts` yarım işi commit'e girdi. Push edilmemişti: `git reset --soft HEAD~1`, o yolları `git reset`, yeniden commit.
- Kural: yan oturum varken önce `git status --short` ile yabancı dosyaları gör, commit'ten sonra `git show --stat HEAD` ile kontrol et; mümkünse ajanın raporladığı dosya listesini tek tek ekle.

İlgili: [[2026-10-18-yayin-temiz-worktree-den-yan-oturum-ayni-klasorde]], [[2026-10-18-ayni-checkoutta-baska-oturum-varken-magaza-derlemesi-yarim-isi-alir]].
