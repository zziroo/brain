---
type: lesson
project: tussle
date: 2026-10-19
status: active
tags: [tussle, ders, performans, gc, sim]
source: oturum "tussle: denge partisi, oda kilidi, tema düzeltmeleri" (2026-10-19), Balance v5
---

# Sim step()'inde gizli heap-number kutulaması; genel GC testi geç dalları görmez

- Balance v5'in yeni rüzgâr rampası her adımda bellek ayırıyordu: (1) dallar arasında yeniden atanıp state alanına yazılan `let w` (double), (2) `w < this.top ? w : this.top` seçimi state alanına yazılınca iki taraf da çalıştıktan sonra kutulanıyor. Düzeltme: `Math.min`/`Math.max` ya da her dalda doğrudan alana yazma. Sonuç bit bit aynı.
- Genel `expectNoStepAllocation` kör dokunuşlu kısa koşular oynar; tavandan sonraki dallara hiç ulaşmaz, hatayı kaçırdı. Ayrıca kısa tavan + kısa koşu = ölçüm penceresinde çok sim kurulumu, kurulum çöpü sayıma karışır.
- Yeni yardımcı `expectNoAllocationInRuns` (tests/helpers/harness.ts): geç bölüme ulaşan bot koşularını önceden kaydeder, önceden ayrılmış girdilerle yeniden oynatır, ayıran kontrolle karşılaştırır. 14 oyunda geç bölüm GC testi var.
- Kural: yeni geç-faz/tavan kodu ekleyen her denge değişikliğinde o dala ulaşan tam koşu GC testi gerekir.

İlgili: [[2026-10-19-sonsuz-oyun-tempo-hedefi]] (akıcılık bir numaralı kural)
