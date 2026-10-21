---
type: decision
project: tussle
date: 2026-10-21
status: active
tags: [tussle, gorsel, oyun-sahnesi, yuz, gece]
source: Claude Code oturumu "tussle: görsel tur (dolu ama sakin)"; oturum notu [[2026-10-21-tussle-gorsel-tur-parti-1]]
---

> Tamamlar: [[2026-10-21-oyun-sahnesi-dolu-ama-sakin]] (VISUAL.md §2.1).

# Yüz yalnız oynatılan karakterde; Gece'de mürekkebe yakın kontur ve koyu gölge

**Karar 1 (Yusuf, four-arrows kalıbını görünce):** oyun sahnesinde yüz yalnız oyuncunun yönettiği karakterde olur. Seyirci maskot, köşede tezahürat yüzü, tuş/karo/kapak yüzü yok. Yüz oyun bilgisi taşıyorsa (odd-one-out farklı olanı bulma, reflex göz) kalır. Uygulama: four-arrows maskotu, target/knife-toss/stop-wheel/how-many/quick-math/lights yüzleri kaldırıldı.
- **Neden:** "Oynattığımız karakter değilse fazlalık gibi duruyor"; beğenilen oyunların kalitesi zemin, hacim, kontur ve kapak paletinden geliyor.
- **Reddedilen:** her oyuna kapaktaki gibi maskot (ilk B brief'i böyleydi; düz daire-yüz Yusuf'un istemediği şey).

**Karar 2 (Yusuf: "gri çizgiler iyi durmuyor, gölgeler anlaşılmıyor"):** `outlineTone` Gece'de `mixHex(ink, line, 0.3)` (mürekkebe yakın), `groundTones.shadow` Gece'de zemine değil mürekkebe doğru %55. Nesneler artık opak zemin üstünde durduğu için mürekkep okunur. Commit `cfe9b76`, beğenilmezse revert.
- **Reddedilen:** V1 gri orta ton (soluk), V3 dolgudan türetilmiş kontur (kapak tarzı; fark az, karşılaştırma `kontak-gece-varyant.png`).
- **Doğrulanmadı:** telefonda Gece hissi (Yusuf).
