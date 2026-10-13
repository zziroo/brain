---
type: session
project: tussle
date: 2026-10-13
status: done
tags: [tussle, oturum, capacitor, android, testflight, google-play]
source: oturum 2026-10-13 üçüncü, devamı (mobil-playus)
---

# Oturum 2026-10-13 (üçüncü, devamı): TestFlight yüklemesi, Play Console hesabı, Android kabuğu ve telefon turu

- **iOS:** Xcode'da imzalama → Archive → App Store Connect 1.0 (1) yüklendi, işlendi, "Ready to Submit". Ad "Tussle: Daily Mini Games". External Testing görünmüyor, Apple desteğe talep açıldı. [[2026-10-13-magaza-hesaplari-apple-bireysel-play-ziroo]]
- **Play Console:** bireysel hesap açıldı, geliştirici adı Ziroo; kimlik doğrulaması bekliyor.
- **Android kabuğu** (`c1344fd`, düzeltmeler `2740e7b`, GitHub aynı): [[2026-10-13-android-kabuk-ve-durum-cubugu-seridi]]. İnceleme: 1 orta (env sızıntısı → `TUSSLE_ALLOW_MIXED`), düşükler (allowBackup) kapatıldı.
- **Telefon turu (Xiaomi 17 Pro, Android 16, adb ile):** kuruldu, canlı sunucuyla misafir → oda "testoda" → Chop 150 kesim, Stack antrenman 27 kat. Akıcı (p90 8 ms), JS/ağ hatası yok, Gece'de durum çubuğu beyaz, puanlı denemede geri tuşu reddediyor, ana sayfada küçültüyor. Düzeltildi: üst pay değişkeni, kaydırma çubuğu, durum çubuğu şeridi. Kalan: dokunuş başına boş konsol satırı (zararsız).
- Canlı sunucu `7c97dd6`'da kaldı; `2740e7b` yalnız uygulama içi CSS/TS, web'i etkilemez (yayınlanmadı).
- Doğrulanmayanlar: iOS gerçek cihaz (Yusuf'ta yok), TestFlight dış dağıtım, Android 7 ikon/splash, açılış ekranı beyaz an.

Dersler: [[2026-10-13-capacitor-ios-dersleri]] (Android eki).
