---
type: decision
project: tussle
date: 2026-10-16
status: active
tags: [tussle, yedek, gizlilik, sunucu, mac]
source: "oturum 2026-10-16 (mobil-playus): tussle Play kapalı test durumu + koordinatör işleri"
---

# Karar: yedek tutma süreleri gizlilik sayfasındaki söze bağlandı; yayın öncesi kopyalar 30, gece yedekleri ve Mac kopyası 14 gün

Gizlilik sayfası (`/privacy`) "veritabanı yedekleri en çok 14 gün, yayın öncesi kopya en çok 30 gün" diyor. Kod bunu tutmuyordu: `pre-*.db` hiç silinmiyordu (35 dosya, en eskisi 9 Ekim), gece yedeği `-mtime +14` ile bir gün fazla kalıyordu.

## Ne yapıldı
- `deploy/backup-db.sh` (Tussle `bca6281`): gece zamanlayıcısı `/opt/tussle/data/pre-*.db` içinde 29 günü geçenleri siler (`PRE_KEEP_DAYS=30`); gece yedeği sınırı dakikayla (`KEEP_DAYS*1440-60`), en çok 14 gün. Sunucuya kopyalandı, elle bir kez çalıştı: silinen 0 (beklenen). İlk budama ~8 Kasım'da başlar.
- Mac yedek aynası (Diskort `3ddcc48`, `scripts/pull-db-backups.sh`): Tussle'ın `latest.db.gz`'sini `~/Yedekler/Tussle`'a çeker; dosya zamanı indirme anı olduğu için indirilişinden 13 gün sonra siler (alınışından ≤14 gün). Günlük satırı Diskort'unkine eklendi (`tussle ...`), gözcü aynı satırı okur. Windows `.ps1` karşılığı güncellenmedi.
- Canlı Caddy'de (`ziroo-edge`, `/etc/caddy` altı) `log` yönergesi yok: erişim kaydı tutulmuyor, gizlilik sayfasıyla uyumlu.

## Neden
- Gizlilik sözü bir kez yazıldı; tutma süresi yayın sıklığına bağlı kalmamalı. Budama `release.sh` yerine gece yedeğinde: yayın olmasa da her gece çalışır.
- `-mtime +N` tam günleri sayar ve günde bir çalışan işte kopyayı bir gün fazla tutar; dakika sınırı sözü kesin tutar.
- Mac kopyası Diskort'unki gibi 60 gün tutsaydı Tussle sözünü bozardı.

## Reddedilen alternatifler
- Budamayı `deploy/release.sh`'e koymak (overview'daki ilk plan): yayın aralığı uzarsa kopyalar 30 günü aşar.
- Tussle için ayrı Mac betiği + ayrı launchd: ikinci günlük, gözcüye ikinci kontrol; tek betik ve tek satır daha sade.
