---
type: lesson
project: isik-bekcisi
date: 2026-10-06
status: active
tags: [isik-bekcisi, kamp, tiklama, inceleme, test]
source: oturum fb8e3060 (incremantal-game); inceleme + şüpheci bulgusu, commit 1e64b38
---

# Ders: çizilen işaret büyüyünce "en yakın nokta kazanır" tıklaması komşuya kayar; testler yalnız işaretin ortasını yokluyorsa bunu görmez

## Ne oldu
Kamp işaretleri 22 pikselden ~39×30 piksellik balonlara büyüdü (S3). Kamptaki tıklama, en yakın tıklama noktasını seçiyor; işaretin büyüklüğüne bakmıyor.

Kandil'in konuşma balonunun ortası, Kandil'in fener noktasına 27,5 birim uzaktı. Bu yüzden balonun sol alt köşesine yapılan tıklamaların ~%11'i (yakınlaştırma 1,0'da) konuşmak yerine fener listesini açtı.

`campSweep` bunu kaçırdı, çünkü işaretleri yalnız ortalarının ±5 birim çevresinde yokluyordu. Uygulama ajanının "fareyle tıklayınca doğru gidiyor" denetimi de ortadan tıklamıştı. Hatayı ayrı inceleme ajanı piksel piksel tarayarak buldu. Şüpheci ajan bulguyu doğruladı, önemini ortadan düşüğe indirdi.

## Ders
- Bir şeyin çizimi büyüyünce tıklama alanı da değişir. "Kenarına tıklayınca ne oluyor?" sorusunu açıkça sor.
- Düzeltme: işaretler önce kontrol edilir (23 birim içinde işaret kazanır), sonra eski en-yakın-nokta döngüsü çalışır. Kapı aralığı kontrolü her şeyden önce gelir.
- Tarama testleri bir hedefin kenarlarını ve köşelerini de yoklamalı. `campSweep` artık işaretleri ±18 birim, köşeleriyle birlikte yokluyor.
- Yarıçapı her şeye birden genişletme. Kandil'in feneri de "küçük" bir nokta; onu ±18 ile yoklamak doğru davranışı hata gibi gösterirdi.

## İlgili
- [[2026-10-02-tikla-git-yuruyusu-koselerde-takilir-tum-alani-tara]]
- [[2026-10-06-karanlik-tehdidi-gizlemez-isaretler-sekliyle]]
