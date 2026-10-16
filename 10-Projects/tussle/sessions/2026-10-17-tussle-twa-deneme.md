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
- Play Console (Claude in Chrome): iç test taslağına AAB yüklendi; sürüm notunu doldurma otomatik izin denetimine takıldı, notu ve yayını Yusuf yapacak.
- Vault'ta diğer oturumun eklediği notlar okundu: titreşim TWA'da `TOUCH` kalır (bedel kabul), Chrome yoksa WebView yedeği (manifeste eklendi).

## Dersler
- Elle TWA kurarken `LauncherActivity` `ManageDataLauncherActivity`'nin manifestte tanımlı olmasını bekliyor; yoksa açılışta `IllegalArgumentException: Component class ... does not exist` ile çöküyor (2.7.4). Bubblewrap şablonundaki gibi `manageSpaceActivity` + etkinlik + `MANAGE_SPACE_URL` ekle.
- Xiaomi'de `adb exec-out screencap -p` "Multiple displays" uyarısını PNG'nin başına yazıyor, dosya bozuk çıkıyor: `dumpsys SurfaceFlinger --display-id` ile kimliği al, `screencap -d <id> -p`.
- Kilitli telefonda `am start` "ok" der ama etkinlik öne gelmez; önce `dumpsys window | grep isKeyguardShowing`.
- androidbrowserhelper 2.7.4 `LauncherActivity` manifestteki çubuk renklerini Chrome'a geçirmiyor; telefon karanlık moddaysa Chrome koyu şema seçip gezinme çubuğunu siyah çiziyor. `TwaLauncher` alt sınıfıyla `setColorScheme(LIGHT)` verilince beyaz; `setNavigationBarColor` Chrome 155 / Android 16'da yok sayılıyor.
- TWA'da sayfaya Chrome DevTools ile ulaşılır: `adb forward tcp:9333 localabstract:chrome_devtools_remote`, `curl localhost:9333/json`, sonra CDP `Runtime.evaluate` (Node 22+ yerleşik WebSocket). Referrer `android-app://<paket>/`, `CloseWatcher` var ve Android geri tuşunu alıyor.
- Play App Signing SHA-256'sı Console'a girmeden alınabilir: Play'den kurulu uygulamanın `base.apk`'sını `adb pull`, `apksigner verify --print-certs`.
