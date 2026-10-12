---
type: decision
project: tussle
date: 2026-10-12
status: active
tags: [tussle, oyun-tasarimi, denge]
source: oturum 2026-10-12 (mobil-playus: denge ve sade tema turu)
---

# Karar: 3 can sistemi kalktı, ilk hata koşuyu bitirir, başlangıç yumuşadı

## Bağlam
Yusuf: "Çevirebilirsek hepsinde tek hata olsun. Deneme turu ve haklar zaten bunun için var. İnsan hata yaptığında tekrar oynamayı istemeli."

## Karar
12 oyunda (Doğru Kapı, Örüntü, Kaç Tane, Hızlı Fren, Şeker Yağmuru, İp Atla, Tuğla Kır, Hedef Avı, Yüksek mi Alçak mı, Piñata, Şeker Ritmi, Şeker Kes) can/kalp/top parametreleri, HUD kalpleri ve olayları kalktı; ilk hata bitirir. Karşılığında yumuşak başlangıç: ilk 5–15 sn / ilk turlar cömert, rampa erken bölümde yavaş (İp Atla 14 sn ısınma; Ritim ±233 ms pencere ve yavaş tempo; Şeker Kes ilk 4 dalga tek şeker; Piñata %66 hızla başlar; Tuğla tek top, ilk 11 sn yarım rampa). Yüksek/Alçak'ta ilk kartlar 4 adaydan "bariz" seçilir (`easyDraws` 24), skor doğru sayısı. Fren'de tavan 20→40 tur (sınırsız hız fiziği bozuyor). Her oyuna insan referanslı adalet testi (300 ms tepki botu ≥15 tur / 20 sn).

## Neden
Tek hata "az farkla kaybettim, bir daha" hissini verir; canlar skoru bulanıklaştırıyordu.

## Reddedilen alternatifler
- Yalnız hata net olanlarda tek hata, gürültülü girdilerde 3 can (Claude önerisi): Yusuf hepsini istedi.

## Sonuçlar / riskler
Bot ölçümleri: Ritim p10 ~7 sn, Fren açgözlü oyuncu 1–3 tur; telefonda doğrulanmalı. Yüksek/Alçak şüphe bayrağı yalnız deste bitince (END_DECK) bakar.

İlgili: [[2026-10-12-sure-baskisi-yerine-tur-penceresi]], [[2026-10-11-deneme-turu-gunde-bir-baslangic-kartinda]].
