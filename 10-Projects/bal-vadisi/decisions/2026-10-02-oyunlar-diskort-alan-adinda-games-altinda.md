---
type: decision
project: bal-vadisi
date: 2026-10-02
status: superseded
tags: [bal-vadisi, diskort, yayin, sunucu, caddy]
source: oturum 2026-10-02 (incremantal-game); C:\Users\yusuf\ZZ\zProjects\bal-vadisi\deploy\deploy.sh
---

> **Güncel değil (2026-10-03):** adres ve sunucu yapısı için yerini [[2026-10-03-joker-dns-ve-tools-games-alt-alan-adlari]] aldı. Aşağısı o günkü bağlam olarak duruyor.

# Oyunlar Diskort sunucusunda diskort.ziroo.net/games altında statik dosya olarak yayınlanır

## Karar
Yusuf oyunun "herkes girebilecek şekilde" kendi sunucusuna yüklenmesini istedi ve adres olarak `diskort.ziroo.net/games/` gibi bir alt başlıkta toplamayı önerdi. Oyunlar `/opt/diskort/apps/web/games/<oyun>/` altına kopyalanıyor; `/games` küçük bir oyun listesi sayfası. Caddy ayarı ve konteynerler değişmedi.

## Neden
- Caddy `apps/web`'i klasör olarak bağlıyor; yeni dosyalar yeniden başlatma olmadan yayına giriyor. Canlı sesli sohbet sunucusunda kesinti riski sıfır.
- DNS kaydı gerekmiyor (ziroo.net'te joker kayıt yok, Cloudflare erişimi Claude'da yok).
- Geri alması tek komut: sunucuda `games/` ve `games.html` silinir.

## Reddedilen alternatifler
- Ayrı alt alan adı (ör. `bal.ziroo.net`): temiz ve ayrı origin, ama Cloudflare'da DNS kaydı + Diskort deposunda Caddy/compose değişikliği + Caddy'nin yeniden oluşturulması (birkaç saniye HTTPS ve TURN kopması) gerekiyor.
- IP + ayrı port: TLS yok, ufw açmak gerekir.

## Sonuçlar / riskler
- Oyunlar Diskort'un API/admin sayfasıyla **aynı origin**'de çalışıyor (localStorage ortak). Yalnız kendi kodumuz yayınlanmalı; üçüncü taraf script konmamalı (CSP zaten engelliyor).
- Dosyalar sunucudaki Diskort checkout'unda izlenmeyen dosya; `.git/info/exclude`'a yazıldı, `git pull --ff-only` etkilenmez. Sunucu yeniden kurulursa ya da repo yeniden klonlanırsa oyunlar kaybolur → `deploy.sh` yeniden çalıştırılır.
- Sitenin CSP'si yalnız aynı origin'e izin veriyor: satır içi script/stil ve CDN yok (Google Fonts engelli).
- Kalıcı çözüm istenirse: Diskort Caddyfile'ına `/games/*` için ayrı `handle` (klasör index'i + gevşetilmiş CSP), bir sonraki Caddy yeniden başlatmasında.

## İlgili
- [[sunucu-vps|sunucu-vps]], [[2026-10-02-caddy-try-files-klasor-adresini-cozmuyor]]
