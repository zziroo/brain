---
type: lesson
project: tussle
date: 2026-10-19
status: active
tags: [tussle, yayin, worktree, git, ota]
source: oturum "tussle: geri bildirim turu" (2026-10-19 gece), ara yayın `82db816` (OTA 0.20261019.9)
---

# Ders: bir özellik olmadan yayın istenirse ayrı worktree dalında yalnız o parçaları geri al

- Durum: Yusuf bir yayını, main'e başkalarıyla birlikte commit'lenmiş bir özellik (yeni tek satırlı oda üst çubuğu, 2e3b249 içinde) olmadan istedi. Main'i geri sarmak ya da commit'i bölmek diğer işleri riske atar.
- Çalışan yol: geçici bir worktree dalı aç (`git worktree add -b release-x <scratch>/rel <commit>`), orada yalnız o özelliğin parçalarını geri al (`git revert -n` ya da elle), commit et, `node_modules` symlink'i ve `bash deploy/release.sh` ile yayınla, sonra worktree ve dalı sil. **Main devam eder**; özellik sonraki yayınla gelir.
- Yayın scriptleri çalışma ağacından derlediği için ayrı worktree aynı zamanda yan oturum korumasıdır ([[2026-10-18-yayin-temiz-worktree-den-yan-oturum-ayni-klasorde]]).
- Dikkat: ara yayının sürümü/DB sürümü ileriki yayınla çakışmasın; sunucu sürümü geri gitmez, sonraki yayın tam sürümü getirir. Dalı silmeden yayın hash'ini oturum notuna yaz.

İlgili: [[2026-10-19-tussle-geri-bildirim-turu-antrenman-cubuk-kart]].
