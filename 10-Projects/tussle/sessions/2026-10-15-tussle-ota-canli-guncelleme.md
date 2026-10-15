---
type: session
project: tussle
date: 2026-10-15
status: done
tags: [tussle, oturum, ota, capacitor, testflight]
source: oturum 2026-10-13/15 devamı (mobil-playus: OTA)
---

# Oturum 2026-10-15: OTA canlı güncelleme katmanı, yeni yapılar

- External Testing çözüldü (iç grup önce), yapı 1 "Waiting for Review".
- OTA katmanı [[2026-10-15-ota-web-paketi-self-hosted-capgo]]: `a53cce5` (inceleme: sunucu temiz; 2 orta istemci/tasarım + düşükler kapatıldı), yayın `a53cce5`, yedek `pre-a53cce5.db`, ilk paket 0.20261015.831. Emülatörde tam döngü (indirme, geçiş, bozuk paket geri alma, sağlama hatası, çevrimdışı, eski sürüme dönüş, minNative) doğrulandı; iOS yalnız derleme.
- Android APK (OTA'lı, 9 MB) adb ile Yusuf'un telefonuna kuruldu; log: builtin 0.20261015.831, güncel. iOS yapı 2 (`dcc001e`) Xcode'dan yüklendi, işlenmesi bekleniyor.
- Doğrulanmayanlar: iOS'ta OTA döngüsü (gerçek cihaz/TestFlight), `deploy/ota.sh` yeni kontrol yolları ilk yayında çalıştı ama "zip zaten var" dalı denenmedi, gerçek telefonda OTA indirme (henüz yeni paket yok).
- Sonraki: ilk gerçek web değişikliğinde `node scripts/ota-bundle.mjs && bash deploy/ota.sh`; Play hazırlığı (AAB, gizlilik sayfası, görseller) yeni sohbette.
