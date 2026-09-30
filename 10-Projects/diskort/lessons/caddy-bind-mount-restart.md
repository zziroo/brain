---
type: lesson
project: diskort
date: 2026-09-26
status: active
tags: [diskort, caddy, docker, sunucu]
source: memory diskort-server.md
---

# Caddyfile tek dosya bind mount: `git pull` sonrası `caddy reload` eski dosyayı görür, `docker compose restart caddy` gerekir

`restart caddy` TURN/TLS röle bağlantılarını kısa süre düşürür; önce açık oda olmadığını kontrol et. LiveKit'i yeniden başlatmak aktif aramaları ~6 sn düşürür (istemciler otomatik yeniden bağlanır). openssh yükseltilirken SSH ~90 sn bağlantı reddedebilir.

## İlgili
- [[deploy]], [[sunucu-vps]]
