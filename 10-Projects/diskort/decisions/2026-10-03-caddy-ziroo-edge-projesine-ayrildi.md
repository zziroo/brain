---
type: decision
project: diskort
date: 2026-10-03
status: active
tags: [diskort, caddy, sunucu, ziroo-edge, yayin]
source: oturum 2026-10-03, Diskort commit 5e40243, ziroo-edge repo (yusufholat/ziroo-edge)
---

# Caddy, Diskort'tan ayrı `ziroo-edge` projesine taşındı

## Bağlam
Ertelenmiş işti ([[2026-10-02-caddy-ortak-site-klasoru]]). Sunucuda Diskort dışı projeler çoğalıyor (steam, ziroobank, oyunlar). Kapis kendi alan adını (`kapis.ziroo.net`) istiyordu, ama eski yapı yalnızca Diskort site bloğunun içindeki yolları içe aktarabiliyordu. Yusuf "edge projesine ayır" dedi.

## Karar
- **ziroo-edge:** Sunucuda `/opt/ziroo-edge`, kapsayıcı adı `ziroo-edge`, host ağı. GitHub'da özel depo `yusufholat/ziroo-edge`, yerelde `zProjects\ziroo-edge`. Sunucuya scp ile kopyalanır. Caddy-l4 imajını, TURN/TLS SNI kuralını (global blok) ve içe aktarmaları tutar.
- **Diskort siteleri:** Diskort deposunda kaldı (`infra/caddy/diskort.caddy`). Edge bu klasörü bağlayıp içe aktarır. Değişiklik `git pull` ve ardından `bash /opt/ziroo-edge/reload.sh` ile yayına girer. Yeniden başlatma gerekmez, çünkü tek dosya değil klasör bağlı.
- **Diğer projeler:**
  - `/opt/ziroo-sites/<ad>.caddy`: Diskort alan adı altındaki yollar, eskisi gibi.
  - `/opt/ziroo-sites/hosts/<ad>.caddy`: kendi alan adı olan projeler için tam site bloğu. Kapis için açılmıştı.
- **Diskort compose'u:** `caddy` servisi `profiles: ["caddy"]` arkasına alındı. Kendi sunucusunu kuranlar için `.env.example` içinde `COMPOSE_PROFILES=caddy` var. Üretim `.env`'inde yok.
- **Sertifikalar:** `infra_caddy-data` biriminden `ziroo-edge_caddy-data` birimine kopyalandı, yeniden alınmadı.

## Neden
- 443'ü tek süreç tutmalı. Diskort'un compose'u diğer projelerin giriş kapısı olmamalı.
- Ayrı alan adlı projeler için üst seviye import gerekiyordu. Bunu Diskort reposuna koymak yerine edge'e koymak daha temiz.
- Diskort'u kendi sunucusunda kuranlar için kurulum eskisi gibi tek compose olarak kaldı (profil).

## Reddedilen alternatifler
- **Diskort Caddyfile'ına `hosts/` importu eklemek:** küçük bir değişiklik olurdu, ama giriş kapısı Diskort'ta kalırdı.
- **Diskort sitelerini edge reposuna kopyalamak:** Diskort'un yönlendirmesi Diskort'tan kopardı ve kendi sunucusunu kuranların kurulumu bozulurdu.

## Sonuçlar / riskler
- Diskort'un `caddy` servisi üretimde **asla** başlatılmamalı (`docker compose ... caddy`). Caddy SO_REUSEPORT kullandığı için hata vermez; 443'ü edge ile sessizce paylaşır ve bağlantıların bir kısmı yanlış ayara gider. Geçişte bu canlıda görüldü: iki Caddy bir süre aynı anda 443'ü dinledi.
- TURN/TLS l4 bloğu iki yerde duruyor: edge `config/Caddyfile` ve Diskort `infra/Caddyfile` (tek başına kurulum için). İkisi aynı kalmalı.
- Diskort yönetim panelindeki Caddy upstream listesi artık diğer projelerin arka uçlarını da gösterebilir (kozmetik).
- Geçiş 2026-10-03'te seste 3 kişi varken yapıldı (Yusuf onayladı). LiveKit sinyali bir an koptu, istemciler yeniden bağlandı. Tüm yollar, lk, TURN sertifikası ve ölçüm ucu doğrulandı.
- Geri dönüş: eski `diskort-caddy` imajı ve `infra_caddy-data` birimi sunucuda duruyor. Edge'i durdurup `cd /opt/diskort/infra && docker compose --profile caddy up -d caddy` çalıştırmak yeterli.

## İlgili
- [[sunucu-vps]], [[deploy]], [[2026-10-02-caddy-ortak-site-klasoru]], [[2026-10-03-yayin-paylasilan-vps-kapis-ziroo-net]]
