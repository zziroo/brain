---
type: project
project: ziroo-edge
date: 2026-10-18
status: active
tags: [ziroo-edge, overview, caddy, sunucu, ziroo-net]
source: "diskort _overview.md'nin ziroo-edge kısımları (2026-10-17 öncesi), 10-Projects/ziroo-edge altına taşınan notlar (vault commit 7d618f1), ziroo-edge README"
---

# ziroo-edge: sunucunun giriş kapısı (Caddy), ziroo.net ana sayfası, araç/oyun listeleri ve makine izleme

> Durum kaynağı bu sayfa; canlı gerçek değildir. Sunucu ve repo durumunu işlem yapmadan önce canlıdan doğrula.

## Nedir
Paylaşılan VPS'in ([[vps-makinesi]]) tek giriş kapısı: 80/443'ü dinleyen Caddy. HTTPS sertifikalarını alır, trafiği projelere dağıtır, Diskort'un TURN/TLS yedek bağlantısını 443'te SNI ile ayırır. 2026-10-03'e kadar Diskort'un compose'undaydı ([[2026-10-03-caddy-ziroo-edge-projesine-ayrildi]]).

Aynı depo şunları da tutar:
- `ziroo.net` ana sayfası (`www/home/`): kapılar (Oyunlar, Araçlar, Diskort) ve üstte kaydırmalı Ziroo hikâyesi.
- `tools.ziroo.net` ve `games.ziroo.net` listeleri (`www/tools/`, `www/games/`, ortak tasarım `www/shared/hub.css`).
- Ops katmanı (`ops/`): Uptime Kuma + Netdata, `ops.ziroo.net`.

Kod `/Users/ziroo/ZZ/zProjects/ziroo-edge`, GitHub `zziroo/ziroo-edge` (özel, dal `master`). Sunucuda `/opt/ziroo-edge`, kapsayıcı `ziroo-edge`, host ağı. Marka ve maskot: [[10-Projects/marka/_overview|marka]].

## Teknoloji
- Caddy + caddy-l4 (`caddy/Dockerfile`). Ana ayar `config/Caddyfile` (TURN/TLS kuralı + içe aktarmalar), ortak snippet `config/snippets/ziroo-static.caddy`, hub site blokları `config/hubs/`.
- Diskort siteleri Diskort deposunda (`infra/caddy/diskort.caddy`). Diğer projeler `/opt/ziroo-sites/{tools,games,hosts}/<ad>.caddy` dosyası bırakır.
- Komutlar: Caddy değişikliği sunucuda `bash /opt/ziroo-edge/reload.sh`; sayfalar `bash deploy-www.sh [tools|games|home|all]`; ops `bash ops/deploy.sh`; doğrulama `bash /opt/ziroo-edge/test/smoke.sh live [ops]`.
- Sayfalar düz HTML/CSS; ana sayfa kütüphanesiz `www/home/home.js` + satır içi SVG. CSP: satır içi script/stil yok, dış font/CDN yok.
- DNS: Cloudflare joker `*.ziroo.net` (gri bulut), çıplak `ziroo.net` için ayrı A kaydı ([[2026-10-03-joker-dns-ve-tools-games-alt-alan-adlari]]).
- Yeni proje eklemek: [[proje-altyapi-standardi]] ve README "Yeni proje eklemek".

## Güncel durum
_Son güncelleme: 2026-10-18; canlıdan doğrula._
- **ziroo.net ana sayfası:** iki sıra kapı yayında (2026-10-18, `81991f8`): üstte Oyunlar/Araçlar, altta Tussle/Kapış/Diskort ürün kapıları; hikâye 7 bölüm aynı sırayla; tanıtım sayfaları `ziroo.net/tussle/`, `ziroo.net/diskort/`; Oyunlar'da Tussle öne çıkan kart ([[2026-10-18-ziroo-net-iki-sira-kapi-bolumler-ve-urunler]]). Maskotun sıralar arası atlayışı canlı tarayıcıda gözle denenmedi; Safari/iOS ve gerçek telefon denenmedi. Önceki: [[2026-10-16-ziroo-net-kaydirmali-2d-maskot]], [[2026-10-17-ziroo-net-kapi-ekrani-turu]].
- **Listeler:** tools ve games listeleri ortak neon tasarımla yayında ([[2026-10-05-liste-sayfalari-ziroo-edge-te-ortak-neon-tasarim]]).
- **Giriş kapısı:** Diskort'un gateway ve LiveKit bloklarında `stream_close_delay 5m` var, reload sesli kanalı koparmasın diye. Kanal doluyken reload hâlâ denenmedi ([[caddy-reload-websocketleri-keser]]).
- **Ops (2026-10-16):** Kuma'da 23 monitör, bildirim Telegram'dan. Netdata `/netdata/` altında. Saatlik `ops/check.sh` yedek yaşı, disk ve smoke sonucunu Kuma'ya yollar ([[2026-10-16-ops-katmani-kuma-netdata-ziroo-edge]], [[2026-10-16-makine-sagligi-kuma-push-gozcuden-cikti]]).
- **Açık temizlik:** eski kopyalar `/opt/diskort/apps/web/tools` (196 MB), `games`, `games.html` 2026-10-05'te hâlâ duruyordu (geçiş runbook'u Faz D). Sonrası doğrulanmadı.
- **Sunucu bakımı:** 2026-10-16 07:30 için planlanan toplu güncelleme ve reboot yapıldı mı, doğrulanmadı ([[2026-10-15-sunucu-bakim-penceresi-07-30]]).

