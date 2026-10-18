---
type: decision
project: tussle
date: 2026-10-18
status: accepted
tags: [tussle, android, mini-motor, capacitor, faz-2]
source: oturum 2026-10-18 "tussle: mini motor faz 2 (oyun ekranı → yerel motor)"
---

# Karar: Android'de yerel oyun yüzeyi WebView'in arkasında, oyun üstü arayüz DOM'da kalır; skoru WebView'deki tekrar belirler

Üst karar: [[2026-10-18-android-mini-oyun-motoru]]. Uygulama ve sonuçlar: [[2026-10-18-mini-motor-faz-devir-notu]] (Faz 2 sonucu), oturum [[2026-10-18-tussle-mini-motor-faz-2]].

## Karar
- SurfaceView WebView'in **arkasında**. Koşu boyunca WebView ve sayfa şeffaf. Kapat X, durum çipi, izleyici rozeti, yarış/günlük şeridi, 3-2-1 ve hazırlık/duraklatma/sonuç kartları DOM'da kalır.
- Dokunuşları yerel taraf dağıtır (`MainActivity.dispatchTouchEvent`). Hareketin ilk dokunuşu JS'in verdiği geçiş dikdörtgenindeyse (kapat X) hareket WebView'e gider, değilse motora. Kart, duraklatma ve sonuç ekranlarında her dokunuş WebView'e gider.
- Yerleşimi JS yapar (canvas öğesinin dikdörtgeni, band, safe), yerel taraf yüzeyi oraya koyar.
- Skor: motor kaydı parça parça WebView'e akar (canlı izleme aynen çalışır). Sonuçta WebView kaydı paylaşılan sim ile yeniden oynatır (sunucunun doğrulama yolu). Fark çıkarsa hata loglanır ve tekrar skoru kullanılır.
- Motor paketi web paketiyle (ve OTA ile) gider. Derleme kimliği istemciyle uyuşmazsa ya da eklenti yoksa oyun WebView canvas yolundan açılır.

## Neden
- Oyun üstü öğeler canlı DOM (şerit 10 Hz güncellenir, i18n, erişilebilirlik). Yerelde yeniden çizmek Android ve iOS için iki kez yazmak demek.
- SurfaceView ayrı bir SurfaceFlinger katmanı, kendi Choreographer temposuyla çiziliyor. WebView yalnız DOM değişince yeniden boyar, oyunun hareketini etkilemez.
- Sunucu zaten tekrar ile doğruluyor. WebView'de de aynı tekrar, sonuç kartının özetlerini (summary, sticker) yerel tarafa yeni API eklemeden verir.

## Reddedilen alternatifler
- **Kapat düğmesi ve çipleri yerelde çizmek:** iki platformda tekrar yazılır, yarış şeridi gibi karmaşık DOM'un taşınması gerekir.
- **SurfaceView'i WebView'in üstüne koyup (setZOrderOnTop) arayüzü yerelde çizmek:** aynı neden, ayrıca kartların sahnesi bozulur.
- **Dokunuşları WebView'den JS ile motora iletmek:** her hareket için köprü trafiği ve gecikme olur.
- **Skoru doğrudan motordan almak:** QuickJS ile V8 arasında olası fark sunucuyla uyuşmazlık doğururdu. Telefonda 46/46 aynı çıktı, yine de doğrulama tek yolda.
