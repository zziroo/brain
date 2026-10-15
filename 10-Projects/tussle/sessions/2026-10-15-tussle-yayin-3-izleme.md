---
type: session
project: tussle
date: 2026-10-15
status: active
tags: [tussle, izleme, canli, gunluk, yayin, ota]
source: oturum 2026-10-15 (mobil-playus: Yayın 3 izleme)
---

# Oturum: Yayın 3 izleme (kapışma/parti/günlük), sunucu ve OTA yayını

## Yapılanlar
- Karar: [[2026-10-15-izleme-girdi-akisi-ortak-tohum-kendi-denemen-bitince]]. Keşif (haiku) → koordinatör protokol + plan → dilim A (sunucu `spectate.ts`, hub kancaları, gönderen `inp-stream.ts`) ‖ dilim B (`spectator-core.ts`, `spectate-screen.ts`, `watch-row.ts`) → dilim C (bağlama: maç/parti sonuç satırı ve kartı, oda ekranı "Şu an oynuyor", `watch-source.ts`, hata metinleri, bot script).
- İki inceleme + şüpheci: yüksek bulgu yok; iki orta düşüğe indi; 7 düşük düzeltildi, düşür/başlat bekleme süresi koordinatörce eklendi. 1.709 test yeşil (106 dosya).
- Commit `b3b1c0e` main, GitHub'da; `release.sh` ile sunucuda (yedek `pre-b3b1c0e.db`), OTA paketi **0.20261015.1920** (minNative 1) sunucuda; güncelleme ucu doğrulandı.
- Ders: [[2026-10-15-paralel-dilimler-icin-once-protokolu-koordinator-yazar]].

## Doğrulanmayanlar
- Tarayıcıda yalnız günlük yol botla görüldü (satır, "Önce kendi denemeni oyna", izleme ekranı "Bitti" ve botun doğrulanmış skoru aynı). Maç/parti satırları, yeniden bağlanma tekrarı, `watch.not_yet` kartı tarayıcıda görülmedi.
- Telefonda hiçbir şey görülmedi; gerçek kişilerle izleme denenmedi. İlk gerçek OTA indirmesi hâlâ görülmedi.
