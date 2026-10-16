---
type: lesson
project: tussle
date: 2026-10-17
status: active
tags: [tussle, android, titresim, haptics, ders]
source: oturum 2026-10-16/17 (mobil-playus) Yusuf "hiç titreşim çalışmadı"; adb dumpsys vibrator_manager
---

# Ders: Android'de sistem "Dokunsal geri bildirim" kapalıysa oyun titreşimi sessizce yok sayılır

## Ne oldu
Yusuf testlerin hiçbirinde titreşim hissetmedi. Kodda titreşim 48 oyunda 139 yerde çağrılıyor (`host.haptic`), ayrıca sohbet tepkisi, parti ara sahnesi ve Ayarlar'daki Titreşim anahtarında (açınca kısa tık). İzin (`VIBRATE`) birleşik manifestte var, `@capacitor/haptics` bağlı, ayar varsayılanı açık.

## Sebep
- `adb shell dumpsys vibrator_manager`: Tussle'ın (Play ve `.dev`) ve Chrome'un bütün titreşimleri `ignored_for_settings`, `usage: TOUCH`.
- Telefonun titreşim şiddetleri: `TOUCH = OFF`, `UNKNOWN = OFF`, `IME = OFF`; zil, bildirim ve medya titreşimi açık. Yani Yusuf'un Xiaomi'sinde sistemin dokunsal geri bildirimi kapalı.
- `@capacitor/haptics` (`VibrationEffect`, öznitelik yok) ve Chrome `navigator.vibrate` titreşimi `TOUCH` olarak sınıflanıyor ve bu ayara takılıyor.

## Uygula
- "Titreşim çalışmıyor" bildirimi gelirse önce `dumpsys vibrator_manager` ile son titreşimlerin durumuna ve `VibrationIntensities` satırına bak. Okuması tek seferlik ve zararsız.
- Test için telefonda "Dokunsal geri bildirim"i aç, Tussle'da Ayarlar → Titreşim anahtarını kapat/aç.
- Hangi türle gönderileceği: [[2026-10-17-oyun-titresimi-media-arayuz-touch]].
