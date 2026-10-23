---
type: decision
project: tussle
date: 2026-10-23
status: active
tags: [tussle, karar, keep-up, denge, isabet]
source: oturum "tussle: oyun turu kalan işler" (2026-10-23)
---
# Karar: keep-up v4 — isabet kapsülü, zorluk top sayısından, "tam orta" yok

## Karar
- Dokunuş, topun önceki → şimdiki → 5 tick sonraki öngörülen konumunu birleştiren kapsüle (r + 0.06) düşüyorsa isabet. Öngörü ucu zeminde kırpılı.
- Yerçekimi vuruşla neredeyse büyümez (G_GROW 0.6, G_HALF 60; 40 vuruşta ×1.25). Zorluk yeni toplardan gelir (10, 20, 30. vuruşta; en çok 4).
- "Tam orta" (halka, Keskin! çıkartması, sonuç satırı, EV_CENTER) tamamen kalktı; fizik aynı (kenardan vurunca yana kaçar).
- Çıkartma eşikleri 80 / 140 vuruş (decent / good bot medyanı).

## Neden
- Yusuf'un 5 koşusundaki 4 ıskanın 3'ü topun 0,16-0,20 alan genişliği altındaydı, top hızlı düşerken: dokunuş/ekran gecikmesi + öngörü. Her ıska koşuyu bitiriyordu.
- Yusuf: "daha uzun, daha çok topla; hızlanma topun hızından bağımlı olmamalı".
- Tam orta skora etki etmiyordu, "neye göre orta" belirsizdi; [[2026-10-23-oyunda-tek-olcu-skor-kademe-ve-zorluk-etiketi-yok]] ile de çelişiyordu.

## Reddedilenler
- Yalnız HIT_SLOP büyütmek: daire her yöne büyür, ıska yönlü (aşağı).
- LEAD 4: iyi bot tavana daha çok vurdu (%33 vs %21), botlar LEAD'e duyarsız; telefon ölçümüne göre 5.
- Tam ortaya skor ödülü: birim "vuruş", bonus "kaç kez sektirdin"i bulandırır.

## Sayılar (120 seed, v3 → v4)
casual 3.5 → 20.6 vuruş; decent 10.5 → 77.6 (45 sn); good 42 → 124 (61 sn, tavan %21); 3 vuruş/sn 36 → 71; skilled 119 → tavan (90 sn) her seed.
