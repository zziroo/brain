---
type: session
project: tussle
date: 2026-10-19
status: active
tags: [tussle, magaza, android, ios, derin-baglanti, textzoom, yayin]
source: yan oturum "mağaza derlemeleri" (2026-10-19 ~03:50-04:30, mobil-playus), commit `8c2b7d7`
---

# Oturum: mağaza derlemeleri — Android 1.8 (vc 12), iOS 1.2 (build 8)

Amaç: `98c61ab`'deki iki yerel değişikliği telefonlara ulaştırmak (OTA ile gidemez): Android WebView `setTextZoom(100)` ([[2026-10-19-android-textzoom-sistem-yazi-boyutu]]) ve derin bağlantılar (Android App Links + iOS Universal Links, `docs/CAPACITOR.md` "Deep links").

## Yapılanlar
- **Play App Signing SHA-256** Console > Uygulama imzalama'dan (Claude in Chrome, kopyala düğmesi + `pbpaste`) okundu: `0E:5C:...:79:66`, `assetlinks.json` ile aynı; sunucu yayını gerekmedi. Google `assetlinks:check` = `linked: true`. Console'daki "Önceki uygulama imzalama anahtarları" (16 Eki, "Kuantum uyumlu (Beta)") iki ek SHA-256 daha veriyor (`3C:95:...:77:D4`, `50:01:...:7B:57`); Play'den kurulan uygulama şimdiki anahtarla imzalı olduğu için eklenmedi. Cihazda doğrulama `verified` çıkmazsa ilk aday bunlar.
- **Apple Associated Domains:** yeni `scripts/apple-capabilities.mjs` (ASC API `bundleIdCapabilities`, `--list` ile durum) App ID `net.ziroo.tussle`'da açtı; portal tıklaması gerekmedi. Arşivde `com.apple.developer.associated-domains = applinks:tussle.ziroo.net` imzalı, otomatik imza profili kendisi yeniledi.
- **Sürümler:** Android `versionCode 12` / 1.8, iOS `MARKETING_VERSION 1.2` / build 8 (commit `8c2b7d7`, Play ve TestFlight notları aynı commit'te).
- **Derleme temiz worktree'den:** aynı klasörde başka oturum `format.ts` / `today-core.ts` düzenliyordu; [[2026-10-18-yayin-temiz-worktree-den-yan-oturum-ayni-klasorde]] kalıbı (`git worktree add --detach`, `node_modules` symlink, `keystore.properties` + `local.properties` kopyası). `cap sync` worktree'de `capacitor.settings.gradle` / `Package.swift` yollarını ana klasörün `node_modules`'una mutlak yazar; zararsız, commit'lenmez.
- **Android:** AAB içinde autoVerify filtresi + `setTextZoom` kontrol edildi; `play:upload` iç test, `--promote 12 --track alpha` kapalı test, ikisi `completed` (~04:02).
- **iOS:** arşiv + export yükleme başarılı (~04:05); `testflight.mjs 8`: VALID, What to Test yazıldı, dış gruba eklendi, beta incelemesine gönderildi (~04:10).

## Bekleyen
- Xiaomi bağlı değildi: Play'den 1.8 kurulunca `adb shell pm get-app-links net.ziroo.tussle` = verified ve `am start ... -d 'https://tussle.ziroo.net/?oda=TEST'` uygulamayı açıyor mu; büyük sistem yazısında arkadaşın telefonu.
- iPhone'da build 8: Notlar'da davet linkine uzun bas, "Tussle'da aç".
