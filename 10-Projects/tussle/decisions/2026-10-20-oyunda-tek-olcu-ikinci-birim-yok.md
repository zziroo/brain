---
type: decision
project: tussle
date: 2026-10-20
status: active
tags: [tussle, oyun-tasarimi, hud]
source: Claude Code oturumu "tussle: geri bildirim turu" (geri bildirim #7, #10, #12, #19)
---

# Oyunda ekranda tek ölçü olur; skora katılmayan ikinci birim çizilmez

**Karar:** Her oyunun HUD'ı yalnız skor birimini gösterir. Skora katılmayan toplanabilirler (spike-wall boncuğu) ve süsleyici birimler (flutter şekeri: geçmenin süsüydü) kaldırıldı; süre baskısı başka bir birime dönüşüyorsa (crack-it: 8 sn fitil → bir anahtar yanar) o birimin üstünde gösterilir, ayrı çubuk olarak değil. Tam isabet ödülü oyunun kendi ölçüsünde ya da oynanışta olur (bridge: sonraki platform genişler), asla ikinci bir puan türü olmaz.

**Neden:** Yusuf'un hissi: "iki yerden baskılanıyoruz", "hem metre hem boncuk mu var anlamadım", "şeker gibi birimlere gerek yok". Oyun 30 saniyelik; oyuncu bir sayıyı izler, ikincisi kafa karıştırır ve sahneyi kalabalıklaştırır (sade sahne ilkesi, DESIGN.md).

**Reddedilen alternatifler:**
- Boncuk başına +5 m (spike-wall): "m" ölçüsünü bulandırır.
- Crack-it'te anahtarları kaldırıp tek 60 sn süre: oyunun "az tahminle bul" çekirdeği değişir; sonra düşünülebilir.
- Crack-it fitilini 8 → 12 sn yapmak: baskı azalır ama iki gösterge kalır.
- Bridge'de tam isabete puan bonusu: ikinci birim yaratır.

**Uygulama:** spike-wall'da boncuk üretimi sim'de kaldı (RNG akışı/harita değişmesin), yalnız çizilmiyor; `secondary` sonuç satırı kalktı. `gecit` birimi `src/shared/score.ts`. Crack-it fitili `drawFuseKey` (HUD anahtar dizisi), son 3 sn anahtar tamamen kırmızı + nabız.
