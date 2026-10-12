---
type: lesson
project: diskort
date: 2026-10-12
status: active
tags: [diskort, android, kotlin, ci]
source: Claude Code oturumu 2026-10-12 (DPDFNet Kotlin değişikliği)
---

# Ders: Bu Mac'te JDK/Android SDK yok; Kotlin değişikliğini `gh workflow run android.yml --ref main` ile doğrula

`apps/mobile/modules/noise-filter` gibi Kotlin kodu yerelde derlenemez, ajanlar yalnız gözle söz dizimi kontrolü yapar. `Android APK` iş akışı (`.github/workflows/android.yml`) yalnız `workflow_dispatch`/`workflow_call` ile çalışır: expo prebuild + `assembleRelease` + `:noise-filter:testReleaseUnitTest` koşar, test APK'sını artifact olarak saklar, yayın yapmaz. Push sonrası tetikleyip `gh run watch <id> --exit-status` ile beklemek ~10-15 dk. Sürüm iş akışı da aynı işi çağırır; ama sürümden önce derlemeyi görmek için bu yol ucuz.

Bağlantı: [[dpdfnet-esikler-gevsetildi-android-ayri-is-parcacigi]].
