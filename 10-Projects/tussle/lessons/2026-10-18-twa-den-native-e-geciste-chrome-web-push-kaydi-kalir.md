---
type: lesson
project: tussle
date: 2026-10-18
status: active
tags: [tussle, android, bildirim, twa, fcm, web-push]
source: oturum 2026-10-18 akşam (mobil-playus, "tussle: durum ve kalan işler")
---

# Ders: TWA'dan Capacitor'a geçişte Chrome'un web push kaydı kalır, aynı mesaj Chrome site bildirimi olarak da gelir

## Ne oldu
- Yusuf'un Xiaomi'sine sohbet bildirimi Chrome ikonuyla, `tussl…` site bildirimi olarak geldi; OnePlus'a uygulamanın kendi FCM bildirimi geldi.
- Sunucu `push_devices`: Xiaomi hesabında TWA döneminden (17 Eki gece) `webpush`/`twa` satırı hâlâ açıktı. Uygulama kaldırılınca FCM token'ı `UNREGISTERED` olup kapanmıştı, ama Chrome'daki web push aboneliği yaşıyordu → bildirim Chrome'dan.
- Uygulama tamamen kaldırılıp yeniden kurulunca Chrome izni de gitti, sunucu ilk gönderimde 410 alıp satırı kapattı. Yerinde güncellemede (Play aynı paketi TWA'dan Capacitor'a günceller) bu olmaz: iki bildirim gelir.

## Ne yapıldı
- `b4ee6d7` (yayında): kullanıcı `fcm` kaydı yapınca aynı hesabın `webpush` + `platform='twa'` satırları kapatılır (`push.ts` `register`). Düz web ve başka hesaplar dokunulmaz; yeni `twa` kaydı yasaklanmadı (`android-twa/` geri dönüş yolu duruyor).

## Ders
- Paket aynı kalsa bile kabuk değişince eski kabuğun bildirim kanalı ayrı yaşar; geçişte sunucu eski kanalı kendisi kapatmalı.
- Teşhis sırası: bildirimin ikonu (Chrome mu uygulama mı) → `push_devices` satırları (`kind`, `platform`, `disabled_at`) → `adb shell dumpsys package` (sürüm, `firstInstallTime`).
- Sunucuda `sqlite3` yok; okuma `docker exec tussle node -e` + `node:sqlite` `DatabaseSync(..., {readOnly:true})`, veri yolu konteynerde `/data/tussle.db`.
