---
type: decision
project: diskort
date: 2026-09-29
status: active
tags: [diskort, hafiza, handoff, context]
source: a7b70327-6e05-4060-a15b-293ddac27162.jsonl
---

# Karar: Devir notu (handoff) küçük tutulur; sürüm geçmişi ve kalıcı bilgi ayrı dosyalara bölünür

## Bağlam
Devir notu ~10 KB'a (~3-4 bin token) çıkmıştı; her yeni sohbette okunuyor ve her gün büyüyordu.

## Karar
Devir notu sadece güncel durum; geçmiş sürümler ve kalıcı bilgiler ayrı dosyaya; `MEMORY.md` yalnız dizin (~1,3 KB). Kullanıcı kararlarının listesi `diskort-rules` notunda ("YAYINDA" etiketi, reddedilen Etkinlik bölümü gibi) gerektiğinde okunur.

## Neden
Sohbet başlangıç yükü ~50 bin token; devir notu şişince her sohbet pahalanır.

## Reddedilen alternatifler
- Her şeyi tek devir notunda tutmak: bağlamı şişiriyor.

## İlgili
- [[orkestrasyon-token-maliyeti]]
