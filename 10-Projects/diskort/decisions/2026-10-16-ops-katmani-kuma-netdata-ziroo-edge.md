---
type: decision
project: diskort
date: 2026-10-16
status: active
tags: [altyapi, ziroo-edge, ops, izleme, uptime-kuma, netdata, telegram]
source: Claude Code oturumu 2026-10-16 "ziroo-edge: ops katmanı (Kuma + Netdata)"
---

# Karar: Makine izleme ziroo-edge `ops/` altında Uptime Kuma + Netdata, ops.ziroo.net'te; bildirim Telegram botuyla

## Bağlam
[[10-Projects/tussle/decisions/2026-10-16-izleme-katmanlari-uygulama-paneli-ve-makine-izleme|Üç katman önerisi]]nin makine katmanı. Yusuf Telegram botunu kurdu (`ziroo_ops_bot`), kurulum aynı gün yapıldı.

## Karar
- ziroo-edge deposunda `ops/`: ayrı compose (`ziroo-ops` projesi), `netdata.conf`, `ops.caddy` şablonu, `install.sh` (sunucuda), `deploy.sh` (yerelden: scp + install). Commit `b188158`.
- **Uptime Kuma** `127.0.0.1:3001` → `https://ops.ziroo.net/` (kendi girişi; yönetici hesabı, Telegram token'ı ve izleme listesi arayüzden, depoda sır yok). Veri `/opt/ziroo-ops/kuma`. Docker soketi salt okunur bağlı (konteyner izleme türü için).
- **Netdata** host ağında `127.0.0.1:19999` → `https://ops.ziroo.net/netdata/`, Caddy basic auth (kullanıcı `ziroo`, şifre yalnız sunucuda `/opt/ziroo-ops/netdata.pass`, install.sh bir kez üretir). ML kapalı (2 çekirdek), telemetri kapalı.
- Caddy host bloğu `/opt/ziroo-sites/hosts/ops.caddy` (şablondan doldurulur; doğrulama geçmezse install.sh dosyayı geri alır). `test/smoke.sh live ops` bölümü eklendi.
- İzleme listesi adres bazlı yazılacak (`https://<ad>.ziroo.net/...`), iç port değil: proje başka makineye taşınırsa Kuma değişmez. Netdata makine başına bir tane.

## Neden
- Hazır araçlar bildirimli ve ucuz; elle yazılmış makine paneli gereksiz.
- Caddy ve alan adları zaten ziroo-edge'de; ops oraya ait, hiçbir uygulamaya değil.
- Kuma'nın kendi girişi var; Netdata'nın yok, o yüzden yalnız `/netdata/` yolunda basic auth (çift giriş olmasın).
- Şifre yerine hash Caddy dosyasında, `.env`'de değil: `.env` değişince konteyner yeniden kurulur (TURN kopar), host dosyası `reload.sh` ile kesintisiz yüklenir.

## Reddedilen alternatifler
- Netdata için ayrı alt alan adı: tek adres (`ops.ziroo.net`) daha akılda kalır; Netdata docs Caddy `handle_path /netdata/*` örneğini destekliyor.
- Kuma için basic auth: kendi girişi var, çift şifre gereksiz.
- Bellek sınırı (`mem_limit`): OOM döngüsü riski; ilk ölçüm Kuma ~210 MB, Netdata ~320 MB / %10 CPU, makinede 2,4 GB boş; gerekirse sonra.

## Sonuçlar / riskler
- Docker soketi iki konteynere salt okunur açık (root eşdeğeri bilgi); ikisi de yalnız 127.0.0.1 + Caddy arkasında.
- basic auth 401 cevabında Caddy `Server: Caddy` başlığı kalıyor (uygulama cevaplarında kalkıyor); önemsiz, smoke kontrolünden çıkarıldı.
- Kuma aynı makinede: makine çökerse susar; dış ping (healthchecks.io / UptimeRobot) hâlâ isteğe bağlı ve yok.
- Kuma ilk kurulumu 2026-10-16'da yapıldı (SQLite; yönetici hesabı Yusuf'ta, unutulursa `ssh -t vps 'docker exec -it kuma npm run reset-password'`). Bildirim: Telegram `ziroo_ops_bot` (token yalnız Kuma'da), "varsayılan etkin" + tüm servislere uygulandı; test mesajı geldi. Docker host: soket `/var/run/docker.sock` ("VPS Docker (soket)").
- İzleme listesi (19, 60 sn): HTTP ziroo.net, tools.ziroo.net, games.ziroo.net, tussle `/healthz`, diskort `/api/health`, lk.ziroo.net, kapis `/healthz`, steam-avgr/rehber/song-finder/pdf-ceviri `/healthz`, ziroobank `/`; Docker konteyner ziroo-edge, tussle, infra-api-1, infra-livekit-1, kapis, ziroobank, netdata. Disk doluluğu Kuma'da yok (gece gözcüsü bakıyor; istenirse Netdata alarmı).
- **Adlandırma (2026-10-16, Yusuf'un isteğiyle düzenlendi):** üç grup monitörü `Siteler` / `Konteynerler` / `Makine`. Siteler'de ad = adres (`tussle.ziroo.net`, `tools/steam-avgr`), ürün adı değil (ürün adları değişebilir); hepsi `/healthz`. Konteynerler'de konteyner adı aynen. Makine'de `yedek diskort`, `yedek tussle`, `disk /`, `smoke testi`. Sağlık ucu standardı `/healthz` (düz "ok"); Diskort'un ucu `/api/health` idi, `/healthz` Caddy'de SPA yedeğine düşüyordu (HTML 200, yanıltıcı); önce geçici olarak Diskort `infra/caddy/diskort.caddy`'ye `handle /healthz { rewrite * /api/health }` eklendi (commit `6565b07`); Yusuf yönlendirme istemedi ("temiz çözüm neyse o olsun"), aynı gün temiz çözüm: API kendi `/healthz` ucunu sunar (düz "ok", text/plain), Caddy yalnız yolu `@api` eşleyicisiyle geçirir, rewrite kalktı (commit `d47cf72`, 2026-10-16 01:26 sunucuda yayında, dışarıdan doğrulandı). `/api/health` de duruyor (`infra/restore-db.sh` onu bekler). Yayın sırası: önce api konteyneri, sonra Caddy reload (tersi olursa aradaki boşlukta `/healthz` 404 verir).
- Tarayıcı dersi: Kuma'nın mobil düzeninde Kaydet düğmesi alt menünün arkasında kalıyor; form URL alanında Enter ile gönderilir. Bildirim formu açıkken sayfa yenilenirse form kaybolur.
- Bu kurulum yapılınca Diskort admin panelindeki altyapı bölümü büyütülmez; Tussle admin paneli (uygulama katmanı) mobil-playus oturumunda ayrı iş.

## İlgili
- [[10-Projects/tussle/decisions/2026-10-16-izleme-katmanlari-uygulama-paneli-ve-makine-izleme]] · [[2026-10-15-gozcu-birlesik-dort-bolum]] · [[sunucu-vps]] · [[2026-10-03-caddy-ziroo-edge-projesine-ayrildi]]
