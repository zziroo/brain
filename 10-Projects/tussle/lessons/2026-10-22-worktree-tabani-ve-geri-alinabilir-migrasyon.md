---
type: lesson
project: tussle
date: 2026-10-22
status: active
tags: [tussle, orkestrasyon, worktree, migrasyon, yayin]
source: oturum 2026-10-21/22 (mobil-playus: ⚔ sayfası, jeton, şans hakkı kaldırma)
---

# Ders: worktree ajanı eski commit'ten açılabilir; yıkıcı migrasyon geri almayı bozar

## Ne oldu
- `isolation: "worktree"` ile başlatılan iki ajanın worktree'si main HEAD (1755787) yerine eski bir commit'te (0787aa4) açıldı; jeton bileşeni ve maketler yoktu. İki ajan da kendi fark edip `git merge --ff-only 1755787` ile ileri sardı.
- Şans hakkı kaldırılırken migrasyon 26 `DROP TABLE luck` + `ALTER TABLE days DROP COLUMN luck` içeriyordu. İnceleme ajanı yakaladı: `tussle:prev` geri alması (deploy/README) eski kodu yeni şemada çalıştırır, eski kod luck tablosunu okuduğu için today/start/submit 500 döner.

## Ders
- Worktree ajanının brief'ine taban commit'i yaz ("main <sha>'dan; HEAD farklıysa `git merge --ff-only <sha>`") ve dönüşte `git -C <worktree> log -1` ile kontrol et.
- Kullanılmayan tablo/sütun aynı sürümde düşürülmez: önce kod onu bırakır, düşürme bir sonraki sürümün migrasyonuna kalır. Böylece `tussle:prev` geri alması çalışmaya devam eder. Açık iş: `luck` tablosu + `days.luck` sonraki sürümde düşürülecek.

## İlgili
- [[2026-10-22-hak-jeton-dili-sans-hakki-kalkti]]
