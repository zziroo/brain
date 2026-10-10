---
type: session
project: tussle
date: 2026-10-10
status: active
tags: [tussle, oturum, m1, canli-kapisma]
source: oturum 2026-10-10 (mobil-playus: 4 oyun silme + M1 canlı kapışma)
---

# Oturum: 4 havuz dışı oyun silindi, M1 canlı kapışma yayında (`1ecfed0`)

- **Silme** (`2312f15`): itici, plinko, salyangoz, zar koddan çıktı; eski kayıtlar güvenli (410 `game_gone`, rescore atlar, yeni test `tests/server-removed-game.test.ts`). 50 kayıtlı, 50 havuzda. Bkz. [[2026-10-09-havuz-beceri-oncelikli-havuz-disi-liste]] eki.
- **M1** tek opus ajanı (sırayla 5 tur, aynı bağlam), her tur sonrası inceleme + orta bulgularda sonnet şüpheci:
  - `2bcf163`: kart, eş zamanlı başlangıç, sunucu doğrulaması, yarış şeridi, outbox, migration 11. Düzeltmeler: canlı paket sel koruması, otomatik açılış yarışı, hesap birleştirme, hesap değişiminde soket, "9.999 ms" yerine "–", kapışmada duraklatma metni.
  - `42ea86f`: süresiz canlı lobi, varlık tabanlı iptal, kompakt kart (~100 px), "Kapışma iste" satırı, çapraz kılıç ikonu; budanan kart ve 60 dk güvenlik ağı, yeniden başlatma toleransı.
  - `1ecfed0`: ekran dışı kartlar için ⚔ rozeti (IntersectionObserver), çıkış uyarısı, rozet son mesajı örtmesin.
- Kararlar: [[2026-10-10-canli-kapisma-lobi-karti]]. Dersler: [[2026-10-10-m1-dersleri]]. Plan belgesi repo `docs/M1-PLAN.md`.
- **Yayın** `1ecfed0`: yedek `pre-1ecfed0.db`, DB sürümü 11, healthz ok, 1.530 test (Bıçak GC testi ara sıra düşüyor).
- Yusuf'un sorusu: mevcut oyunlar mı, yeni çok oyunculu oyunlar mı? Cevap: M1 mevcut 50 oyunla yarış; ara basamak "dolaylı etkileşim" (Tetris tarzı rakibe engel); sonra gerçek arena (sumo, Tron vb.; deterministik sim → geri sarmalı ağ kodu). Önce sumo prototipi önerildi, karar M1 telefon denemesinden sonra.

**Doğrulanmadı:** "Geçtin!" balonu gerçek maçta; çoklu telefonla eş zamanlı başlangıç; arka plandan dönüşte kart durumu (yeniden bağlanma yenilemesinin otomatik testi yok); yarış şeridinin dikkat dağıtıp dağıtmadığı.
