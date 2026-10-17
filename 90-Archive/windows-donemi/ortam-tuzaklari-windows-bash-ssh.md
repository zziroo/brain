---
type: lesson
project: diskort
date: 2026-09-26
status: active
tags: [ortam, windows, ssh, pnpm]
source: C--dev-diskort 2736605c, 4b7b1382
---

# Ders: Windows + Git Bash + SSH ile çalışırken tekrar yaşanan küçük tuzaklar.

- `better-sqlite3` Visual Studio araçları ister: `node:sqlite` kullanıldı. pnpm 12: `allowBuilds:` haritası gerekir. Electron 44 postinstall yok: `node install.js`. electron-builder yeniden derleme VS ister: `npmRebuild: false`. Kapsamlı paket adı kurulum dizinini `@diskortdesktop` yapar: `extraMetadata.name: diskort`.
- SSH tek satırında tırnak sorunu: betik yaz, `bash -s` ya da scp. `pkill -f` kendi kabuğunu öldürür: köşeli parantezli desen (`[p]ython3`). `bash -s` içinde `docker compose exec` stdin yutar: `< /dev/null`.
- Git Bash'te `python` stub'ı takılabilir; çalıştırma.
- Kilitli ajan worktree klasörü silinemeyebilir: `cmd /c rmdir /s /q \\?\...` + `git worktree prune`.
- Ayrıca [[dev-ortami-tuzaklari]] ve [[worktree-silme-windows]].

## İlgili
- [[2026-09-26-kurulum-ve-yayina-alma]]
