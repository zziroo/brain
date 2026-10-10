---
type: decision
project: diskort
date: 2026-09-30
status: active
tags: [diskort, imzalama, signpath]
source: memory diskort-rules.md, diskurt-project.md, diskort-handoff.md
---

# Windows kod imzalama (SignPath) şimdilik başvurulmaz; release'ler imzasız

## Bağlam
SmartScreen/Gatekeeper uyarılarının bilinen çözümü imzalamaydı. 2026-09-26'da Yusuf "şimdi değil" dedi; 2026-09-30'da SignPath'e başvurmama kararını netleştirdi.

## Karar
Başvuru yok. `SIGNPATH_*` secret'ları yok, release'ler imzasız. Herkese açık `/code-signing` sayfası ve `docs/kod-imzalama.md` bunu söylüyor.

## Neden
Her release'te iki manuel onay gerekiyor; Yusuf her build'de angarya istemiyor.

## Reddedilen alternatifler
- SignPath Foundation (ücretsiz, önerilen).
- Certum Open Source (~50 USD/yıl).
- macOS için Apple Developer imzalaması (notarization) bu kararın dışında ama aynı "şimdi değil" tonunda ertelenmişti. 2026-10-10'da macOS imzalaması yapıldı: [[macos-developer-id-imza-ve-otomatik-guncelleme]] (Windows kararı aynen geçerli).

## Sonuçlar / riskler
Manuel adım ekleyen hiçbir şey önerme. Konu dönerse başvuru taslağı `docs/kod-imzalama.md` içinde; önce `/code-signing` sayfasındaki "şu an imzasız" notu kaldırılmalı.

## İlgili
- [[surum-cikarma-kurali]], [[_overview]]
