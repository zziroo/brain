---
type: resource
project: diskort
date: 2026-09-30
status: active
tags: [diskort, runbook, sunucu, vps]
source: memory diskort-server.md
---

# Production sunucu: LightNode İstanbul VPS, SSH yalnız anahtarla, docker compose ile livekit + api + caddy

Gizli değerler yazılmaz; yalnız konumlar.

- **VPS (2026-10-01'den beri):** LightNode "Istanbul II" (KVM, CPU Shared 2 vCPU, 4 GB, 50 GB, Ubuntu 24.04), IP `38.60.208.88`, saatlik faturalı (~14 $/ay), trafik paketi 1000 GB (kullanım ~800 GB/ay). İki ağ kartı: eth1 genel, eth0 özel. Neden taşındı: [[sunucu-lightnode-istanbula-tasindi]]. Eski: isimkayit "IK Cloud 4 TR", 185.92.0.242 (kapsayıcılar durduruldu, silinecek).
- **SSH:** `ssh -i ~/.ssh/diskort_vps root@38.60.208.88`. Yalnız anahtarla (`/etc/ssh/sshd_config.d/00-diskort-hardening.conf`). İki anahtar yetkili: `diskort_vps` (ed25519, tüm araçlar bunu kullanır) ve `diskort_lightnode` (RSA; LightNode paneli yalnız RSA kabul ediyor). Kurtarma: LightNode panel konsolu.
- **Yığın:** repo `/opt/diskort`, compose `/opt/diskort/infra` (livekit, api, caddy; host network; ufw açık: 22, 80, 443, 7881/tcp, 3478/udp, 50000-60000/udp). Secret'lar `/opt/diskort/infra/.env` içinde (yazdırma).
- **Alan adları** (Cloudflare, ziroo.net, yalnız DNS / gri bulut): `diskort.ziroo.net` -> API/gateway/indirme sayfası, `lk.ziroo.net` -> LiveKit, `turn.ziroo.net` -> TURN/TLS. Let's Encrypt, Caddy ile.
- **İndirme sayfası:** `apps/web` (statik) Caddy'den https://diskort.ziroo.net (+ /download). `/download/<platform>` API'den son GitHub release varlığına 302; kullanıcı GitHub'ı görmez. Caddy /api/*, /gateway, /download/* yollarını API'ye yollar.
- **Oyunlar (2026-10-02'den beri, Diskort dışı):** `/opt/diskort/apps/web/games/` + `games.html`, https://diskort.ziroo.net/games altında yayında. Repo'da izlenmeyen dosyalar (`.git/info/exclude`'da), Caddy ayarı değişmedi. Kaynak ve yayın betiği `C:\Users\yusuf\ZZ\zProjects\bal-vadisi\deploy\`. Ayrıntı: [[2026-10-02-oyunlar-diskort-alan-adinda-games-altinda]].
- **Araçlar (2026-10-02, Diskort dışı):** `/opt/diskort/apps/web/tools/ceviri-araci/` (+ `tools/ceviri-araci.html`), https://diskort.ziroo.net/tools/ceviri-araci. İzlenmeyen dosya (`.git/info/exclude`), betik `string-tool/deploy/deploy.sh`. `/download/*` API'ye gittiği için `/tools` seçildi. Ayrıntı: [[10-Projects/ceviri-araci/_overview|Çeviri Aracı]].
- **TURN/TLS 443:** özel Caddy imajı (`infra/caddy/Dockerfile`, caddy-l4) SNI `turn.ziroo.net` -> TLS sonlandırma -> PROXY v2 -> LiveKit 127.0.0.1:5349. 2026-09-26'da uçtan uca doğrulandı (röle ~23 ms vs doğrudan ~21 ms). LiveKit 1.13 fiilen `turns:turn.ziroo.net:443` ilan ediyor; masaüstü `turnPort.ts` yeniden yazımı sigorta olarak duruyor.
- **Bakım:** yeni sunucuda unattended-upgrades LightNode görüntüsünde maskeli, otomatik güvenlik güncellemesi ÇALIŞMIYOR (ayar dosyası `52diskort-auto-reboot` yazıldı, hizmet açılmadı). Açık iş. Sunucu saat dilimi İstanbul.
- **UDP (yeni sunucu, 2026-10-01):** 10.000 paket/sn'ye kadar gelen UDP kayıpsız, gecikme ~19 ms. Eski sunucuda: 2026-09-26'da 6 Mbps yayın, %0 kayıp, ~22 ms RTT doğrulandı. UDP tamponları `/etc/sysctl.d/60-diskort-udp.conf` (rmem/wmem_max 5000000). Ölçüm: 2 kullanıcı + bir yayın ~8.7 Mbps her yön, livekit tek çekirdeğin ~%22'si.
- **DB yolu** api konteynerinde `/data/diskort.db` (`docker compose exec -T api node -e ...` + node:sqlite). Mevcut DB şema numarası [[_overview]] "Güncel durum"da.

## Ses kesinti olayları
Eski sağlayıcıda gelen UDP ~1400 paket/sn üstünde kesiliyordu; çözüm sağlayıcı değişimi oldu. Ayrıntı: [[saglayici-udp-paket-siniri]].

## İlgili
- [[deploy]], [[yedekler]], [[admin-paneli-ve-loglar]], [[caddy-bind-mount-restart]], [[secret-isleme-kurali]]
