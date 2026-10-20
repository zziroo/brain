---
type: lesson
project: tussle
date: 2026-10-20
status: active
tags: [tussle, android, webview, animasyon, gpu, performans]
source: "oturum 2026-10-20 öğleden sonra (mobil-playus: ayarlar girişi, açılış, splash, Android Apple girişi); repo commit 8a1202c"
---

# Android WebView'de açılış uçuşunda 118–184 ms GPU donması: raster yükü uçuşun ortasına düşüyordu

**Belirti:** Xiaomi'de açılışta logoya uçuşta 118–184 ms donma.

**Kök neden (WebView raster):** SVG, DPR ≠ 1'de kompozit katmana alınmıyor, her karede yeniden rasterleniyor; opak `#boot` altındaki sayfa önceden rasterlenmiyor, perde kalkınca birden rasterleniyor; tanıtımın 2. slayt görseli uçuşun ortasında yükleniyordu.

**Düzeltme:** SVG yerine div taşıyıcılar; uçuştan önce `settled()` (sakin kare bekleme); `#boot` opacity .999 (altı rasterlensin); 2. slayt görseli 900 ms sonra. Sonuç: en büyük kare boşluğu 17–27 ms. Bedel: uçuş ~0,3 sn geç başlar.

**Ders:** WebView'de animasyon sırasında yeni raster (SVG, opak örtü altı, geç gelen görsel) donma demektir; ölçüm yöntemi [[2026-10-20-cihaz-hissi-adb-kaydi-ve-cdp-ile-olculur]]. İlgili karar [[2026-10-20-acilis-animasyonu-logoya-ucus]].
