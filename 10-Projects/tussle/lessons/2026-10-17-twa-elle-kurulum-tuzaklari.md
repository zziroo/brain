---
type: lesson
project: tussle
date: 2026-10-17
status: active
tags: [tussle, android, twa, chrome, ders]
source: oturum 2026-10-17 gece (mobil-playus) TWA deneme ve geçiş, [[sessions/2026-10-17-tussle-twa-deneme]]
---

# Ders: androidbrowserhelper ile elle TWA kurarken tuzaklar (2.7.4, Chrome 155, Android 16)

## Ne oldu
`android-twa/` Bubblewrap'siz, `com.google.androidbrowserhelper` 2.7.4 ile elle kuruldu. Belgelerde yazmayan birkaç davranış zaman kaybettirdi.

## Tuzaklar
- **`ManageDataLauncherActivity` manifestte zorunlu.** Yoksa `LauncherActivity` açılışta `IllegalArgumentException: Component class ... does not exist` ile çöker. Bubblewrap şablonundaki gibi `manageSpaceActivity` + etkinlik + `MANAGE_SPACE_URL` ekle.
- **Çubuk renkleri Chrome'a gitmiyor.** 2.7.4 `STATUS_BAR_COLOR` / `NAVIGATION_BAR_COLOR` değerlerini okuyor ama yalnız kendi açılış ekranında kullanıyor. Telefon karanlık moddaysa Chrome koyu şema seçip gezinme çubuğunu siyah çiziyor. Çözüm: `TwaLauncher` alt sınıfında `builder.setColorScheme(COLOR_SCHEME_LIGHT)` (`TussleLauncherActivity`). `setNavigationBarColor` Chrome 155'te yok sayılıyor: çubuk krem değil beyaz.
- **Durum çubuğu sayfanın `theme-color`'ını izliyor** (Gece temasında koyu); TWA tarafında ayar gerekmiyor.
- **`immersive` kip** durum çubuğunu gizliyor ama kamera çentiği hizasında siyah şerit bırakıyor; Yusuf "tuhaf" buldu, normal kipe dönüldü.
- **İlk açılışta Chrome'un "Chrome'da çalıştırılıyor" bildirimi** kapatılamıyor (TWA gizlilik zorunluluğu, bir kez). Yusuf sevmedi: [[2026-10-17-android-twa-gecis-plani]] "Açık konu".
- **Geri tuşu sayfaya `CloseWatcher` ile gelir** (TWA'da doğrulandı); Capacitor `backButton` dinleyicisinin web karşılığı. Kullanıcı etkinliği olmadan da tek bir izleyici kurulabiliyor.

## Uygula
- Hata ayıklama: TWA sayfasına `adb forward tcp:9333 localabstract:chrome_devtools_remote` + CDP `Runtime.evaluate` (Node 22+ yerleşik WebSocket) ile ulaşılır. TWA'nın referrer'ı `android-app://<paket>/`.
- Play App Signing SHA-256'sını Console'a girmeden almak için Play'den kurulu uygulamanın `base.apk`'sını `adb pull` et, `apksigner verify --print-certs` çalıştır.
- Xiaomi'de `screencap` birden çok ekran uyarısını PNG'ye yazıyor: `dumpsys SurfaceFlinger --display-id` ile kimliği al, `screencap -d <id> -p`.
- Kilitli telefonda `am start` "ok" der ama etkinlik öne gelmez; önce `dumpsys window | grep isKeyguardShowing`.
- Görev aynı kalırsa (`Activity not started, brought to front`) yeni manifest denemek için Chrome'u da `force-stop` et.
