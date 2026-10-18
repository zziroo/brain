---
type: lesson
project: tussle
date: 2026-10-18
status: active
tags: [tussle, android, ota, capgo, cihaz-testi]
source: oturum 2026-10-18 "tussle: mini motor faz 2 (oyun ekranı → yerel motor)"
---

# Ders: aynı versionCode ile `adb install -r` eski indirilmiş OTA paketini tutar, yeni web kodu hiç yüklenmez

- Telefondaki `.dev` uygulaması daha önce OTA 0.20261018.1252'yi indirmişti. Yeni APK (versionCode yine 7) kurulunca açılışta `initOta` o paketi seçti. Yeni gömülü paket (yerel motor kodu) hiç çalışmadı ve oyunlar WebView yolunda kaldı.
- capgo `resetWhenUpdate: true` indirilmiş paketleri yalnız yerel sürüm değişince siler. Play kullanıcısında versionCode arttığı için sorun yok.
- **Ne yap:** cihaz denemesinden önce versionCode'u artır (ya da `CapacitorUpdater.current()` ile `builtin` olduğunu doğrula). WebView'de `bundle.id` kontrolü tek CDP satırı.
- Bağlantılı: [[2026-10-18-mini-motor-faz-devir-notu]].
