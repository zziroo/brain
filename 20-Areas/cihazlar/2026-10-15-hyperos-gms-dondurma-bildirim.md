---
type: lesson
project: kisisel
date: 2026-10-15
status: active
tags: [cihaz, android, adb, xiaomi, hyperos, xiaomi-eu, bildirim]
source: Oturum "kişisel: Xiaomi 17 Pro bildirim sorunu" (2026-10-15)
---

# Ders: HyperOS 3 (Çin tabanlı xiaomi.eu) Google Play Services'i donduruyor → gecikmeli bildirim

**Belirti:** WhatsApp (ve diğer uygulamaların) bildirimleri ancak uygulama açılınca geliyor. Uygulamanın pil ayarları "Kısıtlama yok", otomatik başlatma açık, DND ve veri tasarrufu kapalı; yani uygulama tarafında her şey doğru.

**Kök neden (adb ile):** HyperOS'un dondurucusu GreezeManager/millet, Google Play Services'i (uid 10143, süreç `com.google.android.gms`) her 5–30 saniyede "quick freeze" ile donduruyordu (bir günde 218 kez). Donma FCM/MCS soketini düşürüyor (`Close err:20`); yeniden bağlanma alarmı donmuş süreçte kurulamıyor, GCM saatlerce "Not connected" kalıyor. Bu arada hiçbir uygulamaya push gitmiyor. WhatsApp süreci kullanıcı son uygulamalardan kaydırınca ölüyor (`am_kill SwipeUpClean`) ve onu uyandıracak push olmadığı için mesajlar ancak uygulama açılınca iniyor.

Neden eski telefonda olmadı: ROM'un sabit beyaz listesi (`power_proc_white_list`) eski `com.google.android.gms.persistent` sürecini sayıyor; güncel GMS'te GCM ana süreçte (`com.google.android.gms`) çalışıyor, o yüzden muaf kalmıyor. Çin politikası da açık (`dumpsys greezer`: `IM mGmsLimitEnabled: true`, `mCurrentCNPolicy: 1`); xiaomi.eu bunu nötrlememiş.

**Teşhis komutları:**
- `dumpsys activity service com.google.android.gms/.gcm.GcmService | grep -iE 'connected|Reconnect'` → "Not connected", "Reconnect Scheduler Alarm: in PT-3H…" (negatif = gecikmiş).
- `dumpsys greezer` → ayarlar, "Frozen processes", FZ/THAW geçmişi; `grep 'FZ uid = <uid>'` ile sayım.
- `logcat -d -b events | grep -E 'am_kill|am_proc_died' | grep whatsapp` → öldürme nedeni (SwipeUpClean, PermissionHelper…).
- `dumpsys procstats --hours 3 com.whatsapp` → süreç zamanın ne kadarında hayatta.
- `settings list system | grep -iE 'MILLET|freeze|white'`.

**Çözüm (root gerekmez):** Pil menüsündeki "Kısıtlama yok" seçimi `system` ayarı `MILLET_NO_RESTRICT_APP` listesine yazılıyor; Google Play Services'i o listeye eklemek dondurmayı anında bitirdi (60 sn + izlemede 0 freeze, GCM bağlı kaldı, Gmail/Chrome push'ları geldi):
```
adb shell settings put system MILLET_NO_RESTRICT_APP 'com.whatsapp, com.microsoft.teams, com.azure.authenticator, com.google.android.gms'
adb shell settings put system power_proc_white_list 'com.google.android.gms.persistent,com.google.android.gms'
```
Anlık rahatlama için `svc wifi disable; sleep 4; svc wifi enable` GCM'i yeniden bağlar. Kullanıcı tarafında kalıcı kılmak için aynı seçimi arayüzden de yapmak iyi olur: Ayarlar → Uygulamalar → Uygulamaları yönet → (sistem uygulamalarını göster) → Google Play Hizmetleri → Pil tasarrufu → Kısıtlama yok. Ayrıca WhatsApp'ı son uygulamalarda kilitlemek (kaydırınca ölmesin) ikinci bir güvence.

**Kalıcılık (aynı gün öğrenildi):** powerkeeper `MILLET_NO_RESTRICT_APP` listesini kendi veritabanından periyodik olarak geri yazıyor; adb ile eklenen GMS ~50 dk içinde düştü ve dondurma geri geldi. Sistem uygulaması olduğu için arayüzde GMS'in "Pil tasarrufu" seçeneği de yok (Pil ayrıntıları sayfası sadece kullanım gösteriyor). Topluluk teşhisi aynı (Reddit r/HyperOS, 2026-09): çözüm dingwen07'nin **HyperOS FCM Fix** uygulaması (https://github.com/dingwen07/hyperos-fcm-fix, Shizuku ister): listeyi 30 sn'de bir kontrol edip GMS'i geri ekliyor, ayrıca şu shell komutlarını uyguluyor (yeniden başlatmaya kadar bellekte kalır, adb'den de verilebilir):
```
adb shell dumpsys greezer IM GMS disable     # dumpsys greezer'da "IM mGmsLimitEnabled : false" olur
adb shell dumpsys greezer LM add com.google.android.gms
```
FCM bağlantı durumu telefondan: Telefon uygulamasında `*#*#426#*#*` → "Connected" olmalı.

**Kurulum (2026-10-15 akşam, yapıldı):** Shizuku v13.6.0 ve HyperOS FCM Fix v0.3.1 adb ile kuruldu (SHA256 doğrulandı). Dersler:
- Shizuku'nun izin penceresi "ADB'nin izni sınırlıdır" diyorsa Geliştirici seçeneklerinde **"USB hata ayıklama (Güvenlik ayarları)"** açılmalı; xiaomi.eu'da Mi hesabı istemedi. Bu anahtar açılınca `adb shell input tap` de çalışır (ekranda dokunma mümkün).
- Shizuku'yu Mac'ten başlatma (start.sh çıkmamışsa): `APK=$(adb shell pm path moe.shizuku.privileged.api | sed 's/package://')`, `adb shell cp $(dirname $APK)/lib/arm64/libshizuku.so /data/local/tmp/shizuku_starter`, `chmod 755`, `/data/local/tmp/shizuku_starter --apk=$APK`. Güvenlik anahtarı sonradan açıldıysa sunucuyu yeniden başlat; yoksa uygulama "user service timed out" der.
- powerkeeper listeyi her yeni paket kurulumunda / izin değişiminde de geri yazıyor (securitycenter CloudUpdater tetikliyor).
- Uygulamada ayar: Periodical enforcement 1 saat, polling 30 sn, gece koruması kapalı, uygulamalar "Unrestricted" yapılmadı. Her yeniden başlatmada Shizuku'nun tekrar başlatılması gerekir (Shizuku → Kablosuz hata ayıklama ile başlat, ya da Mac'e bağlayıp yukarıdaki komut); FCM Fix Shizuku gelince kendini toparlıyor.

## İlgili
- [[xiaomi-17-pro]]
- [[2026-10-14-xiaomi-17-pro-kurulum-dersleri]]
