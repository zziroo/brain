---
type: lesson
project: isik-bekcisi
date: 2026-10-07
status: active
tags: [isik-bekcisi, denge, bot, test, yontem]
source: oturum e5a9fa92 / 5f403d52 (incremantal-game, 2026-10-07); geçici "hold" yaması ve kalıcı `"hold":true` bot seçeneği
---

# Ders: "oyuncular hep şunu yapıyor" şüphesini o davranışı yapan bir bot varyantıyla ölç; zorlanan davranış botun bütün girdi dallarını kapsamalı

## Ne oldu
Yusuf, arkadaşının ışını hiç bırakmadan oynadığını gördü. Bunun gerçekten bir sorun olup olmadığını anlamak için botun çıktısına geçici bir yama yapıldı (`beam: true`). Aynı tohumlarla iki bot karşılaştırıldı: normal oynayan ve hep basılı tutan.

İlk sonuç "hep basmak yalnız %10 daha yavaş" çıktı ve Yusuf'a öyle söylendi. Uygulama ajanı sonra bir şey fark etti: yama Kalp savaşında hiç işlemiyordu. `botInput()`, Kalp için `bossInput()` sonucunu erken döndürüyordu ve yamanın satırına hiç gelinmiyordu. Kalp dahil ölçülünce hep basmak **hiçbir şeye mal olmuyordu** (41,6'ya karşı 41,1 sefer). Sorun sanılandan büyüktü.

Sonra kalıcı bir `"hold":true` bot seçeneği yazıldı. Her yeni tasarım bu seçenekle ölçüldü; değerlendirme hep "düzgün oynayan / insana yakın / hep basılı" üçlüsüyle yapıldı.

## Ders
- Bir oyuncu davranışının baskın strateji olup olmadığını tahminle değil, o davranışı yapan bir bot varyantıyla ve aynı tohumlarla ölç.
- Botun davranışını zorlarken her girdi dalını kontrol et: yol, fener nöbeti, Kalp, kaçış. Erken `return` eden bir dal, zorlamayı sessizce atlar.
- Yamayı geçici bırakma. Anlamlıysa kalıcı bir bot seçeneği yap. Sonraki her tasarım aynı ölçüyle karşılaştırılabilir.

## İlgili
- [[2026-10-02-bot-ve-test-araclari-girdi-yolunu-atladi]]
- [[2026-10-06-tehdidi-hic-karsilamayan-bot-onu-vergi-gibi-oder]]
- [[2026-10-07-isin-camini-isitir-asiri-isinma-kilidi]]
