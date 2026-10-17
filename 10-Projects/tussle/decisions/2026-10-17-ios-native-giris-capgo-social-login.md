---
type: decision
project: tussle
date: 2026-10-17
status: active
tags: [tussle, giris, ios, capacitor, magaza]
source: Claude Code yan oturumu 2026-10-17 "tussle: iOS native Google+Apple giriş" (Yusuf: "baslayabilirsin")
---

# Karar: iOS'ta native Google ve Apple girişi tek eklentiyle (@capgo/capacitor-social-login), ikisi birlikte ya da hiç

## Bağlam
Web ve Android TWA'da Google/Apple girişi canlıydı ([[2026-10-17-web-google-apple-girisi-acildi-android-twa-ile]]). iOS Capacitor kabuğunda web SDK'ları çalışmaz (web kökenine bağlı), düğmeler gizliydi. App Store 4.8: Google girişi varsa Apple girişi de olmalı.

## Karar
- Eklenti `@capgo/capacitor-social-login` 8.5.19 (Capacitor 8 + SPM uyumlu, OTA updater ile aynı ekip). `capacitor.config.ts` `SocialLogin.providers` yalnız google + apple; Facebook ve Twitter kapalı, eklentinin sync kancası Package.swift'ten Facebook SDK'yı çıkarır.
- GCP `tussle`'da iOS OAuth istemcisi "Tussle iOS" (bundle `net.ziroo.tussle`, Team F892426M52); Info.plist'te ters client id URL şeması.
- Sunucu birden çok audience kabul eder: Google = web istemcisi + `GOOGLE_IOS_CLIENT_ID`; Apple = Services ID + `APPLE_BUNDLE_ID` (varsayılan `net.ziroo.tussle`). `/api/auth/providers` `google.iosClientId` verir.
- iOS düğmeleri yalnız ikisi birlikte açılabiliyorsa çıkar: sunucu iOS kimliği + Apple veriyorsa, uygulamada eklenti varsa (`isPluginAvailable`) ve sunucudaki iOS kimliği uygulamaya gömülü sabitle aynıysa.
- Build 4 ile çıktı; `otaMinNative` değişmedi, eklentisiz eski yapılar düğme göstermez.

## Neden
- Tek eklenti iki sağlayıcıyı aynı API ile verir, bakımı süren tek aday; `@codetrix-studio/capacitor-google-auth` Capacitor 6'da kaldı, `@capacitor-community/apple-sign-in` yalnız Apple.
- Ayrı env değişkenleri (virgüllü liste yerine): istemci hangi kimliğin iOS'a ait olduğunu bilmeli; mevcut `.env` geriye uyumlu kalır.
- Gömülü sabit kontrolü: Info.plist'te şeması kayıtlı olmayan istemciyle Google SDK native istisna atar (çökme).

## Reddedilen alternatifler
- Kendi küçük Swift eklentimiz (AuthenticationServices + GoogleSignIn SPM): daha az bağımlılık ama daha çok bakım; Yusuf eklentiyi seçti.
- `@capacitor-firebase/authentication`: Firebase bağımlılığı gereksiz.
- Nonce doğrulaması: review'da düşük önemli bulgu (genel public-client riski); şimdilik eklenmedi, istenirse sonra.

## Sonuçlar / riskler
- iOS kimliği üç yerde aynı olmalı (`.env`, Info.plist, `auth-providers.ts` sabiti); değişirse yeni iOS build gerekir.
- Google `sub` aynı GCP projesinde istemciler arasında, Apple `sub` aynı ekipte Services ID ile bundle arasında aynı; iOS'ta giriş aynı hesaba düşer (üretim kimlikleriyle karşılaştırılarak doğrulandı).

## İlgili
- [[2026-10-16-native-google-apple-giris-play-imzasindan-sonra]] · [[2026-10-17-ios-native-giris-simulator-tuzaklari]] · [[2026-10-17-tussle-ios-native-giris]]
