---
type: lesson
project: ziroo-edge
date: 2026-09-26
status: superseded
tags: [diskort, caddy, docker, sunucu]
source: memory diskort-server.md
---

# Caddyfile tek dosya bind mount: `git pull` sonrası `caddy reload` eski dosyayı görür, `docker compose restart caddy` gerekir

> **2026-10-03:** Üretimde geçersiz: Caddy artık `ziroo-edge`, Diskort siteleri klasör olarak bağlı; `git pull` + `bash /opt/ziroo-edge/reload.sh` yeter ([[2026-10-03-caddy-ziroo-edge-projesine-ayrildi]]). Yalnızca Diskort'un tek başına kurulumundaki (`caddy` profili) `infra/Caddyfile` için geçerli.

`restart caddy` TURN/TLS röle bağlantılarını kısa süre düşürür; önce açık oda olmadığını kontrol et. LiveKit'i yeniden başlatmak aktif aramaları ~6 sn düşürür (istemciler otomatik yeniden bağlanır). openssh yükseltilirken SSH ~90 sn bağlantı reddedebilir.

## İlgili
- [[deploy]], [[vps-makinesi]]
