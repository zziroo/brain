---
type: lesson
project: tussle
date: 2026-10-19
status: active
tags: [tussle, ders, android, ios, derin-baglanti, asc-api]
source: yan oturum "mağaza derlemeleri" (2026-10-19, mobil-playus)
---

# Ders: derin bağlantı önkoşulları ve doğrulaması portal/ekran olmadan yapılabiliyor

- **Apple App ID yeteneği ASC API ile açılır:** `POST /v1/bundleIdCapabilities` (`capabilityType: ASSOCIATED_DOMAINS`) aynı API anahtarıyla çalıştı; `scripts/apple-capabilities.mjs` (`--list` durum gösterir). Sonraki `xcodebuild -allowProvisioningUpdates` profili kendisi yeniledi, imza hatası çıkmadı. Developer portal tıklaması gerekmedi.
- **Play App Signing SHA-256'sını okumak:** Console > Uygulama imzalama sayfasında değer metin olarak erişilebilir ağaçta yok; "SHA-256 sertifika parmak izini kopyala" düğmesi + `pbpaste` ile okunur. Google'ın kendi kontrolü: `digitalassetlinks.googleapis.com/v1/assetlinks:check?...&target.android_app.certificate.sha256_fingerprint=...` → `linked: true`.
- **Cihazda uygulamayı öne getirmeden doğrulama:** `pm get-app-links <paket>` = verified; `cmd package resolve-activity --brief -f 0x00010000 -a android.intent.action.VIEW -c android.intent.category.BROWSABLE -c android.intent.category.DEFAULT -d <url>` uygulamanın aktivitesini verir. `-f 0x00010000` (MATCH_DEFAULT_ONLY) olmadan sonuç `ResolverActivity` çıkar; bu yanlış alarm. "Selection state: Disabled" kullanıcının elle seçim yapmadığı anlamına gelir, doğrulanmış linki etkilemez.

İlgili: [[2026-10-19-android-textzoom-sistem-yazi-boyutu]], oturum [[2026-10-19-tussle-magaza-derlemeleri-android-1-8-ios-build-8]].
