---
type: decision
project: isik-bekcisi
date: 2026-10-07
status: active
tags: [isik-bekcisi, arayuz, isin, okunurluk, isi]
source: oturum 1249d80e (incremantal-game, 2026-10-07 akşam); commit cf358c1, f1608a9..3ecd9a6; canlı a8bebee
---

# Karar: camın ısısı ışının solmasıyla, fenerin kızıl camıyla ve halenin kenarındaki boşalan yayla anlatılır

## Bağlam
Yusuf `b14f502`'yi canlıda oynadı. Gözlemleri:
- Köşedeki odak simgesi ters okunuyordu. Parlama ve Atılım dolunca "hazır" oluyor; odak simgesi ise dolarken kötüye gidiyordu.
- Kırmızı bölgede camın kızarmasını fark etmedi.
- Kırmızı bir ışın denendi (seçenek A). Yusuf'a ışın "daha çok vuruyor, lazer şarj oluyor" gibi geldi.
- Geç oyunda, kargaşada ve lazerle, ne zaman bırakması gerektiğini anlamadı. Kamera uzak, fenerin camı küçük bir nokta, köşe de gözden uzak.

## Karar
- **Köşedeki simge boşalır.** Cam soğukken dolu, basılı tuttukça aşağı iner. Kırmızı yalnız ısı oraya varınca görünür. Kilitliyken aşağıdan dolar; açılma noktası (%60) işaretli.
- **Kırmızı bölgede ışın solar** (seçenek C, "solgun sızıntı"). Işın solgunlaşır, incelir, daralır. Kırmızılık yalnız fenerin camında ve hemen yanında kalır, dışa doğru kaydırılmıştır. Bekçinin yüzü temiz kalır: yüzdeki kırmızı katkı <0,1.
- **Halenin kenarında bir kor yay (H1b).** Kırmızıya girince yay geniş başlar. Isındıkça ışının çıktığı yöne doğru iki uçtan kısalır, iki ucunda kor bir parıltı vardır. Son saniyede yavaşça kabarır. Kilitliyken soluk kırmızı yay ışın yönünden iki yana yeniden dolar; açılınca bir kez yumuşakça parlar.
  - Yay çentiksizdir, tek parçadır. Nişanı yumuşak süzülerek izler. Çizgi kalınlığı ekran pikseliyle verilir, her yakınlıkta aynı okunur.
  - Yusuf'un gerekçesi: "fenerimin ucuyla birleşiyor, bir bağ oluyor."
- **Kural:** bekçinin üstünde ve imleçte hâlâ gösterge yok ([[2026-10-07-isi-fenerde-ve-kosede-imlecte-gosterge-yok]]'ün bu ilkesi sürüyor).

## Neden
- Kızarma güçlenme diye okunuyor, solma zayıflama diye. Kırmızı bölgede ışın gerçekten zayıflıyor; görünüşü de bunu söylemeli ([[2026-10-07-kirmizi-isin-guclenme-gibi-okunur]]).
- Hale her yakınlıkta ekranın ortasında büyük duruyor. Fenerin kendi ışığı olduğu için bilgi oyun dünyasının içinde kalıyor. Yay ışının dibinde olduğu için göz zaten oraya bakıyor.
- Köşedeki üç simge aynı dili konuşmalı: dolu = kullanılabilir.

## Reddedilen alternatifler
- **A, kızıl ve kıvılcımlı ışın:** güçlenmiş gibi okundu. Renkleri ve yaklaşımı ileride "aşırı yüklenmiş lazer" için saklandı: Son Nöbet'teki şafak ışınları ya da bir aşırı yükleme yıldızı. Renkleri aşağıda, Ek'te.
- **B, sönen alev** (donuk, dumanlı, düşen cüruf): Yusuf B ile C'yi ayırt edemedi.
- **H2, bütün kenar kızarır:** elitlerin etrafında kapanan kırmızı halkaya çok benziyordu.
- **H1, yukarıdan saat yönünde azalan yay:** ışının yönünden kopuktu.
- **H1c, bekçinin arkasında ortalanan yay:** oynarken H1b daha iyi geldi.
- **Kızarmayı ışının vurduğu zemine boyamak:** A'nın parçasıydı, aynı nedenle düştü.

## Sonuçlar / riskler
- Harabeler'in sıcak ışığında fenerin yanındaki kırmızı parıltı zayıf kalıyor; orada yay ve ışının solması taşıyor.
- Sesler (cızırtı, tıslama, "tın") hâlâ dinlenmedi.
- Arayüz turu ayrıca yapılacak: Yusuf odak simgesinin diğerlerinden büyük olmasını istiyor.

İlgili: [[2026-10-07-kilitte-hale-kuculur-kilit-dort-saniye]], [[2026-10-07-odakta-kamera-kaymaz-fener-sabitlenir]], [[10-Projects/isik-bekcisi/_overview|Işık Bekçisi]]

## Ek: A'nın renkleri ("aşırı yüklenmiş lazer" için saklandı; kod hiç commit edilmedi)
- Işın: koni `255,44,16`, iç koni `255,92,46`, dış çizgi `235,36,14`, orta `255,70,30`, çekirdek `255,164,88`, akış `255,120,70`.
- Vuruş noktası `#ff4a1c`, çekirdeği `#ffb060`. Geri saçılan kıvılcım `#ff6a2e`.
- Kırmızı ışık yeşil zeminde sarı görünür. Bu yüzden zemin önce `multiply` ile filtrelenir (`255,74,48` koni, `255,80,50` şerit), sonra parıltı eklenir.
- Işın boyunca yana sıçrayıp düşen kor kıvılcımlar (`#ffc070` / `#ff5a24`).
