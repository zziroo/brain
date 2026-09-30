---
type: decision
project: diskort
date: 2026-09-27
status: active
tags: [ses, gurultu-engelleme, dpdfnet]
source: C--dev-diskort 126a55f0 (2026-09-27), C--dev-diskort 4b7b1382 (2026-09-27/28)
---

# Karar: Masaüstü ve Android'de varsayılan gürültü engelleme DPDFNet; yetmezse DeepFilterNet'e, o da yetmezse Standart'a düşer.

## Bağlam
Ses Krisp kadar iyi değildi. LiveKit'in Krisp filtresi yalnızca LiveKit Cloud'da çalışıyor. RNNoise eski ve düşük kalite; DeepFilterNet 3 robotik ve bazı bilgisayarlarda çatırtılı bulundu.

## Karar
Önce RNNoise yerine DeepFilterNet 3'e geçildi (karşılaştırma testi yapılmadan, gerçek kullanımla). Çatırtı/robotluk üzerine DPDFNet-2 (48 kHz) eklendi; kullanıcı "neredeyse Krisp kalitesinde, gecikme yok" dedi ve varsayılan yapıldı. Android'de onnxruntime-android + int8 model; ortalama >6 ms veya karelerin >%5'i 10 ms üstündeyse geri düşüş. DFN gücü 12/24/40/100 dB.

## Neden
- Kullanıcı kulak testiyle onayladı; gecikme hissedilmiyor.
- Açık kaynak, lisansı dağıtıma uygun model seçildi.

## Reddedilen alternatifler
- Krisp: yalnızca LiveKit Cloud'da, ~180-300 USD/ay; reddedildi.
- RNNoise'a dönüş: kalite belirgin kötü.
- Yalnızca DFN3: çatırtı ve robotluk.

## Sonuçlar / riskler
Ortalama yük eşiği tek tük yavaş kareyi yakalamaz (bkz. [[dfn-catirtisi-ses-is-parcacigi-siniri]]). Telefonda ayrıca Standart mikrofon işlemeye düşme mümkün.

## İlgili
- [[2026-09-27-ota-ses-filtresi-roller-dm]]
- [[2026-09-27-coklu-sunucu-dpdfnet-yayin-kalitesi-ses-tasarimi]]
