---
type: decision
project: tussle
date: 2026-10-23
status: active
tags: [tussle, ses, karar]
source: oturum "tussle: ses seçimi ad ad, kademe rozeti kalkıyor" (2026-10-23); önceki [[2026-10-23-ses-begenisi-yan-yana-dinleme-sayfasiyla-secilir]]
---

# Karar: ses paleti ad ad setlerden seçilir (`PICK`), hit/miss A'nın kısaltılmışı

## Bağlam
Öğlen yayını "set F + A'nın puan merdiveni" idi ([[2026-10-23-tussle-ses-seti-f-girdi-sesi-kademe-rozeti]]). Yusuf altı setli dinleme sayfasında her sesi ayrı seçti: A ×7 (tap, pop, hit, miss, score/kombo, whoosh, thud), C ×2 (level, badge), F ×6 (countdown, go, tick, urgent, win, lose).

## Karar
`scripts/ses/recete.js` artık ses üretmez, seçer: `PICK` tablosu ad → set; P/LABEL/DRAW/LEVEL_DB/RATE kaynak setten alınır. Sesler kendi set dosyalarında yaşar (`setler/a.js`, `c.js`, `f.js`); setler `cekirdek.js`'ten içe aktarır (döngü yok). A'nın hit (179 ms) ve miss (200 ms) GAME-CONTRACT'ın ≤120 ms hamle sınırını aştığı için `OVERRIDE` ile aynı notalarla kısaltıldı (98 / 92 ms); Yusuf "deneyelim" dedi, beğenmezse iki satır silinince A'nın aslı döner. Her ses değişikliğinde SW önbellek sürümü artar (v8).

## Neden
Bir sesi değiştirmek tek satır olsun, deneme setleri bozulmadan kalsın; mağaza sürümü gerekmez (native motorlar WAV'ı OTA kökünden okur).

## Reddedilen alternatifler
- Seçilen sesleri recete.js'e kopyalamak: iki kaynak, setler bayatlar.
- A setinin kendi dosyasında hit/miss'i kısaltmak: A "eski, birebir" dinleme seti olarak kalmalı.

## Not
"Kombo" diye ayrı ses yok; kombo = puan merdiveninin üst basamakları. Yayın: 7a76c5d, OTA 0.20261023.1208. Oturum: [[2026-10-23-tussle-ses-secimi-ad-ad-kademe-ve-zorluk-etiketleri]].
