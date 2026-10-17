---
type: decision
project: tussle
date: 2026-10-16
status: active
tags: [tussle, magaza, gorsel, ekran-goruntusu]
source: Claude Code yan oturumu 2026-10-16 "tussle: mağaza hazırlığı" (mobil-playus)
---

# Karar: mağaza ekran görüntüleri puppeteer-core + sistem Chrome ile tek komutla üretilir (`store/make-graphics.mjs`), yayın öncesi yeniden alınır

## Bağlam
Play telefon ekranı için en boy oranı ≤ 2:1 ve 320–3840 px ister; App Store 6,7" için 1290×2796. Uygulama bitmedi: Antrenman kalkacak, profile eklemeler gelecek (Yusuf, 2026-10-16). Elle çekim tekrarlanamaz, Türkçe arayüzlü olur; birincil mağaza dili İngilizce.

## Karar
- `store/make-graphics.mjs` (+ `seed-room.ts`, `feature-graphic.html`): kendi API'sini (8097, geçici `DATA_DIR`) ve Vite'ı (5197) açar, botlarla oda doldurur, İngilizce arayüz + Gündüz temasıyla 360×640@3x (Play, 1080×1920) ve 430×932@3x (iOS, 1290×2796) çeker, kapatır. puppeteer-core `package.json`'a girmez (`npm i --no-save` ya da geçici klasör + `PUPPETEER_DIR`).
- Beş ekran: oda, oyun sahnesi (Split), parti sonucu, ana ekran (Antrenman satırı CSS ile gizli), sohbet. Antrenman ekranı yok.
- İkon 512 (32 bit RGBA, köşeler kare: Play kendi maskesini uygular) ve 1024×500 özellik grafiği (krem zemin, düz açık mavi daire, üçlü işaret, "Tussle" ikon mavisi, "Daily mini-game duels with friends"); ikisi değişikliklerden etkilenmez.
- Hepsi geçici: Antrenman kaldırılıp profil değişince aynı komutla yeniden alınır; `store/README.md` bunu söylüyor.

## Neden
- Tek komutla tekrar: içerik değiştikçe maliyetsiz yenileme.
- Gerçek uygulama, gerçek sunucu doğrulamalı skorlar; mock görüntü değil.
- Tarayıcı bölmesi ekran görüntüsünü dosyaya yazamıyor; `canvas-shot` yalnız canvas'ı alıyor.

## Reddedilen alternatifler
- Xiaomi'de elle çekim (adb): Türkçe arayüz, tekrarlanamaz, oran işi elle.
- Tarayıcı bölmesi 375×812: oran 2,17:1, Play reddeder; görüntü de modele döner, dosyaya değil.
- `src/client/mockups/oda.html` statik mock: tek ekran, gerçek veri yok.
- Mevcut `icons/icon-512.png`: 8 bit paletli (png-palette küçültmesi), Play 32 bit ister.

## Sonuçlar / riskler
- Sıralar ve skorlar her üretimde değişir (oda kodu rastgele, günün tohumu ondan). README o çekimi anlatır.
- `stream-bot.ts` bazı oyunlarda 0 puan alıyor; `seed-room.ts` günü Hop/Knife Toss/Split ile sınırlıyor.
- Yapılmadı: tablet/iPad, tanıtım videosu, Türkçe ekranlar, çerçeve/altyazı.

## İlgili
- [[2026-10-13-magaza-hesaplari-apple-bireysel-play-ziroo]] · [[2026-10-16-tussle-magaza-hazirligi]] · [[2026-10-16-play-ekran-orani-ve-32-bit-ikon]]
