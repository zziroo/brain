---
type: lesson
project: tussle
date: 2026-10-23
status: active
tags: [tussle, sunucu, sqlite, goc]
source: oturum "tussle: oyun turu kalan işler" (2026-10-23)
---
# Ders: CREATE TABLE IF NOT EXISTS göcüne sonradan eklenen sütun eski veritabanında yoktur

Göç 21 `practice_runs`'ı `CREATE TABLE IF NOT EXISTS` ile kuruyordu; `bytes` sütunu bu adımın metnine sonradan eklendi. Tabloyu daha önce kurmuş yerel dev veritabanı (user_version 30 olduğu hâlde) sütunu hiç almadı, her antrenman POST'u 500 verdi; üretim tabloyu sütunla kurduğu için sağlamdı. Tarayıcı kontrolü ajanı konsolda yakaladı.

Kural: var olan bir göç adımının metnini değiştirme; yeni sütun yeni, PRAGMA korumalı `ALTER TABLE ... ADD COLUMN` adımı olur (göç 31 böyle). Dev veritabanı üretimden eski bir şemada kalabilir; "testler geçiyor" bunu göstermez çünkü testler sıfırdan kurar.
