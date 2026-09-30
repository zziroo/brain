---
type: lesson
project: diskort
date: 2026-09-28
status: active
tags: [onedrive, git, node-modules]
source: C--dev-diskort 72824d08
---

# Ders: Git deposu ve node_modules OneDrive klasöründe tutulmaz.

- Senkron yükü (yüz binlerce küçük dosya), git dosyalarının kilitlenmesi ya da çakışan kopyalar, uzun yol hataları (ajan worktree'leri zaten "yol çok uzun" veriyordu), "yalnızca çevrimiçi" yer tutucu dosyalar.
- Proje baştan beri OneDrive dışında (`C:\dev\diskort`) tutulmuştu; yeni yer de OneDrive dışı: [[proje-dizini-onedrive-disina]].
- Yedek ihtiyacı (imza anahtarları) için OneDrive\Yedekler kullanılır, kod için GitHub.

## İlgili
- [[2026-09-28-kod-inceleme-ajani-ve-dizin-tasima]]
