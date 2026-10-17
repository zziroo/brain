---
type: lesson
project: tussle
date: 2026-10-17
status: active
tags: [tussle, android, twa, bildirim, web-push, izin, chrome]
source: oturum 2026-10-17 (mobil-playus), Yusuf'un Xiaomi'sinde (Android 16, Chrome 154) deneme + Chrome site ayarı ekran görüntüsü
---

# TWA bildirim devri: uygulamada izin yoksa Chrome tarayıcı da kilitlenir

**Olay:** Web push yayına alındı; telefonda "Bildirimleri aç" ne TWA'da ne Chrome tarayıcısında tepki verdi, sunucuya izin raporu düşmedi. Chrome site ayarında Bildirimler satırı **"Tussle tarafından yönetiliyor"** yazıyordu; ↗ ile açılan Android uygulama ayarında "Bildirimlere izin ver" anahtarı **gri/kilitli**.

**Sebep:** Site için doğrulanmış bir TWA (assetlinks) kuruluysa Chrome, o origin'in bildirim iznini **uygulamaya devreder** (notification delegation); tarayıcı sekmesinde bile `Notification.requestPermission()` uygulamanın bildirim durumuna bakar. Play'deki versionCode 5 manifestinde `POST_NOTIFICATIONS` yoktu; Android 13+ izni bildirmeyen uygulamanın anahtarını kilitler, Chrome da isteği anında "engelli" sayar. Sonuç: izin penceresi hiç çıkmaz, kod yoluna girilmediği için rapor da oluşmaz.

**Çözüm:** Manifestte `POST_NOTIFICATIONS` + `DelegationService` (`SMALL_ICON`) + `NotificationPermissionRequestActivity` (android-browser-helper 2.7.4) → versionCode 6 / 1.2 AAB (`43bf8c2`). Uygulama güncellenince izin uygulama tarafından sorulur; Chrome tarayıcı da aynı durumu izler.

**Ders:**
- TWA'lı bir sitede web push'u yayına almadan **önce** uygulama manifesti hazır olmalı; yoksa web kullanıcıları (Chrome Android) da kilitlenir.
- "Hiçbir şey olmuyor" + rapor yok = izin isteği çalışmadan 'denied' dönüyor; Chrome site ayarındaki "X tarafından yönetiliyor" satırı ilk bakılacak yer.
- Teşhis için istemciye izin sonucu raporu eklendi (`enablePush`, `[push] push.enable perm=…`); `docker exec tussle node scripts/feedback-cli.mjs errors --tail 20` ile okunur.
