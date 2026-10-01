---
type: resource
project: genel
date: 2026-10-01
status: active
tags: [working-rules, inceleme, guvenlik]
source: C:\Users\yusuf\.claude\CLAUDE.md (Review gate)
---

# Hiçbir ajan kod değişikliği, ayrı bir salt okunur inceleme ajanından geçmeden commit/merge edilmez

1. Commit/merge öncesi (dal ya da çalışma kopyası diff'i) yazardan farklı, salt okunur bir inceleme ajanı diff'i güvenlik ve doğruluk hataları için kontrol eder; bulgular doğrulanmış `dosya:satır` ile gelir. İnceleme ajanına salt okuma talimatı verilir: `git diff` / `git show`, checkout yok, ana çalışma kopyasında değişiklik yok (iki review ajanı bir kez ana kopyada `git checkout --detach` çalıştırmıştı: [[ajan-calisma-tuzaklari]]).
2. Orta ve üstü bulgu varsa bir skeptic ajan (sonnet) her bulguyu koda karşı çürütmeye çalışır: CONFIRMED, REFUTED veya DOWNGRADE döner ve önerilen düzeltmeyi de değerlendirir. Koordinatör karar verir, anlaşmazlıkları raporlar. Bulgu yoksa skeptic atlanır.
3. Yüksek ve kritik bulgular merge'den önce düzeltilir.
4. **Kod olmayan iş** (hafıza, vault, doküman, ayarlar): inceleme ajanı yok. Koordinatör değişen dosyaları yeniden okur, bağlantı ve secret kontrolü yapar, ajan raporuna tek başına güvenmez.

Diskort'ta ek olarak gece 00:10'da `main` için ikinci bir güvenlik ağı incelemesi çalışır: [[zamanlanmis-gorevler-ve-skiller]].

## Neden
Yusuf, main'e giren her şeyin bağımsız ve düşmanca bir kontrolden geçmesini istedi ([[diskort-orchestrator-mode]]).

## İlgili
- [[orkestrasyon]], [[_index]]
