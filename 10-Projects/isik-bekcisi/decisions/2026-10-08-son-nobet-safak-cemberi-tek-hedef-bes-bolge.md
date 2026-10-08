---
type: decision
project: isik-bekcisi
date: 2026-10-08
status: active
tags: [isik-bekcisi, kalp, boss, son-nobet, denge, his]
source: oturum dd56e56a + a15a1fc5 (incremantal-game, 2026-10-07 gece → 2026-10-08); Yusuf'un üç oynama turu; canlı b2bedf1
---

# Karar: Kalp, etrafındaki üç parçalı Şafak Çemberi'ni doldurarak kırılır; tek hedef Kalp, her basamak bölgelerin tehditlerini salar

## Bağlam
- Son Nöbet'in ilk dilimi arenanın girişine bir Şafak Feneri koydu: fener dolunca Kalp'e şafak ışını gidiyordu ([[2026-10-07-kalp-son-nobet-olarak-yeniden-tasarlanacak]]).
- Yusuf oynadı: "düşmanların olduğu boss iyi ama alttaki fenerin yanında durmak zorunda gibi hissediyorum; lazeri bossa mı tutacağım fenere mi, belli değil."
- İkinci tur (çember) için: "tek hedef iyi, ama buraya hiç elit gelmiyor; tüm mekanik yüzeye yapışanları temizlemek gibi; dolanmak yorucu."
- Üçüncü tur için: "dengesini daha çok beğendim"; tam build ile kolay geçtiğini, vuruşların ve dalga geçişlerinin hissedilmediğini, Mağara'nın elitinin eksik kaldığını söyledi.

## Karar (canlıda, `b2bedf1`)
- **Tek hedef: Kalp.**
  - Kalp'in çevresinde, yağ çeken alanının hemen dışında üç parçalı bir Şafak Çemberi var: Tan, Şafak, Sabah.
  - Işın Kalp'i çatlatır ve ruh saçtırır. Yakalanan ruhların ışığı çembere akar (~%62–64). Kabuklu sürüler ~%23–27, ışının kendisi (prizma ışınları dahil) ~%8–10 doldurur.
  - Her parça dolunca parlar ve Kalp'te bir şafak çatlağı açılır. Üçüncü parça Kalp'i kırar.
- **Beş bölge, üç basamak.** Her basamak açılış dalgasıyla bölgelerin elitlerini salar:
  - Tan: Çayır ve Orman. İri Karacık, karacık yayları, pervaneler, Kurukafa.
  - Şafak: Bataklık ve Mağara. Karabasan, kabuklular (en fazla 3 kırılmamış), Kemirgen. Arenada üç prizma durur, Şafak'ta kristaller çıkar.
  - Sabah: Harabeler. Karakoncolos ve dikenler.
- **Karacık dalgaları yalnız dolan parçaya tırmanır.** Yer kalmazsa tırmanmaz, bekçiye yönelir. Çemberin etrafında dolanmak gerekmez. Temizlik artık yan baskı; asıl baskı elitler.
- **Tehditler fenerin gücüyle sıklaşır** (`heartGrow()`), hiç sertleşmez. Tam build bir denemede ~19–22 elit görür.
- **His:**
  - Basamak geçişi: parça parlar, ~2,4 sn sessizlik (müzik kısılır, Kalp'in saldırıları sendeler), bölgeleri söyleyen bir bant, sonra topluca gelen dalga. Önceki basamağın elitleri geceye çekilir.
  - Işın Kalp'in kabuğuna çarptığı yerde parlama, kıymık, büyüyen çatlak ve taş öğütme sesi çıkarır: "duvarı kırıyorum" hissi. Sarsıntı yalnız büyük anlarda.
- **Süre ve denge:**
  - Arenada yağ 3,2 hızla yanar (2,5'ti; Harabeler 2,9). Bir deneme ~2 dakika.
  - Özensiz bot ~5,6, ana bot ~2,8 denemede kazanır (dört tohum seti). İnsan tahmini ~135–139 dk.
  - Her deneme sıfırdan başlar. Kaybetmek ~2, kazanmak ~2,5 geç seferlik kıvılcım öder. Kalp seferleri referans kazanca (`refGain`) girmez.

## Neden
- İki hedef (fener ve Kalp) ışığı nereye tutacağını belirsizleştirip oyuncuyu bir noktaya bağladı. Tek hedef bunu çözdü ([[2026-10-08-iki-hedefli-boss-oyuncuyu-bir-noktaya-baglar]]).
- Oyun boyu öğrenilen elitler son sınavda olmalı; temizlik tek başına angarya gibi hissettirdi.
- Arena yağını hızlandırmak deneme sayısını değil yalnız bir denemenin süresini belirliyor. Yusuf "normal oyundan farklı hissettirmiyorsa olur" dedi.

## Reddedilen alternatifler
- **Arenanın girişinde Şafak Feneri** (ilk dilim): iki hedef, oyuncuyu fenerin dibine bağladı.
- **Feneri ışın durdurucu yapmak:** arkasındaki her şeyi gölgelerdi, nişan alınan şey yerine fener beslenirdi.
- **Dalga → açılma → ışın ritmi** (seçenek B): daha senaryolu.
- **Arenanın etrafında üç fener** (seçenek C): hedef yine fener olurdu.
- **Beş parçalı çember:** parçalar küçülür, deneme uzar. Yusuf üç parçayı güzel buldu.
- **Karacıkların bütün çembere tırmanması:** arka tarafa dolanmayı zorunlu kıldı, yorucuydu.

## Sonuçlar / açık
- Ses yalnız kodla ayarlandı, kulakla dinlenmedi. Son birleşik sürümü Yusuf oynamadı.
- Kalp'e kaybettikten sonraki iki hikâye cümlesi (`r.heart.low1`, `high1`) eski dövüşü anlatıyor. Hikâye ve ipuçları sonraki dilimde.
- Yalnız beklenirse Kalp'in saçtığı ruhlar 3 dakikada ~250'ye çıkıyor. Gerçek deneme ~2 dakikada bittiği için sınır konmadı.
- İlk girişte basamak bandı, bölge adının bitmesini bekliyor (en çok ~3 sn).

İlgili: [[2026-10-06-fener-nobeti-son-beste-bir-kusatma]], [[2026-10-06-her-bolgeye-bir-elit]], [[2026-10-08-lazer-incelmez-prizmalari-deler]]
