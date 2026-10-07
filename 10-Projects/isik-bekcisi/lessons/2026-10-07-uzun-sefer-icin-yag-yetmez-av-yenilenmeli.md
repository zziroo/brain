---
type: lesson
project: isik-bekcisi
date: 2026-10-07
status: active
tags: [isik-bekcisi, denge, uzunluk, tasarim, bot]
source: oturum 1249d80e (incremantal-game, 2026-10-07 akşam); uzunluk tasarım ajanı ve denge ajanlarının ölçümleri
---

# Ders: seferi uzatmak için yağ vermek yetmez; ruhlar seferin başında tükeniyorsa uzun sefer boş yürüyüştür

## Ne oldu
- Bot ölçümü: geç bölgelerde yakalamaların çoğu seferin ilk çeyreğinde. Bölgenin ruhları sefer başına bir kez doğuyordu ve ~10 sn'de bitiyordu.

| Bölge | Seferin dört çeyreğinde yakalama payı (%) |
|---|---|
| Mağara | 70 / 14 / 9 / 7 |
| Harabeler | 76 / 12 / 8 / 5 |

- Yalnız yağ ve maliyetle seferi uzatmak (deneme B) sefer süresini artırdı, ama geç bir seferin kazancı yalnız %18 arttı. Fazla süre fener başında beklemeye ve yürümeye gitti.
- Sabit hızda ruh yenilenmesi de çözmedi: yenilenme her çeyreğe eşit dağıldı, Harabeler'in boşluğunu doldurmadı, oyunu da kısalttı.
- Çözen: yenilenmenin bölgenin ne kadar boşaldığına bağlı olması (`thinned()`), 20 sn'den sonra devreye girip 50 sn'de tam hıza çıkması. Sonuç 50 / 16 / 17 / 17. Yenilenen ruhlar avın %29–46'sı; bölgenin kendi ruhları hâlâ ana gelir.
- Yan etki: daha çok yakalama, Çiy Damlası ile yağı doldurdu. Seferler istenenden uzadı, Yol Fenerleri'nin yağı da önemsizleşti.

## Ders
- Sefer uzunluğunu "ne kadar yağ" değil, "seferin ikinci yarısında yapılacak ne var" belirler.
- Yenilenme sabit oranla değil, eksilen stoğa göre ayarlanmalı.
- Bir gelir kaynağı eklenince, ona bağlı geri beslemeleri (burada yakalama başına yağ, Çiy Damlası) hemen ölç.

## İlgili
- [[2026-10-07-uzun-seferler-yol-fenerleri-ruh-yenilenmesi]]
- [[2026-10-06-angarya-sanilan-adim-gizli-gelir-olabilir]]
- [[2026-10-05-yakalama-basina-odul-sinerjiyi-carpana-cevirir]]
