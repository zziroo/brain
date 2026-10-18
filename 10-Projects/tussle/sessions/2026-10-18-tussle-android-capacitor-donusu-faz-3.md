---
type: session
project: tussle
date: 2026-10-18
status: active
tags: [tussle, android, capacitor, fcm, play-billing, firebase, yayin]
source: oturum "tussle: Android Capacitor'a dönüş (Faz 3)" (worktree android-capacitor-donus-a533c0)
---

# Oturum: Android TWA'dan Capacitor'a döndü (Faz 3), 1.3 yayında

- **Yapılan:** Play Billing (`@capgo/native-purchases`), FCM (sunucu `FcmDriver` + istemci), Android Google girişi, SystemBars/geri/klavye/açılış/PageColor/titreşim, `appCategory="game"`, versionCode 7 / 1.3. Ayrıntı ve Faz 2 notları: [[2026-10-18-mini-motor-faz-devir-notu]].
- **Konsol (Chrome'dan, Yusuf onay adımlarında):** Firebase "tussle" GCP projesine eklendi (Analytics kapalı), Android uygulamaları + SHA-1'ler, üç Android OAuth istemcisi; FCM hizmet hesabı anahtarı `~/.config/tussle/` ve sunucuda `/opt/tussle/data/push/`.
- **Telefon turları (Yusuf):** 1. tur giriş/oyun/foto tamam; geri tuşu geçmişi sarıyordu, sihirbaz animasyonsuz, titreşim yoğun. 2. tur geri tamam, QR sayfası erken açılıyordu, titreşim hâlâ güçlü. 3. tur hepsi tamam. Kararlar: [[2026-10-18-android-geri-tusu-ekrandaki-geri-dugmesiyle-ayni]], [[2026-10-18-android-titresim-sistem-ayarini-izler]].
- **İnceleme:** üç tur; yüksek bulgu bildirim eklentisi kutusuzluğu (iOS'u da etkiliyordu), geri yönlendiricisinde dört bulgu düzeltildi. Ders: [[2026-10-18-capacitor-android-donusu-tuzaklari]].
- **Yayın:** main `2b99a2e` (yerel; GitHub push yok), `release.sh` (yedek `pre-368e5cf.db`, OTA 0.20261018.1252), `.env` `FCM_SERVICE_ACCOUNT`; Play 7 (1.3) iç + kapalı test.
- **iOS Firebase'e geçmedi:** APNs doğrudan kalır (SDK + yeni yapı + inceleme bedeli, kazanç yalnız tek konsol). Yusuf'a önerildi, itiraz yok.
- **Doğrulanmayan:** Play'den kurulan 1.3'te satın alma ve FCM bildirimi; iOS'ta bildirim (OTA düzeltmesiyle ilk kez çalışabilir); geçişlerdeki ilk giriş kasması (Yusuf "şimdilik iyi").
