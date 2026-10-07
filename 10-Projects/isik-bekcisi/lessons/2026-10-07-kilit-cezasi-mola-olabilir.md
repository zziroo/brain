---
type: lesson
project: isik-bekcisi
date: 2026-10-07
status: active
tags: [isik-bekcisi, denge, oyun-tasarimi, bot]
source: oturum e5a9fa92 / 5f403d52 (incremantal-game, 2026-10-07); ısı kaynağı tasarımının bot ölçümleri
---

# Ders: kilitlenme cezası, kilitli hâl oyuncuyu rahatlatıyorsa ceza değil moladır

## Ne oldu
Işın aşırı ısınınca sönüyor ve kilitleniyor ([[2026-10-07-isin-camini-isitir-asiri-isinma-kilidi]]). Hep basılı tutan botun ne kadar kaybettiği ölçüldü:

| Ayar | Hep basanın cezası |
|---|---|
| Kilit 2 sn, açılma eşiği %40 | ~4 sefer |
| Kilit 1–4 sn, açılma eşiği %40–80 | aynı aralıkta |

Kilidi uzatmak hep basana yaradı bile. Nedeni: kilitliyken fener "bırakılmış" sayılıyor. Hale tam açılıyor, yürüyüş tam hızda, odak yağı yanmıyor. Kilit, hep basana istemeden verilmiş bir mola oluyordu. Bot gerçekte kırmızı bölgede geçirdiği zayıf ve tekleyen ışın süresinin bedelini ödüyordu, kilidin değil.

## Ders
- Bir yasak süresi ancak o süre içinde bir şey kaybettiriyorsa ceza olur. Kilitli hâl normal hâlden daha rahatsa, kilit süresini uzatmak cezayı büyütmez, küçültür.
- Cezayı büyütmek isteniyorsa kilitli hâlin kendisine bir bedel koy. Burada önerilen: aşırı ısınan cam, kilit boyunca haleyi de boğsun.
- Önce kilidin oyuncuyu hangi hâle soktuğunu yaz, sonra süresini ayarla.

## İlgili
- [[2026-10-06-tehdidi-hic-karsilamayan-bot-onu-vergi-gibi-oder]]
