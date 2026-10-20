---
type: decision
project: tussle
date: 2026-10-20
status: active
tags: [tussle, android, splash, boot, native]
source: "oturum 2026-10-20 öğleden sonra (mobil-playus: ayarlar girişi, açılış, splash, Android Apple girişi)"
---

# Karar: Android splash WebView'in ilk boyamasına kadar tutulur, ikon VectorDrawable, web `#boot` splash'le birebir aynı boy

## Bağlam
Android 12+ splash ikonu ~184,6 px, web `#boot` ikonu 120 px idi: splash'ten web'e geçişte büyük → küçük sıçrama. Splash ikonu da bulanıktı.

## Karar
- Web: `data-boot="android"` ile `#boot` ikonu splash'le birebir boyut ve maske; daire maskesi ikon dururken 180 ms'de kalkar.
- Native (Android 1.10, versionCode 14): `MainActivity` splash'i WebView ilk boyamasına kadar tutar (`postVisualStateCallback`, 1500 ms tavan; telefonda 228–330 ms "painted").
- Splash ikonu VectorDrawable (keskinlik +%36; kalan yumuşaklık sistemden).

## Neden
- Splash → web geçişi kesintisiz görünmeli (aynı yer, aynı boy).

## Reddedilen alternatifler
- Web ikonunu kendi boyunda bırakmak: sıçrama görünüyordu.

## Sonuçlar / riskler
- 1.10'un Play'den gelen kurulumu telefonda henüz görülmedi (doğrulanmadı).
- iOS'a native değişiklik yok, OTA yeterli.

## İlgili
- [[2026-10-20-acilis-animasyonu-logoya-ucus]] · [[2026-10-20-tussle-ayarlar-acilis-splash-android-apple]]
