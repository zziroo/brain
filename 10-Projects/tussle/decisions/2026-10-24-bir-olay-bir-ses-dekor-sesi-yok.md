---
title: "Oyun içinde bir olay bir ses, dekor sesi yok; tempolu oyunlar sessiz; arenada yalnız kendi olayım"
date: 2026-10-24
project: tussle
type: decision
status: active
tags: [tussle, ses, oyun-tasarimi]
source: oturum 2026-10-24 ses yoğunluğu turu (commit c49d511)
---

# Oyun içinde bir olay bir ses, dekor sesi yok

**Karar (Yusuf, 24 Eki):** Oyun içinde yalnız hamlenin sonucu ses alır: kazanç `hit` ya da `score` merdiveni (ikisi birden değil), kayıp `miss`; nötr seçim `pop` yalnız sonuç başka anda geliyorsa. Dekor sesi yok (doğma/geçiş/dalga whoosh, kenar/iniş tick, çark kliği, sayım pop'u, kapak thud'ı, rüzgâr); görsel efektleri kalır. Girdiye ses yok (tuş, fren, dökme, çentik, atış whoosh'u), girdi en fazla 6 ms titreşir. Aynı olayda iki ses çalmaz. `urgent` yalnız kabukta oyun başına bir kez (tur sayacından değil) ve gerçek tehlikede (balance, road-rush); `tick` yalnız "sıra sende" / ret. Hamle sonucu ~1,5/sn'den sık gelen oyunlar (chop, bounce, four-arrows) **sessiz + titreşim**. Koşucular sessiz (hop, jetpack, zigzag, lane-dash, spike-wall, trace). Ses kalkan olayın titreşimi de kalkar. **lights istisna:** dizi tonları ve dokunuş yankısı Simon mantığıyla kalır. **Arena:** ses yalnız benim olayımda ve herkesi ilgilendiren tek olayda (gol, düşme, taç, tur, hamle); rakipler arası çarpışma, top-top ve disk-disk temasları sessiz. Kurallar `docs/GAME-CONTRACT.md` §5, oyun başına tablo `docs/ses-yogunluk-turu.md`, bekçi `tests/sfx-policy.test.ts`.

**Neden:** Yusuf: "normal oyun sesleri de çok." Envanter: tipik koşuda ~1900 ses, yarısından çoğu dekor; parti ortamında dört telefon yan yana. Aynı rastgele 30 sn girdiyle ölçüm: 2058 → 1238 ses, dekor 0.

**Reddedilen alternatifler:**
- Tempolu oyunlarda her vuruşta tek kısa `pop` (tek katman ama 2-3 ses/sn): Yusuf sessizi seçti; hop/jetpack/zigzag zaten sessizdi ve şikâyet gelmemişti.
- Sesleri yumuşatmak/kısmak: sorun seviye değil sayı ve anlamsızlık; tap zaten en sessiz katmanda.
- lights'ta dizi tonlarını kaldırmak: oyunun bilgisi sesle taşınıyor.

İlgili: [[2026-10-23-oyun-icinde-girdiye-ses-yok-olaya-ses]], [[2026-10-23-oyunda-tek-olcu-skor-kademe-ve-zorluk-etiketi-yok]], [[2026-10-24-tussle-ses-yogunlugu-turu]].
