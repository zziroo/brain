---
type: lesson
project: tussle
date: 2026-10-20
status: active
tags: [tussle, android, olcum, adb, performans, gecis]
source: "oturum 2026-10-20 öğleden sonra (mobil-playus: ayarlar girişi, açılış, splash, Android Apple girişi)"
---

# Cihaz hissi ("ilk geçiş animasyonsuz", "açılışta takılma") masaüstünde tekrarlanmaz: telefonda kaydet ve ölç

- "İlk oda dokunuşu animasyonsuz" ve açılış uçuşunda takılma masaüstünde tekrarlanmadı; tahminle uğraşmak yerine telefonda ölçüm kök nedeni buldu.
- Yöntem: `adb shell screenrecord` (120 Hz) + ffmpeg scene skoru / pts aralıkları (kare boşlukları), debug WebView'e CDP bağlantısı ve atrace (GPU/raster süreleri).
- Xiaomi'de dokunuş enjeksiyonu yok: soğuk açılış `am start` ile ölçülür, dokunuşu Yusuf yapar ([[2026-10-18-paylasilan-telefonda-am-start-baska-oturumun-testini-boler]]).
- Bulunanlar: [[2026-10-20-ilk-oda-dokunusu-ana-sayfa-ozetinden-on-kart]], [[2026-10-20-webview-raster-ucus-animasyonunda-gpu-donmasi]].
- Kullanıcının "hissi" de tek başına kanıt değil: [[2026-10-20-testte-yanlis-uygulama-acilabilir-debug-surumu-kaldir]].
