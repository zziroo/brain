---
type: resource
project: diskort
date: 2026-09-30
status: active
tags: [diskort, runbook, sunucu, vps]
source: memory diskort-server.md
---

# Production sunucu: isimkayit VPS, SSH yalnız anahtarla, docker compose ile livekit + api + caddy

Gizli değerler yazılmaz; yalnız konumlar.

- **VPS:** isimkayit.com "IK Cloud 4 TR" (Kocaeli/TR, VMware, 2 vCPU, 4 GB, Ubuntu 24.04), IP `185.92.0.242`, aylık 401 TL + KDV, 2026-09-26'da alındı.
- **SSH:** `ssh -i ~/.ssh/diskort_vps root@185.92.0.242`. 2026-09-26'dan beri yalnız anahtar (`/etc/ssh/sshd_config.d/00-diskort-hardening.conf`: parola girişi kapalı, root yalnız anahtarla). Sağlayıcı konsolu için root parolası hâlâ geçerli. Kurtarma: konsoldan gir, o dosyayı sil, `systemctl reload ssh`. Güvenli değişiklik deseni: systemd-run ile 5 dk otomatik geri alma zamanlayıcısı, yeni anahtar oturumunu dene, sonra zamanlayıcıyı durdur. Sağlayıcı panelinde web konsolu var (Yusuf doğruladı).
- **Yığın:** repo `/opt/diskort`, compose `/opt/diskort/infra` (livekit, api, caddy; host network; ufw açık: 22, 80, 443, 7881/tcp, 3478/udp, 50000-60000/udp). Secret'lar `/opt/diskort/infra/.env` içinde (yazdırma).
- **Alan adları** (Cloudflare, ziroo.net, yalnız DNS / gri bulut): `diskort.ziroo.net` -> API/gateway/indirme sayfası, `lk.ziroo.net` -> LiveKit, `turn.ziroo.net` -> TURN/TLS. Let's Encrypt, Caddy ile.
- **İndirme sayfası:** `apps/web` (statik) Caddy'den https://diskort.ziroo.net (+ /download). `/download/<platform>` API'den son GitHub release varlığına 302; kullanıcı GitHub'ı görmez. Caddy /api/*, /gateway, /download/* yollarını API'ye yollar.
- **TURN/TLS 443:** özel Caddy imajı (`infra/caddy/Dockerfile`, caddy-l4) SNI `turn.ziroo.net` -> TLS sonlandırma -> PROXY v2 -> LiveKit 127.0.0.1:5349. 2026-09-26'da uçtan uca doğrulandı (röle ~23 ms vs doğrudan ~21 ms). LiveKit 1.13 fiilen `turns:turn.ziroo.net:443` ilan ediyor; masaüstü `turnPort.ts` yeniden yazımı sigorta olarak duruyor.
- **Bakım:** unattended-upgrades günlük + otomatik yeniden başlatma 05:00. Sunucu saat dilimi İstanbul.
- **UDP:** 2026-09-26'da 6 Mbps yayın, %0 kayıp, ~22 ms RTT doğrulandı. UDP tamponları `/etc/sysctl.d/60-diskort-udp.conf` (rmem/wmem_max 5000000). Ölçüm: 2 kullanıcı + bir yayın ~8.7 Mbps her yön, livekit tek çekirdeğin ~%22'si.
- **DB yolu** api konteynerinde `/data/diskort.db` (`docker compose exec -T api node -e ...` + node:sqlite). Mevcut DB şema numarası [[_overview]] "Güncel durum"da.

## Ses kesinti olayları
2026-09-29 (18:03-18:55 UTC) ve 09-30 gecesi: farklı ISS'lerdeki kullanıcılar aynı anda 20-30 sn upstream UDP kaybetti; sunucu sayaçları temiz, ICMP normal; olası sağlayıcı UDP filtresi. Sonuç bilinmiyor (sağlayıcıyla görüşme). Ping günlüğü `C:\Users\yusuf\diskort-inbox\ping-uzun.log`.

## İlgili
- [[deploy]], [[yedekler]], [[admin-paneli-ve-loglar]], [[caddy-bind-mount-restart]], [[secret-isleme-kurali]]
