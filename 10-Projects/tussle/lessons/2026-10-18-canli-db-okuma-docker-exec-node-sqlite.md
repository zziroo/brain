---
type: lesson
project: tussle
date: 2026-10-18
status: active
tags: [tussle, sunucu, sqlite, teshis]
source: oturum "tussle: durum ve sıradaki işler" (2026-10-18 akşam), parti 9 olayı
---

# Ders: canlı Tussle DB'sini salt okunur okumak için host'ta sqlite3 yok, konteynerdeki node:sqlite kullanılır

- VPS'te `sqlite3` kurulu değil. Çalışan yol: yerelde bir `.mjs` yaz (`new DatabaseSync('/data/tussle.db', { readOnly: true })`), stdin'den konteynere ver: `ssh vps 'docker exec -i tussle node --input-type=module -' < script.mjs`. Konteynerde veri yolu `/data` (`DATA_DIR`).
- Sunucu saatleri UTC (TR = UTC+3). `docker logs` istek satırı tutmuyor; teşhiste DB (`parties`, `party_players`, `matches`, `match_players`) ve `/opt/tussle/data/logs/client-errors.jsonl` (kullanıcı kimliği, `rev`, `ota`, platform) yeterli oldu.
- `client-errors.jsonl` satırlarındaki `rev`/`ota` alanı istemcinin hangi paketle çalıştığını gösterir: OTA gecikmesi böyle yakalandı ([[2026-10-18-canli-macta-yalniz-dogrulanmis-sonuc-surum-zorunlu]]).

İlgili: [[vps-makinesi]], oturum [[2026-10-18-tussle-basket-glif-lobi-parti-kilidi-magaza]].
