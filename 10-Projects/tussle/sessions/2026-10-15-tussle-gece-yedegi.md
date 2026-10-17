---
type: session
project: tussle
date: 2026-10-15
status: active
tags: [tussle, yedek, sunucu]
source: yan oturum "Tussle: sunucuda gece veritabanı yedeği" (ZZ kökünden başlatıldı); koordinatör "ZZ: yeni oturum yapısı ve SSH izinleri"
---

# Oturum: sunucuda gece veritabanı yedeği kuruldu, repoya commit edildi

## Yapılanlar
- `deploy/backup-db.sh`, `deploy/systemd/tussle-backup.{service,timer}`, `docs/BACKUP.md`, README yedek satırı; Tussle main `90bf620` (koordinatör commit etti, yan oturum Tussle'da push izni olmadığı için bırakmıştı).
- Sunucuda birimler kuruldu ve etkin; iki elle çalıştırma 92 KB yedek üretti; koordinatör `systemctl list-timers` ve `/var/backups/tussle/` ile doğruladı.
- Karar: [[2026-10-15-sunucuda-gece-yedegi-systemd]].

## Keşif
- Uygulama zaten `src/server/backup.ts` ile günlük `data/backup/tussle-YYYY-MM-DD.db` yazıyormuş (7 gün, UTC, gzip'siz, veri diziniyle aynı yerde). Üç katman: systemd, uygulama içi, yayın öncesi `pre-<sha>.db`.

## Açık işler
- Mac yedek aynasına Tussle'ı eklemek.
- Yan oturum yanlış klasörde (ZZ) açıldı; ders: [[2026-10-15-oneri-karti-mevcut-klasorde-acilir|öneri kartı]].

## İlgili
- [[_overview]]
