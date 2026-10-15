---
type: resource
project: diskort
date: 2026-09-27
status: active
tags: [diskort, runbook, yedek]
source: memory diskort-server.md
---

# Yedekler: sunucuda her gece 04:00, Mac'te günlük 12:00 yerel yansı (eskiden Windows + OneDrive)

- **Sunucu:** `diskort-backup.timer` 04:00 (Europe/Istanbul) `infra/backup-db.sh` -> `/var/backups/diskort/diskort-*.db.gz` (14 gün, `latest.db.gz` symlink). Geri yükleme: `bash infra/restore-db.sh <dosya>` (test edildi; geri yükleme öncesi kopyayı tutar).
- **Ekler/avatarlar (2026-09-27):** `infra/backup-attachments.sh` hard-link anlık görüntüleri `/var/backups/diskort/{attachments,avatars}` (ek alan yok; uygulamada silinen dosyalar 30 gün tutulur).
- **Mac (2026-10-15'ten beri):** launchd `net.ziroo.diskort-yedek` (`~/Library/LaunchAgents/`), her gün 12:00, `scripts/pull-db-backups.sh` -> `~/Yedekler/Diskort` (60 gün, günlük `yedek-gunlugu.txt`, launchd çıktısı `launchd.log`); ekler `ekler/`, profil fotoğrafları `profil-fotograflari/`, geri bildirim görüntüleri `geri-bildirim/`. Sunucuya `ssh vps` alias'ıyla bağlanır; sunucuda rsync olmadığı için eksik dosyalar tar paketiyle iner (Windows betiğiyle aynı mantık). Mac uykudaysa launchd uyanınca çalıştırır; kapalıysa o gün atlanır. Elle: `bash scripts/pull-db-backups.sh`. Mac'te OneDrive/iCloud Drive yok, kopya yalnız yerel diskte. Gece gözcüsü günlük dosyasının yaşına bakar.
- **Windows (2026-10-07'ye kadar):** Görev Zamanlayıcı "Diskort veritabanı yedeği", günlük 12:00, `scripts/pull-db-backups.ps1` -> `%OneDrive%\Yedekler\Diskort`; Windows artık Silksong'a ayrıldığı için durdu, OneDrive'daki eski kopya duruyor.
- Etkinlik ikonları (`/data/activity-icons`) yedekte DEĞİL; istemciler isteğe bağlı yeniden yükler.

## İlgili
- [[sunucu-vps]], [[secret-isleme-kurali]]
