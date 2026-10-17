---
type: decision
project: diskort
date: 2026-09-27
status: active
tags: [diskort, mobil, ota, expo]
source: memory diskurt-project.md
---

# Mobil JS güncellemeleri kendi sunucumuzdan OTA ile gelir (expo-updates, kod imzalı manifest)

## Bağlam
Yusuf APK build'lerinin yavaşlığından şikayet edip "masaüstü ve mobili bu şekilde güncelliyor olalım" dedi.

## Karar
- expo-updates kendi sunucumuza bakar: `/updates/expo/android` (Expo Updates protokolü v1, 204 = güncelleme yok), kod imzalı manifestler (özel anahtar `Kasa:diskort/ota-imza/` + GitHub secret `OTA_SIGNING_KEY`; açık sertifika `apps/mobile/certs/certificate.pem` repoda).
- `runtimeVersion` = `@expo/fingerprint` özeti (`apps/mobile/scripts/runtime-version.mjs`); yerel build 'gelistirme'.
- Release CI, parmak izi değişmediyse önceki release'in APK'larını yeniden kullanır; manifest `*-ota-android.json` varsa sunucu `required` = release sürümü.
- İstemci: açılışta 4 sn'lik kapı (kontrol -> indir -> yeniden yükle); arka planda indir, seste değilken öne gelince uygula.
- Masaüstü zaten eşdeğer (electron-updater diferansiyel ~1-2 MB, zorunlu).

## Neden
APK build'leri yavaş; JS-only sürümler CI'da 56 sn'de bitiyor. Doğrulandı 2026-09-27: v0.2.1 -> v0.2.2 telefonda havadan güncellendi.

## Reddedilen alternatifler
Her sürümde yeni APK dağıtmak (yavaş).

## Sonuçlar / riskler
Native değişiklik gerekince yeni APK şart (eski APK zorunlu güncelleme ekranı alır). Android OTA'sı var; iOS da 0.9.2'de OTA ile ulaştı.

## İlgili
- [[android-min-api-26]], [[ios-ad-hoc-dagitim]], [[surum-cikarma]]
