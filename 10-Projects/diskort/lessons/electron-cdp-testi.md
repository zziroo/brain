---
type: lesson
project: diskort
date: 2026-09-26
status: active
tags: [diskort, electron, test, gizlilik]
source: memory diskurt-dev-environment.md
---

# Dev Electron penceresi CDP ile test edilir; masaüstü ekran görüntüsü alınmaz

- Dev Electron penceresi computer-use'a verilemez. `DISKORT_DEBUG_PORT=9222 DISKORT_FAKE_MEDIA=1` ile başlatılır (yalnız dev anahtarları, `src/main/index.ts`) ve küçük bir Node WebSocket CDP betiğiyle sürülür. Dev'de `window.__diskort` ses istemcisini ve store'ları açar.
- Uygulama pencerelerini görmek için masaüstü ekran görüntüsü ALMA: bir kez Yusuf'un özel sohbetini yakaladı. Splash için `resources/splash/index.html` tarayıcı panelinde önizlenir.

## İlgili
- [[yerel-installer-testi-userdata]], [[yerel-ui-test-ortami]]
