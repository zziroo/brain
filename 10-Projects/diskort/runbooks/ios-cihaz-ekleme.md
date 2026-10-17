---
type: resource
project: diskort
date: 2026-09-29
status: active
tags: [diskort, runbook, ios]
source: memory diskort-ios.md
---

# Yeni iPhone eklemek otomatiktir: UDID kaydı -> admin onayı -> CI yeni profille IPA'yı yeniden üretir

1. Arkadaş https://diskort.ziroo.net/udid üzerinden kayıt olur.
2. Admin panel "iPhone cihazları" -> Onayla. Sunucu 3 dk toplu işler, `ios.yml` dispatch eder (şifreli cihaz girdisi, `IOS_DEVICES_KEY`).
3. ASC API cihazı kaydeder + yeni "Diskort Ad Hoc otomatik ..." profili oluşturur; IPA son tag'den yeniden üretilir (~15-40 dk). İlk açılışta iOS Geliştirici Modu isteyebilir.
- Apple hesabı: App ID `com.diskort.app` (push). Sertifika/anahtar/p12, ASC anahtarları, dispatch token ve parola dosyası `Kasa:diskort/ios-imza/` içinde; yalnız sertifika/profil yenilerken veya secret yeniden yüklerken gerekir; içerik ASLA yazdırılmaz. Sertifika/profiller 2027-09-27'de sona erer.
- GitHub secret adları: APPLE_TEAM_ID, IOS_CERT_P12_BASE64, IOS_CERT_PASSWORD, IOS_PROVISIONING_PROFILE_BASE64, ASC_KEY_ID/ASC_ISSUER_ID/ASC_KEY_P8, IOS_DEVICES_KEY (değerler yazılmaz). Sunucu `.env` içinde GITHUB_DISPATCH_TOKEN + IOS_DEVICES_KEY ([[secret-isleme-kurali]]).
- Güncel IPA: `Diskort-0.8.5-ios.ipa` (runtime `native-4ff5e06b6abd20ec` CI/macOS'ta; yerel Windows betiği aynı durum için `native-3199a3a0...` yazdırır, bu fark bilinen).

## İlgili
- [[ios-ad-hoc-dagitim]], [[surum-cikarma]]
