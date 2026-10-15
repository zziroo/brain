---
type: decision
project: diskort
date: 2026-10-15
status: active
tags: [diskort, yedek, mac, launchd]
source: Claude Code oturumu 2026-10-15 "ZZ: yeni oturum yapısı ve SSH izinleri"
---

# Karar: Sunucu yedeklerinin bilgisayar aynası Windows'tan Mac'e taşındı (launchd, günlük 12:00, yerel disk)

## Bağlam
Windows'taki Görev Zamanlayıcı işi (`pull-db-backups.ps1` → OneDrive) 2026-10-07'den beri çalışmıyordu; Windows yalnız Silksong için ([[2026-10-07-windows-makinesi-yalniz-silksong-icin]]). Yusuf "Diskort yedekleri Windows makinedeydi, onu da düzeltelim" dedi.

## Karar
- `scripts/pull-db-backups.sh` (bash, Diskort main `8b65d32`): en son `latest.db.gz` hedefi (60 gün), ekler / profil fotoğrafları / geri bildirim görüntüleri aynası; Windows betiğiyle aynı mantık.
- launchd ajanı `net.ziroo.diskort-yedek` (`~/Library/LaunchAgents/`), her gün 12:00; hedef `~/Yedekler/Diskort`, günlük `yedek-gunlugu.txt`.
- Gözcü sağlık adımı günlüğün yaşına bakar ([[2026-10-15-gozcu-birlesik-dort-bolum]]).

## Neden
- Mac'te OneDrive ve iCloud Drive yok; yerel disk yine de sunucudan ayrı bir kopya.
- Sunucuda rsync yok; eksik dosyalar tar paketiyle 400'erli iniyor (Windows betiğindeki kalıp), sunucuya paket kurmadan.

## Reddedilen alternatifler
- Sunucuya rsync kurmak: betiği sadeleştirirdi ama sunucu değişikliği; gerekirse sonra.
- Bulut hedefi: hesap yok; betik `DISKORT_BACKUP_DEST` ile yönlendirilebilir.

## Sonuçlar / riskler
- İlk çalışma 70 MB indirdi (1 DB, 78 ek, 14 profil fotoğrafı, 13 görüntü); ikinci çalışma "yeni 0". launchd tetiklemesi henüz görülmedi (`status: unverified` sayılır).
- Mac uykudaysa launchd uyanınca çalıştırır; kapalıysa o gün atlanır.

## İlgili
- [[yedekler]], [[10-Projects/tussle/decisions/2026-10-15-sunucuda-gece-yedegi-systemd|Tussle gece yedeği]]
