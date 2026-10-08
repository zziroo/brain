---
type: decision
project: isik-bekcisi
date: 2026-10-08
status: active
tags: [isik-bekcisi, lazer, mercek, isin, denge]
source: oturum a15a1fc5 (incremantal-game, 2026-10-08); Yusuf'un oynama geri bildirimi; canlı b2bedf1
---

# Karar: geç oyunda lazer incelmez; Işın ve Yıldız Mızrağı onu prizmaları delip geçen kalın, parlak bir banda çevirir

## Bağlam
Yusuf: "lazer çok inceldikçe daha zor isabet ediyor gibi geldi." Mercek hattı (Mercek → Hüzme → Işın → Yıldız Mızrağı) ışını meşaleden spota, sonra kıl inceliğinde bir lazere daraltıyordu ([[2026-10-02-lazere-donusen-isin-yag-bedeli-ve-lazer-dusmanlari]]).

## Karar (canlıda, `b2bedf1`)
- **Işın kalınlaşır, incelmez.** Işın'ın her kademesi ışının vurduğu genişliği artırır; son kademede 30 birim olur, yani orta oyundaki spotun ~300 birim ötedeki genişliği. Harabeler'de 1440×900 ekranda hedefin iki yanında ~35 piksel pay kalır.
- **Delme, `beamPierce`.** Işın zaten yolundaki her düşmanın içinden geçiyordu; onu durduran tek şey prizmaydı.
  - Artık prizmayı hem böler hem arkasına devam eder: Işın I'de gücün %24'ü, Işın V'te %40'ı, tam Mızrak'la hepsi.
  - Kemirgenin yediği prizma ve Kalp ışını hâlâ durdurur.
- **Zayıf ışık.** Delindikçe gücü `BEAM.hold`'un (%20) altına düşen ışın "zayıf ışık" sayılır: hale gibi tutar ama bitirmez. Tam ışına özgü etkileri (ürkek ruhu dondurmak, pervaneyi yavaşlatmak gibi) yoktur.
- **Görünüş.** Lazer inceliğiyle değil beyaz-sıcak, parlak çekirdeğiyle lazer gibi okunur. Isınınca solma ve incelme yeni genişlikte de çalışır.
- **Güç.** Işın ve Mızrak'ın odak gücü biraz kısıldı (0,1 → 0,08 ve 0,2 → 0,16 kademe başına), oyunun uzunluğu aynı kalsın diye.
  - Ana bot 38,6 → 38,8 sefer, özensiz bot 48,5 → 48,5–49,1.
  - Kalp ~0,4 deneme zorlaştı; birleştirmede yeniden ayarlandı.

## Neden
- İsabet zorluğu, güçlenmenin cezası gibi hissettiriyordu. Güçlenme isabeti kolaylaştırmalı.
- Delme seçildi, çünkü:
  - ışını durduran tek şey prizmaydı;
  - görünür bir değişiklik (ışın prizmanın arkasında sönükleşerek devam eder);
  - Mağara ve Harabeler'in prizmalarına oturuyor;
  - botta değişiklik gerektirmiyor.

## Reddedilen alternatifler
- **Hafif mıknatıs, nişana yakın hedefe kıvrılma:** Yusuf seçmedi.
- **Uzağa gittikçe açılan ışın:** seçilmedi.
- **Süpürülen izin yanması:** seçilmedi.
- **Hatta ne kadar çok şey delerse o kadar sert vurmak:** görünmez (hasar sayısı yok) ve büyük bir denge kolu. Yusuf daha geniş bir "delme" hissi isterse bir sonraki aday bu.
- **Kabuğu erken kırıp arkadaki sürüye ulaşmak:** kabuklu sürü kuralını bozardı.

## Sonuçlar / açık
- Yusuf yeni lazeri henüz oynamadı.
- Delme şimdilik yalnız prizmalarda hissediliyor; yeterli mi, Yusuf oynayınca söyleyecek.
- 30 birim genişlik bir sayı: 24–26 daha lazer gibi görünür, 30 ve üstü vurması daha kolay.
- Işın ve Mızrak'ı almış eski kayıtlar biraz güç kaybetti, karşılığında genişlik ve delme kazandı.

İlgili: [[2026-10-07-isin-camini-isitir-asiri-isinma-kilidi]], [[2026-10-08-son-nobet-safak-cemberi-tek-hedef-bes-bolge]]
