---
type: session
project: tussle
date: 2026-10-16
status: active
tags: [tussle, oturum, parti, oda, yayin]
source: oturum 2026-10-16 (mobil-playus) /basla → oda ve parti sınırı 32 → yayın + OTA
---

# Oturum: oda ve parti sınırı 32, yayın + OTA

- `/basla` ile durum özeti verildi; repo `main`, GitHub ile aynıydı, canlı `114db8f`.
- Yusuf partinin neden 16 kişi olduğunu sordu. Cevap: oda üye sınırıydı, parti ona bağlıydı, özel bir gerekçesi yoktu. 32'ye çıkarıldı, ayrı `PARTY_MAX_PLAYERS` eklendi: [[2026-10-16-oda-ve-parti-siniri-32-ayri-parti-sabiti]].
- İş bölümü: Opus ajanı uyguladı (58 araç çağrısı), ayrı Opus inceleme ajanı diff'i okudu ve iki düşük önemli bulgu çıkardı. Koordinatör ikisini düzeltti, 1.737 test yeşil, tip denetimi temiz.
- **Yayın:** commit `1d44092` GitHub'da. Sunucuya `deploy/release.sh` ile yayınlandı (yedek `pre-1d44092.db`, sağlık kontrolü ok, konteyner rev `1d44092` doğrulandı). OTA **0.20261016.1743** (`current.json` rev `1d44092`). DB şeması değişmedi.
- Yusuf "Android'de ilk oyun kasar gibi oldu" dedi. Hz ölçümü sebep değil; 90 Hz ekranda 60 sınırının kareleri düzensiz verdiği bulundu: [[2026-10-16-90-hz-ekranda-60-fps-siniri-duzensiz-kare]] (doğrulanmadı).
- **Açık:** 32 kişilik ara sahne telefonda denenmedi; 90 Hz anahtarıyla akıcılık denemesi Yusuf'ta.
