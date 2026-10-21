---
type: lesson
project: tussle
date: 2026-10-21
tags: [tussle, arena, gecikme, ders]
source: Claude Code oturumu "tussle: arena devam turu" (2026-10-21)
---

# Sunucu otoriteli gerçek zamanlı arena oyunu telefonda "hantal" hissettirir; çözüm tür değiştirmek

**Olay:** Sumo/Trails/Paint/Crown telefonda iki kişiyle denendi, Yusuf "kontroller hantal" dedi. Telemetri: kare arası 8 ms (takılma yok), render gecikmesi 100–200 ms (bir telefonda Sumo'da ort. 199 ms, en çok 257), üstüne ağ gidiş-dönüşü ve oyunun kendi kurulumu (Sumo 270 ms, ızgara adımı 200 ms) → dokunuş→tepki 300–500 ms. Trails maçları 1–10 sn'de bitti.

**Ders:** Sunucu simüle ediyorsa ve istemci yalnız niyet gönderiyorsa, sürekli hareketli oyunlarda bu gecikme hep hissedilir; istemci tahmini büyük iş ve "geri sarma" yaratır. Telefonda iyi hissettiren arena kalıpları: nişan al-bırak (nişan yerel, tek hamle), sıra tabanlı masa oyunu, aynı tahtada kendi hızında yarış. "İlk dokunan alır" tipi ortak kapışma da 100 ms'lik ağ farkıyla belirlenir, yarış biçimine çevrilir.

**Nasıl uygulanır:** Yeni arena oyunu fikrinde önce "dokunuşun karşılığı yerelde mi, sunucuda mı?" diye sor; sunucudaysa ya ayrık hamleye çevir ya da partiye alma. Ayrıntı [[2026-10-21-arena-parti-2-gecikmesiz-oyunlar-ve-gorsel-sema]].
