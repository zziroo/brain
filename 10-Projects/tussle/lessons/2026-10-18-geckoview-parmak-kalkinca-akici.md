---
type: lesson
project: tussle
date: 2026-10-18
status: active
tags: [tussle, android, geckoview, webview, twa, performans]
source: oturum 2026-10-18 "tussle: Android TWA yerine Capacitor + oyun tanınması"
---

# Ders: GeckoView'de Slice parmak kalkınca da akıcı (Xiaomi 17 Pro)

## Ne oldu
Yusuf TWA'nın "site gibi" görünmesinden ve uygulamanın oyun olarak tanınmamasından rahatsız. Önce Capacitor'a dönüş denendi: `appCategory="game"`, renderer önceliği ve Game Turbo performans modu ile de parmak kalkınca takıldı ([[2026-10-16-android-webview-parmak-kalkinca-takilma]]). Sonra en küçük GeckoView kabuğu (`android-gecko/`, GeckoView 148, yalnız arm64, `https://tussle.ziroo.net/?web=1#/oyun/kes` açar) kuruldu: **Yusuf: "akıyor"**.

## Notlar
- GeckoView 154 ve sonrası compileSdk 37 + AGP 9.1 ister; repo AGP 8.13 / SDK 36'da, bu yüzden 148 kullanıldı.
- Hata ayıklama APK'sı 188 MB (arm64, sıkıştırmasız); mağaza boyutu ölçülmedi.
- iOS'ta karşılığı yok (Apple WebKit dışı motora izin vermiyor, AB'deki BrowserEngineKit yalnız tarayıcı uygulamaları için); iOS zaten WKWebView'de akıcı.
- Oyun sırasında ekran görüntüsü: `adb exec-out screencap -p -d <display-id>`; birden çok ekran varken `-d` olmadan dosyanın başına uyarı yazılır, PNG bozulur.

## Uygula
Android'i TWA'dan GeckoView kabuğuna taşımak masada; karar ve plan ayrı not.
