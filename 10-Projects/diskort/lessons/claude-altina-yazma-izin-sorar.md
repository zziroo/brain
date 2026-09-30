---
type: lesson
project: diskort
date: 2026-09-30
status: active
tags: [diskort, claude-code, izin, otomasyon]
source: memory diskort-workflow.md, diskort-handoff.md, diskort-handoff (eski kopya)
---

# `.claude` altına yazmak her zaman izin sorar; gözetimsiz görevler bu yüzden takılır

- Gelen kutusu 2026-09-30'da `.claude` dışına `C:\Users\yusuf\diskort-inbox\` yoluna taşındı; inceleme işaretçisi `C:\Users\yusuf\diskort-review\last-reviewed.txt`.
- Zamanlanmış görevler dosyaları yalnız Write/Edit ile yazmalı; Bash heredoc "allow once" istemi tetikler.
- Auto-mode sınıflandırıcısı production SSH'i, Yusuf'un onayladığı izin kurallarına uymuyorsa engeller; birleşik `git push` + ssh deploy komutu bir kez reddedildi. Yusuf tekrar dene deyince ayrı push / ssh / tag / `gh release edit` çağrıları geçti. Kural: ayrı, desenle eşleşen komutlar kullan.

## İlgili
- [[izinler-ve-ayarlar]], [[gelen-kutusu-ve-rutinler]]
