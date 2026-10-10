---
type: resource
project: diskort
date: 2026-09-30
status: active
tags: [diskort, runbook, release]
source: memory diskort-server.md, diskort-workflow.md
---

# Release: sürümleri artır, tag at, CI taslağı doldursun, notlarla yayınla, güncelleme yayınını kontrol et

Yalnız Yusuf "sürüm çıkar" deyince ([[surum-cikarma-kurali]]).

1. `apps/desktop` VE `apps/mobile` package.json sürümlerini artır (eşleşmek zorunda) -> commit "Sürüm X".
2. `git tag vX && git push origin vX` -> `.github/workflows/release.yml` Win/Linux/mac'i önceden oluşturulmuş tek taslağa derler (Linux xvfb duman testi).
3. `gh run watch <id>` arka planda; varlıkları kontrol et: exe/dmg/AppImage/deb; parmak izi değişmediyse apk+ipa yeniden kullanılır; `ota-*.json` runtimeVersion.
4. `gh release edit vX --draft=false --latest --notes-file <dosya>` (Türkçe notlar scratchpad'de).
5. `https://diskort.ziroo.net/updates/latest.yml`'i yokla.
- GitHub push bazen bağlanamaz: tekrar dene.
- **Yayın = zorunlu güncelleme (0.1.3'ten beri):** istemciler açılışta (splash) günceller; sunucu eski gateway istemcilerini 5 dk içinde reddeder (UPDATE_REQUIRED, kapanış kodu 4010). Acil durumda infra/.env `CLIENT_UPDATE_ENFORCE=0`.
- Güncellemeler `https://diskort.ziroo.net/updates/*` üzerinden (API 302 -> GitHub). Masaüstü kurulum klasörü `Programs\diskort` (`installer.nsh`); güncelleyici günlüğü `%APPDATA%\Diskort\logs\updater.log`. macOS 0.10.3'ten beri Developer ID imzalı + notarize ve otomatik güncellenir ([[macos-developer-id-imza-ve-otomatik-guncelleme]]); macOS işi notarizasyonla ~35 dk sürer, sertifika secret'ı yoksa iş hata verir.
- Android: APK yalnız GitHub Actions'ta (`android.yml`), release.yml tag'de çağırır. Manuel CI çalışması yalnız arm64 (hızlı test APK).
- Mobil: [[mobil-ota-guncelleme]].

## İlgili
- [[deploy]], [[ios-cihaz-ekleme]]
