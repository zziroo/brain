---
type: decision
project: diskort
date: 2026-09-30
status: active
tags: [diskort, release]
source: memory diskort-rules.md, orchestrator-mode.md
---

# Client release'i Claude kendi başına çıkarmaz; değişiklikler main'de birikir, "sürüm çıkar" denince yayınlanır

## Karar
- Client release'i kendi başına çıkarma; main'de biriktir. Yalnız sunucu düzeltmeleri deploy edilebilir.
- "sürüm çıkar" ya da "halledip çıkalım" = release izni. Varsayılan patch artışı; Yusuf önemli özellik için büyük sürüm söyleyebilir (Etkinlik için 0.9.0).
- Sürüm notları GitHub'dan kimlik doğrulamasız okunur; bilerek. Okuma için `githubDispatchToken` KULLANMA (Yusuf'un güvenlik sınırı kararı).

## Neden
Release, zorunlu güncelleme demektir (0.1.3'ten beri yayın = zorunlu güncelleme) ve dışa dönük, geri alınamaz bir eylemdir; global kurallarda bu Yusuf'un kararıdır ([[karar-dagilimi]]). Token kararı Yusuf'un güvenlik sınırı.

## Reddedilen alternatifler
- Otomatik/ajan tarafından sürüm çıkarma.
- Sürüm notlarını dispatch token'ıyla okumak.

## Sonuçlar / riskler
Adımlar: [[surum-cikarma]].

## İlgili
- [[git-push-autonomy]], [[kod-imzalama-ertelendi]]
