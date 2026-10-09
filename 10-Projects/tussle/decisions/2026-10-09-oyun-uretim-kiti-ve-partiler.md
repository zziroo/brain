---
type: decision
project: tussle
date: 2026-10-09
status: active
tags: [tussle, oyunlar, uretim, orkestrasyon, canli-mod]
source: oturum 2026-10-09 (mobil-playus: oda/sohbet/hareket/dil turu + oyun üretim kiti + Parti A)
---

# Karar: ~50 oyun için ortak kabuk + üreteç; karışık türde 6–8'lik üretim partileri; seçim ölçütleri; canlı mod sohbetten kapışma kartı

## Bağlam
Yusuf ~50 mini oyun istedi. 4 oyun aynı kabuğu elle tekrar ediyordu.

## Karar
- **Kit:** `src/games/shell` (ShellView: HUD, bitiş gösterisi, fx, önbellekli etiketler, sticker çizimleri), `src/shared/{sim-kit,scoring,gestures}` (GameClock, ReactionRounds, Combo/timeBonus, Pointer), şablon `src/games/_ornek` (kayıtsız, testli), `npm run new-game -- <id> --name --tag [--move] [--en]` ve `--remove` (marker bloklarıyla; registry, tr/en, kapak yer tutucu). Meta: `duration.typicalSec`, `players 1–4`, `style`. refleks + matematik view'ları kabuğa taşındı, sim'lere dokunulmadı (altın özet eşit).
- **Partiler:** Parti = üretim grubu, oyuncuya görünmez. 6–8 oyun, 3–4 paralel ajan, worktree'de, sonra birleştir + inceleme + bot dengesi. Türler karışık. Parti A yayında: Renk Eşleşti, Çift Dokun, Işık Sırası, Terazi, Zıpla, Kutu Seç.
- **Seçim ölçütleri (Yusuf):** 3 saniyede anlaşılır; "bir tur daha" hissi; piyasada tutmuş mekanikler serbest (görsel/isim bizim); özgün fikir basitse serbest, karmaşık özgün azınlıkta. Görsel: ortak palet/kontur/Nunito, her oyunun kendi havası olabilir.
- **Sıra:** partiler devam; canlı kapışma (M1) havuz 15–20 olunca; Capacitor + mağaza havuz 25+ ve canlı mod oturunca.
- **Canlı mod vizyonu:** sohbetten "kapışma kartı" (oyun + kişi sayısı + süre), Clash Royale savaş isteği gibi; 2, 3 ve 4 kişilik oyunlar; önce aynı tohumlu eş zamanlı yarış, gerçek etkileşim sonra; turnuva/takım/Parti Gecesi kartın üstüne.

## Neden
Kabuk olmadan 50 oyun 50 kez aynı kodu yazmak; üreteç ajanların ortak dosyalara aynı anda yazmasını önlüyor (koordinatör iskeleti önce kurar). Karışık tür, tek türde partinin teknik avantajı olmadığı için.

## Reddedilen alternatifler
- 50 oyunu önceden tamamen tasarlamak: oyuncu verisi olmadan israf; E–F partileri ölçüme göre.
- Canlı modu şimdi: her oyuna hayalet katmanı ekler, havuz büyüdükçe maliyet büyür.

## Sonuçlar / riskler
- Bundle 330 KB (gzip 109 KB); sözlükler ve 10 oyun birlikte paketli; tembel yükleme ileride.
- `gradeSticker` hâlâ oyun başına switch; yeni oyunlar "Bitti!" gösterir (düşük).
- Parti A denge ve ayrıntı notları: `docs/GAMES-ROADMAP.md`, her `sim.ts` başlığı.

## İlgili
- [[2026-10-09-deneme-basina-tohum]]
- [[2026-10-09-havuz-haric-tutma-listesi]]
- [[2026-10-09-parti-a-dersleri]]
