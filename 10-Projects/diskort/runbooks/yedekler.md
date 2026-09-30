---
type: resource
project: diskort
date: 2026-09-27
status: active
tags: [diskort, runbook, yedek]
source: memory diskort-server.md
---

# Yedekler: sunucuda her gece 04:00, Yusuf'un PC'sinde günlük 12:00 OneDrive yansısı

- **Sunucu:** `diskort-backup.timer` 04:00 (Europe/Istanbul) `infra/backup-db.sh` -> `/var/backups/diskort/diskort-*.db.gz` (14 gün, `latest.db.gz` symlink). Geri yükleme: `bash infra/restore-db.sh <dosya>` (test edildi; geri yükleme öncesi kopyayı tutar).
- **Ekler/avatarlar (2026-09-27):** `infra/backup-attachments.sh` hard-link anlık görüntüleri `/var/backups/diskort/{attachments,avatars}` (ek alan yok; uygulamada silinen dosyalar 30 gün tutulur).
- **PC:** Görev Zamanlayıcı "Diskort veritabanı yedeği", günlük 12:00, `scripts/pull-db-backups.ps1` -> `%OneDrive%\Yedekler\Diskort` (60 gün, günlük `yedek-gunlugu.txt`); ekler/profil fotoğrafları `ekler`, `profil-fotograflari` klasörlerine yansır; geri bildirim ekran görüntüleri `geri-bildirim`.
- Etkinlik ikonları (`/data/activity-icons`) yedekte DEĞİL; istemciler isteğe bağlı yeniden yükler.

## İlgili
- [[sunucu-vps]], [[secret-isleme-kurali]]
