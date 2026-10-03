---
type: lesson
project: rehber-okuyucu
date: 2026-10-04
status: active
tags: [rehber-okuyucu, guvenlik, regex, dos, inceleme]
source: oturum 2026-10-03/04, inceleme ajanlarının kanıtlı bulguları
---

# Yabancı metin üzerinde boşluk niceleyicili regex sunucuyu dondurur; aynı hata düzeltme turunda yeniden yazıldı

## Ne oldu
- `/\s+$/`, `/[ \t]*\n[ \t]*/` gibi kalıplar, uzun boşluk dizisi + boşluk olmayan karakter girdisinde karesel geri izleme yaptı: 40.000 × U+3000 tek bölümde 5 sn, 100 bölümde 20 sn. Ayrıştırma eşzamanlı olduğu için bütün istekler durdu.
- Düzeltme turunda eklenen `<guide>` etkisizleştirme kalıbı (`<\s*(/?)\s*guide`) aynı hatayı tekrarladı: 40 blokta 13 sn. Dördüncü inceleme turu yakaladı.
- Aynı turlarda: düğüm başına ~300-400 B ile 8 MB sayfa 256 MB konteyneri bellekten düşürüyordu; eşleşmeyen kapanış etiketleri yığını karesel tarıyordu; numaralı atıflar 1,5 MB belgeyi 163 MB'a şişiriyordu.

## Ders
- Güvenilmez metinde `trimEnd()` / satır satır işlem kullan; yan yana iki `\s*` ya da `$`'a dayalı boşluk niceleyicisi yazma.
- Kırpma (ör. 20.000 karakter) tek başına yetmez: çok sayıda blok çarpar.
- Bayt sınırı değil düğüm bütçesi belleği korur.
- Boyut sınırını girdi üzerinde değil çözülmüş çıktı üzerinde de denetle.
- Güvenlik düzeltmesi de incelemeden geçmeli; "düzeltme turu" yeni açık üretebilir.
- Karesel testlerde girdinin başına boşluk olmayan karakter koy; yalnız boşlukla başlayan girdi hızlı geçer ve hiçbir şey kanıtlamaz.

## İlgili
- [[10-Projects/rehber-okuyucu/_overview|Rehber Okuyucu]], [[inceleme-kapisi]]
