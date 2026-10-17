---
type: lesson
project: ziroobank
date: 2026-10-02
status: active
tags: [sunucu, caddy, paralel-oturum, deploy]
source: ziroobank-expenses oturumu 2026-10-02
---

# Ders: ortak sunucu ayarını düzenlemeden hemen önce canlı durumu yeniden oku; paralel bir oturum aynı dosyayı değiştiriyor olabilir.

- Ziroobank yolu Diskort Caddyfile'ına eklenirken başka bir oturum (Steam paneli) aynı anda Caddyfile'ı commit'leyip Caddy konteynerini `/opt/ziroo-sites` bağlamasıyla yeniden oluşturdu. `git diff` tabanı değişince ve konteyner "not running" deyince fark edildi.
- Çözüm: blok `/opt/ziroo-sites/ziroobank.caddy`'ye taşındı, Caddyfile `git checkout` ile temizlendi (önce diff'te yalnız kendi satırlarımız olduğu doğrulandı).
- Ayrıca: `sed` aralığı ilk kapanan blokta durdu ve API `handle`'ı eksik kaldı. Ekleme sonrası canlı dosyayı grep'le kontrol et, URL'leri durum koduyla test et.

## İlgili
- [[2026-10-02-caddy-ortak-site-klasoru]] · [[vps-makinesi]]
