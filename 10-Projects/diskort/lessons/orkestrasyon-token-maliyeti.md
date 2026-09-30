---
type: lesson
project: diskort
date: 2026-09-30
status: unverified
tags: [diskort, maliyet, token, orkestrasyon]
source: b9228560-514d-5859-8bac-d8f692e541e7.jsonl, 6c2e8b17-6cc2-4f17-950b-6e13029d21fe.jsonl
---

# Token maliyeti: 4 günde ~1.234 $ liste fiyatı, bir etkinlik oturumu ~83 M token; maliyetin asıl kalemi önbellek okuma

- 29 Eylül raporu: 60 oturum (bu dizinin 32'si + eski dizinin 28'i, 109 ajan dahil), API liste fiyatı karşılığı yaklaşık 1.234 $ (Max 5x'te faturalanmaz, limitten düşer).
- Şişmiş tek sohbetlerde (fork oturumları 0,5-0,96 M token bağlam) her mesajda bağlam yeniden okunuyor; 6,7 saatlik tek fork oturumu 136 $, 1,1 saatlik biri 31 $. Handoff + ajan düzeni maliyeti düşürmüş olabilir ama veri tam kanıtlamıyor.
- 30 Eylül "diskort etkinlik karti tasarimi": ~83,3 M token (ana + 12 ajan, 433 çağrı, 1s45dk), %96,5 önbellek okuma, liste fiyatı ~32-33 $.
- Yargı: makul, absürt kalem yok (asistan yorumu, ölçüm değil). Betik `~/.claude/projects/.../*.jsonl` dosyalarını okur; repo işlerini okumaz.
- `status: unverified`: rakamlar asistanın betik çıktısından, bağımsız doğrulanmadı.

Bkz. [[ajan-modeli-dinamik-miras]], [[devir-notu-kucuk-tutulur]].
