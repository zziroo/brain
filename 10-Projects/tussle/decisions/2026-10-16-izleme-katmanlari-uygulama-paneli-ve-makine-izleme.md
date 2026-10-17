---
type: decision
project: tussle
date: 2026-10-16
status: active
tags: [tussle, izleme, admin-panel, altyapi, ziroo-edge, ops]
source: Claude Code oturumu 2026-10-15/16 "tussle: hata toplama + geri bildirim" (admin paneli sohbeti)
---

# Karar (öneri): İzleme üç katman; Tussle admin paneli uygulama düzeyinde, makine izleme ziroo-edge içinde ayrı bir ops hizmeti

## Bağlam
Yusuf "sunucu durumu için bir panel" istedi; makine bazlı mı oyun bazlı mı belirsizdi. Diskort'un admin panelinde makine/altyapı bölümü var ([[admin-paneli-ve-loglar|Diskort admin paneli]]); gece gözcüsü de sunucu sağlığına bakıyor. `ops.ziroo.net` joker DNS'le VPS'e çözülüyor ama Caddy'de hiçbir siteye bağlı değil (boş).

## Karar (makine katmanı 2026-10-16'da kuruldu: [[2026-10-16-ops-katmani-kuma-netdata-ziroo-edge|ops katmanı]]; Tussle paneli 2026-10-16 akşam yayınlandı: [[2026-10-16-admin-paneli-tek-sayfa-admin-token-kapaliysa-404]])
1. **Uygulama katmanı:** her projenin kendi admin paneli yalnız kendi verisini gösterir. Tussle için `tussle.ziroo.net/admin`: geri bildirim (listele/ack), gruplanmış istemci hataları (mesaj, sayı, sürüm/platform, son görülme; 24 sa / 7 gün), kullanım (bugün oynayan, aktif oda, günlük koşu, canlı maç/parti, oyun başına oynanma, 14 günlük çizgi), sürüm ve sağlık (rev, OTA paketi ve istemci sürüm dağılımı, DB boyutu, son yedek, ws bağlı istemci). `/api/admin/*` + tek sayfa DOM, `.env`'de `ADMIN_TOKEN`, salt okunur + ack. Takma ad düzeyinde veri.
2. **Makine katmanı:** VPS geneli (CPU/RAM/disk, konteynerler, siteler ayakta mı) hazır araçla: **Uptime Kuma** (yoklama + Telegram/e-posta bildirimi + durum sayfası) ve **Netdata** (canlı makine grafikleri), Caddy arkasında şifreli `ops.ziroo.net`. Yeri **ziroo-edge** reposu (`ops/` compose + host dosyası + deploy betiği); ileride gelecek makine düzeyi sistemler de oraya. Diskort panelindeki altyapı bölümü kalır ama büyütülmez. Dış yedek ping (healthchecks.io) makine tamamen çökerse diye, isteğe bağlı.
3. **Rapor katmanı:** gece gözcüsü, mevcut; anlık izlemenin yerini tutmaz, tamamlar.

Sıra: önce Tussle paneli (bu projede), sonra ops kurulumu ziroo-edge klasöründe ayrı oturumda. Yusuf'tan gerekenler: bildirim kanalı (Telegram bot ya da e-posta), panel şifresini ilk açılışta kendisinin koyması, isteğe bağlı healthchecks.io hesabı.

## Neden
- Makine bilgisi hiçbir uygulamaya ait değil; her uygulama paneline kopyalamak tekrar ve bakım yükü.
- Hazır araçlar (Kuma/Netdata) kendi yazılacak bir makine panelinden ucuz ve bildirimli.
- Caddy, alan adları ve statik siteler zaten ziroo-edge'de; altyapı tek repoda kalsın, ZZ kökü Claude Code ve kişisel işler için.

## Reddedilen alternatifler
- Tussle paneline makine bölümü eklemek: Diskort'taki tekrarın ikincisi olurdu.
- Üçüncü bir elle yazılmış makine paneli: Kuma + Netdata aynı işi bildirimle yapıyor.
- ZZ kökünden ya da diskort klasöründen kurmak: ops Diskort'a özel değil, Caddy ziroo-edge'de.
- Gün içi kesinti için Claude rutini: token harcar, aralıklı bakar; gözcü kararında da reddedilmişti.

## Sonuçlar / riskler
- Aynı makinedeki Kuma makine çökünce kendisi de susar; dış ping bunun için.
- Tussle paneli için yeni bir sır (`ADMIN_TOKEN`) `/opt/tussle/.env`'e girecek.

## İlgili
- [[_overview]] · [[2026-10-15-istemci-hata-toplama-jsonl-geri-bildirim-sqlite]] · [[2026-10-15-gozcu-birlesik-dort-bolum|gözcü]] · [[vps-makinesi]]
