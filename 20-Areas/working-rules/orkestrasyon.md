---
type: resource
project: genel
date: 2026-10-01
status: active
tags: [working-rules, orkestrasyon, ajan]
source: C:\Users\yusuf\.claude\CLAUDE.md (Orchestration)
---

# Büyük işte ana sohbet koordinatördür, işi arka plan ajanlarına devreder

## Kural
- Uzun, çok adımlı işte ana sohbet planlar, ürün kararlarını Yusuf'a sorar, işi arka plan alt ajanlarına verir (`run_in_background: true`; kod değişikliği için `isolation: "worktree"`, ajan başına bir dal). Sonra sonuçları inceler, testleri çalıştırır, birleştirir.
- Devretme izni kalıcıdır; her iş için ayrıca sorulmaz.
- İşi dikey dilimle (özellik bazlı) böl, rol bazlı değil. Çakışmayan alanlarda ajanlar paralel çalışabilir.
- Ajanlar asla main'e merge etmez, tag atmaz, release/deploy yapmaz, secret'lara dokunmaz, production'a SSH ile girmez. Bunları koordinatör yapar, projenin kendi kurallarına göre.
- Birleştirdikten sonra worktree ve dallar temizlenir.
- Ajan sonuçları Yusuf'a kısa aktarılır; doğrulanmamış ajan iddiası doğrulanmış gibi sunulmaz.

## Satır içi mi, ajan mı
Her ajan soğuk başlar (iş yapmadan ~45-50k token bağlam) ve kodu yeniden okur.
- Satır içi: kısa, az okuma gerektiren iş (tek satır düzeltme, config/hafıza düzenleme, git/deploy adımları, hızlı kontrol).
- Ajan: çok okuma/düzenleme gerektiren iş (çok dosya, uzun araştırma), değişiklik küçük olsa bile; koordinatörün bağlamını temiz tutar. Koordinatörün bağlamı şişmişse yine ajana ver.

## Model seçimi
- Opus (inherit): çapraz kesen veya tasarım ağırlıklı iş, derin inceleme.
- `sonnet`: dar ve iyi tanımlı değişiklik, doğrulayıcı/skeptic geçişi, araçlar.
- `haiku` ya da Explore: salt okunur arama.
- Diskort notu: ağır ajanlar ana sohbet modelini "inherit" eder (Yusuf maliyeti ana sohbet modelini Opus/Sonnet arası değiştirerek yönetir); yalnız dar/skeptic ajanlar `sonnet`'e sabitlenir. Global model kuralı yeniden yazılmaz ([[diskort-orchestrator-mode]]).

## Neden
Kaynakta gerekçe açık yazılmamış. Ima edilen: bağlamı temiz tutmak ve limit harcamasını yönetmek (yorum, doğrulanmadı).

## Reddedilen alternatifler
Kaynakta yok.

## İlgili
- [[inceleme-kapisi]], [[karar-dagilimi]], [[_index]]
