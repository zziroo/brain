---
type: session
project: tussle
date: 2026-10-17
status: active
tags: [tussle, oturum, android, twa, performans]
source: oturum 2026-10-17 gece (mobil-playus) yan oturum, brif [[2026-10-17-twa-deneme-devir-notu]]
---

# Oturum: Android TWA deneme sürümü, Slice akıcı, geçiş yapıldı

- `android-twa/` (`23ba339`): `com.google.androidbrowserhelper:androidbrowserhelper:2.7.4` `LauncherActivity`, kendi Java kodu yok; paket `net.ziroo.tussle.twa`, açılış `https://tussle.ziroo.net/`, dikey, `immersive`, ikonlar `android/` kopyası, ad "Tussle TWA". AGP 8.13 / Gradle 9.1, APK 5 MB, Mac debug anahtarıyla imzalı.
- Site: `src/client/public/.well-known/assetlinks.json` (deneme paketi + debug SHA-256), `/.well-known/` `no-cache` (`static.ts`), `tests/server-assetlinks.test.ts`; Vite `.well-known`'ı `dist/client`'a kopyalıyor. İnceleme ajanı (sonnet): kritik/yüksek yok. **Commit `23ba339`, Yusuf'un onayıyla yayında** (`release.sh`, yedek `pre-23ba339.db`, healthz ok; HEAD'deki `050c924` web kodu da girdi, web'de etkisiz). Google Asset Links API ve telefon (`pm get-app-links`: verified) doğruladı; TWA adres çubuksuz tam ekran açıldı, üstte çentik hizasında siyah şerit var.
- Xiaomi'ye kuruldu; Chrome 155 TWA sağlayıcısı (varsayılan tarayıcı Chrome). Asset links yok → adres çubuklu açılıyor. Chrome'un deposunu paylaştığı için Yusuf'un web hesabı ("ziroo") geldi. OnePlus bağlı değildi.
- **Sonuç (Yusuf): Slice TWA'da parmak kalkıkken akıcı, Capacitor uygulamasındaki takılma yok.** Geçiş planı: [[2026-10-17-android-twa-gecis-plani]]. Karar Yusuf'ta.

## Geçiş (aynı gece, Yusuf "geçiş yapabilirsin")
- `ce1f519` yayında: TWA Play paketi (versionCode 5), assetlinks Play anahtarları, web `isTwa` + CloseWatcher geri tuşu, STORE.md / CAPACITOR.md. İnceleme ajanı (sonnet) iki turda kritik/yüksek bulmadı; önerdiği "ekran reddederse tarayıcı geri" eklendi. 1.741 test.
- Play Console (Claude in Chrome): iç test taslağına AAB yüklendi; sürüm notunu doldurma ilk denemede otomatik izin denetimine takıldı, Yusuf "sen tamamla, son onayı ben veririm" deyince dolduruldu; "Kaydet ve yayınla"ya Yusuf bastı. Telefon ~20 dk sonra güncelledi; Play sürümü adres çubuksuz açılıyor, `isTwa` doğru.
- Vault'ta diğer oturumun eklediği notlar okundu: titreşim TWA'da `TOUCH` kalır (bedel kabul), Chrome yoksa WebView yedeği (manifeste eklendi).

## Dersler
Ayrı not: [[2026-10-17-twa-elle-kurulum-tuzaklari]] (manifest, çubuk renkleri, CloseWatcher, adb/CDP yöntemleri).
