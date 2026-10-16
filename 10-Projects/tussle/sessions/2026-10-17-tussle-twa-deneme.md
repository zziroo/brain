---
type: session
project: tussle
date: 2026-10-17
status: active
tags: [tussle, oturum, android, twa, performans]
source: oturum 2026-10-17 gece (mobil-playus) yan oturum, brif [[2026-10-17-twa-deneme-devir-notu]]
---

# Oturum: Android TWA deneme sürümü, Slice akıcı

- `android-twa/` (`23ba339`): `com.google.androidbrowserhelper:androidbrowserhelper:2.7.4` `LauncherActivity`, kendi Java kodu yok; paket `net.ziroo.tussle.twa`, açılış `https://tussle.ziroo.net/`, dikey, `immersive`, ikonlar `android/` kopyası, ad "Tussle TWA". AGP 8.13 / Gradle 9.1, APK 5 MB, Mac debug anahtarıyla imzalı.
- Site: `src/client/public/.well-known/assetlinks.json` (deneme paketi + debug SHA-256), `/.well-known/` `no-cache` (`static.ts`), `tests/server-assetlinks.test.ts`; Vite `.well-known`'ı `dist/client`'a kopyalıyor. İnceleme ajanı (sonnet): kritik/yüksek yok. **Commit `23ba339`, Yusuf'un onayıyla yayında** (`release.sh`, yedek `pre-23ba339.db`, healthz ok; HEAD'deki `050c924` web kodu da girdi, web'de etkisiz). Google Asset Links API ve telefon (`pm get-app-links`: verified) doğruladı; TWA adres çubuksuz tam ekran açıldı, üstte çentik hizasında siyah şerit var.
- Xiaomi'ye (`cfa7c66`) kuruldu; Chrome 155 TWA sağlayıcısı (varsayılan tarayıcı Chrome). Asset links yok → adres çubuklu açılıyor. Chrome'un deposunu paylaştığı için Yusuf'un web hesabı ("ziroo") geldi. OnePlus bağlı değildi.
- **Sonuç (Yusuf): Slice TWA'da parmak kalkıkken akıcı, Capacitor uygulamasındaki takılma yok.** Geçiş planı: [[2026-10-17-android-twa-gecis-plani]]. Karar Yusuf'ta.

## Dersler
- Elle TWA kurarken `LauncherActivity` `ManageDataLauncherActivity`'nin manifestte tanımlı olmasını bekliyor; yoksa açılışta `IllegalArgumentException: Component class ... does not exist` ile çöküyor (2.7.4). Bubblewrap şablonundaki gibi `manageSpaceActivity` + etkinlik + `MANAGE_SPACE_URL` ekle.
- Xiaomi'de `adb exec-out screencap -p` "Multiple displays" uyarısını PNG'nin başına yazıyor, dosya bozuk çıkıyor: `dumpsys SurfaceFlinger --display-id` ile kimliği al, `screencap -d <id> -p`.
- Kilitli telefonda `am start` "ok" der ama etkinlik öne gelmez; önce `dumpsys window | grep isKeyguardShowing`.
