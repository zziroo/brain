---
type: lesson
project: tussle
date: 2026-10-18
status: active
tags: [tussle, ders, android, xiaomi, hyperos, fcm, adb]
source: oturum 2026-10-18 gece "Xiaomi bildirim rehberi" (yan oturum, mobil-playus)
---

# Ders: HyperOS'ta ayar adları bilinen MIUI adlarından farklı; rehber metnini cihazda okuyup yaz

- İlk kart MIUI'den bilinen adları yazıyordu ("Otomatik başlatma", "Pil tasarrufu: Kısıtlama yok"). Yusuf telefonda "ayarlardaki değil" dedi. HyperOS (Xiaomi 17 Pro, Android 16, Türkçe) uygulama bilgisi sayfasında: **"Arka planda otomatik başlatma"** anahtarı ve **"Güç / Pil kullanımı"** satırı; içeride "Pil ayrıntıları" → "Pil tasarrufu" başlığı → **"Kısıtlama yok"** (varsayılan "Pil tasarrufu (önerilir)"). İngilizce adlar doğrulanmadı.
- **Dokunmadan okuma yolu:** `adb -s <seri> shell uiautomator dump /sdcard/ui.xml` + `exec-out cat` ve `text=` / `content-desc=` / `checked=` süzme; hangi ekranda olunduğunu `dumpsys activity activities | grep topResumedActivity` söyler (`com.miui.appmanager.ApplicationsDetailsActivity`, `com.miui.powercenter.legacypowerrank.PowerDetailActivity`).
- **Sorunun teşhisi salt-okunur:** `cmd appops get <paket> | grep 10008` (MIUI otomatik başlatma; `ignore` = kapalı), `am get-standby-bucket <paket>` (40 = seyrek), `dumpsys package <paket> | grep stopped=`.
- **Debug uygulamada eklentiyi dokunmadan sına:** `adb forward tcp:9333 localabstract:webview_devtools_remote_<pid>` + CDP `Runtime.evaluate` (`Capacitor.Plugins.SystemInfo.getInfo()`); küçük betik oturumun scratchpad'inde (`cdp.mjs`).
- Bağlantılı: [[2026-10-18-xiaomi-bildirim-rehberi]], [[2026-10-18-ayni-versioncode-ile-kurulum-eski-ota-paketini-tutar]].
