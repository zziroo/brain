---
type: decision
project: diskort
date: 2026-09-30
status: active
tags: [diskort, android]
source: memory diskort-rules.md, diskort-cosmetics-plan.md
---

# Android minimum sürümü API 26 (Android 8)'e çıkarıldı

## Karar
0.9.2'den beri minimum API 26. Kart videosu Android 10+ (API 29) üzerinde oynar, altında poster gösterilir.

## Neden
Skia video derlemesi API 26 gerektiriyor. Yusuf kimsenin Android 7 kullanmadığını doğruladı.

## Reddedilen alternatifler
Android 7 desteğini sürdürmek: kimse kullanmadığı için.

## Sonuçlar / riskler
Eski APK'lar zorunlu güncelleme ekranını görür (runtime `native-690116b9069056da` ile yeni APK 0.9.2). iOS parmak izi yalnız-android minSdk ve Skia yamasını yok sayar (`apps/mobile/scripts/runtime-version.mjs`).

## İlgili
- [[kozmetik-sunucudan-paketler]], [[mobil-ota-guncelleme]]
