---
type: decision
project: tussle
date: 2026-10-21
status: active
tags: [tussle, oyun-tasarimi, cups, denge]
source: Claude Code oturumu "tussle: mevcut durum kapsamlı çalışma" (geri bildirim turu 2); oturum notu [[2026-10-21-tussle-geri-bildirim-turu-2-ve-gorsel-analiz]]
---

# Cups: hep 3 bardak, hız asimptotik artar, zorluk hamle çeşidinden gelir

**Karar:** Cups v7'de bardak sayısı hep 3 (`MAX_CUPS` 3, `MV_DOUBLE` silindi). Hız asimptotik artar: takas süresi `7.5 + 15.5·3/(3+r−1)` tick (383 ms → 143 ms, 7.5'e hiç ulaşmaz), hareket sayısı 24'e yaklaşır. Yeni hareketler: `MV_CROSS` (uç bardaklar ortanın üstünden çapraz geçer) ve `MV_FAKE` (yem hareketi). Payları turla artar; RNG çekimi hamle başına sabit 3 (akış kaymaz).

**Neden:** Yusuf: "bardak 3 sabit, genel oyunlardaki sonsuz hızlanma gibi." Bardak sayısıyla büyümek sahneyi kalabalıklaştırıyor; oyuncu için asıl zorluk takip hızı ve yanıltma. Asimptotik hız tavan koymadan eğriyi yumuşak tutar.

**Reddedilen alternatifler:**
- 5 bardağa kadar büyüme: kalabalık, bardaklar küçülür, telefonda okunmaz.
- Sert hız tavanı: ulaşıldığında ilerleme hissi biter, tavan turu belirsiz kalır.

**Uygulama:** `src/games/cups/sim.ts` (`MAX_CUPS`, takas süresi formülü, `MV_CROSS`/`MV_FAKE`), `cups` sürümü v7. Telefon teyidi bekliyor (3 bardak + trick'ler).
