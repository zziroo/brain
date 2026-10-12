---
type: lesson
project: pano
date: 2026-10-07
status: active
tags: [pano, regex, redos, guvenlik]
source: ZZ oturumu 9f1a0281 (düzeltme turu fark incelemesi)
---

# Sır maskeleme regex'inde sınırsız tekrar (`\w*`) patolojik girdide saniyelerce takılır

`redact()`'a parola ve gizli anahtar atama kuralları eklendi. Kalıplar şüpheci ajan tarafından test edilmişti.

## Sorun
- Ardından gelen fark incelemesi yine de bir sorun buldu: anahtar kelimeden sonraki `\w*` sınırsızdı ve önünde `\b` yoktu.
- 400 KB'lık `tokentoken…` ya da `passwordpassword…` girdisinde her oluşum yeni bir başlangıç oldu ve satır sonuna kadar geri izledi. Süre 9–13 sn.
- Redact bütün metne, kesmeden önce uygulandığı için tek bir garip transkript satırı panoyu kilitleyebilirdi.

## Düzeltme
`\w{0,40}` ile süre 12 ms'ye indi. Doğru ve yanlış pozitif örneklerinde çıktı değişmedi.

## Ders
- Maskeleme regex'lerinde her tekrara üst sınır koy: `{0,40}`, `{6,200}` gibi.
- Yeni kuraldan sonra birkaç yüz KB'lık patolojik girdilerle süre ölç:
  - anahtar kelime tekrarı,
  - `a.b.a.b…`,
  - `-----BEGIN` tekrarı,
  - uzun `key=` zincirleri.
- "Test edildi" denmiş bir kalıbı da fark incelemesinden geçir.

İlgili: [[10-Projects/pano/_overview|Pano]], [[inceleme-kapisi]]
