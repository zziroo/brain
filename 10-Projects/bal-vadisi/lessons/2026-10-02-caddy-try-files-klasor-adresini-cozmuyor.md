---
type: lesson
project: bal-vadisi
date: 2026-10-02
status: active
tags: [bal-vadisi, diskort, caddy, yayin]
source: oturum 2026-10-02 (incremantal-game)
---

# Diskort'un Caddy kuralında klasör adresleri index.html'e çözülmüyor; `<klasör>.html` ve `<klasör>/.html` ile çözüldü

## Ne oldu
`apps/web/games/index.html` yüklendi ama `/games/` ve `/games` Diskort indirme sayfasını döndürdü (HTTP 200, yanlış içerik). Kural: `try_files {path} {path}.html /index.html` (Caddy 2.11.4). `{path}` klasörle eşleşmedi, istek `/index.html`'e düştü. Açık dosya yolu (`/games/index.html`) çalışıyordu.

## Ders
- Yayın sonrası yalnız HTTP koduna bakma: SPA fallback'li sitede yanlış sayfa da 200 döner. Boyutu ve `<title>`'ı kontrol et.
- Ayara dokunmadan çözüm: kuralın `{path}.html` ayağı kullanıldı. Her sayfa üç kopya yayınlanıyor: `games.html` (`/games`), `games/.html` (`/games/`), `games/index.html`. Göreli yollar üçünde de aynı çözülsün diye sayfaya `<base href="/games/.../">` ekleniyor. `deploy.sh` bunu otomatik yapıyor.

İlgili: [[2026-10-02-oyunlar-diskort-alan-adinda-games-altinda]]
