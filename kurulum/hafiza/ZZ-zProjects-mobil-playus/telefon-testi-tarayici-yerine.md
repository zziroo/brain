---
name: telefon-testi-tarayici-yerine
description: Tussle oyun ajanları tarayıcıda oynamaya devam eder (kaldırma denemesi E partisinde kaliteyi düşürdü)
metadata:
  type: feedback
---
Oyun ajanları oyunu headless Chrome'da (CDP) oynayıp ekran görüntüsüyle görselini düzeltir; her ajan kendi scratch alt klasörü ve kendi portuyla. 2026-10-09'da tarayıcı oyunu kaldırıldı (Yusuf: "direkt telefona çıkartcaz"), görmeden yazılan E partisi "bir şeyler eksik" bulundu (sayı dolu, boş sahneler, oyuncak hissi yok); Yusuf: "tarayıcı testi bunu etkiliyorsa geri getirelim".

**Why:** Ajanın kendi oyununu görmesi yalnız hata değil his/görsel kaliteyi de taşıyor; otomatik testler bunu ölçmüyor. Ortak scratchpad çakışması asıl maliyetti, ayrı klasör/port çözer.

**How to apply:** Brief'e tarayıcı oyunu + önce/sonra ekran görüntüsü + referans olarak telefonda onaylı eski oyunlar (sepet, kule, bardak, karsiya) yaz. Koordinatör ekran görüntülerine kendisi bakar. Bkz. [[oncelik-akicilik]], [[oyun-yayini-partiler]].
