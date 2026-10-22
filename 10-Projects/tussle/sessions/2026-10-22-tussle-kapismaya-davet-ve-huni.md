---
type: session
project: tussle
date: 2026-10-22
status: unverified
tags: [tussle, pazarlama, davet, olcum]
source: "oturum 2026-10-22 (mobil-playus: pazarlama durum değerlendirmesi)"
---

# Oturum: pazarlama durum taraması, kapışmaya davet (Faz 1) ve huni ölçümü

- Durum (canlı DB, 22 Eki): 112 hesap, 64 odaya girmiş, günlük aktif 4–17 (çoğu gün 7–10), haftada 436 maç (267'si 18 Eki ajan testi), 1 satın alma. Çıkış çizgisinden yalnız arena oyunları tamamdı.
- Yapılan: main `2a6aff9` (events + huni) → `387f516` davet dalı → merge `d960447` → `1a459eb` bağlama + inceleme düzeltmeleri. Karar: [[2026-10-22-kapismaya-davet-mac-linki-ve-kendi-olay-tablosu]]. 184 test dosyası / 2646 test yeşil. Yayınlandı 22 Eki 13:06 (OTA 0.20261022.1306, DB 28, göç 27+28 sorunsuz), telefonda denenmedi.
- Süreç: keşif (haiku) → iki opus ajanı paralel (ölçüm ana kopyada, davet worktree'de; göç 27/28 paylaşımı önceden verildi) → iki inceleme (high) → şüpheci (2 orta CONFIRMED) → düzeltmeler → merge (db.ts ve kod haritası çakışması elle) → bağlama ajanı → son inceleme (2 düşük, elle düzeltildi).
- Sıradaki: telefon teyidi (Yusuf), yayın (`bash deploy/release.sh`; göç 27+28), konsol beyanları, Faz 2 (davetli kartı, Install Referrer, Tussle'ı tanı), plan dokümanını arena/1v1'e göre güncelleme.
