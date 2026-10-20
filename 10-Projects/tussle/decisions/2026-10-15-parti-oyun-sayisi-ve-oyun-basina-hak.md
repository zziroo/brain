---
type: decision
project: tussle
date: 2026-10-15
status: active
tags: [tussle, parti-gecesi, canli-kapisma, karar]
source: oturum 2026-10-15 (mobil-playus: tema sadeleştirme, parti ayarları, sonraki gün, 25 oyun geri bildirimi)
---

# Karar: Parti Gecesi 1–10 oyun, oyun başına 1–3 hak, en iyi skor sayılır

## Bağlam
Parti Gecesi 3/5/7 sabit oyun sayısı ve oyun başına tek koşuyla açılmıştı ([[2026-10-11-parti-gecesi]]). Kurulum daha esnek olmalıydı.

## Karar
- Oyun sayısı 1–10 (`PARTY_MAX_GAMES=10`), 3/5/7 sabiti kalktı.
- Oyun başına 1–3 hak (`PARTY_MAX_ATTEMPTS=3`); **en iyi skor sayılır** (Yusuf seçti).
- "Hepsi rastgele" düğmesi + slot başına rastgele; slota dokununca hak ×1→×2→×3 döner (his kararı, telefonda denenmedi).
- Sunucu: migration 14 (`parties.attempts` JSON, `matches.attempts`, `match_players.runs`). Canlı maçta N deneme: deadline N×tavan+60 sn, "denemeler arası" durumu, en iyi doğrulanmış koşu tutulur; maçtan ayrılan kalan haklarını kaybeder ama en iyisi kalır; hiç denemesi olmayan çıkmış sayılır. `POST /api/rooms/:code/matches/:id/stop`. `PARTY_LIVE_MAX_MS` 90→150 dk.
- İnceleme bulguları (2 orta) düzeltildi: geç gelen f=1 paketi yeni koşu başlatmıyor; süre dolunca düşük-iyi oyunlarda yarım koşu en iyiyi ezmiyor.
- Sözleşme `docs/PARTY-PLAN.md` güncel.

## Neden
- Küçük grupta kısa parti, kalabalıkta uzun gece; sabit 3/5/7 ikisine de dar.
- Birden fazla hak şans faktörünü azaltıyor; en iyi skor tek kötü koşuyu cezalandırmıyor ve günlük oyunun kuralıyla aynı.

## Reddedilen alternatifler
- Son deneme sayılır: risk alıp kötü biten son koşu cezalanır, kafa karıştırır.
- Toplam sayılır: oyun birimleri farklı, uzun koşulu oyunlar ağır basar.

## Sonuçlar / riskler
- Telefonda ve gerçek kişilerle denenmedi; hak döndürme UX'i belirsiz.
- Parti süresi uzayabilir (tavan 150 dk).

## İlgili
- [[2026-10-11-parti-gecesi]] (oyun sayısı ve tek koşu kısmını değiştirdi)
- [[2026-10-15-tussle-tema-parti-sonraki-gun-denge-turu]]

- 20 Eki: oyun başı hak seçimi kalktı, tek "Kaç hak" seçimi: [[2026-10-20-parti-gecesi-tek-hak-secimi]].
