---
type: decision
project: isik-bekcisi
date: 2026-10-07
status: active
tags: [isik-bekcisi, arayuz, beceri-gostergesi, gamepad, okunurluk]
source: oturum e5a9fa92 / 5f403d52 (incremantal-game, 2026-10-07); commit edilmemiş çalışma kopyası
---

# Karar: Parlama ve Atılım'ın bekleme halkaları bekçiden kalktı; bekçide yalnız "hazır" anı görünür, ilerleme sağ alttaki köşede

## Bağlam
Bekçinin üstünde şunlar birikmişti:
- Parlama'nın fenerin çevresindeki halkası.
- Atılım'ın halkası: önce imleçteydi, ısı yaylarıyla karışınca ayak dibine indi.
- Öğretici ipuçları.

Yusuf: "Karakter üzerinde fazla UI oldu, bunları azaltmak lazım." İmlece bağlı göstergelerin gamepad'de işe yaramayacağını da söyledi.

## Karar
- Bekleme süresinde bekçinin üstüne hiçbir şey çizilmez. İlerleme yalnız sağ alttaki köşede görünür; oradaki halkalar zaten vardı.
- **Parlama hazır olunca** fener kısa bir an sıcak parlar ve yüksek bir çınlama gelir.
- **Atılım hazır olunca** ayak dibinde küçük bir toz pufu kalkar ve daha pes bir çınlama gelir.
- **Hareket azaltma açıksa** her iki durumda da yalnız kısa bir parlama olur.
- **Erken basılınca** boğuk bir tık sesi gelir ve o becerinin köşedeki simgesi iki kez yanıp söner. Bekçide bir şey çizilmez.
- Atılım için ayrı bir gösterge "sonra düşünülebilir" (Yusuf).

## Neden
- Bekçi sade kalınca okunuyor.
- Köşedeki göstergeler ve "hazır" anının ses + ışık işareti gamepad'de de aynı çalışır.
- Yusuf iki yol arasından bunu seçti: "Fener + köşe, halkalar da kalksın".

## Reddedilen alternatifler
- **Halkalar kalsın, yalnız ısı göstergesi imleçten kalksın:** Yusuf'un "fazla UI" itirazını karşılamıyordu.
- **Atılım halkası imleçte kalsın** ([[2026-10-06-atilim-halkasi-imlecte]]): ısı yaylarıyla aynı renkte iki halka imleçte birbirinden ayırt edilemiyordu. Ayrıca gamepad'de karşılığı yok.

## Sonuçlar / riskler
- Bekleme süresi artık yalnız köşede görünüyor. Atılım'ın ne zaman dolduğu daha önce gözden kaçıyordu ([[2026-10-06-atilim-halkasi-imlecte]]); bu, oynayınca yeniden sorulmalı.
- Bilinen küçük eksik ortadan kalkıyor: "Fener başa yakınken Parlama halkası bekçinin yüzüne biniyor".

## İlgili
- [[2026-10-05-beceri-hazir-halkasi-bekcinin-uzerinde]] (yerini aldı)
- [[2026-10-06-atilim-halkasi-imlecte]] (yerini aldı)
- [[2026-10-07-isi-fenerde-ve-kosede-imlecte-gosterge-yok]]
