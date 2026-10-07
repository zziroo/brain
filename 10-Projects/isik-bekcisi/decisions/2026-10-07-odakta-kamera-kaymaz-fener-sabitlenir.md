---
type: decision
project: isik-bekcisi
date: 2026-10-07
status: active
tags: [isik-bekcisi, kamera, nisan, isin]
source: oturum 1249d80e (incremantal-game, 2026-10-07 akşam); commit f1608a9, a8bebee; canlı a8bebee
---

# Karar: odaklanınca kamera kaymaz; odaklanınca bekçi feneri sabitler

## Bağlam
Yusuf iki şey fark etti:
- Odaklanınca kamera ışın yönüne eğiliyordu (`camLean`). İmleç ekranda yerinde kalırken altındaki dünya kayıyordu. Ölçüm: 0,4 sn sonra prizma imleçten 142 piksel uzaklaşmış, ışın onu ıskalıyor.
- Yürürken fenerin sallanması ışını, geç oyunda lazerin ucunu titretiyordu.

## Karar
- `camLean` kaldırıldı. Kamera odaktan bağımsız. `view.js` hâlâ tek kaynak: `render.js`, `run.js`'deki `mothShown()` ve botun `onScreen()` fonksiyonu oradan okuyor.
- Odaklanınca fenerin sallanması 0,15 sn'de söner, bırakınca 0,3 sn'de geri gelir. Bu yalnız çizimde; ışının kuralı zaten bekçinin ayağından çıkıyordu. Elin sopayı tuttuğu nokta da sabitlendi.

## Neden
- Nişan alınan şey imlecin altında kalmalı. Kayan kamera kendi kendini besleyen bir hata üretiyor; eski bir ders de bunu söylüyor: [[2026-10-02-kamera-kayarken-imlecin-dunya-konumu-da-kayar]].
- "Odaklanmak = feneri sıkı tut ve nişan al" oyunun içinden bir anlam taşıyor.

## Reddedilen alternatifler
- **Eğilmeyi yavaşlatmak:** kayma yine olurdu.
- **Nişanı dünyaya kilitleyip imleci telafi etmek:** karmaşık, ve fare ile oyun arasında tutarsızlık yaratır.
- **Geç bölgelerde görüşü genişletmek:** her şeyi ~%23 küçültür. Yusuf zaten kameranın fazla uzaklaştığını söylemişti.

## Sonuçlar / riskler
- Geç oyunda lazerin menzili ekranın çok dışına taşıyor. Mağara'da lazerin ~%50'si, Harabeler'de ~%45'i ekranda (eğilmeyle ~%60'tı). Lazer her zaman ekran dışındakilere de vuruyordu. Arayüz ve kamera turuna bırakıldı. Seçenekler: geç bölgelerde biraz daha geniş görüş, menzili kısaltmak, ışının ekrandan çıktığı yere bir işaret.
- Bot gürültü içinde değişti (iyi bot belki +0,5 sefer).

İlgili: [[2026-10-06-kamera-kaymasi-tehdidi-ekran-disina-iter]], [[2026-10-06-kamera-yakin-bekci-buyuk-arayuz-kalin]]
