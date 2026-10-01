---
type: decision
project: diskort
date: 2026-09-29
status: active
tags: [diskort, yayin, arayuz, masaustu, mobil]
source: a7b70327-6e05-4060-a15b-293ddac27162.jsonl
---

# Karar: Yayın arayüzü Discord davranışına yaklaştırılır: kontroller fare durunca kaybolur, yayın karta tıklayınca açılır, etiket "YAYINDA"

## Bağlam
Kullanıcı Discord ekran görüntüleri attı ve uygulama içi tarayıcıda Discord'a bakmasını istedi.

## Karar
- Masaüstü sahne: fare durunca üst başlık/alt kontrol/isim etiketleri solar, hareketle geri gelir (fare bir düğmenin üstündeyse gizlenmez; ilk review bulgusu).
- Katılımcı şeridi yayınla şerit arasındaki küçük düğmeyle gizlenir; konuşan kişi görünen ilk yere kayar.
- "Yayını izle" düğmesi kalktı; önizlemeye tıklayınca açılır (hover'da oynat ikonu + "İzle"). Kartlarda "izlemeyi bırak" düğmesi yok (2026-10-01'de değişti: [[sahne-izgarada-coklu-yayin]]).
- Yayın satırı (sol alttaki ses panelinin üstünde): kaynak simgesi/baş harf, ad + kalite, "Yayını durdur".
- Ses kaydırıcısı tek kaynaktan, tema renkleriyle yenilendi (her yerde).
- Telefon: yayın ayrı kart, izlerken yayın üstte büyük, kontroller 3 sn sonra gizlenir.
- Etiket "CANLI" yerine her yerde "YAYINDA".

## Neden
Kullanıcı tercihleri/Discord referansı; masaüstü ve telefon aynı düzen.

## Reddedilen alternatifler
- Ayrı "Yayını izle" düğmesi, uzun basma ile bırakma, telefonda kartın içinde düğme: kullanıcı kaldırttı.
- Sol alttaki paneli baştan tasarlamak: kullanıcı "dokunma" dedi (yalnız yayın satırını istedi).

## İlgili
- [[2026-09-28-hareketli-kozmetik-setleri]], [[sade-arayuz-tercihi]]
