---
type: decision
project: voice-detector
date: 2026-09-25
status: active
tags: [voice-detector, dedektor, esik]
source: PLAN.md bölüm 4.2, oturum 25d1d08a (Aşama 2)
---

# Uyarı, son 1 sn'nin en az 500 ms'i eşik üstünde olunca açılır ("kesintisiz 300 ms" kuralı bırakıldı)

## Bağlam
Plandaki "eşik 300 ms kesintisiz aşılmalı" kuralı testlerde iki sorun çıkardı: 150 ms'lik güç ortalaması sıçramadan sonra ~29 dB/sn yavaş düşüp 200 ms'lik öksürüğü ~600 ms eşik üstünde tuttu (yanlış tetik); hece arası boşluklar "kesintisiz" sayacı sıfırladı.

## Karar
- Tetik seviyesi: ham 20 ms blokların son 1 sn'lik penceresinde en az 500 ms aşılan en yüksek seviye. Kesintisiz olmak zorunda değil.
- İki eşik: Yüksek (sarı/turuncu, varsayılan -32 dB) ve Çok Yüksek (-26 dB).
- Kapanış: tetik seviyesi eşiğin 3 dB altında 1 sn kalınca (konuşma bitince ~1,5 sn); Çok Yüksek -> Yüksek -> Normal kademeli iner.
- Mikrofon her zaman ölçülür (PTT takibi yok): amaç evdekiler/komşular.
- 150 ms yumuşatılmış seviye yalnız gösterim için.
- Overlay yalnız uyarı anında görünür (DWM "independent flip" kaybını sınırlamak için).

## Neden
Kısa sıçramalar (öksürük, klavye, masaya vurma) tetiklememeli; gerçek yüksek konuşma tetiklemeli; eşik çevresinde yanıp sönme olmamalı. Yusuf'un ölçümlerinde normal konuşmanın en yüksek anı (-33,2) yüksek konuşma medyanına (-34,1) çok yakındı.

## Reddedilen alternatifler
- Yumuşatılmış seviye + "kesintisiz 300 ms": yukarıdaki iki sorun (testle görüldü).
- Tam ekran tek saydam pencere: 4K'da yazılımla çizim maliyeti (4 ince şerit seçildi).

## Sonuçlar / riskler
39 birim testi bu davranışı sabitler. Eşikler kalibrasyon sihirbazıyla otomatik yerleşir.

## İlgili
- [[wpf-secimi]], [[_overview]]
