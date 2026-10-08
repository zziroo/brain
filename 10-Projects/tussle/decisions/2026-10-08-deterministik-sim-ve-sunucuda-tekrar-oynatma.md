---
type: decision
project: tussle
date: 2026-10-08
status: active
tags: [tussle, determinizm, guvenlik, oyun-sozlesmesi]
source: oturum 2026-10-08 (M0 inşa, inceleme turları)
---

# Karar: oyunlar deterministik sim; istemci skor değil girdi günlüğü yollar, sunucu tekrar oynatır

## Karar
Her oyun `sim.ts` (60 Hz sabit adım, tohum + girdi → aynı sonuç, DOM yok) ve `view.ts` olarak ayrılır. İstemci dokunuş günlüğünü (tick damgalı, 0–1 normalize, 3 ondalık) gönderir; sunucu aynı kodu aynı tohumla oynatıp skoru hesaplar; `done && ticks === tickCount` şart. Sim'de `Math.sin/cos/tan/atan2/exp/pow/log/hypot/random`, `**`, `Date` yasak (`shared/dmath` tabloları, `shared/rng` sfc32); lint testi zorlar. Skorlu oyunda arka plan duraklatmaz: dönünce sim gizli süreyi işler. Oyun mantığı değişince `meta.version` artar; gün satırı sürüm taşır.

## Neden
- Devtools'tan skor yazmak işe yaramaz; arkadaş grubunda bile adalet sohbeti bitmez.
- Bedava yan ürün: her skorun tekrarı izlenebilir (sosyal değer).
- V8 ile JavaScriptCore transandantal fonksiyonlarda farklı yuvarlar; iPhone (JSC) skoru ile Node (V8) tekrarı eşit çıkmalı. iOS Simulator'da doğrulandı.
- Duraklatma = bedava düşünme süresi (Matematik'te soruyu görüp arka plana atmak); sunucu tespit edemez.

## Reddedilen alternatifler
- İstemciden skor almak + imza: istemci her zaman değiştirilebilir.
- Sunucuda canlı sim (KAPIŞ gibi): günlük asenkron oyun için gereksiz; canlı kapışmada yalnız seçili oyunlar için (M2).
- Gizli sekmede duraklatıp ekranı karartmak: şüpheci ajan yetersiz buldu (snapshot yarışı, asıl sorun duraklatmanın kendisi).
