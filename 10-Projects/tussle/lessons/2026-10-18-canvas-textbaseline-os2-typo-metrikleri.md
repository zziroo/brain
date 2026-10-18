---
type: lesson
project: tussle
date: 2026-10-18
status: active
tags: [tussle, mini-motor, canvas, android, yazi-tipi]
source: oturum 2026-10-18 "tussle: mini motor Faz 1" (görsel karşılaştırma ajanı)
---

# Ders: canvas textBaseline top/middle/bottom fontun OS/2 typo metriklerini kullanır, Android'in satır metriklerini değil

## Ne oldu
Mini motorun Android ressamı `textBaseline` için `Paint` satır metriklerini (Nunito hhea: ascent 1.011, descent 0.353 em) kullanıyordu. Chrome `top`/`middle`/`bottom` için OS/2 `sTypoAscender`/`sTypoDescender` değerlerini (Nunito 0.741 / 0.259 em) kullanır. Sonuç: orta hizalı yazı ~0,09 em, üst hizalı ~0,27 em aşağıda; 46 oyunun neredeyse hepsinde fark. Otomatik görsel karşılaştırmada 52 durumdan 6'sı geçiyordu, bu düzeltmeyle 42'ye çıktı.

## Kural
- Başka bir canvas ressamı yazarken (Faz 4 iOS CoreGraphics dahil) baseline'ı TTF'nin OS/2 tablosundan oku (`Painter.kt` `emAscent()`), platform font metriklerinden değil.
- Ölçüm ve çizim aynı bayraklarla: Android'de `LINEAR_TEXT_FLAG` (ipuçsuz genişlik, Chrome gibi), yoksa ölçülen genişlikle dizilen satırlar kayar.
- Göz kararı yerine `npm run parity` ([[2026-10-18-mini-motor-faz-devir-notu]], PROTOCOL.md §7) ile ölç.
