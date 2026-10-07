---
type: decision
project: isik-bekcisi
date: 2026-10-07
status: active
tags: [isik-bekcisi, isin, odak, denge, oyun-hissi]
source: oturum e5a9fa92 / 5f403d52 (incremantal-game, 2026-10-07); ilk sürüm commit 0ac3876, son sürüm commit b14f502
---

# Karar: ışın fenerin camını ısıtır; ısı bir kaynaktır, dolarsa ışın söner ve yeniden basılana kadar kilitli kalır

## Bağlam
Yusuf bir arkadaşını oynarken izledi: arkadaşı odak düğmesini (sol tık / F) bütün sefer basılı tuttu. Mevcut bedeller (yağ 1,7–2,5 kat yanar, hale yarıya iner, yürüyüş %62'ye düşer) fitil göstergesinden okunuyordu; rahat oynayan biri ona bakmıyor.
Botla ölçüldü (aynı tohumlarla, 24 oyun): ışını hiç bırakmamak hiçbir şeye mal olmuyordu. İnsana yakın bot 41,6 sefer, aynı bot hep basılı 41,1 sefer. Yani hale ile ışın arasında bir seçim kalmamıştı.

## Karar
- **Isı:** ışın açıkken fenerin camı ısınır ve ısı bir kaynak gibi çalışır (dayanıklılık çarkı ya da silahın aşırı ısınması gibi).
  - Cam 5,5 sn'de dolar; Mercek yıldızlarının hepsiyle 8,5 sn'de. İlk 3 sn hiçbir şey olmaz; Mercek hattı bu süreye +3 sn ekler.
  - Son 2,5 sn kırmızı uyarı bölgesidir: ışın tıkanan bir alev gibi tekler ve gücü %50'ye doğru düşer.
- **Kısmi kullanım:** bırakınca cam 0,25 sn sonra sabit hızla soğur, doludan boşa 1,2 sn'de. Tekrar basınca ışın kalan ısıdan devam eder.
- **Aşırı ısınma:** cam basılıyken dolarsa ışın söner. Önce iki tekleme olur, sonra koni fenere doğru geri çekilir; duman, kıvılcım ve "pıss" sesi gelir.
  - Işın kilitlenir. Cam 2 sn'de %40'a kadar soğuyunca kilit açılır.
  - Işın ancak **yeniden basınca** gelir. Hemen basan %40'tan başladığı için daha çabuk yeniden ısınır.
- **Etkilenmeyenler:** yapışan karacıklar her zaman tam ışınla yanar, buna fenerin üstündekiler de dahildir. Ürkek ruhu dondurmak, sıçrayanı düşürmek ve pervaneyi yavaşlatmak gibi güce bağlı olmayan etkiler de değişmez.
- **Güvenlik:** ışığa duyarlılık için hiçbir basma düzeninde bir saniyede 3'ten fazla kararma olmaz. Bunu son üç kararmanın zamanını tutan bir pencere sağlıyor.
- **Görünüş:** ısının nasıl gösterildiği ayrı bir karar: [[2026-10-07-isi-fenerde-ve-kosede-imlecte-gosterge-yok]].

## Neden
- Bedel sayıda değil, ışının davranışında görünmeli. Yalnız %50 zayıflama hissedilmedi: [[2026-10-07-sayidaki-zayiflama-hissedilmez]].
- Kilit, ışını uyarısız elden almıyor. Önce kırmızı bölge ve tekleme geliyor, kilit ancak uyarıyı görmezden gelene geliyor.
- Yeniden basma kuralı Yusuf'un seçimi. Söndükten sonra kendiliğinden geri gelen ışık, hep basan biri için ceza gibi değil, "yanıp sönen bir şey" gibi okunuyordu.
- Kısmi kullanım ve hızlı soğuma "tut, bırak, yeniden nişan al" ritmini ödüllendiriyor. `RAMP` (tutulan hedefin ısınması, 1,4 sn) bu ritimle uyumlu.

## Reddedilen alternatifler
- **Sert süre sınırı** (Yusuf'un ilk fikri: N saniye sonra ışın kapanır, dolunca açılır). Fener Nöbeti'nde, karacık dalgasında ve Kalp'te ışını uyarısız elden alır, ayrıca yağın yanına ikinci bir sayaç ekler. Uyarı bölgesiyle yumuşatılmış hâli seçildi.
- **Yalnız zayıflama** (cam ısınınca ışın %50'ye iner ve orada kalır; commit 0ac3876). Bot için güçlü bir cezaydı: hep basan ~11 sefer geride kalıyordu. Ama Yusuf oynarken hissetmedi.
- **Tekle, sonra sön; cam soğuk geri gelir.** Hep basan yalnız ~2 sefer kaybediyordu, çünkü sönmek camı sıfırlıyordu.
- **Söndükten sonra sıcak geri gelir** (`?cam=1`, yan yana denendi). Hep basanın cezası büyüktü (~7–9 sefer). Ama Yusuf'a göre sürekli basınca mekanik "yanıp sönen bir şey" gibi anlaşılıyordu.
- **Yeniden bas, cam soğuk** (`?cam=2`). Yusuf bunu seçti, ama kaynak çubuğu kalıbını istedi. Sonuçtaki tasarım bunun üzerine kuruldu.
- **Bırakmayı ödüllendirmek** (bırakınca hale bir an genişler). Tutmayı cezalandırmıyor, rahat oyuncuyu değiştirmez.

## Sonuçlar / riskler
Bot sonuçları, 24 oyun:

| Bot | Sefer |
|---|---|
| Düzgün oynayan | 38,0 (önce 37,3) |
| İnsana yakın | 43,4 (önce 41,6) |
| İnsana yakın, hep basılı | 47,7 |

- İkisi de hiç aşırı ısınmıyor.
- **Hep basanın cezası ~4 seferde kaldı.** Kilit süresi ve açılma eşiği bunu değiştirmiyor, çünkü kilit bir moladır: [[2026-10-07-kilit-cezasi-mola-olabilir]]. Önerilen sonraki kaldıraç, aşırı ısınan camın kilit boyunca haleyi de boğması. Karar verilmedi; önce Yusuf oynayacak.
- Son sürüm `b14f502` 2026-10-07'de açık inceleme bulgularıyla yayınlandı (Yusuf: "bu hâliyle yayınla, sonra düzeltiriz"). Bulgular oturum notunda.
- Sesleri kimse dinlemedi. Hareket azaltma hâli yalnız kodda kontrol edildi.

## İlgili
- [[2026-10-02-lazere-donusen-isin-yag-bedeli-ve-lazer-dusmanlari]]
- [[2026-10-07-isi-fenerde-ve-kosede-imlecte-gosterge-yok]]
- [[2026-10-07-cam-isinir-ve-isi-gostergesi]]
