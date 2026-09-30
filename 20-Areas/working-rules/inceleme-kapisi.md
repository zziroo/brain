---
type: resource
project: genel
date: 2026-10-01
status: active
tags: [working-rules, inceleme, guvenlik]
source: C:\Users\yusuf\.claude\CLAUDE.md (Review gate)
---

# Hiçbir ajan dalı, ayrı bir salt okunur inceleme ajanından geçmeden birleştirilmez

1. Merge öncesi yazardan farklı, salt okunur bir inceleme ajanı diff'i güvenlik ve doğruluk hataları için kontrol eder; bulgular doğrulanmış `dosya:satır` ile gelir.
2. Orta ve üstü bulgu varsa bir skeptic ajan (sonnet) her bulguyu koda karşı çürütmeye çalışır: CONFIRMED, REFUTED veya DOWNGRADE döner ve önerilen düzeltmeyi de değerlendirir. Koordinatör karar verir, anlaşmazlıkları raporlar. Bulgu yoksa skeptic atlanır.
3. Yüksek ve kritik bulgular merge'den önce düzeltilir.

Diskort'ta ek olarak gece 00:10'da `main` için ikinci bir güvenlik ağı incelemesi çalışır: [[zamanlanmis-gorevler-ve-skiller]].

## Neden
Yusuf, main'e giren her şeyin bağımsız ve düşmanca bir kontrolden geçmesini istedi ([[diskort-orchestrator-mode]]).

## İlgili
- [[orkestrasyon]], [[_index]]
