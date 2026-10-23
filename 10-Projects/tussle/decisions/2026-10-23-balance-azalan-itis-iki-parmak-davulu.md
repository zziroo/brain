---
type: decision
project: tussle
date: 2026-10-23
status: active
tags: [tussle, karar, balance, denge, girdi]
source: oturum "tussle: oyun turu kalan işler" (2026-10-23)
---
# Karar: balance v7 — hızlı dokunuşa azalan itiş (iki parmak davulu işe yaramaz)

## Karar
Önceki dokunuştan `gap` tick sonra gelen dokunuşun itişi `push · min(1, gap / 8)`. 7,5/sn ve altı tam itiş, 15/sn yarım, aynı tick'te ikinci dokunuş sıfır. Dokunuş yine sayılır ve EV_TAP yayınlanır (parmak flaşı). Sürekli itiş tavanı ≈ push/8 ≈ 1,4× windCap; 1,5× sert sınırı kimse uzun tutamaz, 90 sn tavana yalnız push parametresi yükseltilince ulaşılır.

## Neden
Yusuf iki parmakla aynı tarafa 10-13/sn dokunarak 58 sn dayandı (453 dokunuş, aralıkların 68'i 0-1 tick); sim 4-6/sn varsayımıyla kuruluydu, oyun "kim hızlı tıkırdatır" yarışına dönüyordu. Yusuf "böyle bırakmak mı gerekir, emin değilim" dedi; öneriyi onayladı.

## Reddedilenler
- Sert bekleme süresi (cooldown): dokunuş yutulur, hissi kötü; azalan itiş sürekli.
- FULL_GAP 10: davulcu 20 sn'ye iner ama skilled PD (gap 7) 29 → 18 sn düşüyor, decent'a yaklaşıyor. 8'de PD botlar hemen hemen aynı.
- FULL_GAP 6: davulcu hâlâ 40-47 sn.

## Sayılar (400 seed p50, v6 → v7 FULL_GAP 8)
davulcu 12/sn 52 → 26 sn; davulcu 20/sn 90 → 31; casual/decent PD aynı (10 / 17); skilled PD 29 → 23; expert PD 90 → 34,5; perfect (her tick) 90 → 50.
