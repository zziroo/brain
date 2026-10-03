---
type: project
project: bal-vadisi
date: 2026-10-02
status: active
tags: [bal-vadisi, oyun, incremental, idle, canvas]
source: C:\Users\yusuf\ZZ\zProjects\bal-vadisi (CLAUDE.md, deploy/deploy.sh); oturum 2026-10-02
---

# Bal Vadisi: 2D arı/çayır temalı idle/incremental oyun

## Amaç
Yusuf "2D, herkesin görüp oynamak isteyeceği bir incremental oyun" istedi; konsept kararını Claude'a bıraktı ([[2026-10-02-ari-cayir-konsepti]]). Sonuç idle ağırlıklı çıktı; Yusuf'un asıl istediği tür koşu-tabanlı incremental'dı ([[2026-10-02-idle-degil-kosu-tabanli-incremental-istendi]]). Bu oyun olduğu gibi saklanıyor ve yayında; asıl istenen tür ayrı projede yapıldı: [[10-Projects/isik-bekcisi/_overview|Işık Bekçisi]] (`zProjects\incremantal-game`).

## Oyun
Kovandan çıkan arılar çayırdaki çiçeklerden nektar toplar, bal geliştirme satın alır. Oyuncu çiçeklere tıklayarak/sürükleyerek elle de hasat eder.
- 8 çiçek türü (Papatya → Kristal Çiçek, her biri 4× değerli), 8 geliştirme, altın çiçek olayı (Bal Akını ×5 ya da şanslı hasat).
- Prestij: "Oğul Ver" → Arı Sütü (her biri kalıcı +%10 bal) + 4 kalıcı güç.
- 17 başarım (her biri +%2), çevrimdışı kazanç, TR/EN, WebAudio ses, mobil yerleşim.

## Teknoloji
- Derleme yok: düz JS (klasik script'ler, ortak global'ler) + Canvas 2D. Tüm görseller kodla çiziliyor, dış dosya yok.
- Klasör: `C:\Users\yusuf\ZZ\zProjects\bal-vadisi` (2026-10-02'de `incremantal-game`'den taşındı).
- Yerel: `node serve.mjs` → http://localhost:5173. `?speed=N` hızlandırır.
- Denge ölçümü: `tools/balance-sim.js` (`simulate({...})` kilometre taşı sürelerini verir).

## Yayın
- **Canlı:** https://games.ziroo.net/bal-vadisi · oyun listesi: https://games.ziroo.net/ (2026-10-03'ten beri; eski adresler 301; oyun kayıtları yeni kökte sıfırdan başladı)
- Sunucuda statik dosya olarak duruyor (`/opt/ziroo-www/games`); yayınlama: `bash deploy/deploy.sh`, liste kaynağı `deploy/hub/`; betik yeni köke yayınlıyor (2026-10-03 geçişte kullanıldı). Karar: [[2026-10-03-joker-dns-ve-tools-games-alt-alan-adlari]] (eski: [[2026-10-02-oyunlar-diskort-alan-adinda-games-altinda]], [[2026-10-02-caddy-try-files-klasor-adresini-cozmuyor]]).

## Durum (2026-10-02)
| Parça | Durum |
|---|---|
| v1 oynanabilir sürüm | bitti; tıklama, satın alma, prestij, başarım, mobil yerleşim tarayıcıda doğrulandı |
| Yayın | canlı; tüm adresler ve oyunun açılışı canlıda doğrulandı. Yazı tipi sistem fontuna düşüyor (site CSP'si Google Fonts'u engelliyor) |
| Denge | bot simülasyonuyla ayarlandı (Lale ~1 dk, prestij ~20-30 dk mantıklı); gerçek oyuncu testi yok |
| İçerik derinliği | ~1,5-2 saatte tükeniyor (tek prestij katmanı) |
| Git | yerel depo, 2 commit: `c5a3024` (oyun + yayın betiği), `189b889` (oyun listesine Işık Bekçisi kartı). Remote yok. Kimlik depoya yerel tanımlandı (makinede global git kimliği yok; Diskort deposundakiyle aynı) |
| Oyun listesi sayfası | bu depoda: `deploy/hub/` (kartlar: Işık Bekçisi, Bal Vadisi). Yeni oyun eklenince kart buraya eklenir ve bu deponun betiği çalıştırılır |
| Arayüz | Işık Bekçisi'nin arayüzü bu oyundan bilinçli olarak ayrıştırıldı (Yusuf "çok benziyor" dedi): [[2026-10-02-kamp-gezilebilir-us-ve-ayri-arayuz-kimligi]]. Bu oyunun kendi görünümü değişmedi |
| İnceleme kapısı | Yusuf'un isteğiyle atlandı (öncelik ürüne bakmak) |

## Kararlar
- [[2026-10-03-joker-dns-ve-tools-games-alt-alan-adlari]]
- [[2026-10-02-ari-cayir-konsepti]]
- [[2026-10-02-oyunlar-diskort-alan-adinda-games-altinda]]

## Dersler
- [[2026-10-02-gizli-onizleme-panelinde-raf-durur]]
- [[2026-10-02-idle-degil-kosu-tabanli-incremental-istendi]]
- [[2026-10-02-caddy-try-files-klasor-adresini-cozmuyor]]

## Oturumlar
- [[10-Projects/isik-bekcisi/sessions/2026-10-02-iki-oyun-yayin-ve-kamp-yenilemesi|2026-10-02: iki oyun, yayın ve kamp yenilemesi]] (bu oyun aynı oturumun ilk yarısında yazıldı)

## Kaynaklar
- [[kosu-tabanli-incremental-shelldiver-rock-bottom-analizi]]: Yusuf'un "incremental" derken kastettiği tür
