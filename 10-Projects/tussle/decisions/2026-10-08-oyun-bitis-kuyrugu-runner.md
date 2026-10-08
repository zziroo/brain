---
type: decision
project: tussle
date: 2026-10-08
status: active
tags: [tussle, oyun, runner, animasyon, sozlesme]
source: oturum 2026-10-08 gece (mobil-playus UI yenileme)
---

# Karar: oyun bitince runner kısa bir "görünüm kuyruğu" çizer; sim adımı ve girdi günlüğü değişmez

## Bağlam
`finish()` sim `done` olduğu karede döngüyü durduruyordu; Kule'de düşen blok, Bıçak'ta sekme gibi bitiş animasyonları hiç görünmüyordu (`docs/POLISH.md` maddesi). Yusuf "her yer yumuşak" istedi.

## Karar
- `GameView.endTailMs?: number` (isteğe bağlı, varsayılan yok = eski davranış). Runner `done` sonrası bu süre kadar (en çok 700 ms) rAF ile render etmeye devam eder, `step()` erken döner, girdi kapalı; sonuç `setTimeout` ile gönderilir (gizli sekmede de biter). `host.reducedMotion` → kuyruk 0.
- `EndClock` yardımcısı (view-kit) bitişten beri geçen ms'yi verir (kare aralığı 50 ms ile sınırlı).
- Dört oyunda 480–520 ms yumuşak final; sonuç kartı beklemesi kuyruk varsa 150 ms (toplam ~0,65 s).
- Sözleşme `docs/GAME-CONTRACT.md` §5–6'da.

## Neden
- Tekrar oynatma ve sunucu doğrulaması `tickCount` ve girdi günlüğüne bağlı; kuyruk yalnız görünümde olduğu için ikisi birebir aynı kalıyor.
- Ölçüm: kuyrukta render süresi yükselmedi (Matematik ~+0,15 ms ortalama, en yüksek değer aynı).

## Reddedilen alternatifler
- **Sonuç kartını geciktirip canvas'ı dondurmak:** animasyon yok.
- **Bitişi sim'e eklemek (ek tick):** skor/tekrar oynatma sözleşmesini bozar.

## İlgili
- [[2026-10-08-deterministik-sim-ve-sunucuda-tekrar-oynatma]]
- [[2026-10-08-ui-yenileme-dersleri]]
