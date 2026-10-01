---
type: decision
project: diskort
date: 2026-10-01
status: active
tags: [diskort, ses, mikrofon, dpdfnet, agc]
source: Claude Code oturumu 2026-10-01 (sinanse boğuk ses), main d3ed74f, sürüm 0.9.5
---

# Karar: DPDFNet çalışırken tarayıcı otomatik kazancı kapalı, ses kapısına gecikmesiz sınırlayıcı

## Bağlam
sinanse'nin sesi bağırınca ara ara boğuk ve uzaktan geliyordu. Telemetriye göre AGC ve yankı engelleme açık, DPDFNet 40 dB'de, yük 0,3–0,5; yani CPU neden değildi. Kodda AGC, DPDFNet çalışırken de getUserMedia'ya gidiyordu ve zincirde sınırlayıcı yoktu.

## Karar
- Model (DPDFNet) çalışırken `autoGainControl` her zaman false. Standart'a düşünce kullanıcının ayarı geri gelir. Model çalışırken AGC ayarını değiştirmek mikrofonu yeniden kurmaz.
- `gate-worklet.js` içine tepe sınırlayıcı eklendi: tavan -3 dBFS, anında atak, 150 ms bırakma. VAD ve seviye ölçümü sınırlayıcıdan önce yapılır.
- Ayarlar'daki AGC açıklamasına kısa bir not eklendi.

## Neden
Windows'ta Chromium AGC'si, ses kırpılınca mikrofon seviyesini hızla düşürür ve yavaşça geri getirir. O arada ses kısık ve uzaktan gelir. Modelin kendi işlemesi varken AGC gereksiz.

## Reddedilen alternatifler
- DynamicsCompressorNode ile sınırlayıcı: Chromium'da yaklaşık 6 ms gecikme ekliyor ve otomatik ses yükseltmesi (makeup gain) yüzünden normal konuşmayı da değiştirirdi.
- AGC varsayılanını herkes için kapatmak: Standart modda hâlâ işe yarıyor.

## Sonuçlar / riskler
Asıl şikâyetin büyük kısmı ayrıca yayın sesindeki Sonar yankısından geliyordu ([[sonar-yayin-sesine-kendi-sesini-katar]]). Gerçek aramada doğrulanmadı.

## İlgili
- [[konusma-halkasi-duyulan-sesten]] · [[2026-10-01-sinanse-boguk-ses-ve-0-9-5]]
