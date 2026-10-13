---
type: decision
project: tussle
date: 2026-10-08
status: active
tags: [tussle, gorsel, tema, ui, telif]
source: oturum 2026-10-08 gece (mobil-playus UI yenileme)
---

# Karar: görsel kimlik "Şeker Dükkanı" (krem zemin, konturlu sticker kartlar); Gündüz varsayılan

## Bağlam
"Neon oyuncak" turu bitmişti ama Yusuf arayüzü Playus'un yanında cansız buldu. İlk yenileme (mor zemin + beyaz kart + sarı düğme + kesikli öneri kartı + "BUGÜN" posteri + laurel) canlıydı ama Yusuf haklı olarak "neredeyse birebir Playus, telif gelmesin" dedi. Üç özgün yön mockup'landı (Okyanus, Şeker Dükkanı, Neon Gece 2.0); Yusuf Şeker Dükkanı'nı seçti, zemin kararını Claude'a bıraktı.

## Karar
- Zemin krem/şeftali `#fff1e0`, hafif serpinti dokusu (küçük tekrar eden SVG, ~%34 saydamlık); kartlar beyaz, 3 px mürekkep kontur + sert ofset gölge ("sticker"); her oda kartı o günün oyununun kapak renginde çerçeve; tek ana düğme magenta `#ff3fd0`; şeker paleti avatarlarda.
- **Gündüz varsayılan**; Gece seçenek olarak aynı dilde koyu mürdüm `#1a1033` zeminde (kontur orada açık tonda). Ayar sürümü v2: eski varsayılandan kalan kayıtlı `gece` bir kez `gunduz`'e çekilir, sonraki seçim korunur.
- Playus'a özgü öğeler yasak listesinde (`docs/VISUAL.md` §6): mor zemin, kesikli grup önerisi kartı, laurel "en iyi oyuncu", BUGÜN posteri, "veya bir gruba katıl" linki. Yerine: maskot konuşma balonu başlık ("Bugün Kule günü!"), eğik sarı oyun etiketi, "Günün yıldızı" (maskot + kupa), baykuşlu "Yeni oda, yeni tayfa!" kartı, maskotlu boş durumlar.
- Önceki turdan kalanlar geçerli: her oyunun yüzü, alt kenar/sert gölge ile derinlik, parçacık bütçesi, yalnız transform/opacity animasyon, menüde sonsuz döngü yok (tek istisna: yükleme göstergesi görünürken).
- Yerleşim kalıpları (kapaklı kart, avatar yığını, rozetler, alt sayfa) serbest; korunan şey "bütünün aynı görünmesi" (trade dress) ve çizimler. Bizim çizimler, font, ad ve maskotlar özgün.

## Neden
- Canlılık büyük oranda doygun zemin + kontrastlı kart + tek vurgu renginden geliyor; bunu Playus'un morundan değil kendi şeker/sticker dilimizden almak hem güvenli hem daha karakterli.
- Krem zemin açık havada okunur, kontur çizgileri net; koyu tema OLED ve gece için kalıyor.
- Serpinti az tutuldu ki kartlar öne çıksın; yoğunluk tek satır CSS.

## Reddedilen alternatifler
- **Mor zemin + beyaz kart (ilk yenileme):** canlı ama Playus'la aynı; telif/trade dress riski ve kimliksizlik.
- **Okyanus / Gece Pazarı (koyu deniz mavisi, krem kart, mercan düğme):** atmosferik ama daha az "oyuncak"; ikinci sırada.
- **Neon Gece 2.0 (mürdüm zemin, renkli kartlar, lime düğme):** mevcut koyu temaya en yakın, en az ayırt edici.
- **Yoğun serpinti (mockup'taki gibi):** zemin kalabalıklaşıyor, kartlar kayboluyor.

## Sonuçlar / riskler
- Yayın `0404284` (2026-10-08 gece). Telefonda gerçek görünüm doğrulanmadı.
- iOS durum çubuğu `default` yapıldı (krem zeminde beyaz saat okunmuyordu); Gece'de ince açık şerit kalır, kabul edildi.
- Yeni oyun/ekran eklerken `docs/VISUAL.md` yasak listesine bakılacak.

> **Kapak kısmı 2026-10-13'te değişti:** oyun kapakları ve küçük resimler artık şekersiz; Şeker Dükkânı yalnız arayüz paleti olarak sürüyor. Bkz. [[2026-10-13-kapaklar-ve-kucuk-resimler-sekersiz]].

## İlgili
- [[2026-10-08-gorsel-dil-neon-oyuncak-koyu-varsayilan]] (önceki, superseded)
- [[2026-10-08-font-nunito-tek-aile]]
- [[2026-10-08-marka-maskotu-uclu-blok-ve-ikon]]
- [[2026-10-08-ui-yenileme-dersleri]]
- [[2026-10-13-kapaklar-ve-kucuk-resimler-sekersiz]] (kapaklar şekersiz)
