---
type: session
project: tussle
date: 2026-10-22
status: done
tags: [tussle, kapisma, arena, hazir, baslama-akisi]
source: Claude Code oturumu "tussle: arena oyunları kısa ve etkileşimli"
---
# Kapışma/Arena: "Hazırım" düğmesi ve bekleme evresi (22 Eki)

**Sorun (Yusuf):** maç başındaki açıklama kartı 1–2 sn görünüp gidiyor, oyun anlaşılmadan başlıyor. Karar (Yusuf): kart oyun başlayana kadar kalsın, Hazırım düğmesi basınca yansın, herkes hazır olunca ya da süre dolunca geçsin; ⓘ yok. Parti gecesi otomatik kaldı (ilk görülen oyunda uzun kart fikri rafta).

**Yapılan (commit main, "Ready button before a challenge or arena match"):**
- Sunucu: dolunca state `live` + `go_at NULL` + `ready_until = now+20 sn` (`READY_WAIT_MS`); `POST rooms/:code/matches/:id/ready {ready}`; herkes hazır ya da süre dolunca `go()`: odada olmayan + hazır olmayanlar düşer (<2 → cancel), `go_at = now + GO_LEAD_MS` (2040 + 1000 ms), deadline, arena dünyası o anda başlar. Beklemede leave/stop (update dahil) → withdraw, hükmen yok. Göç 29: `matches.ready_until`, `match_players.ready`. Restart'ta ready_until ≥ now+30 sn. `MATCH_START_DELAY_MS` artık yalnız partide.
- İstemci: `src/client/ui/ready-wait.ts` (`readyControl`), match-core `isWaiting/canPlayLive/readyState`, room.ts `readyWait` + VS beklemede doğal uzunlukta ve düğme o sırada kapalı, go gelince VS kapanır; kartta "Oyna" beklemede görünür; readyUntil+2,5 sn sonra 3 sn'de bir getMatch güvenlik ağı; bind'den önce gelen durum bind anında uygulanır.
- İnceleme: 1 orta (ürün: beklemede ekranı kapatan koltuğunu korur; "Oyna" ile geri dönebilir; kapanış = çekilme istenirse onUnmount'ta `isWaiting` iken stop gönderilir), 4 düşük düzeltildi.

**Açık / telefon teyidi:** iki cihazda Hazırım → 3-2-1 senkronu; 20 sn dolunca "Başlıyor…"; arena 3-4 kişide sayaç; kart + düğme küçük ekranda ve Gece'de taşma (tasma aracında bu ekran yok); beklemede ayrılınca karşı tarafta iptal toast'ı; ekranı kapatıp karttan dönme hissi (koltuk korunuyor, ürün kararı). Eski istemci: goAt null kartı açmaz, go gelince otomatik açılmaz, karttan Oyna gerekir (test aşaması, güncelle denir).

Karar: [[2026-10-22-hazirim-dugmesi-kapisma-arena]].
