---
type: decision
project: diskort
date: 2026-09-29
status: active
tags: [diskort, orkestrasyon, model]
source: a7b70327-6e05-4060-a15b-293ddac27162.jsonl
---

# Karar: Ajanlar için sabit model kuralı yazılmaz; ağır işler koordinatörün modelini devralır, küçük işler açıkça sonnet/haiku

## Bağlam
Kullanıcı koordinatörü Sonnet'e almayı ve token maliyetini düşünüyordu ("tokenim biraz doluyor").

## Karar
"A ile devam": model konusunda yeni kural yok; mevcut düzen (Opus inherit ağır işler, sonnet doğrulayıcı/araç, haiku/Explore okuma) dinamik kalır, ana sohbeti değiştirmek ona göre ajanları da değiştirir. 0.8.8 yalnız OTA; gürültü engelleme + sıcaklık için yeni APK sonra.

## Neden
Dinamiklik ve kullanıcının isteğe göre değiştirebilmesi; global CLAUDE.md'ye sabit kural eklemek istenmedi.

## Reddedilen alternatifler
- Koordinatörü sabit Sonnet'e bağlayan yazılı kural: kullanıcı istemedi.

## İlgili
- [[orkestrasyon-token-maliyeti]]
