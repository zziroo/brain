---
type: decision
project: tussle
date: 2026-10-21
status: superseded
tags: [tussle, oyun-tasarimi, chain, denge]
source: Claude Code oturumu "tussle: mevcut durum kapsamlı çalışma" (geri bildirim turu 2); oturum notu [[2026-10-21-tussle-geri-bildirim-turu-2-ve-gorsel-analiz]]
---

# Chain: tahta bitince kalan süre sonrakine devredilir, zorluk kademesiz artar

**Karar:** Chain v6'da bir tahta bitince kalan süre sonraki tahtanın penceresine eklenir (tavan: yeni pencerenin 1,5 katı). Tahta boyutları 6, 8, 10 … 22 diye kademesiz ilerler; `windowTicks` ve sürüklenme küçük adımlarla değişir. Skor tanımı (doğru dokunuş) ve yanlış dokunuş cezası (−3 sn) aynı kaldı; `typicalSec` 30→35.

**Neden:** Yusuf: "ilk başta hızlı olmanın mantığı yok, herkes aynı yerde ölüyor." Eski düzende her tahtanın süresi sabitti; erken bitirmenin karşılığı yoktu ve zorluk basamağında herkes aynı duvara çarpıyordu. Devirle hızlı oynamak sonraki tahtada zaman olarak geri döner. Bot yayılımı yavaş→hızlı 18→50 sn oldu (v5: 17→36); erken hızlı oynayan yaklaşık 15 sayı fazla alır.

**Reddedilen alternatifler:**
- Tek sürekli saat: tahta hissi (bitirme anı, yeni tahta) kaybolur.
- Yalnız tahta boyutlarını yumuşatmak: hız hâlâ ödüllenmez, herkes yine aynı yerde ölür.

**Uygulama:** `src/games/chain/sim.ts` (devir + tavan, kademesiz tahta listesi), `chain` sürümü v6. Denge bot ölçümü yukarıdaki sayılar. Telefon teyidi bekliyor (devir hissi).

> Yerine geçen: [[2026-10-22-chain-tek-sure-renkli-sayilar]] (v7).
