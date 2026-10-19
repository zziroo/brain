---
type: decision
project: tussle
date: 2026-10-20
status: active
tags: [tussle, ui, sezon]
source: oturum "tussle: geçiş ve düzenleme geri bildirimi" (2026-10-19/20)
---

# Karar: sezonun gün gün geçmişi ayrı "Geçmiş" ekranında; sezon sayfasında grafik + sıralama

## Bağlam
7 kutulu bantta eski günlerin sırası görünmüyordu; sezon sayfasında gün gün sıra yoktu.

## Karar
- Sezon sayfası: ✕ yanında "Geçmiş" düğmesi; üstte "52 puan | #3" (elmas simgesi anlaşılmıyordu); sıralamada "61 p · 8/9 gün".
- Geçmiş: `#/oda/:code/gecmis` itme ekranı, gün kartları yeniden eskiye (görsel, gün, #sıran, günün birincisi, bugün "sürüyor").
- Karta dokununca gün ayrıntısı alt sayfası: tam sıralama, en iyi skor, sezon puanı, herkesin denemeleri. Veri: salt okunur `GET rooms/:code/season/days/:i` (yalnız üyeler, gün satırı oluşturmaz, açılmamış gün 404).
- Oyuncu kartından "gün oynadı" kaldırıldı; tek yerde (sıralamada) durur.

## Neden
Yusuf'un önerisi: liste sezon sayfasında sıkışıyordu; kartlar ve dokunup ayrıntıya girmek daha hoş.

## Reddedilen alternatifler
- Sezon sayfasında satır içi "Günler" listesi: sıkışık, 30 günde sıralama çok aşağı kayıyordu.
- Bantta okla sayfa çevirme / kayan şerit: kartı ikiye bölmeyi ve dokunma çakışmasını gerektiriyordu.
- İkinci alt sayfa: üç katlı sayfa yığını olurdu.

## İlgili
- [[2026-10-20-sezon-karti-h1c-gun-noktalari-7-kutu]]
- [[2026-10-20-oyuncu-karti-denemeler-profil-baglantisi]]
