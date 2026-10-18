---
type: decision
project: tussle
date: 2026-10-18
status: accepted
tags: [tussle, android, bildirim, fcm, xiaomi, play]
source: oturum 2026-10-18 gece "Xiaomi bildirim rehberi" (yan oturum, mobil-playus); commit 1e795a7, Play 1.7 (vc 11)
---

# Karar: Xiaomi / Redmi / POCO'da bir kerelik bildirim rehberi; yalnız Xiaomi, bildirim açıldığı an ve Ayarlar'da

Ders: [[2026-10-18-hyperos-fcm-otomatik-baslatma-ve-ayar-adlari]]. İlgili: [[2026-10-18-bildirim-yalniz-on-plandaki-odada-susar]] (sunucu tarafı).

## Ne
- Native `SystemInfo` eklentisi (`android/.../SystemInfoPlugin.java`): `getInfo()` → Build.MANUFACTURER / BRAND, `openAppSettings()` → sistemin uygulama ayrıntıları sayfası. İzin yok.
- Kart (`src/client/ui/push-oem-core.ts`, `push-ui.ts` `oemGuideCard`): "Arka planda otomatik başlatma: Açık", "Pil kullanımı: Kısıtlama yok" + "Ayarları aç". Odadaki "Haber verelim mi? → Aç" Xiaomi'de bildirim açılınca rehbere dönüşür (bir kez); Ayarlar > Bildirimler'de bildirim açıkken "Tamam" denene kadar durur (`tussle.pushOemSeen`).
- versionCode ≤ 10 kabuklarda eklenti yok: kart çıkmaz. Kartı Play 1.7 (vc 11) taşır.

## Neden
- Yusuf'un Xiaomi 17 Pro'sunda Play uygulamasının otomatik başlatması kapalıydı (`MIUIOP(10008): ignore`), bekleme grubu 40 (seyrek): kaydırılıp kapanan uygulamayı FCM uyandıramıyor, bildirim uygulama açılınca geliyor. Türkiye'de Xiaomi en yaygın Android markalarından; "her gün oyna" düzeni bildirime dayanıyor, kullanıcı bu ayarı kendi bulmaz.
- Rehber çoğu bildirim/alarm uygulamasında var (dontkillmyapp.com bunun için kuruldu); ayar sayfasını açmak Play kurallarına uygun.
- Yusuf "şart mıydı" diye sordu: kendi telefonu ve 12 testçi için şart değil (elle iki anahtar yeter), yayında faydalı; "kalsın, sadeleşsin" dedi.

## Reddedilen alternatifler
- **`REQUEST_IGNORE_BATTERY_OPTIMIZATIONS` istemek:** Play bu izni belli uygulama türlerine veriyor, oyun değil.
- **Huawei / Oppo / Vivo / OnePlus için genel metin:** menü adları farklı, test edilemiyor; bir testçi bildirince eklenir (ilk sürümde vardı, Yusuf'la çıkarıldı).
- **Yalnız Ayarlar'da göstermek:** çoğu kişi bildirimi odadaki sorudan açar, Ayarlar'a girmez.
- **Otomatik başlatma durumunu okuyup kartı gizlemek:** Xiaomi resmi yol vermiyor (gizli appops 10008 yansımayla okunur), kırılgan.
- **MIUI Otomatik başlatma listesini açmak:** her sürümde export edilmiyor, tüm uygulamaları listeliyor; ayrıntılar sayfasında iki ayar birden var.
- **Hiçbir şey yapmayıp test grubuna tek satır yazmak:** testçiler için yeterdi, yayındaki kullanıcıya ulaşmaz.