## Sıradaki işler
1. **Maskot doğrulama:** Yusuf telefondan (Android'de titreme düzeltmesi `dd47929`) ve Safari/iOS'tan bakar: süzülme, yürüyüş, kapı açma, fps. Klavyeyle kapıya geçiş denenmedi. Yerel önizleme `.claude/onizleme/` (launch.json `home-onizleme`).
2. **Açık ayar:** halka göz (`home.js` içindeki `EYE`).
3. **Eski kopyaları temizle** (Faz D, `docs/gecis-tools-games-alt-alan-adlari.md`).
4. **Sunucu bakımı:** yapılmadıysa Yusuf "başla" deyince ([[2026-10-15-sunucu-bakim-penceresi-07-30]]); sonra çıkış trafiğini 1000 GB planına göre izle.

## Kararlar
- Caddy ayrıldı: [[2026-10-03-caddy-ziroo-edge-projesine-ayrildi]] (önce: [[2026-10-02-caddy-ortak-site-klasoru]])
- Alan adları: [[2026-10-03-joker-dns-ve-tools-games-alt-alan-adlari]]
- Listeler ve ana sayfa: [[2026-10-05-liste-sayfalari-ziroo-edge-te-ortak-neon-tasarim]], [[2026-10-16-ziroo-net-kaydirmali-2d-maskot]], [[2026-10-18-ziroo-net-iki-sira-kapi-bolumler-ve-urunler]]
- Ops: [[2026-10-16-ops-katmani-kuma-netdata-ziroo-edge]], [[2026-10-16-makine-sagligi-kuma-push-gozcuden-cikti]]
- Makine geneli: [[vps-makinesi]], [[proje-altyapi-standardi]], [[2026-10-15-sunucu-bakim-penceresi-07-30]]

## Dersler
[[caddy-reload-websocketleri-keser]] · [[caddy-redir-path-acik-yonlendirme]] · [[caddy-bind-mount-restart]] · [[2026-10-16-saglik-ucu-surecten-cevaplanmali-kuma-netdata-tuzaklari]] · [[mac-ten-yayin-copyfile-disable-ve-exe-siz-ceviri-sayfasi]] · [[turkce-sayfada-css-buyuk-harf-noktali-i]] · [[background-clip-text-harf-kutusu-disini-boyamaz]] · [[animation-kisayolu-duraklatma-kuralini-ezer]] · [[mobilde-buyuk-olceklenen-katman-ve-durmayan-dongu-kasar]] · [[ajan-yayin-betigini-sahte-ssh-ile-denerken-canliya-cikti]]

## Oturumlar
- [[2026-10-03-tools-games-alt-alan-adi-gecisi]]: tools/games alt alan adları, joker DNS
- [[2026-10-04-geri-bildirim-kontrolu-ve-caddy-reload]]: Caddy reload kopması (Diskort oturumu)
- [[2026-10-05-liste-sayfalari-ve-ziroo-net-ana-sayfa]]: listeler neon tasarıma geçti, ziroo.net ana sayfası
- [[2026-10-05-araclarin-arayuzu-neon-temaya-gecti]]: altı aracın arayüzü neon temaya geçti, Mac'ten ilk yayın
- [[2026-10-16-ziroo-edge-ops-katmani-kuma-netdata]]: Kuma + Netdata, gözcüden makine sağlığı çıktı
- [[2026-10-17-ziroo-net-kaydirmali-maskot]]: ana sayfaya kaydırmalı 2D Ziroo
