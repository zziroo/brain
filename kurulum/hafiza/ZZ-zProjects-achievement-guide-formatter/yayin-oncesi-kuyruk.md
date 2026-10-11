---
name: yayin-oncesi-kuyruk
description: "Rehber Okuyucu'yu yayına almadan önce AI kuyruğunu ayrı adımda kontrol et; deploy süren üretimi keser"
metadata:
  node_type: memory
  type: feedback
  originSessionId: 3a340586-9a22-4ee3-823c-4e42707af748
  modified: 2026-10-05T18:10:56.778Z
---

`deploy.sh` öncesi `docker exec rehber node src/cli.js list --status all` AYRI komut olarak çalıştırılır ve çıktı okunur; `&&` ile deploy'a zincirlenmez. `pending`/`processing` varsa Yusuf'a sorulur.

**Why:** 2026-10-05'te zincirlenmiş komut, "processing" görünmesine rağmen yayını başlattı ve ~7 dk'lık Opus üretimini kesti.

**How to apply:** her rehber yayınında; ayrıntı vault dersinde (bkz. [[vault-notu]]).
