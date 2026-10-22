---
type: decision
project: tussle
date: 2026-10-22
status: active
tags: [tussle, gecis, animasyon, profil]
source: "oturum 2026-10-22 (mobil-playus: denge geri bildirimi); oturum notu [[2026-10-22-tussle-chain-tek-sure-four-arrows-double-tap-kalkti]]"
---

# Karar: profil fotoğrafıyla açılan oyuncu kartında avatar büyümesi yok; ana ekran → kendi profil kalır

## Bağlam
Üst üste sayfada alttakinin geri çekilip kararması (aynı gün) beğenildi; onunla birlikte avatarın karta büyümesi fazla geldi. Yusuf: "çok animasyon animasyon gibi olmaya başladık".

## Karar
Sezon, günün tablosu, Üyeler ve sohbetten açılan oyuncu kartı düz sayfa olarak açılır (`player-sheet.ts` morph ve `PickPlayer`/`onPlayer` `from` argümanı kalktı). Ana ekran avatarından kendi profiline büyüme kalır: Yusuf "oraya özel olsun" dedi.

## Reddedilen alternatifler
- Bütün avatar geçişlerini kaldırmak (ilk öneri): Yusuf ana ekran → profil geçişini tuttu.

## İlgili
- [[2026-10-22-ust-uste-sayfada-alttaki-geri-cekilir]]
- [[2026-10-20-morph-kaynaklari-basinca-kararir-kuculmez]]
