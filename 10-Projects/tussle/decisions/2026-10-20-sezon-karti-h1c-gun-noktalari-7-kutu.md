---
type: decision
project: tussle
date: 2026-10-20
status: active
tags: [tussle, ui, oda, sezon]
source: oturum "tussle: geçiş ve düzenleme geri bildirimi" (2026-10-19/20)
---

# Karar: sezon kartı H1c — solda sıran/puanın, sağda lider, gün noktaları, 7 kutu

## Bağlam
14 kutulu bant küçük çiplere dönüşüyordu (#12, #32 sığmıyordu); pencere zaten kayıyordu, sezonun neresinde olunduğu belli değildi. Yusuf sıranın, puanın ve liderin görünmesini istedi.

## Karar
- Üst satır: "#N · P puan" | taçlı lider etiketi ("Lider sensin"); puan yoksa "Henüz sezon puanın yok".
- İkinci satır: "Gün x/y" + sezonun her günü için nokta (oynanan dolu, kaçan halka, gelecek soluk, bugün dolu siyah). Kutulardaki 7 gün koyu, diğerleri soluk (pencere yalnız kontrastla).
- 7 kutu "#N": 4 geçmiş + bugün + 2 ileri, sezon uçlarında yaslanır. Kart ~93 px (eskisi 101).

## Neden
Tek bakışta sıra + lider + sezondaki konum; ek kaydırma yok (akıcılık), kutular okunur boyda.

## Reddedilen alternatifler
- 14 kutu: hücreler ~20 px, iki basamaklı sıra küçülüyordu.
- Kayan şerit (C): kart düğmesiyle dokunma/kaydırma çakışması, dikey kaydırmayla karışma, zayıf WebView'de maske maliyeti.
- Mini harita çubuğu (B/E/H): Yusuf kaydırıcıya benzettiği için beğenmedi; H1'deki parlayan pencere zemini ve haleli mavi bugün noktası da reddedildi.
- D/E sade kart (puan ve lider yok): Yusuf sıra ve liderin görünmesini istedi.
- Halka (I), hafta sayfaları (H2: haftanın ilk günü geçmiş kayboluyor), kart kenarı ilerlemesi (H4: silik).

## Sonuçlar / riskler
Eski günlerin sırası banttan çıkar; [[2026-10-20-sezon-gecmisi-ayri-ekran]] karşılar. 30 günden uzun eski sezonda noktalar 30 günlük aralıkla çizilir.

## İlgili
- [[2026-10-20-sezon-uzunlugu-7-30-gun]]
- [[2026-10-11-oda-ekrani-sezon-bandi-ve-canli-ilk-3]]
