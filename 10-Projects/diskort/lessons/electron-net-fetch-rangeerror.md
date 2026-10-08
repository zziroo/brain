---
type: lesson
project: diskort
date: 2026-10-08
status: active
tags: [diskort, electron, masaustu, hata]
source: Claude Code oturumu 2026-10-08 (canlı hata 2026-10-05, desktop@0.9.6 macOS)
---

# Electron `net.fetch` 200–599 dışı durumda ana süreçte yakalanmamış RangeError fırlatır

Canlıda macOS'ta `Ana süreçte yakalanmamış hata: init["status"] must be in the range of 200 to 599` çıktı; yığın Electron'un `net.fetch` sarmalayıcısındaki `new Response(...)` idi (updater.ts `latest-mac.yml` denetimi). Hata promise'e değil `uncaughtException`'a düşer; try/catch tutmaz, kullanıcı Electron'un hata penceresini görür. 0.10.0'da `net.request` tabanlı `fetchText` (20 sn zaman aşımı, 1 MB sınır) kullanıldı. Ana süreçte `net.fetch` kullanma.

Aynı oturumdan iki küçük ders daha:
- Çökme bildiriminde `reason === 'killed'` çocuk süreçler (oturum kapatma, dışarıdan kapatma) toplu geliyordu; yalnız 2 sn içinde birden çok "killed" bastırılır, tek başına gelen (bellek baskısı olabilir) bildirilir.
- `apps/server/test/netDiagnosis.test.ts` sabit tarihli veriyle `flush()`'a `Date.now()` verince 7 günlük saklama dosyayı siliyordu; teste sabit zaman verildi. Sabit tarihli test verisi + saklama süresi = tarihe bağlı test.
