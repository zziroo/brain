---
type: resource
project: genel
date: 2026-10-17
status: active
tags: [altyapi, sunucu, vps, runbook]
source: "10-Projects/diskort/runbooks/sunucu-vps.md'nin makine geneli kısmı (2026-10-17'de ayrıldı); proje overview'larındaki yerleşim satırları"
---

# Paylaşılan VPS: LightNode İstanbul, `ssh vps` ile erişim, giriş kapısı ziroo-edge, üstünde birçok proje

Bütün projelerin kullandığı tek sunucu. Diskort'a özgü kısım (konteynerler, yollar, deploy): [[sunucu-vps]]. Gizli değerler yazılmaz; yalnız konumlar. IP adresi Diskort runbook'unda ve ziroo-edge README'sinde.

## Makine
- **LightNode "Istanbul II"** (2026-10-01'den beri): KVM, 2 paylaşımlı vCPU, 4 GB RAM, 50 GB disk, Ubuntu 24.04. Saatlik faturalı (~14 $/ay), trafik paketi 1000 GB/ay (kullanım ~800 GB). İki ağ kartı: eth1 genel, eth0 özel. Neden taşındı: [[sunucu-lightnode-istanbula-tasindi]].
- **Eski sunucu:** isimkayit "IK Cloud 4 TR"; kapsayıcılar durduruldu, Yusuf silecek.
- **Saat dilimi:** İstanbul.
- **Güvenlik duvarı (ufw):** 22, 80, 443, 7881/tcp, 3478/udp, 50000-60000/udp (son üçü Diskort/LiveKit için).
- **UDP:** yeni sunucuda 10.000 paket/sn'ye kadar gelen UDP kayıpsız, gecikme ~19 ms (2026-10-01). Tamponlar `/etc/sysctl.d/60-diskort-udp.conf` (rmem/wmem_max 5000000).

## Erişim
- Mac'ten her zaman `ssh vps '...'` ve `scp <dosya> vps:<yol>`. Alias `~/.ssh/config` içinde (anahtar, kullanıcı, zaman aşımı); `-i`/`-o` bayrakları ve IP yazılmaz. ssh/scp çağrısı tek başına, yerel komutlarla zincirlenmeden çalıştırılır ([[2026-10-15-yan-oturum-ssh-alias-auto-mod]]).
- Yalnız anahtarla giriş (`/etc/ssh/sshd_config.d/00-diskort-hardening.conf`): [[ssh-yalnizca-anahtar-ile]]. İki anahtar yetkili: `diskort_vps` (ed25519, araçlar bunu kullanır) ve `diskort_lightnode` (RSA; LightNode paneli yalnız RSA kabul ediyor). Kurtarma: LightNode panel konsolu.

## Bakım
- unattended-upgrades LightNode görüntüsünde maskeli; otomatik güvenlik güncellemesi **çalışmıyor** (ayar dosyası `52diskort-auto-reboot` yazıldı, hizmet açılmadı). Plan: [[2026-10-15-sunucu-bakim-penceresi-07-30]]. 2026-10-16 07:30 bakımının yapıldığı doğrulanmadı.
- **Sakin saat:** 07:00–09:00 İstanbul (14 günde hiç sesli oturum yok). Diskort'ta doluluk ölçme yöntemi: [[sunucu-vps]].
- openssh yükseltilirken SSH ~90 sn bağlantı reddedebilir ([[caddy-bind-mount-restart]]).

## Alan adları ve giriş kapısı
- **DNS:** Cloudflare, ziroo.net, yalnız DNS (gri bulut). 2026-10-03'ten beri joker `*.ziroo.net` A kaydı sunucuya gider; yeni alt alan adı için DNS gerekmez. Joker silinirse Diskort (ses dahil) ve KAPIŞ da düşer. Çıplak `ziroo.net` için ayrı A kaydı var ([[2026-10-03-joker-dns-ve-tools-games-alt-alan-adlari]]).
- **Giriş kapısı:** Caddy ayrı [[10-Projects/ziroo-edge/_overview|ziroo-edge]] projesinde (`/opt/ziroo-edge`, kapsayıcı `ziroo-edge`, host ağı). Her değişiklik `bash /opt/ziroo-edge/reload.sh`. Diskort compose'unda `caddy` asla başlatılmaz (SO_REUSEPORT, 443 sessizce paylaşılır). [[2026-10-03-caddy-ziroo-edge-projesine-ayrildi]]
- **Site dosyaları:** Diskort siteleri `/opt/diskort/infra/caddy/diskort.caddy`; diğer projeler `/opt/ziroo-sites/tools/<ad>.caddy`, `games/<ad>.caddy` ya da kendi alan adı için `hosts/<ad>.caddy`. Giriş ya da kişisel veri yoksa `tools`/`games` altına, varsa kendi alt alan adına. Eski `diskort.ziroo.net/tools|games` adresleri `/opt/ziroo-sites/tasinan-adresler.caddy` ile 301 (kaynak ziroo-edge `config/diskort-yollari/`).
- **Statik kökler:** `/opt/ziroo-www/{tools,games,home}` (edge'de `/srv/www:ro`; `home` = ziroo.net ana sayfası). Listeler ve ana sayfa ziroo-edge `www/`'den `bash deploy-www.sh [tools|games|home|all]` ile ([[2026-10-05-liste-sayfalari-ziroo-edge-te-ortak-neon-tasarim]]). Doğrulama `bash /opt/ziroo-edge/test/smoke.sh live`.
- **Açık temizlik:** eski kopyalar `/opt/diskort/apps/web/tools`, `/games`, `games.html` 2026-10-05'te duruyordu (geçiş runbook'u Faz D, ziroo-edge `docs/gecis-tools-games-alt-alan-adlari.md`). Eski `/opt/ziroo-sites/steam.caddy` ve `ziroobank.caddy` kaldırıldı (yedek `/root/gecis-2026-10/`).

## Projelerin yerleşimi
| Proje | Adres | Sunucuda |
|---|---|---|
| Diskort | diskort.ziroo.net, lk, turn | `/opt/diskort`, compose `infra/` (livekit, api); ayrıntı [[sunucu-vps]] |
| Tussle | tussle.ziroo.net | konteyner `tussle` (127.0.0.1:8087, `/opt/tussle`), `hosts/tussle.caddy` |
| KAPIŞ | kapis.ziroo.net | konteyner `kapis` (127.0.0.1:8085), `hosts/kapis.caddy` |
| Steam AGCR | tools.ziroo.net/steam-avgr | konteyner `steam-avgr` (127.0.0.1:8090, `/opt/steam-avgr`, anahtar `/etc/steam-avgr.env` 600), `tools/steam-avgr.caddy` |
| Rehber Okuyucu | tools.ziroo.net/rehber | konteyner `rehber` (127.0.0.1:8095, deneme 8096, `/opt/rehber`, env `/etc/rehber.env` 600; içinde Claude Code CLI, bellek sınırı 1 GB), `tools/rehber.caddy` |
| Ziroobank | tools.ziroo.net/ziroobank | konteyner `ziroobank` (127.0.0.1:3100, `/opt/ziroobank`, statik `/opt/ziroo-www/tools/ziroobank/`, çerez `Path=/ziroobank`), `tools/ziroobank.caddy` |
| PDF Çeviri | tools.ziroo.net/pdf-ceviri | konteyner `pdf-ceviri` (127.0.0.1:8097, `/opt/pdf-ceviri/src`, kalıcı veri ve sır yok), `tools/pdf-ceviri.caddy` |
| Song Finder | tools.ziroo.net/song-finder | konteyner `song-finder` (127.0.0.1:8092, `/opt/song-finder`) |
| Çeviri Aracı | tools.ziroo.net/ceviri-araci | statik; betik `string-tool/deploy/deploy.sh`, yeni köke uyumu doğrulanmadı |
| Oyunlar | games.ziroo.net/bal-vadisi, /isik-bekcisi | statik `/opt/ziroo-www/games/<ad>` |
| Ops | ops.ziroo.net | Kuma + Netdata (aşağıda) |

Proje overview'ları: [[10-Projects/tussle/_overview|Tussle]] · [[10-Projects/kapis/_overview|KAPIŞ]] · [[10-Projects/steam-avgr/_overview|Steam AGCR]] · [[10-Projects/rehber-okuyucu/_overview|Rehber Okuyucu]] · [[10-Projects/ziroobank/_overview|Ziroobank]] · [[10-Projects/pdf-ceviri/_overview|PDF Çeviri]] · [[10-Projects/song-finder/_overview|Song Finder]] · [[10-Projects/ceviri-araci/_overview|Çeviri Aracı]].

## Sağlık ve izleme
- **Sağlık ucu standardı:** her projede `/healthz` (düz "ok", uygulamanın kendi sürecinden). Kuma monitörleri buna bakar. Standart: [[proje-altyapi-standardi]].
- **Makine izleme (2026-10-16):** https://ops.ziroo.net → Uptime Kuma (konteyner `kuma`, 127.0.0.1:3001, veri `/opt/ziroo-ops/kuma`, kendi girişi, Telegram bildirimi); https://ops.ziroo.net/netdata/ → Netdata (konteyner `netdata`, host ağı 127.0.0.1:19999, basic auth kullanıcı `ziroo`, şifre dosyası `/opt/ziroo-ops/netdata.pass`). Kaynak ziroo-edge `ops/` (`/opt/ziroo-edge/ops`), host bloğu `/opt/ziroo-sites/hosts/ops.caddy`; güncelleme yerelden `bash ops/deploy.sh`, kontrol `bash /opt/ziroo-edge/test/smoke.sh live ops`.
- **Saatlik kontrol:** `ziroo-ops-check.timer` → `ops/check.sh` (yedek yaşı, disk, smoke → Kuma push; jetonlar `/opt/ziroo-ops/check.env`). [[2026-10-16-ops-katmani-kuma-netdata-ziroo-edge]], [[2026-10-16-makine-sagligi-kuma-push-gozcuden-cikti]]

## İlgili
- [[sunucu-vps]] (Diskort'a özgü), [[secret-isleme-kurali]], [[caddy-redir-path-acik-yonlendirme]], [[2026-10-16-ziroo-net-posta-catch-all-ayri-kural-yok]]
