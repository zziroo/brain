---
type: lesson
project: tussle
date: 2026-10-19
status: active
tags: [tussle, android, webview, erisilebilirlik, css]
source: oturum "tussle: geri bildirim turu" (2026-10-19 gece), commit `2e3b249`
---

# Ders: Android WebView textZoom sistem yazı boyutuna uyar ve tüm CSS birimlerini ölçekler

- Belirti: arkadaşın telefonunda sistem yazısı büyükken açılış sanat etiketleri ve bilet başlığı taşıyor/kırpılıyordu. iOS etkilenmedi.
- Sebep: Android WebView `textZoom` değeri sistemin yazı ölçeğine ayarlıdır ve yalnız yazıyı değil px, rem gibi CSS birimlerini de büyütür; piksel bazlı yerleşimler bozulur.
- Çözüm: native tarafta `MainActivity` içinde `WebView.getSettings().setTextZoom(100)` (mağaza derlemesi); web tarafında zoom'u yoklayıp açılış sanatı etiket ve başlıklarını `--tzi` ile geri ölçekle, bilet başlığı kırpılmak yerine sarılır.
- Sınır: native düzeltme mağaza derlemesi ister (Android vc 12); OTA yalnız web kısmını getirir. Kullanıcının büyük yazı tercihini yok saymak erişilebilirlik ödünüdür; okunurluk için etiketler büyük tutulur.

İlgili: [[2026-10-19-tussle-geri-bildirim-turu-antrenman-cubuk-kart]], [[2026-10-16-android-webview-parmak-kalkinca-takilma]].
