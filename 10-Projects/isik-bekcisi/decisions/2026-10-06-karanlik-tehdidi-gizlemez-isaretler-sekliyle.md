---
type: decision
project: isik-bekcisi
date: 2026-10-06
status: active
tags: [isik-bekcisi, okunurluk, gorsel, dusmanlar, kamp, pervane]
source: oturum fb8e3060 (incremantal-game), commit 1e64b38; Yusuf'un 2026-10-06 oynama gözlemi
---

# Karar: karanlık dünyayı gizleyebilir, tehdidi asla; kamp işaretleri türünü şekliyle söyler (S3 + E3)

## Bağlam
Yusuf iki şey söyledi: "NPC'lerin üstündeki ikonlar çok belirgin değil" ve "ikinci biyomda uçan, bana doğru gelen düşmanlar halka dışında seçilemiyor. Bu bir tasarım kararı mıydı?"

Bakınca şu çıktı:
- Bunlar ormandaki pervaneler. Halenin ~330 birim dışında doğuyorlar, 160 birim/sn ile (bekçinin ~1,6 katı) üstüne uçuyorlar, ormanda 2,6 sn'de bir geliyorlar. Isırık yağın %7'sini götürüyor ve zinciri bozuyor.
- Karanlıkta yalnız ~2 piksellik iki göz görünüyordu. Işıkta ısırmaya kalan süre ~0,7 sn'ydi.
- Pervanenin karanlıktaki kırmızımsı parıltısı karacık görünüm birleştirmesinde (`e19451e`) kaldırılmıştı. Yani bu bilinçli bir zorluk kararı değil, bir gerilemeydi ([[2026-10-06-gorunum-birlestirme-okunurlugu-geriletebilir]]).
- Kamp işaretleri 18–22 piksellik çizgi ikonlardı ve arkalarında yalnız soluk bir parıltı vardı.

## Karar
- **İlke:** karanlık gövdeyi gizleyebilir, gelişi asla. Oyuncunun tehdidi görüp tepki verecek bir anı olmalı.
- **Gece ailesi, E3 (mesafeye göre):**
  - Karacık, karabasan, gölge ve pervanede gözler büyüdü ve çevrelerinde soğuk bir parıltı var. Mürekkep gövdede ince bir ay ışığı kenarı var.
  - Karanlıkta gövde soluk bir halenin üstünde mürekkep olarak görünür.
  - Hepsi yakınlıkla güçlenir: uzakta çoğunlukla gözler görünür, halenin 1,6 katı içinde tam güçtedir.
  - Sıçramadan önce gövde parlar.
  - Hale içinde, Mağara ve Bataklık'ın koyu zemininde, kenar gövdeyi zeminden ayırır.
- **Pervane:** gözleri fenerin ışığını kırmızı bir kor gibi yansıtır. Kırmızı, toplanan kıvılcımların sarısıyla karışmasın diye seçildi. Arkasında yönünü ve hızını gösteren bir kanat tozu izi kalır; yaklaşınca kanatları ışığı yakalar.
- **Kamp işaretleri, S3 (şekil türü söyler):**
  - Yeni konuşma: soğuk renkte, üç noktalı bir balon; kuyruğu sakini gösterir.
  - Bekleyen şey (yıldız, istek, iksir, günlük, kapı oku): sıcak renkte bir eşkenar dörtgen.
  - Hepsi ince çift çerçeveli mürekkep bir plakada durur.
  - Bir tıklama, bir işaretin 23 birim yakınındaysa o işarete gider. Kapı oku hiçbir zaman tıklama hedefi değildir.

## Neden
- Bu türde oyuncu ölünce "görmedim" değil, "hata yaptım" demeli.
- E3, "gece karanlıktan beliriyor" hissini koruyor ama hiçbir şeyin bekçiye görünmeden ulaşmasına izin vermiyor.
- S3'te tür renkten önce şekilden okunuyor; küçük pencerede de seçiliyor.

## Reddedilen alternatifler
Hepsi oyunda bir geliştirici anahtarıyla gerçek ekran görüntüsü alınarak karşılaştırıldı, sonra kaldırıldı.
- **S1:** yuvarlak madalyon.
- **S2:** madalyon + sap + açılan halka.
- **E1:** yalnız daha güçlü gözler. Gövdenin boyutu ve sayısı okunmuyordu.
- **E2:** kenar her yerde. Gece "belirmiyordu"; Bataklık'tan sonra E3 zaten ona yakın.

## Ertelenenler
Pervane için iki ek öneri var: yaklaşan bir kanat çırpma sesi ve halenin kenarında bir tur dönüp öyle dalma (oyunu değiştirir, yeniden denge ister). Karar: önce yalnız E3 ile oynanacak, hâlâ haksız gelirse eklenecek.

## Sonuçlar / riskler
- Yalnız donmuş karelerle bakıldı. 60 karede hareket hâli (toz izi, halkalar, parlama) görülmedi.
- Gerçek işletim sistemindeki azaltılmış hareket ayarı denenmedi (yalnız taklit edildi).
- Kare süresi 48 karacıkla ~0,1–0,2 ms arttı.
- 2026-10-06'da canlıya alındı.

## İlgili
- [[2026-10-05-karanlik-surusu-karacik-ve-karabasan]] (sürünün kuralları aynı, görünüşü bu notla değişti)
- [[2026-10-06-buyuyen-isaret-en-yakin-nokta-tiklamasini-bozar]]
- [[2026-10-04-urun-hissi-kararinda-once-secenek-goster]]
- [[2026-10-06-bekci-feneri-ve-okunurluk]]
