---
type: lesson
project: isik-bekcisi
date: 2026-10-08
status: active
tags: [isik-bekcisi, ajan, worktree, git, orkestrasyon]
source: oturum dd56e56a + a15a1fc5 (incremantal-game, 2026-10-07 gece → 2026-10-08)
---

# Ders: `isolation: worktree` ile açılan ajan çalışma alanı eski bir commit'ten başlayabilir; doğru tabandan elle aç

## Ne oldu
- İki gamepad ajanının worktree'si o anki main'den değil, birkaç commit geride bir yerden (`a8bebee`) açıldı. Bunların birinde 1. dilim henüz yoktu.
- Bir ajan `git merge --ff-only main` ile yetişmeye çalıştı, izin sınıflandırıcısı reddetti. Diğeri kendi başına `main`'den yeni dal açtı.
- Ajan geçici sunucusunu `pkill -f serve.mjs` ile kapattı. Bu, kullanıcının 5174'teki sunucusunu ve diğer ajanların sunucularını da durdurdu.
- Önizleme aracı (`preview_start`) `launch.json`'u worktree'den değil ana depodan okudu. Dal sunucusu yerine main 5174'te açıldı.

## Ders
- Paralel ajanlara belirli bir dal ya da commit'ten iş verirken worktree'yi koordinatör elle açsın: `git worktree add -b <dal> <yol> <commit>`. Ajana yalnız o yolu ver.
- Ajanlara her seferinde yaz:
  - kendi portunu kullan;
  - sunucuyu yalnız kendi PID'i ya da portuyla durdur;
  - 5174'e dokunma.
- Bir worktree'nin dalını önizlemek için `preview_start`'a güvenme. Sunucuyu o klasörden `PORT=… node serve.mjs` ile aç.

İlgili: [[2026-10-02-paralel-ajan-dallarini-main-ile-ajana-birlestirtmek]]
