---
type: decision
project: tussle
date: 2026-10-13
status: active
tags: [tussle, capacitor, android, ui]
source: oturum 2026-10-13 üçüncü (mobil-playus: Capacitor Android)
---

# Karar: Android kabuğu gömülü web; uygulamada durum çubuğu şeridi, kaydırma çubuğu yok, geri tuşu rota korumasından geçer

## Karar
- `android/` repoda (Capacitor 8, Gradle 9.1: Android Studio'nun JDK'sı Java 25, Gradle 8.14 çalışmıyor). applicationId `net.ziroo.tussle`, minSdk 24, portre, `allowBackup=false` (localStorage'daki oturum token'ı Drive yedeğine gitmesin).
- Uyarlanabilir ikon `icon.svg`'den, Android 12 sistem açılış ekranı sayfa renginde (`#fff1e0`).
- **Güvenli alan:** CSS `env(safe-area-inset-*)` yerine `var(--safe-area-inset-*, env(...))`; Capacitor Android env() değil kendi değişkenini basıyor (WebView 140+). iOS ve web env()'e düşer.
- **Durum çubuğu şeridi:** uygulamada (`html[data-native]`) sayfa renginde sabit `body::before` şeridi (z-index 40, sheet'lerin altında). Yoksa kaydırılan içerik saatin altına giriyor; sayfa kenardan kenara çiziliyor. Her iki platform.
- **Kaydırma çubuğu:** `html[data-native]`'de gizli (Android WebView sağda çiziyor).
- **Geri tuşu:** `@capacitor/app` backButton → `history.back()`; geçmiş yoksa `minimizeApp()` (uygulama kapanmaz). hashchange üzerinden app.ts rota koruması çalışır: puanlı denemede çıkış reddedilir (telefonda doğrulandı), antrenmanda serbest.
- Karışık içerik (emülatörde http API) yalnız `TUSSLE_ALLOW_MIXED=1` ile; `build:app` bunu temizler; cleartext yalnız debug kaynak setinde 10.0.2.2/localhost.
- Komutlar: `npm run build:android` → `dist/tussle-debug.apk` (canlı sunucuya bağlı, debug imzalı; sideload için). Rehber `docs/CAPACITOR.md`.

## Neden
- Telefon testinde (Xiaomi 17 Pro, Android 16, WebView 153) üst pay sıfırdı ve kaydırınca logo saatin altına giriyordu; sağda çubuk vardı.
- Geri tuşunun uygulamayı kapatması yerine küçültmesi Android beklentisi; oyun ortasında çıkışı aynı koruma engelliyor.

## Reddedilen alternatifler
- Durum çubuğunu opak yapıp kenardan kenara çizimden vazgeçmek (`setOverlaysWebView false`): iOS'ta mümkün değil, iki platform ayrışırdı.
- Paket için `TUSSLE_API_BASE` ile karışık içerik kapısı: export unutulunca canlı pakete `allowMixedContent: true` yazabiliyordu (inceleme bulgusu).

## İlgili
- [[2026-10-13-paket-kimligi-net-ziroo-tussle-ve-ios-kabuk]]
- [[2026-10-13-capacitor-gomulu-web-ve-canli-guncelleme]]
