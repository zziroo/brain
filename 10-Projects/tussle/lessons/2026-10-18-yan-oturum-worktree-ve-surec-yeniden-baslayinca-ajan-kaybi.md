---
type: lesson
project: tussle
date: 2026-10-18
status: active
tags: [tussle, orkestra, worktree, ajan, sistem]
source: yan oturum 2026-10-17/18 (mobil-playus, "tussle: sürüm ayrışması ve modüler oyunlar")
---

# Ders: ana oturumla aynı klasörde çalışan yan oturum worktree'ye geçsin; süreç yeniden başlarsa ajan kaybolur, yarım iş `git status` ile devralınır

## Ne oldu
- Yan oturum ana oturumla aynı checkout'ta başladı; ana oturumun commit'lenmemiş dosyaları (room.ts, i18n, denge) yan oturumun da dokunacağı dosyalardı. Elle `git worktree add` + `EnterWorktree(path)` ile dal açıldı; `node_modules` sembolik bağla paylaşıldı (vitest/typecheck/vite çalıştı).
- Worktree izolasyonu ana checkout'ta `git` çalıştırmayı engelliyor; main'e birleştirme ancak worktree'den çıkınca (oturum cwd'si ana klasöre dönünce) yapılabildi. Ana oturum commit'leyene kadar birleştirme zaten bekler.
- Oturum süreci bir kez yeniden başladı: arka plandaki yazar ajan kayboldu ("didn't finish before the previous session ended"). Yarım iş worktree'de duruyordu; `git status --short` + birkaç `git diff` ile ne kadarının bittiği görüldü, yeni bir ajana "devraldığın durum" listesiyle verildi ve bitirdi.
- `.gitignore`'daki `node_modules/` (eğik çizgili) sembolik bağı yakalamıyor; `release.sh`'in kirli-ağaç kontrolü worktree'de hep takılır (ana checkout'ta sorun yok).
- 18 Eki akşam tekrarı: kurulum kartı yan oturumu (başka projeden başlatıldı, worktree'siz) aynı checkout'ta commit'lenmemiş install-ui/i18n/css değişikliği bırakırken ana oturumun Android AAB derlemesi bunları yarım hâlde aldı (Play versionCode 9); temiz HEAD'den versionCode 10 gerekti. AAB derlemesinde `release.sh`'teki kirli-ağaç kontrolü yok ([[2026-10-18-tussle-kurulum-adimlari-sirali]]).

## Nasıl uygulanır
- Ana oturumun kirli dosyalarıyla kesişen yan iş: önce worktree + dal, sonunda ana checkout temizken `git merge`; dal ve worktree birleştirme sonrası silinir (yazılıp alınmayan iş `arsiv/<ad>` etiketiyle saklanır).
- Derlemeden (AAB/iOS) önce `git status --short` temiz olmalı; aynı checkout'ta yan oturum çalışıyorsa önce onun commit'ini bekle.
- Ajan kaybolursa yeniden baştan yazdırma: önce `git status`, sonra kalan işi sayan kısa bir devir notuyla yeni ajan.
- Geri alınan büyük değişiklikler için main'i `reset --hard` ile birleştirme öncesine çekip yalnız istenen commit'i birleştirmek, `revert` zincirinden temiz (yayınlanmamışken).
