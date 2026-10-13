---
type: decision
project: isik-bekcisi
date: 2026-10-13
status: accepted
tags: [isik-bekcisi, tasarim, core-loop, guc, parlama, denge]
source: oturum 0b67b4a3 (incremantal-game, 2026-10-13 akşam); main ead1079. Yusuf oynamadı.
---

# Karar: bekçinin Parlaması evrilir: Şok Dalgası → Yanan Halka → Gün Doğumu

## Bağlam
[[2026-10-13-guc-ekranda-gorunsun-dunya-kirilir]] yönünün üçüncü dilimi; [[2026-10-13-kirilan-dunya-ve-zincir-firtina-yazildi]] sonrası. Yusuf "yayınla, sonra Parlama evrimine geç" dedi.

## Karar
- **Şok Dalgası** (k1, 80 is): Parlama anlık disk değil, 0,45 sn'de dışa koşan bir halka; geçtiğini bir kez vurur (eski diskle aynı ışık ve kaynak, tüketiciler değişmedi), geceyi (karacık, pervane, gölge) dışarı iter (büyükler `ELITE.knock` kadar), eski menzilin ötesinde ışığın yalnız %15'ini taşır.
- **Yanan Halka** (k2, iki seviye, 400 / 2000 is): eski menzilin 0,75'inde 3 / 4,5 sn duran ateş çemberi; bandından geçen gece yanar, içi havuz gibi hafif aydınlanır. (Dalganın durduğu yerde değil: o yer bataklıktan itibaren ekran dışı.)
- **Gün Doğumu** (k4, 6000 is): her 3. Parlama'da 0,8 sn karanlık tümüyle kalkar, görüştekiler Parlama ışığının %60'ını alır, gece tabana kavrulur (öldürmez), ürkek/altın/kemirgen donar; göstergede iki pip ve küçük güneş sayar.
- Yıldızların kurduğu Parlamalar (Nakarat, Yankı) eski disk olarak kalır; yalnız bekçininki evrilir.

## Neden
Parlama en görünür fiil; evrimi ekranda okunuyor. Tasarım notundaki sayılar çok güçlüydü (uzun menzil tek başına 5 sefer götürdü): dalga ötede zayıf, halkanın içi zayıf, gün doğumu üçte bir.

## Reddedilen alternatifler
- Dalganın tam ışıkla eski menzilin 1,6 katına gitmesi (5 sefer).
- Halkanın içinin havuz kadar aydınlanması (2 sefer).
- Halkanın dalganın durduğu yerde durması (ekran dışı).

## Ölçüm ve açık nokta
Tohum 1, 10'ar oyun: ana bot 35,4 sefer / 101 dk, özensiz 44,5 / 110 dk. Günün üç özelliği birlikte sabahki 36,8 / 47,2'den ~1,4 / ~2,7 sefer götürdü (her biri kendi kapalı ölçümüne göre bir sefer içinde; gürültü ±1,5). Yusuf uzamasını istiyor: bu fark ağacın "+%" kesimindeki genel yeniden dengede geri verilecek.
İnceleme: kritik/yüksek yok; 2 orta (Nakarat Parlamaları Puhu'nun tek-Parlama sayımını şişiriyordu; karabasan parçaları dalgadan vuruluyordu) + 1 düşük (itme gece duvarını aşıyordu), hepsi düzeltildi. Yan bulgu: gökyüzünde çok küçük çizilen is yıldızında negatif yarıçap hatası kapatıldı.
Sesler dinlenmedi; bataklıkta gün doğumunun sıcak yıkaması zayıf okunuyor olabilir.
