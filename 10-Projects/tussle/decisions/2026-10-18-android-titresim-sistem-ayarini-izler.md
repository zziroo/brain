---
type: decision
project: tussle
date: 2026-10-18
status: active
tags: [tussle, android, titresim, haptics, capacitor]
source: oturum 2026-10-18 Android Capacitor'a dönüş (Faz 3), Yusuf telefonda iki tur denedi
---

# Karar: Android'de titreşim telefonun dokunsal geri bildirim ayarını izler (performHapticFeedback)

## Karar
Capacitor Android'de bütün titreşimler `View.performHapticFeedback(HapticFeedbackConstants.X)` ile gider (`VibePlugin.java` `feedback({strength})`, eşleme `native.ts` `hapticStrength`). Sistemin dokunsal geri bildirim anahtarı ve şiddeti geçerli; sistemde kapalıysa hiç titremez. Uygulamadaki Titreşim anahtarı ek kapatma. Web/TWA `navigator.vibrate`, iOS `@capacitor/haptics` aynen.

| Web `haptic(...)` | Sabit | Yedek |
|---|---|---|
| tek değer < 15 ms | CLOCK_TICK | — |
| 15–39 ms | KEYBOARD_TAP | — |
| ≥ 40 ms | LONG_PRESS | — |
| çok öğeli desen | CONFIRM (API 30+) | VIRTUAL_KEY |

Mini motor (Faz 1/2) aynı tabloyu kullanır: [[2026-10-18-mini-motor-faz-devir-notu]].

## Neden
- İlk sürümde oyun titreşimi `USAGE_MEDIA` + sabit süreyle gitti ([[2026-10-17-oyun-titresimi-media-arayuz-touch]]); dokunsal ayarı kapalı telefonda da çalıştı ama Yusuf "yoğun" buldu, yarı güç (genlik 140) de yetmedi.
- Yusuf: "telefonun kendi ayarını izlesin". Kullanıcının seçtiği şiddet ve aç/kapa saygı görür; yerel uygulama hissi.

## Reddedilen alternatifler
- MEDIA + sabit süre (önceki karar): ayardan bağımsız ama sert, kullanıcı şiddeti seçemiyor.
- MEDIA + düşük genlik: hâlâ güçlü bulundu; sistem şiddetini yine izlemiyor.

## Sonuç
Dokunsal geri bildirimi kapalı olan (Yusuf'un Xiaomi'si dahil) kullanıcıda oyunda titreşim yok; bilinçli kabul. CLOCK_TICK bazı telefonlarda çok zayıf; "hafif dokunuş hissedilmiyor" denirse eşlemeye bakılır.
