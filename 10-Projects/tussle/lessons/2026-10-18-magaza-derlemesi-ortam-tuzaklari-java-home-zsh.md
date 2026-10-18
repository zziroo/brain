---
type: lesson
project: tussle
date: 2026-10-18
status: active
tags: [tussle, ders, android, ios, araclar]
source: oturum 2026-10-18 akşam (mobil-playus, "tussle: durum ve kalan işler")
---

# Ders: mağaza derlemesinde iki ortam tuzağı (Java yok, zsh değişkeni bölmez)

- **Gradle "Unable to locate a Java Runtime":** kabukta Java yok. `JAVA_HOME="/Applications/Android Studio.app/Contents/jbr/Contents/Home" ./gradlew bundleRelease` (android/ içinde). `build:aab` web kısmını (`build:app`) bitirdikten sonra düşer; yeniden yalnız Gradle adımını koşmak yeter.
- **xcodebuild "invalid option '-allowProvisioningUpdates -authenticationKeyPath …'":** `docs/CAPACITOR.md`'deki `AUTH="…"; xcodebuild … $AUTH` kalıbı zsh'te tek argüman olur (zsh kelimeye bölmez). Bayrakları doğrudan yaz ya da `${=AUTH}` kullan.
- Release arşivinde DEBUG yollarının olmadığını doğrulama: `strings App.app/App | grep -c TussleStartHash` = 0.

İlgili: [[2026-10-13-capacitor-ios-dersleri]], oturum [[2026-10-18-tussle-durum-kalan-isler-ios-motor-yayin]].
