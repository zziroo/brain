---
type: decision
project: ziroo-edge
date: 2026-10-02
status: superseded
tags: [diskort, caddy, sunucu, yayin]
source: oturum 2026-10-02 (steam-avgr-calculator), Diskort commit c87bd9f
---

> **2026-10-03:** Caddy ayrı `ziroo-edge` projesine taşındı; `/opt/ziroo-sites` aynı kaldı, reload artık `bash /opt/ziroo-edge/reload.sh`. Bkz. [[2026-10-03-caddy-ziroo-edge-projesine-ayrildi]].

# Diskort dışı projeler Caddy'ye /opt/ziroo-sites/<ad>.caddy dosyasıyla eklenir

## Bağlam
Steam AGCR paneli backend istiyordu (Steam API'de CORS yok, key gizli kalmalı); statik `/opt/diskort/apps/web` yetmedi. İlk kurulumda yol doğrudan Diskort `infra/Caddyfile`'ına elle eklendi, repo'da commit'lenmemiş değişiklik oldu. Yusuf "Caddy'yi ayıramaz mıyız, ortaklaştıramaz mıyız" diye sordu.

## Karar
Diskort Caddyfile'ı `{$DISKORT_DOMAIN}` bloğunda `import /etc/caddy/sites/*.caddy` yapar; compose host'taki `/opt/ziroo-sites`'ı salt okunur bağlar. Her Diskort dışı proje buraya kendi `<ad>.caddy` dosyasını bırakır ve `docker exec infra-caddy-1 caddy reload --config /etc/caddy/Caddyfile` ile kesintisiz yayına girer. Caddy 2026-10-02'de bu bağlamayla yeniden oluşturuldu (Yusuf seste iken onayladı).

## Neden
- 443'ü tek süreç dinleyebilir; giriş kapısı doğası gereği ortak, tamamen ayırmak mümkün değil.
- Yeni proje için Diskort reposuna dokunmak ve Caddy'yi yeniden oluşturmak (ses/TURN birkaç sn kopar) gerekmez; `caddy reload` kesinti yaratmaz.

## Reddedilen alternatifler
- Her projeyi Diskort Caddyfile'ına elle eklemek: repo kirlenir, `git pull` çakışır.
- Caddy'yi ayrı "edge" projesine taşımak: daha temiz ama özel caddy-l4 imajı ve TURN yönlendirmesi taşınmalı. Ertelendi, ayrı iş olarak açıldı (Yusuf: "bi ara iş olarak").

## Sonuçlar / riskler
- Yollar Diskort'un default `handle`'ından önce içe aktarılır; site dosyalarında `handle`/`handle_path` kullanılmalı.
- `/opt/ziroo-sites` repo dışında; sunucu yeniden kurulursa elle geri konmalı. Kullanan: steam, ziroobank.

## İlgili
- [[vps-makinesi]], [[10-Projects/steam-avgr/_overview|Steam AGCR Paneli]], [[2026-10-02-oyunlar-diskort-alan-adinda-games-altinda]]
