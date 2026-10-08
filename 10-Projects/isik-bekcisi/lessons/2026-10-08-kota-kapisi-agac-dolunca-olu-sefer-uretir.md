---
type: lesson
project: isik-bekcisi
date: 2026-10-08
status: active
tags: [isik-bekcisi, denge, tasarim, bot, ilerleme-hissi]
source: oturum 2026-10-08 (incremantal-game, nöbet tavanı); Yusuf'un sıfırdan oynaması ve bot deneme seti
---

# Ders: oyuncunun gücünden bağımsız bir kota kapısı, ağaç dolunca ölü sefer üretir; bot sıkılmaz, "ölü sefer" sayısını ölç

## Ne oldu
- Bölge başına sefer sayısı bilerek fenerin ışık kotasıyla ayarlanmıştı (uzunluk hedefi için). Bot için bu yalnızca "N sefer daha": ölçülen uzunluk tuttu.
- Yusuf için aynı şey "ağacım dolu, param birikiyor, aynı seferi tekrar tekrar atıyorum" oldu. Bot hiçbir zaman "yapacak bir şey kalmadı" hissetmez; sefer sayısı ve dakika ona sıkıcılığı göstermez.
- Kota kapısının denemeleri de öğretti: akışı küçültmek tek başına yetmez (gelir güçle büyür, zayıf oyuncu küçük kotayı da yavaş doldurur); kalıcı ilerlemeli, ışık-saniyeye dayalı nöbet de kotadır, yalnız fener başında ödenir; sıfırlanan nöbet ise ana bota göre ayarlanınca özensiz oyuncuya uçurum olur.

## Kural
- Bir kapı ya güç/beceri testi olmalı ("güçlenince geçersin", ilerleme görünür) ya da oyuncunun alışveriş yapacak bir şeyi olmalı. İkisi de yoksa oyuncu bekliyor demektir.
- Uzunluğu kotaya değil ağaca (maliyetlere, içeriğe) koy. Kota oyunun şeklini değil, bekleme süresini ayarlar.
- Bot ölçümüne **ölü sefer** (açık kademelerin ağacı sefer başında dolu) ve **düz sefer** (güç %3'ten az arttı) sütunlarını ekle (`"zones":true`); dakika ve sefer sayısı yetmez.
- Botun ölçemediğini açıkça yaz: dalga yoğunluğu, "kaç deneme yapar" (bot her sefer dener, insan farm eder), sıkıcılık.
- Ayrıca: `node tools/sim-node.mjs N camp '{json}'`. `camp` kelimesi olmadan JSON ikinci argüman sayılır ve sessizce yutulur (seed, stages, zones gider); bir denemenin "seed 1" sonucu aslında tohumsuzdu.

## İlgili
- [[2026-10-08-fener-zayif-isiga-direnir-nobet-tavani-uzunluk-agacta]]
- [[2026-10-06-tehdidi-hic-karsilamayan-bot-onu-vergi-gibi-oder]]
- [[2026-10-07-ilk-gercek-olcum-kamp-suresi-botun-iki-kati]]
- [[10-Projects/isik-bekcisi/_overview|Işık Bekçisi]]
