---
type: lesson
project: tussle
date: 2026-10-18
status: active
tags: [tussle, android, adb, orkestra, cihaz]
source: oturum 2026-10-18 "tussle: mini motor Faz 1"
---

# Ders: paylaşılan telefonda `am start` başka oturumun elle testini böler; cihaz serbest denmeden yalnız salt-okunur adb

## Ne oldu
Faz 1 ve Faz 3 oturumları aynı telefonu (Xiaomi, adb) paylaşıyordu. Faz 1 bir otomatik oynatma denemesi için mini uygulamayı `am start` ile öne getirdi; Yusuf o sırada Faz 3'ün `.dev` sürümünü elle deniyordu ve test bölündü.

## Kural
- Paylaşılan cihazda uygulamayı öne getiren her şey (`am start`, otomatik açan `install`, `input`) yalnız cihaz "serbest" denince. Logcat, dosya çekme, `force-stop` (kendi paketi) serbest.
- Görsel/otomatik işler emülatöre (`Medium_Phone_API_37.0`, arm64) gider; betikler cihazı her zaman `-s <seri>` ile açıkça seçer, "tek bağlı cihaz"a düşmez (`npm run parity -- --serial`).
- Bir oturum telefonu kullanırken diğerine haber verir; çalışan ajanlara da iletilir.
