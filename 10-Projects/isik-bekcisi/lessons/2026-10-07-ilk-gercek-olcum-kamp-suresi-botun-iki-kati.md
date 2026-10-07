---
type: lesson
project: isik-bekcisi
date: 2026-10-07
status: active
tags: [isik-bekcisi, olcum, denge, uzunluk, bot]
source: oturum 1249d80e (incremantal-game, 2026-10-07 akşam); Yusuf'un günlükteki Kayıtlar sayfası (canlı b14f502)
---

# Ders: ilk gerçek bitirişte sefer sayısı bota yakın çıktı, ama kampta geçen süre botun varsaydığının iki katı

## Ölçüm (Yusuf, ilk şafak, canlı `b14f502`)
| | Yusuf | Özensiz bot | İyi bot |
|---|---|---|---|
| Sefer | 49 | ~43,5 | ~38 |
| Yolda geçen süre | 32:24 (sefer başına ~40 sn) | | |
| Toplam süre | 1:16:23 | ~48,6 dk | ~43 dk |

- Yusuf'un sefer sayısı özensiz botun 1,13 katı.
- Yol dışında (kamp, gökyüzü, konuşmalar, geçişler) sefer başına ~54 sn geçmiş. Botun saati bunu ~30 sn sayıyordu.
- Yakalananlar arasında Işık Kemirgeni yalnız 2, İri Karacık 7. Bazı elitler gerçek oyuncunun karşısına pek çıkmıyor olabilir.

## Ders
- Bot sefer sayısında iyi bir tahminci. Saati ise değil: insan yolda bot kadar, ama kampta iki kat zaman geçiriyor.
- Bundan bir formül çıkarıldı (sim-node.mjs, özensiz botla): `insan_toplam ≈ 1,13 × sefer × 54 sn + 1,21 × yol`. Tek bir bitirişe göre ayarlandı; her yeni bitirişle yeniden ayarlanmalı.
- Uzunluk hedefine kamp süresiyle gidilmez. Toplamın ~%58'i kamptaydı; "sık sık kampa dönüyorum" hissi buradan geliyor. Eksik olan yoldaki süreydi.

## İlgili
- [[2026-10-05-devir-oyun-uzunlugu]]
- [[2026-10-07-uzun-seferler-yol-fenerleri-ruh-yenilenmesi]]
