---
type: session
project: diskort
date: 2026-10-15
status: active
tags: [sunucu, geri-bildirim, ui]
source: diskort oturumu 2026-10-15 akşam (Mac): canlı doğrulama, bakım planı, geri bildirim #34/#35/#36
---

# Oturum 2026-10-15: canlı doğrulama, sunucu bakım planı, geri bildirim #35

## Yapılanlar
- **Canlı doğrulama:** sunucu `99f3652` (0.11.0 kodu; main'den farkı yalnız sürüm damgası ve Mac yedek betiği), şema 26, bütünlük ok; `latest*.yml` 0.11.0; Expo OTA android/ios doğru runtime ile 200, yanlış runtime ile 204 (beklenen). Gözcünün dört bölümlü metinle tek çalışması 12:00'deki elle tur; ilk gece çalışması 16 Ekim 00:11'de.
- **Bakım planı:** [[2026-10-15-sunucu-bakim-penceresi-07-30]]; 2026-10-16 ~07:30, Yusuf "başla" deyince. Hiçbir şey kurulmadı.
- **Geri bildirim:** #35 yapıldı ve main'e push'landı (`efd51f0`, [[2026-10-15-kanal-suresi-girmeden-ve-yayinci-uste]]); #34 ertelendi ([[2026-10-15-kisisel-giris-sesi-ertelendi]]); #36 (Android arka planda uygulama sesleri gelmiyor, Xiaomi/Android 16) "incelendi": kod arka plan çalmayı açıyor (expo-audio `shouldPlayInBackground`), aynı gönderide LiveKit sinyal kopmaları var; en güçlü aday Xiaomi pil kısıtlaması, Yusuf önce onu deneyecek.

## Gözlemler (doğrulanmadı)
- Yusuf'un Xiaomi'sinde DPDFNet 7,6–8,3 ms/kare ile 7,5 ms eşiğini aşıp devre dışı kalıyor (0.11.0 APK). 0.11.0 doğrulamasına not.
- Gözcünün 15 Ekim raporu: 14 Ekim gecesi bir yayın penceresinde sunucu CPU %65 (ilk kez); tekrar ederse izlenmeli.

## Sonraki
- 16 Ekim 07:30 bakım; ardından overview madde 3 kapanır.
- #36 pil testi sonucu; gelmezse sonraki APK'ya arka plan ses telemetrisi.
