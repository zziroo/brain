---
type: decision
project: kapis
date: 2026-10-03
status: active
tags: [kapis, ajan, orkestrasyon, inceleme]
source: oturum 2026-10-03 (web-fps-game, KAPIŞ ilk inşa); docs/DESIGN.md
---

# Karar: işi bağımlılık sırasıyla ajan dalgalarına böl ve her commit öncesi inceleme kapısından geçir

## Bağlam
Büyük bir oyun paralel ajanlarla yazıldı; aynı çalışma kopyası yük altında birden fazla ajan tarafından düzenleniyordu.

## Karar
Dalga sırası: temel, sonra (sunucu ∥ istemci çekirdeği), sonra (görsel çekirdek ∥ arena ∥ arayüz ∥ kahraman mantığı ×3), sonra (kahraman görselleri ×3 ∥ botlar ∥ yayın hazırlığı ∥ incelemeler).

Her commit öncesi: salt okunur inceleyici, sonra sonnet şüpheci, sonra düzeltmeler aynı ajana. Düzeltme için `SendMessage` ile aynı ajanı sürdürmek bağlamı korudu. Eşzamanlı düzenleme için `docs/DESIGN.md` §3 kuralları: kendi portların, kendi tarayıcı sekmen, başkasının yarım dosyasını düzeltme.

## Neden
- Bağımlılık sırası, bir dalganın çıktısını sonrakinin sözleşmesi yapıyor.
- İnceleme kapısı güvenlik ve doğruluk hatalarını commit öncesi yakaladı ([[2026-10-03-simulasyon-ve-guvenlik-kararlari]]).
- Aynı ajana devam, yeniden okuma maliyetini önledi.

## Reddedilen alternatifler
- Rol bazlı bölme (yalnız sunucu, yalnız istemci ajanı): dikey dilim daha az çakışma verdi ([[2026-10-03-paylasilan-sim-sunucu-otoritesi-hero-dilimi]]).

## Sonuçlar / riskler
7 ajanlık dalga kullanım limitini bitiriyor ([[2026-10-03-kullanim-limiti-ve-ajan-dalgasi-boyutu]]).

## İlgili
- [[_overview]], [[orkestrasyon]], [[karar-dagilimi]]
