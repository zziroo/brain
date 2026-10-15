---
type: decision
project: tussle
date: 2026-10-15
status: active
tags: [tussle, yedek, sunucu, systemd]
source: yan oturum "Tussle: sunucuda gece veritabanı yedeği" (2026-10-15, ZZ kökünden başlatıldı); koordinatör sunucuda doğruladı
---

# Karar: Tussle veritabanı sunucuda her gece 04:20 systemd zamanlayıcısıyla /var/backups/tussle altına yedeklenir

## Bağlam
Gece gözcüsüne yedek yaşı kontrolü eklenirken Tussle'ın sunucu düzeyinde yedeği olmadığı görüldü: yalnız yayın öncesi `pre-<sha>.db` kopyaları ve uygulamanın kendi `data/backup/tussle-YYYY-MM-DD.db` (7 gün) dosyası vardı. Canlıya alma yaklaşırken Diskort'taki kalıbın aynısı istendi.

## Karar
- `deploy/backup-db.sh` (Tussle main `90bf620`): `docker exec -i tussle node -` ile konteyner içinde `VACUUM INTO` (WAL güvenli), bütünlük denetimi, gzip -9, chmod 600, 14 gün tutma, `latest.db.gz` bağlantısı. Ne sunucuda ne konteynerde `sqlite3` olmadığı için node:sqlite.
- `tussle-backup.timer` + `.service` (`deploy/systemd/`, sunucuda `/etc/systemd/system/`), 04:20 Europe/Istanbul, 5 dk rastgele gecikme, Persistent.
- Geri yükleme ve kurulum `docs/BACKUP.md`.
- Gözcü, `/var/backups/tussle/latest.db.gz` yaşını Diskort'la aynı 26 saat kuralına aldı.

## Neden
- Uygulama içi yedek veri diziniyle aynı yerde; disk ya da dizin kaybında onunla birlikte gider. `/var/backups` ayrı ve Mac aynasına eklenebilir.
- Diskort kalıbıyla aynı olunca runbook ve gözcü kuralı ortak.

## Reddedilen alternatifler
- Yalnız uygulama içi yedeğe güvenmek: aynı dizin, sıkıştırma yok, 7 gün.
- Diskort betiğini doğrudan kullanmak: Tussle'da sqlite3 ikilisi yok, bind mount farklı.

## Sonuçlar / riskler
- Sunucuda doğrulandı: zamanlayıcı etkin, sonraki tetik 2026-10-16 04:24; ilk iki elle çalıştırma 92 KB yedek üretti.
- Mac yedek aynası ([[10-Projects/diskort/decisions/2026-10-15-yedek-aynasi-mac-launchd|Diskort aynası]]) henüz Tussle'ı çekmiyor; açık iş.
- Yan oturum yanlış klasörde (ZZ) açıldı, iş mutlak yollarla doğru yürüdü ([[20-Areas/working-rules/2026-10-15-oneri-karti-mevcut-klasorde-acilir|ders]]).

## İlgili
- [[_overview]], [[10-Projects/diskort/decisions/2026-10-15-gozcu-birlesik-dort-bolum|gözcü]]
