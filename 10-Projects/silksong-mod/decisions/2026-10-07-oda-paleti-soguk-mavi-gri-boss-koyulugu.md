---
type: decision
project: silksong-mod
date: 2026-10-07
status: active
tags: [silksong, biyom, palet, sahne, olcum]
source: Windows oturumu 2026-10-07 akşam (tools/biome/rooms6.py, shot_stats.py, palette_grid.py; repo a0de511; D:\SilksongMod\work\dress\palette_stats.md)
---

# Karar: oda paleti A2: A'nın soğuk mavi-gri tonu, gerçek boss arenalarının ortanca koyuluğu (`new2d_a2`)

## Bağlam
Yusuf NEW2-m odasını fazla parlak buldu ("tam Silksong havası vermedi"). Oyun içinde ölçülünce sebep sayıyla görüldü: 12 gerçek oda ortalama parlaklık 0,027–0,069 ve ekranın %50–88'i neredeyse siyah; NEW2-m 0,113–0,125 ve yalnız %6–12 siyah, mavi alan %74–86.

## Karar
- Varsayılan oda `new2d_a2` (NEW2-c düzeni + yeni palet, `tools/biome/rooms6.py` varyant `a2`), mod ayarında `RoomLayout = new2d_a2`.
- Ton: A'nın soğuk mavi-gri ışığı ve buz mavisi cam kimliği; sıcaklık yalnız ocak ağzı ve potada (soğuk sönmüş ocak, tek yanan usta).
- Koyuluk: 8 boss arenasının ortancası (parlaklık 0,056, siyah %69, renk 0,034). A2 oyunda 0,046–0,059 parlaklık, %67–72 siyah.
- Oyunun karanlık seviyesi 0 (seviye 1 bu odada %85 siyah, fazla koyu).
- Işık dört odakta: vitray huzmesi, ocak ağzı, pota, büyük kristal.

## Neden
- Yusuf soğuk mavi-griye yattı, koyuluğu "diğer boss odalarından çıkarım" ve Claude'un uygun gördüğüne bıraktı.
- Ölçülebilir hedef: boss arenalarıyla aynı aralık, iterasyonu tahmine bırakmıyor.
- Soğuk oda, Scoria'nın korunu ve sıcak odakları öne çıkarır; tematik olarak da uyuyor.

## Reddedilen alternatifler
- **A:** ton doğru ama boss arenalarına göre açık (siyah %55–64, orta tonlar kalkık).
- **B / C (sıcak gri, daha soluk):** aralıkta ama biyomun buz mavisi kimliği kayboluyor.
- **NEW2-m'i olduğu gibi koyulaştırmak:** NEW2-c'nin siyah kütleleri ve ışık huzmeleri olmadan "hava" gelmiyordu.

## Sonuçlar / riskler
- En parlak noktalar (üst %5: 0,21–0,29) boss ortancasının (0,345) altında; gerçek arenaların çoğunda tek güçlü ışık kaynağı var. Arena odasında örsün üstüne tek belirgin huzme önerildi.
- Parlayan alan hâlâ gerçek odaların ~1,5 katı; zemin yeni çizilmedi (üst kenar düz çizgi).
- Yusuf A2'yi oyunda kendisi görmedi (unverified).

## İlgili
- [[2026-10-07-biyom-cam-ocaklari-buz-mavisi]]
- [[2026-10-07-oyun-vinyeti-karanlik-seviyesi]]
- [[notes-katman-plani|katman planı]]
