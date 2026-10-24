---
title: "Tussle: küçük açıklar — oyun içi kombo/tur hapı/level sesi kalktı, göç 32 luck, küçük kontrastlar"
date: 2026-10-24
type: session
project: tussle
source: oturum 2026-10-24 (mobil-playus)
---
# Oturum: küçük açıklar turu (24 Eki)

Yusuf: biriken telefon teyitleri kapatıldı ("şu an sorun yok"); küçük açıklar yapılsın; oyun sonu çıkartmaları ("Usta!") kalsın, oyun içindekiler gitsin.

## Yapılanlar (yayında: sunucu 4986df5, OTA 0.20261024.1327, DB 32, yedek pre-4986df5.db; Yusuf kontrast varyantlarında A'yı seçti)
- `61e5962` **Oyun içinde skordan başka gösterge yok:** Beat v5 ve Target v5 (kombo çarpanı sim'den kalktı, puan düz 20/10 ve 10/5/2; Beat'teki 10 bölmeli seviye ölçeri de gitti), Stack "Seri xN" tuval yazısı yok; n/toplam tur hapı split, fill-up, on-time, reflex, color-recall, brake'te kalktı (`hud.ts setRound` bileşeni duruyor); tur geçişi `level` sesi split, color-recall, crack-it, keep-up, spiral'de kalktı, lights EV_TURN `tick`. Sonuç satırları ve çıkartmalar duruyor. Rescore yok (Bounce v5 emsali). Göç 32: `luck` tablosu + `days.luck` düştü (geri dönüş imajı luck yazmıyor).
  - Denge (ortalama puan, eski→yeni): Beat casual 1489→584, skilled 7113→2052, expert 17503→4667; Target casual 1079→380, good 2774→887, expert 5713→1760. `meta.ts` yorumlarında.
- `4986df5` **Küçük kontrastlar (19 Eki açığı):** 32 eşik altı → 0. Kilit kartı "1/2" (2.75→6.08), davet kartı (2.66→4.58, hero `--cover-stack-2`), kendi mesaj saati (3.99→4.93), boş jeton (1.9/2.6→3.3/4.8), parti kartı yıldızları ve ×2. Yeni `npm run kontrast` (`scripts/kontrast-kontrol.mjs`, arka plan pikselden). Devre dışı kilitli ⚔ düğmesine dokunulmadı.
  - Uygulanan A; B varyantları görüntü olarak vault `gorsel-2026-10-24-kontrast/` (`karsilastirma.html`). Yusuf'un seçimi bekleniyor: kilit 1/2 (A koyu/mercan, B beyaz/koyu mercan), davet kartı (A beyaz/koyu mavi, B koyu/açık mavi), boş jeton (A gri disk .5, B soluk dolgu + kenar), parti küçük resmi (A beyaz yıldız, B sarı yıldız/koyu mor).

## Kararlar / notlar
- Tur hapı kalkınca on-time, reflex, color-recall'da HUD hiçbir şey çizmiyor; süre çubuğu da kapalı. Oyun bitişi ani hissedilirse hap geri gelebilir (`round:true` tek satır).
- Brief dışı, dokunulmadı: hop HUD rozetinde metre; slice "{n} şeker birden!" (anlık olay çıkartması).
- Parti modunda oyun anlatımı (Melih): hazır kartı zaten howTo + hayalet el gösteriyor, 5 sn geri sayım. Öneri bekliyor (aşağıda).

## Kalan
- Telefonda denenmedi (Beat/Target yeni puanlar, tur hapsız oyunların bitişi, kontrast öğeleri).
- Ses yoğunluğu sadeleştirme turu (ayrı oturum).
