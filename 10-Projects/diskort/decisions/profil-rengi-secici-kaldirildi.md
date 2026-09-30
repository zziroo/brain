---
type: decision
project: diskort
date: 2026-09-30
status: active
tags: [diskort, profil, tema]
source: 54dc3a33-8a43-4d66-8774-07b1dfa4d58f.jsonl
---

# Karar: "Profil rengi" seçici kaldırılır; avatar rengi tema birincil renginden gelir

## Karar
Masaüstü ve telefonda seçici silindi; sunucu `avatarColor = tema birincil ?? kayıtlı renk` üretir. Avatar zemini artık serbest tema rengi olabildiği için yazı rengi düzeltildi (küçük review bulgusu). Sunucu çubuğu rozeti de eklendi: 22 px daire, yayında kırmızı + ekran simgesi, seste koyu + hoparlör.

## Neden
Kullanıcı: kullanılan yerlerin rengini doğrudan profil teması renginden alalım.

## Reddedilen alternatifler
- Ayrı profil rengi seçici: tekrar eden ayar.

Benzer/ilgili not (başka ajan): [[sunucu-rail-rozeti]]
