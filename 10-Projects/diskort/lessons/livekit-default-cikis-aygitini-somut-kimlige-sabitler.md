---
type: lesson
project: diskort
date: 2026-10-12
status: active
tags: [diskort, masaustu, ses, livekit]
source: Claude Code oturumu 2026-10-12 ("Failed to set sink id on remote audio track" incelemesi)
---

# Ders: livekit-client `audioOutput.deviceId: 'default'` verilince o anki aygıta sabitler; aygıt gidince her attach'te setSinkId hatası

`webAudioMix` açıkken livekit `'default'` kimliğini `normalizeDeviceId` ile somut aygıt kimliğine çevirip saklıyor; kulaklık/Bluetooth çıkınca her uzak iz bağlanışında `element.setSinkId` reddediliyor ve "Failed to set sink id on remote audio track" kaydı düşüyor (ses Web Audio'dan çıktığı için duyulan ses etkilenmiyor). Ayrıca DOMException `JSON.stringify` ile `{}` oluyordu, hata türü görünmüyordu.

**Çözüm (c9d8102):** `'default'`/boş → `''` geç (livekit sabitlemez); kayıtlı kimlik `enumerateDevices` listesinde yoksa `''`; izin yokken liste boş `deviceId` dönebilir, o zaman kayıtlı kimliği olduğu gibi kullan; `devicechange` ile 300 ms debounce'lu geçiş; sfx tarafında sink zincirini sıraya diz (hızlı iki ses yarışı); `describe()` Error'ları `name: message` yazsın.

Bağlantı: [[2026-10-12-rol-etiketi-dpdfnet-agc-oom]].
