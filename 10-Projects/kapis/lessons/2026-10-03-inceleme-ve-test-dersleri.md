---
type: lesson
project: kapis
date: 2026-10-03
status: active
tags: [kapis, test, inceleme, supheci]
source: oturum 2026-10-03 (web-fps-game, KAPIŞ ilk inşa)
---

# Şüpheci adımı atlanmaz; gerçek saat ve `Math.random` kullanan testler yük altında dalgalanır

## Ne oldu
- Şüpheci ajan, önerilen düzeltmenin yanlış olduğunu gösterdi: zıplama sürtünmesi için naif düzeltme bunny-hop kazancı veriyordu. Doğru çözüm yalnız koşu hızı üstü kısmı sönümlemekti ([[2026-10-03-simulasyon-ve-guvenlik-kararlari]]).
- Gerçek saat ölçen testler (`server-sim` "~60 ticks per second") ve `Math.random` kullanan testler yük altında dalgalandı. **Çözüm:** harness'e seed'lenebilir RNG eklendi.

## Çıkarım
Orta ve üstü bulgularda şüpheci adımını atlama; yalnız bulguyu değil önerilen düzeltmeyi de sına. Testlerde gerçek saat ve ham rastgelelikten kaçın.

## İlgili
- [[_overview]], [[server-testleri-tam-kosuda-kararsiz]], [[2026-10-03-ajan-dalgalari-ve-inceleme-kapisi]]
