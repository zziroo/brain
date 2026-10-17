---
type: resource
project: diskort
date: 2026-10-17
status: active
tags: [diskort, runbook, sunucu, vps]
source: "memory diskort-server.md; 2026-10-17'de makine geneli kısım [[vps-makinesi]] notuna ayrıldı"
---

# Diskort'un sunucudaki yeri: docker compose ile livekit + api, alan adları, TURN/TLS ve DB yolu

> **Makine geneli** (VPS özellikleri, `ssh vps` erişimi, bakım, DNS, Caddy/ziroo-edge, diğer projelerin yerleşimi, izleme): [[vps-makinesi]]. Bu not yalnız Diskort'a özgü kısmı tutar.

Gizli değerler yazılmaz; yalnız konumlar.

- **Sunucu:** LightNode İstanbul VPS, IP `38.60.208.88` (2026-10-01'den beri; eski: 185.92.0.242, durduruldu). Erişim `ssh vps 'cd /opt/diskort/infra && ...'`.
- **Yığın:** repo `/opt/diskort`, compose `/opt/diskort/infra` (livekit, api; caddy servisi profilde, üretimde kapalı; host network; ufw açık: 22, 80, 443, 7881/tcp, 3478/udp, 50000-60000/udp). Secret'lar `/opt/diskort/infra/.env` içinde (yazdırma).
- **Alan adları:** `diskort.ziroo.net` → API/gateway/indirme sayfası, `lk.ziroo.net` → LiveKit, `turn.ziroo.net` → TURN/TLS. Hepsi joker `*.ziroo.net` kaydıyla çözülür; sertifikalar Caddy'den (ziroo-edge). Ayrıntı [[vps-makinesi]].
- **Caddy:** Diskort siteleri bu depoda `infra/caddy/diskort.caddy`; ziroo-edge bu klasörü bağlar. Değişiklik `git pull` + `bash /opt/ziroo-edge/reload.sh` ([[2026-10-03-caddy-ziroo-edge-projesine-ayrildi]]). Gateway ve LiveKit bloklarında `stream_close_delay 5m` ([[caddy-reload-websocketleri-keser]]). `infra/` compose'undaki `caddy` servisi yalnız tek başına kurulum içindir, üretimde başlatılmaz.
- **İndirme sayfası:** `apps/web` (statik) Caddy'den https://diskort.ziroo.net (+ /download). `/download/<platform>` API'den son GitHub release varlığına 302; kullanıcı GitHub'ı görmez. Caddy /api/*, /gateway, /download/* yollarını API'ye yollar.
- **Sağlık ucu:** API `/healthz`'i doğrudan sunar (düz "ok"), Caddy `@api` ile geçirir (2026-10-16, commit `d47cf72`); eski `/api/health` de kalır. Kuma'nın `diskort.ziroo.net` monitörü buna bakar.
- **TURN/TLS 443:** özel Caddy imajı (caddy-l4; 2026-10-03'ten beri ziroo-edge `caddy/Dockerfile`, kural `config/Caddyfile` global bloğunda; Diskort deposundaki `infra/caddy/Dockerfile` tek başına kurulum için) SNI `turn.ziroo.net` -> TLS sonlandırma -> PROXY v2 -> LiveKit 127.0.0.1:5349. 2026-09-26'da uçtan uca doğrulandı (röle ~23 ms vs doğrudan ~21 ms). LiveKit 1.13 fiilen `turns:turn.ziroo.net:443` ilan ediyor; masaüstü `turnPort.ts` yeniden yazımı sigorta olarak duruyor.
- **UDP ölçümü:** eski sunucuda 2026-09-26'da 6 Mbps yayın, %0 kayıp, ~22 ms RTT doğrulandı. 2 kullanıcı + bir yayın ~8.7 Mbps her yön, livekit tek çekirdeğin ~%22'si. Makinenin UDP sınırı ve tamponları: [[vps-makinesi]].
- **Sakin saati ölçmek:** api kabında `voice_sessions` tablosundan (`started_at`/`last_seen_at`) saatlik doluluk histogramı çıkar; `livekit_participant_total` metriği anlık doluluğu verir. Bakım penceresi: [[2026-10-15-sunucu-bakim-penceresi-07-30]].
- **DB yolu** api konteynerinde `/data/diskort.db` (`docker compose exec -T api node -e ...` + node:sqlite). Mevcut DB şema numarası [[10-Projects/diskort/_overview|overview]] "Güncel durum"da.

## Ses kesinti olayları
Eski sağlayıcıda gelen UDP ~1400 paket/sn üstünde kesiliyordu; çözüm sağlayıcı değişimi oldu. Ayrıntı: [[saglayici-udp-paket-siniri]].

## İlgili
- [[vps-makinesi]], [[deploy]], [[yedekler]], [[admin-paneli-ve-loglar]], [[caddy-bind-mount-restart]], [[secret-isleme-kurali]], [[caddy-redir-path-acik-yonlendirme]]
